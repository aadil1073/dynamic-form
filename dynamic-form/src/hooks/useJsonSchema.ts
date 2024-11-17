import { useState, useEffect } from "react";

export const useJsonSchema = (json: string) => {
  const [schema, setSchema] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const parsedSchema = JSON.parse(json);
      setSchema(parsedSchema);
      setError(null);
    } catch (e) {
      setError("Invalid JSON schema.");
      setSchema(null);
    }
  }, [json]);

  return { schema, error };
};
