import React, { useContext, useCallback } from "react";
import { Task } from "../../../types";
import { BoardContext } from "../../../contexts/BoardContext/BoardContext";
import { Typography } from "../../atoms/Typography/Typography";
import { Icon } from "../../atoms/Icon/Icon";
import "./TaskCard.css";

interface TaskCardProps {
  task: Task;
  columnId: string;
  onRequestDelete?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  columnId,
  onRequestDelete,
}) => {
  const { draggedTask, setDraggedTask, openTaskModal } =
    useContext(BoardContext)!;
  const isDragging = draggedTask?.taskId === task.id;

  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      setDraggedTask(task.id, columnId);
      e.dataTransfer.effectAllowed = "move";
    },
    [task.id, columnId, setDraggedTask]
  );

  let createdAtDate = new Date(task.createdAt);
  if (isNaN(createdAtDate.getTime())) {
    createdAtDate = new Date();
  }

  return (
    <div
      className={`task-card ${isDragging ? "task-card--dragging" : ""}`}
      draggable
      onDragStart={handleDragStart}
      onClick={() => openTaskModal(task, "view")}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") openTaskModal(task, "view");
      }}
      role="button"
      aria-pressed={isDragging}
    >
      <div className="task-card-header">
        <Typography variant="body" className="task-title">
          {task.title}
        </Typography>
        <div className="task-actions" aria-label="Task actions">
          <button
            type="button"
            className="icon-wrapper"
            aria-label="Edit task"
            onClick={(e) => {
              e.stopPropagation();
              openTaskModal(task, "edit");
            }}
          >
            <Icon name="edit" />
          </button>
          {onRequestDelete && (
            <button
              type="button"
              className="icon-wrapper"
              aria-label="Delete task"
              onClick={(e) => {
                e.stopPropagation();
                onRequestDelete();
              }}
            >
              <Icon name="delete" />
            </button>
          )}
        </div>
      </div>

      <div className="task-meta">
        <time className="task-date" dateTime={createdAtDate.toISOString()}>
          {isNaN(createdAtDate.getTime())
            ? "?"
            : createdAtDate.toLocaleDateString()}
        </time>
        <div
          className="comment-count"
          aria-label={`${task.comments.length} comments`}
        >
          <Icon name="comment" />
          <span>{task.comments.length}</span>
        </div>
      </div>
    </div>
  );
};
