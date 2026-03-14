import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";

// Pages
import Home from "@/pages/Home";
import Landlords from "@/pages/Landlords";
import Tenants from "@/pages/Tenants";
import HowItWorks from "@/pages/HowItWorks";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import Cities from "@/pages/Cities";
import RentersRightsAct from "@/pages/RentersRightsAct";
import Resources from "@/pages/Resources";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

// Simple mock components for remaining pages to ensure completeness
function WhyUs() {
  return <div className="pt-40 px-8 text-center text-white min-h-screen"><h1 className="font-serif text-4xl mb-4">Why Elite Tenancy</h1><p className="text-white/50">Content coming soon.</p></div>;
}
function Compliance() {
  return <div className="pt-40 px-8 text-center text-white min-h-screen"><h1 className="font-serif text-4xl mb-4">Compliance & Legal</h1><p className="text-white/50">Content coming soon.</p></div>;
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/landlords" component={Landlords} />
        <Route path="/tenants" component={Tenants} />
        <Route path="/how-it-works" component={HowItWorks} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/contact" component={Contact} />
        <Route path="/cities" component={Cities} />
        <Route path="/renters-rights-act" component={RentersRightsAct} />
        <Route path="/resources" component={Resources} />
        <Route path="/why-us" component={WhyUs} />
        <Route path="/compliance" component={Compliance} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
