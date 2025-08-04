import React, { useContext, useState, useMemo } from "react";
import { BoardContext } from "../../../contexts/BoardContext/BoardContext";
import { Column as ColumnOrganism } from "../../organisms/Column/Column";
import { Typography } from "../../atoms/Typography/Typography";
import { TaskModal } from "../../organisms/TaskModal/TaskModal";
import { AddColumnCard } from "../../organisms/AddColumnCard/AddColumnCard";
import { ConfirmationModal } from "../../organisms/ConfirmationModal/ConfirmationModal";
import { DeleteTarget } from "../../../types";
import "./BoardLayout.css";

const deleteModalContentMap = {
  column: {
    title: "Are you sure you want to delete this column?",
    desc: "This action cannot be undone.",
  },
  task: {
    title: "Are you sure you want to delete this task?",
    desc: "This action cannot be undone.",
  },
  comment: {
    title: "DAre you sure you want to delete this comment?",
    desc: "This action cannot be undone.",
  },
};

export const BoardLayout: React.FC = () => {
  const { columns, deleteColumn, deleteTask, deleteComment } =
    useContext(BoardContext)!;

  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);
  const handleOpenDelete = (target: DeleteTarget) => setDeleteTarget(target);
  const handleCloseDelete = () => setDeleteTarget(null);

  const content = useMemo(() => {
    if (!deleteTarget) return { title: "", desc: "" };
    return deleteModalContentMap[deleteTarget.type] || { title: "", desc: "" };
  }, [deleteTarget]);

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === "column") {
      deleteColumn(deleteTarget.columnId);
    } else if (deleteTarget.type === "task") {
      deleteTask(deleteTarget.taskId, deleteTarget.columnId);
    } else if (deleteTarget.type === "comment") {
      deleteComment(deleteTarget.taskId, deleteTarget.commentId);
    }
    setDeleteTarget(null);
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
            <ColumnOrganism
              key={col.id}
              column={col}
              onRequestDelete={() =>
                handleOpenDelete({ type: "column", columnId: col.id })
              }
              onRequestDeleteTask={(taskId: string) =>
                handleOpenDelete({ type: "task", columnId: col.id, taskId })
              }
            />
          ))}
          <AddColumnCard />
        </div>
      </div>
      <TaskModal
        onRequestDeleteComment={(taskId: string, commentId: string) =>
          handleOpenDelete({ type: "comment", taskId, commentId })
        }
      />
      <ConfirmationModal
        open={!!deleteTarget}
        title={content.title}
        description={content.desc}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDelete}
      />
    </>
  );
};
