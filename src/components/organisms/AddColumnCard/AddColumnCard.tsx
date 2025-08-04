import React, { useRef, useContext, useState, useEffect } from "react";
import { BoardContext } from "../../../contexts/BoardContext/BoardContext";
import "./AddColumnCard.css";

export const AddColumnCard: React.FC = () => {
  const { addColumn } = useContext(BoardContext)!;
  const [isEditing, setIsEditing] = useState(false);
  const editableRef = useRef<HTMLDivElement>(null);
  const [prevText, setPrevText] = useState("");

  useEffect(() => {
    if (isEditing && editableRef.current) {
      editableRef.current.focus();
      setPrevText(editableRef.current.innerText);
    }
  }, [isEditing]);

  const handleStartEditing = () => {
    setIsEditing(true);
  };
  const handleAddColumn = () => {
    const text = editableRef.current?.innerText.trim() || "";
    if (!text) return;
    addColumn(text);
    setIsEditing(false);
    if (editableRef.current) editableRef.current.innerText = "";
  };

  const handleBlur = () => {
    const text = editableRef.current?.innerText.trim() || "";
    if (!text) return;
    if (text) {
      addColumn(text!);
    }
    editableRef.current!.innerText = "";
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (editableRef.current) editableRef.current.innerText = prevText;
    setIsEditing(false);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddColumn();
      editableRef.current?.blur();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
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
          aria-label="Add new column"
          spellCheck={false}
        />
      </div>
    </div>
  );
};
