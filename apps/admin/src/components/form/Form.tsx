import React, { FC, ReactNode, FormEvent } from "react";

interface FormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  className?: string;
  isSubmitting?: boolean;
  submitButtonText?: string;
  submitButtonClassName?: string;
  submitButtonLoadingText?: string;
  formLayout?: "vertical" | "horizontal";
  message?: { type: "success" | "error"; text: string };
}

const Form: FC<FormProps> = ({
  onSubmit,
  children,
  className,
  isSubmitting,
  message,
  submitButtonText,
  submitButtonClassName,
  submitButtonLoadingText,
  formLayout,
}) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {formLayout === "horizontal" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {children}
        </div>
      ) : (
        <div className="flex flex-col space-y-6">{children}</div>
      )}
      {message && (
        <div
          className={`mt-4 text-sm ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </div>
      )}
      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 ${submitButtonClassName}`}
        >
          {isSubmitting
            ? submitButtonLoadingText || "Submitting..."
            : submitButtonText || "Submit"}
        </button>
      </div>
    </form>
  );
};
export default Form;