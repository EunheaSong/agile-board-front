import React from "react";
import { RichTextEditor } from "./RichTextEditor";

interface TextEditorProps {
  placeholder?: string;
  className?: string;
  onChange?: (content: string) => void;
  initialValue?: string;
}

export const TextEditor: React.FC<TextEditorProps> = ({
  placeholder = "텍스트를 입력하세요...",
  className = "",
  onChange,
  initialValue = "",
}) => {
  return (
    <div className={`rich-text-editor ${className}`}>
      <RichTextEditor
        placeholder={placeholder}
        onChange={onChange}
        initialValue={initialValue}
      />
    </div>
  );
};

export default TextEditor;
