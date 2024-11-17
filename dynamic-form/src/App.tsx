import React, { useState } from "react";
import JSONEditor from "./components/JSONEditor";
import FormPreview from "./components/FormPreview";
import { useJsonSchema } from "./hooks/useJsonSchema";

const defaultSchema = `{
  "formTitle": "Project Requirements Survey",
  "formDescription": "Please fill out this survey about your project needs",
  "fields": [
    {
      "id": "name",
      "type": "text",
      "label": "Full Name",
      "required": true,
      "placeholder": "Enter your full name"
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "placeholder": "you@example.com",
      "validation": {
        "pattern": "^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$",
        "message": "Please enter a valid email address"
      }
    },
    {
      "id": "companySize",
      "type": "select",
      "label": "Company Size",
      "required": true,
      "options": [
        { "value": "1-50", "label": "1-50 employees" },
        { "value": "51-200", "label": "51-200 employees" },
        { "value": "201-1000", "label": "201-1000 employees" },
        { "value": "1000+", "label": "1000+ employees" }
      ]
    }
  ]
}`;

const App: React.FC = () => {
  const [jsonSchema, setJsonSchema] = useState<string>(defaultSchema);
  const { schema, error } = useJsonSchema(jsonSchema);

  const handleJsonChange = (updatedJson: string) => {
    setJsonSchema(updatedJson);
  };

  // Handle Copy JSON functionality
  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonSchema).then(() => {
      alert("Form JSON copied to clipboard!");
    });
  };

  // Handle Download JSON functionality
  const handleDownloadJson = () => {
    const blob = new Blob([jsonSchema], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "form-schema.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-4 border-r">
        <JSONEditor value={jsonSchema} onChange={handleJsonChange} />
        <button onClick={handleCopyJson} className="btn mt-4">
          Copy Form JSON
        </button>
        <button onClick={handleDownloadJson} className="btn mt-2">
          Download Form JSON
        </button>
      </div>
      <div className="w-1/2 p-4">
        {error && <div className="text-red-500">{error}</div>}
        <FormPreview schema={schema} />
      </div>
    </div>
  );
};

export default App;
