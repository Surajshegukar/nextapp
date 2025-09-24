import React from "react";

interface TextareaProps {
  id?: string;
  name?: string;
  label?: string;            // Optional label
  placeholder?: string;      // Placeholder text
  rows?: number;             // Number of rows
  value?: string;            // Current value
  onChange?: (value: string) => void; // Change handler
  className?: string;        // Additional CSS classes
  disabled?: boolean;        // Disabled state
  error?: boolean;           // Error state
  hint?: string;             // Hint or error text
  errorMessage?: string;    // Validation error message
}

const TextArea: React.FC<TextareaProps> = ({
  id,
  name,
  label,
  placeholder = "Enter your message",
  rows = 3,
  value = "",
  onChange,
  className = "",
  disabled = false,
  error = false,
  hint = "",
  errorMessage,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  // Base styles
  const baseClasses = `
    w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden
    transition-colors dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30
    ${error ? "border-error-500 focus:ring-3 focus:ring-error-500/10" : "border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10"}
    ${disabled ? "bg-gray-100 opacity-50 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400" : ""}
    ${className}
  `;

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id} className="mb-1 text-sm font-medium">
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={baseClasses}
        
      />
      {errorMessage && (
        <p className={`mt-1 text-xs ${error ? "text-error-500" : "text-gray-500 dark:text-gray-400"}`}>
          {errorMessage}
        </p>

      )}
      {!errorMessage && hint && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{hint}</p>
      )}
    </div>
  );
};

export default TextArea;
