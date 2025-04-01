import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface CategorizedSymptomsProps {
  categories: Record<string, string[]>;
  selectedSymptoms: string[];
  onToggleSymptom: (symptom: string) => void;
}

const CategorizedSymptoms = ({
  categories,
  selectedSymptoms,
  onToggleSymptom,
}: CategorizedSymptomsProps) => {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {Object.entries(categories).map(([category, symptoms]) => (
          <div key={category}>
            <h3 className="font-semibold text-gray-700 mb-2">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {symptoms.map((symptom) => (
                <Button
                  key={symptom}
                  variant="outline"
                  size="sm"
                  onClick={() => onToggleSymptom(symptom)}
                  className={cn(
                    "border border-gray-200",
                    selectedSymptoms.includes(symptom) &&
                      "bg-blue-50 border-blue-200 text-blue-700"
                  )}
                >
                  {symptom}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CategorizedSymptoms;
