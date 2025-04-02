import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import axios from "axios";

interface ChatHistory {
  _id: string;
  date: string;
  symptoms: string[];
  diagnosis: string;
  recommendations: string;
}

const History = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<ChatHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/auth/chat-history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistory(response.data);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => navigate("/profile")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Chat History</h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((chat) => (
              <motion.div
                key={chat._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Consultation Summary
                    </CardTitle>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(chat.date).toLocaleDateString()}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-medium text-sm text-gray-500">
                          Symptoms
                        </h4>
                        <p>{chat.symptoms.join(", ")}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-500">
                          Diagnosis
                        </h4>
                        <p>{chat.diagnosis}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-500">
                          Recommendations
                        </h4>
                        <p>{chat.recommendations}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
