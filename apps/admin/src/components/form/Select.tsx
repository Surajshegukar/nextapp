
import React from "react";
import ReactSelect, { Props as RSProps } from "react-select";
import { FieldError } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  value?: string; // controlled value from React Hook Form
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  error?: FieldError | boolean;
  errorMessage?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  value,
  onChange,
  className = "",
  disabled = false,
  error = false,
  errorMessage,
}) => {
  // Find the selected option object from value
  const selectedOption = options.find((opt) => opt.value === value) || null;

  return (
    <div className={`${className}`}>
      <ReactSelect
        options={options}
        value={selectedOption}
        onChange={(selected) => {
          if (selected) onChange(selected.value);
          else onChange("");
        }}
        isDisabled={disabled}
        placeholder={placeholder}
        classNames={{
          control: (state) =>
            `h-11 rounded-lg border px-3 py-1.5 text-sm shadow-theme-xs ${
              error ? "border-red-500" : "border-gray-300"
            } focus-within:ring-2 focus-within:ring-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90`,
          placeholder: () => "text-gray-400 dark:text-gray-400",
          singleValue: () => "text-gray-800 dark:text-white/90",
          menu: () =>
            "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow-lg",
          option: (state) =>
            `cursor-pointer px-3 py-2 ${
              state.isFocused ? "bg-gray-100 dark:bg-gray-800" : ""
            } text-gray-800 dark:text-white/90`,
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 8,
          colors: {
            ...theme.colors,
            primary25: "#f3f4f6",
            primary: "#3b82f6",
          },
        })}
      />
      {errorMessage && (
        <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default Select;
