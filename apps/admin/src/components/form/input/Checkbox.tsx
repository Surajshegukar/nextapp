import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";

interface CheckboxProps {
  name: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  control: Control<any>;          // Pass control directly
  errors?: FieldErrors<any>;      // Optional: pass errors
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  className = "",
  disabled = false,
  control,
  errors,
}) => {
  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <label
          className={`flex items-center space-x-3 group cursor-pointer ${
            disabled ? "cursor-not-allowed opacity-60" : ""
          }`}
        >
          <div className="relative w-5 h-5">
            <input
              type="checkbox"
              className={`w-5 h-5 appearance-none cursor-pointer border border-gray-300 rounded-md checked:bg-brand-500 disabled:opacity-60 dark:border-gray-700 ${className}`}
              {...field}
              checked={field.value}
              disabled={disabled}
            />
            {field.value && (
              <svg
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                  stroke="white"
                  strokeWidth="1.94437"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          {label && (
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {label}
            </span>
          )}
          {errorMessage && (
            <p className="text-xs text-error-500 ml-2">{errorMessage}</p>
          )}
        </label>
      )}
    />
  );
};

export default Checkbox;
