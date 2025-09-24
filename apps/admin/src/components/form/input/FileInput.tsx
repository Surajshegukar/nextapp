import React, { FC } from "react";

interface FileInputProps {
  id?: string;
  name?: string;
  label?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;       // For error border styling
  hint?: string;         // Optional hint or error message
  disabled?: boolean;
  errorMessage?: string; // Validation error message
}

const FileInput: FC<FileInputProps> = ({
  id,
  name,
  label,
  className = "",
  onChange,
  error = false,
  hint,
  disabled = false,
  errorMessage,
}) => {
  // Base styles
  const baseClasses = `
    h-11 w-full overflow-hidden rounded-lg border bg-transparent text-sm shadow-theme-xs
    transition-colors file:mr-5 file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid
    file:border-gray-200 file:bg-gray-50 file:py-3 file:pl-3.5 file:pr-3 file:text-sm file:text-gray-700
    placeholder:text-gray-400 hover:file:bg-gray-100 focus:outline-hidden
    dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:file:border-gray-800 dark:file:bg-white/[0.03]
    dark:file:text-gray-400 dark:placeholder:text-gray-400
    ${error ? "border-error-500 focus:ring-error-500/10" : "border-gray-300 focus:border-brand-300 focus:ring-brand-500/10"}
    ${disabled ? "cursor-not-allowed opacity-60" : ""}
    ${className}
  `;

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id} className="mb-1 text-sm font-medium">
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type="file"
        className={baseClasses}
        onChange={onChange}
        disabled={disabled}
      />
      {hint && (
        <p className={`mt-1 text-xs ${error ? "text-error-500" : "text-gray-500"}`}>
          {hint}
        </p>
      )}
      {errorMessage && (
        <p className="mt-1 text-xs text-error-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default FileInput;
