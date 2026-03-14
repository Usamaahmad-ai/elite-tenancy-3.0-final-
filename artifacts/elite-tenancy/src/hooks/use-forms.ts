import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

// Mock mutations for the lead generation forms since these endpoints aren't in the schema
export function useSubmitProperty() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: any) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Property submitted:", data);
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Property Submitted Successfully",
        description: "Our verification team will be in touch within 2 hours.",
      });
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    }
  });
}

export function useSubmitTenantNeeds() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: any) => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Tenant needs submitted:", data);
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Profile Started",
        description: "We'll begin matching you with verified properties immediately.",
      });
    }
  });
}

export function useSubscribeNewsletter() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (email: string) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Subscribed",
        description: "You'll receive our next bi-weekly briefing.",
      });
    }
  });
}
