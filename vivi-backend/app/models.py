from sqlalchemy import Column, Integer, String, DateTime, Float, Text, Boolean, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from datetime import datetime
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
import json

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    business_name = Column(String)
    industry = Column(String)
    geo_region = Column(String)
    geo_country = Column(String)

class AgentDecision(Base):
    __tablename__ = "agent_decisions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    decision_id = Column(String, unique=True)
    rule_id = Column(String)
    action = Column(String)
    confidence = Column(Float)
    auto_executed = Column(Boolean)
    timestamp = Column(DateTime, default=datetime.utcnow)
    payload = Column(JSON)
    rationale = Column(Text)

class UserAnalytics(Base):
    __tablename__ = "user_analytics"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    event_type = Column(String)
    event_data = Column(JSON)
    timestamp = Column(DateTime, default=datetime.utcnow)
    ip_address = Column(String)
    user_agent = Column(String)

class UserCreate(BaseModel):
    email: str
    username: str
    password: str
    business_name: Optional[str] = None
    industry: Optional[str] = None
    geo_region: Optional[str] = None
    geo_country: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    is_active: bool
    business_name: Optional[str]
    industry: Optional[str]
    geo_region: Optional[str]
    geo_country: Optional[str]
    created_at: datetime

class PersonaContext(BaseModel):
    id: str
    name: str
    industry: str
    tone_profile: Optional[Dict[str, Any]] = None

class GeoContext(BaseModel):
    country: Optional[str] = None
    region: Optional[str] = None
    events: Optional[List[Dict[str, str]]] = None

class MetricsContext(BaseModel):
    engagement: float
    previous_engagement: Optional[float] = None
    optimal_posting_times: Optional[List[int]] = None
    sentiment_score: Optional[float] = None
    competitor_metrics: Optional[Dict[str, Any]] = None

class AgentContextRequest(BaseModel):
    persona: PersonaContext
    geo: GeoContext
    metrics: MetricsContext

class DecisionResponse(BaseModel):
    id: str
    rule_id: str
    action: str
    confidence: float
    auto_executed: bool
    timestamp: str
    payload: Dict[str, Any]
    rationale: Optional[str] = None

class AnalyticsEvent(BaseModel):
    event_type: str
    event_data: Dict[str, Any]
