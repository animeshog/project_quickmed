import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CategorizedSymptomsProps {
  symptoms: { [category: string]: string[] };
  selectedSymptoms: string[];
  onSymptomToggle: (symptom: string) => void;
}

const CategorizedSymptoms: React.FC<CategorizedSymptomsProps> = ({
  symptoms,
  selectedSymptoms,
  onSymptomToggle,
}) => {
  return (
    <div className="space-y-4">
      {Object.entries(symptoms).map(([category, symptomList]) => (
        <div key={category}>
          <h3 className="text-sm font-medium mb-2">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {symptomList.map((symptom) => (
              <div key={symptom} className="flex items-center space-x-2">
                <Checkbox
                  id={`symptom-${symptom}`}
                  checked={selectedSymptoms.includes(symptom)}
                  onCheckedChange={() => onSymptomToggle(symptom)}
                />
                <Label htmlFor={`symptom-${symptom}`}>{symptom}</Label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorizedSymptoms;
