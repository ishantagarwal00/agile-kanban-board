// src/components/TaskCard/TaskCard.tsx
import React, { useContext, useCallback } from "react";
import { Task } from "../../../types";
import { BoardContext } from "../../../contexts/BoardContext/BoardContext";
import { Typography } from "../../atoms/Typography/Typography";
import { Icon } from "../../atoms/Icon/Icon";
import "./TaskCard.css";

interface TaskCardProps {
  task: Task;
  columnId: string;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, columnId }) => {
  const { selectTask, draggedTask, setDraggedTask } = useContext(BoardContext)!;
  const isDragging = draggedTask?.taskId === task.id;

  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      setDraggedTask(task.id, columnId);
      e.dataTransfer.effectAllowed = "move";
    },
    [task.id, columnId, setDraggedTask]
  );

  const handleClick = useCallback(() => selectTask(task), [selectTask, task]);

  return (
    <div
      className={`task-card ${isDragging ? "task-card--dragging" : ""}`}
      draggable
      onDragStart={handleDragStart}
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
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
              selectTask(task);
            }}
          >
            <Icon name="edit" />
          </button>
        </div>
      </div>

      <div className="task-meta">
        <time className="task-date">
          {new Date(task.createdAt).toLocaleDateString()}
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
