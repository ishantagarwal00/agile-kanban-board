import React, { useContext, useState, useMemo, useEffect } from "react";
import { BoardContext } from "../../../contexts/BoardContext/BoardContext";
import { Column as ColumnOrganism } from "../../organisms/Column/Column";
import { Typography } from "../../atoms/Typography/Typography";
import { TaskModal } from "../../organisms/TaskModal/TaskModal";
import { AddColumnCard } from "../../organisms/AddColumnCard/AddColumnCard";
import { ConfirmationModal } from "../../organisms/ConfirmationModal/ConfirmationModal";
import { DeleteTarget } from "../../../types";
import "./BoardLayout.css";

const deleteModalContentMap = {
  column: { title: "Are you sure you want to delete this column?", desc: "This action cannot be undone." },
  task: { title: "Are you sure you want to delete this task?", desc: "This action cannot be undone." },
  comment: { title: "Are you sure you want to delete this comment?", desc: "This action cannot be undone." },
};

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    setDark(isDark);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("kanban-theme", next ? "dark" : "light");
  };
  useEffect(() => {
    const saved = localStorage.getItem("kanban-theme");
    if (saved) document.documentElement.setAttribute("data-theme", saved);
  }, []);
  return (
    <button onClick={toggle} className="theme-toggle" aria-label="Toggle dark mode">
      {dark ? "☀️" : "🌙"}
    </button>
  );
}

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
    if (deleteTarget.type === "column") deleteColumn(deleteTarget.columnId);
    else if (deleteTarget.type === "task") deleteTask(deleteTarget.taskId, deleteTarget.columnId);
    else if (deleteTarget.type === "comment") deleteComment(deleteTarget.taskId, deleteTarget.commentId);
    setDeleteTarget(null);
  };

  const totalTasks = columns.reduce((sum, c) => sum + c.tasks.length, 0);

  return (
    <>
      <div className="board-container">
        <div className="board-header">
          <div>
            <Typography variant="h2" className="board-title">Kanban Board</Typography>
            <Typography variant="body" className="board-subtitle">
              {columns.length} columns · {totalTasks} task{totalTasks !== 1 ? "s" : ""}
            </Typography>
          </div>
          <ThemeToggle />
        </div>

        <div className="columns-wrapper">
          {columns.map((col) => (
            <ColumnOrganism
              key={col.id}
              column={col}
              onRequestDelete={() => handleOpenDelete({ type: "column", columnId: col.id })}
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
