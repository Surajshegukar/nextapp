// components/form/TextEditorInput.jsx
"use client";

import dynamic from "next/dynamic";
import React, { useRef } from "react";
// import JoditEditor from "jodit-react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface TextEditorInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: { message: string };
}

const TextEditorInput: React.FC<TextEditorInputProps> = ({ value, onChange, error }) => {
  const editor = useRef(null);

  return (
    <div className="flex flex-col">
      <JoditEditor
        ref={editor}
        value={value}
        config={{
          readonly: false,
          toolbarButtonSize: "small",
          height: 300,
        }}
      onBlur={(content: string) => onChange(content)}
      />
      {error && <p className="text-red-500 mt-1 text-xs">{error.message}</p>}
    </div>
  );
};

export default TextEditorInput;
