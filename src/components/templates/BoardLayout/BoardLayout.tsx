import React, { useContext, useState } from "react";
import { BoardContext } from "../../../contexts/BoardContext/BoardContext";
import { Column as ColumnOrganism } from "../../organisms/Column/Column";
import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";
import { Typography } from "../../atoms/Typography/Typography";
import { TaskModal } from "../../organisms/TaskModal/TaskModal";
import "./BoardLayout.css";

export const BoardLayout: React.FC = () => {
  const { columns, addColumn } = useContext(BoardContext)!;
  const [newColTitle, setNewColTitle] = useState("");

  const handleAddColumn = () => {
    if (newColTitle.trim()) {
      addColumn(newColTitle.trim());
      setNewColTitle("");
    }
  };

  return (
    <>
      <div className="board-container">
        <div className="board-header">
          <Typography variant="h2" className="board-title">
            Kanban Board
          </Typography>
          <Typography variant="body" className="board-subtitle">
            Organize your tasks efficiently
          </Typography>
        </div>

        <div className="columns-wrapper">
          {columns.map((col) => (
            <ColumnOrganism key={col.id} column={col} />
          ))}
          <div className="add-column">
            <Input
              value={newColTitle}
              onChange={setNewColTitle}
              placeholder="Enter column title..."
            />
            <Button onClick={handleAddColumn}>Add Column</Button>
          </div>
        </div>
      </div>

      <TaskModal />
    </>
  );
};
