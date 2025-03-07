
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">QuickMED</h1>
          </div>
          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        </header>
        
        <main className="flex flex-col md:flex-row items-center justify-between gap-12 py-12">
          <div className="flex-1 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your AI Medical Assistant
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Describe your symptoms, get personalized recommendations, and access available medications - all in one place.
            </p>
            <div className="flex gap-4">
              <Link to="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 max-w-lg">
            <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <p className="text-gray-700">Hi, I'm experiencing a headache and slight fever since yesterday.</p>
              </div>
              <div className="bg-blue-100 rounded-lg p-4 mb-4">
                <p className="text-blue-800">I'll help you with that. How long have you had these symptoms?</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-gray-700">About 24 hours now. The headache gets worse when I move.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
