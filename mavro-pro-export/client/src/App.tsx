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
import NotFound from "@/pages/not-found";
import ExactMavroPlusDashboard from "@/pages/ExactMavroPlusDashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={ExactMavroPlusDashboard} />
      <Route path="/dashboard" component={ExactMavroPlusDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
