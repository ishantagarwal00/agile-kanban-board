import React, { useRef, useContext, useState } from "react";
import { BoardContext } from "../../../contexts/BoardContext/BoardContext";
import "./AddColumnCard.css";

export const AddColumnCard: React.FC = () => {
  const { addColumn } = useContext(BoardContext)!;
  const [isEditing, setIsEditing] = useState(false);
  const editableRef = useRef<HTMLDivElement>(null);

  const handleStartEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      editableRef.current?.focus();
    }, 0);
  };

  const handleBlur = () => {
    const text = editableRef.current?.innerText.trim();
    if (text) {
      addColumn(text!);
    }
    editableRef.current!.innerText = "";
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      editableRef.current?.blur();
    } else if (e.key === "Escape") {
      e.preventDefault();
      editableRef.current!.innerText = "";
      setIsEditing(false);
    }
  };

  return (
    <div className="column add-column-card">
      <div className="column-header">
        <div
          className={`column-title add-column-title${
            isEditing ? " editing" : ""
          }`}
          contentEditable={isEditing}
          suppressContentEditableWarning
          ref={editableRef}
          tabIndex={0}
          dir="ltr"
          onClick={() => {
            if (!isEditing) handleStartEditing();
          }}
          onFocus={handleStartEditing}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          data-placeholder="+ Add Column"
          aria-label="Column title"
          spellCheck={false}
        >
          {/* Only render text if editing, otherwise leave empty for placeholder */}
        </div>
      </div>
    </div>
  );
};
