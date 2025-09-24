
import { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import Label from "./Label";
import { CalenderIcon } from "../../icons";
import { FieldError } from "react-hook-form";
import Hook = flatpickr.Options.Hook;
import DateOption = flatpickr.Options.DateOption;

type PropsType = {
  id: string;
  mode?: "single" | "multiple" | "range" | "time";
  onChange?: (value: string) => void; // Handles date changes for RHF
  defaultDate?: DateOption;
  label?: string;
  placeholder?: string;
  error?: FieldError; // Validation error from RHF
  value?: string; // Controlled value from RHF
  errorMessage?: string;
};

export default function DatePicker({
  id,
  mode = "single",
  onChange,
  defaultDate,
  label,
  placeholder,
  error,
  value,
  errorMessage
}: PropsType) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const flatPickr = flatpickr(inputRef.current, {
      mode,
      static: true,
      monthSelectorType: "static",
      dateFormat: "Y-m-d",
      defaultDate: value || defaultDate,
      onChange: (selectedDates, dateStr) => {
        if (onChange) onChange(dateStr || "");
      },
    });

    return () => {
      if (!Array.isArray(flatPickr)) {
        flatPickr.destroy();
      }
    };
  }, [mode, defaultDate, value, onChange]);

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        <input
          id={id}
          ref={inputRef}
          placeholder={placeholder || "Select a date"}
          value={value || ""}
          readOnly
          className={`h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 
            dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent 
            ${error ? "border-red-500 focus:ring-red-500/20" : "border-gray-300 focus:border-brand-300 focus:ring-brand-500/20"} 
            dark:border-gray-700 dark:focus:border-brand-800`}
        />
        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-[25px] dark:text-gray-400">
          <CalenderIcon className="size-6" />
        </span>
 
          {error && !errorMessage && (
            <p className="mt-1 text-xs text-red-500">
              {error.message}
            </p>
          )}
      </div>

     
    </div>
  );
}
