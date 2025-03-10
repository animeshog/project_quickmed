import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Activity, ArrowRight, Heart, Pill } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white relative overflow-hidden">
      <AnimatedBackground intensity="medium" />

      {/* Content */}
      <div
        className="container mx-auto px-4 relative z-10"
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        {/* Improved Horizontal Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between py-16 md:py-24 gap-8 md:gap-12">
          {/* Left side - Hero content */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-700">
                QuickMed
              </span>
            </h1>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              AI-Powered Health Analysis
            </h2>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              Get instant symptom analysis, personalized treatment
              recommendations, and expert medical advice powered by advanced AI
              technology.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-blue-700 hover:bg-blue-800 text-base px-8 py-6 rounded-xl shadow-lg shadow-blue-700/20"
                onClick={() => navigate("/dashboard")}
              >
                Try Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-blue-700 text-blue-700 hover:bg-blue-50 text-base px-8 py-6 rounded-xl shadow-lg"
                onClick={() => navigate("/signup")}
              >
                Create Account
              </Button>
            </div>
          </motion.div>

          {/* Right side - Illustration/Feature visual */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl w-full max-w-lg">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <Activity className="h-8 w-8 text-blue-600" />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-center mb-4">
                Health Assessment Made Easy
              </h3>

              {/* Feature highlights with icons */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-blue-50/60 rounded-lg p-3">
                  <div className="bg-blue-100 p-2 rounded-md">
                    <Activity className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">Symptom Analysis</h4>
                    <p className="text-sm text-gray-600">
                      Advanced AI analyzes your symptoms with medical precision
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-green-50/60 rounded-lg p-3">
                  <div className="bg-green-100 p-2 rounded-md">
                    <Pill className="h-5 w-5 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">Treatment Options</h4>
                    <p className="text-sm text-gray-600">
                      Personalized medication and treatment recommendations
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-purple-50/60 rounded-lg p-3">
                  <div className="bg-purple-100 p-2 rounded-md">
                    <Heart className="h-5 w-5 text-purple-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">Home Remedies</h4>
                    <p className="text-sm text-gray-600">
                      Simple home solutions to speed up your recovery
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats section beneath hero */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-24 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-md">
            <p className="text-3xl font-bold text-blue-700 mb-1">98%</p>
            <p className="text-gray-600 text-sm">Accuracy Rate</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-md">
            <p className="text-3xl font-bold text-blue-700 mb-1">24/7</p>
            <p className="text-gray-600 text-sm">Availability</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-md col-span-2 md:col-span-1">
            <p className="text-3xl font-bold text-blue-700 mb-1">
              Prescription
            </p>
            <p className="text-gray-600 text-sm">Support</p>
          </div>
        </motion.div>

        {/* How It Works section */}
        <motion.div
          className="mb-24" // increased bottom margin
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-12 text-blue-900 text-center">
            {" "}
            {/* increased margin bottom */}
            How QuickMed Works
          </h2>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {" "}
            {/* increased gap and added max-width */}
            {/* Step 1 */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white bg-opacity-90 backdrop-blur-sm p-6 rounded-xl shadow-md border-t-4 border-blue-600">
                <div className="absolute -top-5 -left-5 h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold text-white">
                  1
                </div>
                <div className="pt-4">
                  <h3 className="font-semibold text-xl mb-2">
                    Describe Your Symptoms
                  </h3>
                  <p className="text-gray-600">
                    Enter your symptoms or select from common options to begin
                    your health assessment.
                  </p>
                </div>
              </div>
            </motion.div>
            {/* Step 2 */}
            <motion.div
              className="relative mt-8 md:mt-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white bg-opacity-90 backdrop-blur-sm p-6 rounded-xl shadow-md border-t-4 border-blue-600">
                <div className="absolute -top-5 -left-5 h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold text-white">
                  2
                </div>
                <div className="pt-4">
                  <h3 className="font-semibold text-xl mb-2">
                    AI Analyzes Data
                  </h3>
                  <p className="text-gray-600">
                    Our AI processes your information and may ask follow-up
                    questions for accuracy.
                  </p>
                </div>
              </div>
            </motion.div>
            {/* Step 3 */}
            <motion.div
              className="relative mt-8 md:mt-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white bg-opacity-90 backdrop-blur-sm p-6 rounded-xl shadow-md border-t-4 border-blue-600">
                <div className="absolute -top-5 -left-5 h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold text-white">
                  3
                </div>
                <div className="pt-4">
                  <h3 className="font-semibold text-xl mb-2">
                    Get Personalized Results
                  </h3>
                  <p className="text-gray-600">
                    Receive a detailed assessment with treatment options and
                    medication recommendations.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-10 text-center shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of users who trust QuickMed for quick and reliable
            health insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-800 hover:bg-blue-50 text-lg px-8"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
            <Button
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8"
              onClick={() => navigate("/signup")}
            >
              Create Account
            </Button>
          </div>
        </motion.div>

        {/* Footer note */}
        <div className="text-center text-sm text-gray-500 mt-12">
          <p>
            Note: QuickMed provides informational services only and does not
            replace professional medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
