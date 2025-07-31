from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import List
import os
from openai import OpenAI

from .database import get_db, create_tables
from .models import (
    User, AgentDecision, UserAnalytics,
    UserCreate, UserLogin, UserResponse, 
    AgentContextRequest, DecisionResponse, AnalyticsEvent,
    PersonaContext, GeoContext, MetricsContext
)
from .auth import (
    authenticate_user, create_access_token, get_current_user,
    get_password_hash, ACCESS_TOKEN_EXPIRE_MINUTES
)
from .vivi_agent.agent import ViViAgent

app = FastAPI(title="ViVi AI Agent API", version="1.0.0")

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", "dummy-key-for-demo"))

@app.on_event("startup")
async def startup_event():
    create_tables()

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

@app.post("/auth/register", response_model=UserResponse)
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(
        (User.email == user_data.email) | (User.username == user_data.username)
    ).first()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email or username already registered"
        )
    
    hashed_password = get_password_hash(user_data.password)
    db_user = User(
        email=user_data.email,
        username=user_data.username,
        hashed_password=hashed_password,
        business_name=user_data.business_name,
        industry=user_data.industry,
        geo_region=user_data.geo_region,
        geo_country=user_data.geo_country
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user

@app.post("/auth/login")
async def login(user_credentials: UserLogin, db: Session = Depends(get_db)):
    user = authenticate_user(db, user_credentials.email, user_credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "business_name": user.business_name,
            "industry": user.industry,
            "geo_region": user.geo_region,
            "geo_country": user.geo_country
        }
    }

@app.get("/auth/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    return current_user

@app.post("/agent/analyze", response_model=List[DecisionResponse])
async def run_agent_analysis(
    context_request: AgentContextRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    agent = ViViAgent(openai_client)
    
    agent.set_context(
        context_request.persona,
        context_request.geo,
        context_request.metrics
    )
    
    decisions = await agent.run_cycle()
    
    for decision in decisions:
        db_decision = AgentDecision(
            user_id=current_user.id,
            decision_id=decision.id,
            rule_id=decision.rule_id,
            action=decision.action,
            confidence=decision.confidence,
            auto_executed=decision.auto_executed,
            payload=decision.payload,
            rationale=decision.rationale
        )
        db.add(db_decision)
    
    db.commit()
    
    return decisions

@app.get("/agent/history", response_model=List[DecisionResponse])
async def get_agent_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    limit: int = 50
):
    decisions = db.query(AgentDecision).filter(
        AgentDecision.user_id == current_user.id
    ).order_by(AgentDecision.timestamp.desc()).limit(limit).all()
    
    return [
        DecisionResponse(
            id=d.decision_id,
            rule_id=d.rule_id,
            action=d.action,
            confidence=d.confidence,
            auto_executed=d.auto_executed,
            timestamp=d.timestamp.isoformat(),
            payload=d.payload,
            rationale=d.rationale
        )
        for d in decisions
    ]

@app.get("/agent/context")
async def get_agent_context(current_user: User = Depends(get_current_user)):
    return {
        "persona": {
            "id": str(current_user.id),
            "name": current_user.business_name or current_user.username,
            "industry": current_user.industry or "General Business"
        },
        "geo": {
            "country": current_user.geo_country,
            "region": current_user.geo_region
        },
        "metrics": {
            "engagement": 0.5,  # Default values
            "previous_engagement": 0.4,
            "optimal_posting_times": [9, 12, 17, 19],
            "sentiment_score": 0.7
        }
    }

@app.post("/analytics/track")
async def track_analytics_event(
    event: AnalyticsEvent,
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    analytics_record = UserAnalytics(
        user_id=current_user.id,
        event_type=event.event_type,
        event_data=event.event_data,
        ip_address=request.client.host,
        user_agent=request.headers.get("user-agent", "")
    )
    
    db.add(analytics_record)
    db.commit()
    
    return {"status": "tracked"}

@app.get("/analytics/dashboard")
async def get_analytics_dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    total_events = db.query(UserAnalytics).filter(
        UserAnalytics.user_id == current_user.id
    ).count()
    
    total_decisions = db.query(AgentDecision).filter(
        AgentDecision.user_id == current_user.id
    ).count()
    
    auto_executed_decisions = db.query(AgentDecision).filter(
        AgentDecision.user_id == current_user.id,
        AgentDecision.auto_executed == True
    ).count()
    
    return {
        "total_events": total_events,
        "total_decisions": total_decisions,
        "auto_executed_decisions": auto_executed_decisions,
        "automation_rate": auto_executed_decisions / max(total_decisions, 1),
        "user_since": current_user.created_at.isoformat()
    }

@app.put("/user/profile", response_model=UserResponse)
async def update_user_profile(
    profile_data: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    allowed_fields = ['business_name', 'industry', 'geo_region', 'geo_country']
    for field in allowed_fields:
        if field in profile_data:
            setattr(current_user, field, profile_data[field])
    
    db.commit()
    db.refresh(current_user)
    
    return current_user
