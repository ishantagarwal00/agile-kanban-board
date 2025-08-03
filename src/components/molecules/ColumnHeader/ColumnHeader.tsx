import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { BoardContext } from "../../../contexts/BoardContext/BoardContext";
import { Icon } from "../../atoms/Icon/Icon";
import { Typography } from "../../atoms/Typography/Typography";
import { Input } from "../../atoms/Input/Input";
import { Column } from "../../../types";
import "./ColumnHeader.css";

interface ColumnHeaderProps {
  column: Column;
}

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({ column }) => {
  const { renameColumn, deleteColumn } = useContext(BoardContext)!;
  const [isRenaming, setIsRenaming] = useState(false);
  const [tempTitle, setTempTitle] = useState(column.title);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset tempTitle if column.title changes externally
  useEffect(() => {
    setTempTitle(column.title);
  }, [column.title]);

  // Focus/select when entering rename mode
  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isRenaming]);

  const handleRename = useCallback(() => {
    const trimmed = tempTitle.trim();
    if (trimmed && trimmed !== column.title) {
      renameColumn(column.id, trimmed);
    }
    setIsRenaming(false);
  }, [column.id, column.title, renameColumn, tempTitle]);

  const handleDelete = useCallback(() => {
    if (window.confirm("Delete this column?")) {
      deleteColumn(column.id);
    }
  }, [column.id, deleteColumn]);

  return (
    <div className="column-header">
      <div className="column-title-wrapper">
        {isRenaming ? (
          <Input
            name="column-title"
            ref={inputRef}
            value={tempTitle}
            onChange={setTempTitle}
            className="column-rename-input"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleRename();
              if (e.key === "Escape") setIsRenaming(false);
            }}
            onBlur={handleRename}
          />
        ) : (
          <Typography variant="h3" className="column-title">
            <button
              type="button"
              className="column-title-text"
              onDoubleClick={() => setIsRenaming(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setIsRenaming(true);
              }}
              aria-label="Rename column"
            >
              {column.title}
            </button>
          </Typography>
        )}
        <div className="task-count" aria-label={`${column.tasks.length} tasks`}>
          {column.tasks.length}
        </div>
      </div>
      <div className="column-actions">
        <button
          type="button"
          className="icon-wrapper"
          onClick={() => setIsRenaming(true)}
          aria-label="Rename column"
        >
          <Icon name="edit" />
        </button>
        <button
          type="button"
          className="icon-wrapper"
          onClick={handleDelete}
          aria-label="Delete column"
        >
          <Icon name="delete" />
        </button>
      </div>
    </div>
  );
};
