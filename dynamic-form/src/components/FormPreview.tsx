import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormPreviewProps {
  schema: any;
}

const FormPreview: React.FC<FormPreviewProps> = ({ schema }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  React.useEffect(() => {
    if (schema?.fields) {
      schema.fields.forEach((field: any) => {
        if (field.defaultValue !== undefined) {
          setValue(field.id, field.defaultValue);
        }
      });
    }
  }, [schema, setValue]);

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("Submitted Data:", data);
    alert("Form submitted successfully!");
  };

  // Handle downloading form submissions as JSON
  const handleDownloadFormData = () => {
    const formData = getValues(); 
    const blob = new Blob([JSON.stringify(formData)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "form-submissions.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!schema || !schema.fields) {
    return <p>Invalid JSON schema. Please correct the errors in the editor.</p>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">{schema.formTitle}</h2>
      <p className="mb-4">{schema.formDescription}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {schema.fields.map((field: any) => (
          <div key={field.id} className="flex flex-col">
            <label className="font-medium">{field.label}</label>

            {field.type === "text" && (
              <input
                type="text"
                placeholder={field.placeholder}
                {...register(field.id, { required: field.required })}
                className="border px-2 py-1"
              />
            )}

            {field.type === "email" && (
              <input
                type="email"
                placeholder={field.placeholder}
                {...register(field.id, {
                  required: field.required,
                  pattern: {
                    value: new RegExp(field.validation?.pattern || ".*"),
                    message: field.validation?.message || "Invalid email address",
                  },
                })}
                className="border px-2 py-1"
              />
            )}

            {field.type === "select" && (
              <select
                {...register(field.id, { required: field.required })}
                className="border px-2 py-1"
              >
                {field.options.map((option: any) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}

            {field.type === "checkbox" && (
              <input
                type="checkbox"
                {...register(field.id, { required: field.required })}
                className="border px-2 py-1"
              />
            )}

            {field.type === "textarea" && (
              <textarea
                placeholder={field.placeholder}
                {...register(field.id, { required: field.required })}
                className="border px-2 py-1"
              />
            )}

            {errors[field.id] && (
              <p className="text-red-500 text-sm">
                {errors[field.id]?.message &&
                typeof errors[field.id]?.message === "string"
                  ? (errors[field.id]?.message as string)
                  : "This field is required"}
              </p>
            )}
          </div>
        ))}

        <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded">
          Submit
        </button>
        <button
          type="button"
          onClick={handleDownloadFormData}
          className="bg-pink-500 text-white px-4 py-2 rounded ml-2"
        >
          Download Data JSON
        </button>
      </form>
    </div>
  );
};

export default FormPreview;
