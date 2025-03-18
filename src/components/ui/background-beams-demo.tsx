
"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

function BackgroundBeamsDemo() {
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would send this to your backend
    console.log("Email submitted:", email);
    
    toast({
      title: "Success!",
      description: "You've been added to our waitlist",
    });
    
    setEmail("");
  };

  return (
    <div className="h-[40rem] w-full rounded-md bg-background relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground text-center font-sans font-bold">
          Join the waitlist
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto my-6 text-sm md:text-base text-center relative z-10">
          Welcome to PromptVault, the best prompts to use for your AI development workflow.
          We provide tested and proven prompts to help you get more done with less mental work. Sign up here so you can be notified when we expand this into a more feature rich web app with intuitive workflows.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 relative z-10">
          <Input
            type="email"
            placeholder="hi@dependablecalls.com"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="md:w-auto w-full">
            Join Waitlist
          </Button>
        </form>
      </div>
      <BackgroundBeams />
    </div>
  );
}

export { BackgroundBeamsDemo };
