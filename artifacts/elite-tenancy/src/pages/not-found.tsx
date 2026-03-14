import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <div className="text-center px-6">
        <h1 className="font-serif text-8xl text-primary mb-4">404</h1>
        <h2 className="font-serif text-3xl text-white mb-6">Page not found</h2>
        <p className="text-white/50 mb-10 max-w-md mx-auto">The page you are looking for does not exist or has been moved.</p>
        <Link href="/">
          <Button variant="outline" className="border-white/20 text-white">Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
