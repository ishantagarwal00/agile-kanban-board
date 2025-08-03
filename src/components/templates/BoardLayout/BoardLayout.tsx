import React, { useContext } from "react";
import { BoardContext } from "../../../contexts/BoardContext/BoardContext";
import { Column as ColumnOrganism } from "../../organisms/Column/Column";
import { Typography } from "../../atoms/Typography/Typography";
import { TaskModal } from "../../organisms/TaskModal/TaskModal";
import "./BoardLayout.css";
import { AddColumnCard } from "../../organisms/AddColumnCard/AddColumnCard";

export const BoardLayout: React.FC = () => {
  const { columns } = useContext(BoardContext)!;

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
          <AddColumnCard />
        </div>
      </div>

      <TaskModal />
    </>
  );
};
