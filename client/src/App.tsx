import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ModeProvider } from "@/contexts/ModeContext";
import { OrganizationProvider } from "@/contexts/OrganizationContext";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { VoiceProvider } from "@/contexts/VoiceContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { ViViProvider } from "@/contexts/ViViContext";
import { AuthProvider } from "@/components/Auth/AuthGuard";

import ExactMavroPlusDashboard from "@/pages/ExactMavroPlusDashboard";
import DemoPage from "@/pages/DemoPage";
import ViViTestPage from "@/pages/ViViTestPage";
import MavroAIStudio from "@/pages/MavroAIStudio";

function Router() {
  return (
    <Switch>
      <Route path="/demo">
        <DemoPage />
      </Route>
      <Route path="/vivi-test">
        <ViViTestPage />
      </Route>
      <Route path="/ai-studio">
        <MavroAIStudio />
      </Route>
      <Route path="/dashboard">
        <ExactMavroPlusDashboard isDemoMode={false} isBetaUser={false} />
      </Route>
      <Route path="/">
        <ExactMavroPlusDashboard isDemoMode={false} isBetaUser={false} />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ViViProvider>
          <ModeProvider>
            <OrganizationProvider>
              <ProfileProvider>
                <VoiceProvider>
                  <SettingsProvider>
                    <TooltipProvider>
                      <Toaster />
                      <Router />
                    </TooltipProvider>
                  </SettingsProvider>
                </VoiceProvider>
              </ProfileProvider>
            </OrganizationProvider>
          </ModeProvider>
        </ViViProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;