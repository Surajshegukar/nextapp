import React, { FC } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  success?: boolean;
  error?: boolean;
  errorMessage?: string; // Validation error message
  hint?: string;         // Optional hint text
  unique?: boolean;      // Indicates the value is unique
}

const Input: FC<InputProps> = ({
  type = "text",
  className = "",
  success = false,
  error = false,
  errorMessage,
  hint,
  unique = false,
  disabled = false,
  ...rest
}) => {
  // Base styles
  let inputClasses =
    "h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30";

  // State-based styles
  if (disabled) {
    inputClasses +=
      " text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
  } else if (error) {
    inputClasses +=
      " border-error-500 focus:ring-error-500/10 dark:border-error-500 dark:text-error-400";
  } else if (success || unique) {
    inputClasses +=
      " border-success-400 focus:ring-success-500/10 dark:border-success-500 dark:text-success-400";
  } else {
    inputClasses +=
      " border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:focus:border-brand-800";
  }

  // Decide which hint to show
  const displayedHint = errorMessage
    ? undefined
    : hint || (unique ? "Name is available" : undefined);

  return (
    <div className="relative">
      <input
        type={type}
        className={`${inputClasses} ${className}`}
        disabled={disabled}
        {...rest}
      />
      {errorMessage ? (
        <p className="mt-1.5 text-xs text-error-500">{errorMessage}</p>
      ) : displayedHint ? (
        <p className="mt-1.5 text-xs text-success-500">{displayedHint}</p>
      ) : null}
    </div>
  );
};

export default Input;
