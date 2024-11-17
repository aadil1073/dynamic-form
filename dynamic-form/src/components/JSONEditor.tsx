import React from "react";
import MonacoEditor from "@monaco-editor/react";

interface JSONEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ value, onChange }) => {
  const handleEditorChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      onChange(newValue);
    }
  };

  // Handle copying the form JSON to the clipboard
  const handleCopyFormJson = () => {
    navigator.clipboard.writeText(value).then(
      () => {
        alert("JSON copied to clipboard!");
      },
      (err) => {
        alert("Failed to copy Form JSON: " + err);
      }
    );
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleCopyFormJson}
          className="bg-purple-500 text-black px-4 py-2 rounded"
        >
          Copy
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-2">JSON Editor</h2>
      <MonacoEditor
        height="90vh"
        defaultLanguage="json"
        value={value}
        onChange={handleEditorChange}
        theme="vs-dark"
      />
    </div>
  );
};

export default JSONEditor;
