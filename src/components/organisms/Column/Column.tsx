import React, { useContext, useState, useCallback } from "react";
import { Column as ColumnType } from "../../../types";
import { BoardContext } from "../../../contexts/BoardContext/BoardContext";
import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";
import { Icon } from "../../atoms/Icon/Icon";
import { TaskCard } from "../../molecules/TaskCard/TaskCard";
import { ColumnHeader } from "../../molecules/ColumnHeader/ColumnHeader";
import "./Column.css";

interface ColumnProps {
  column: ColumnType;
  onRequestDelete: () => void;
  onRequestDeleteTask: (taskId: string) => void;
}

export const Column: React.FC<ColumnProps> = ({
  column,
  onRequestDelete,
  onRequestDeleteTask,
}) => {
  const { addTask, draggedTask, moveTask, reorderTasks } =
    useContext(BoardContext)!;
  const [taskTitle, setTaskTitle] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!draggedTask) return;
      const { taskId, fromColumnId } = draggedTask;
      if (fromColumnId !== column.id) {
        moveTask(taskId, fromColumnId, column.id, column.tasks.length);
      }
      setDragOverIndex(null);
    },
    [draggedTask, column.id, column.tasks.length, moveTask]
  );

  const handleTaskDrop = useCallback(
    (e: React.DragEvent, dropIndex: number) => {
      e.preventDefault();
      e.stopPropagation();
      if (!draggedTask) return;
      const { taskId, fromColumnId } = draggedTask;
      if (fromColumnId === column.id) {
        const currentIndex = column.tasks.findIndex((t) => t.id === taskId);
        if (currentIndex !== dropIndex) {
          reorderTasks(column.id, currentIndex, dropIndex);
        }
      } else {
        moveTask(taskId, fromColumnId, column.id, dropIndex);
      }
      setDragOverIndex(null);
    },
    [draggedTask, column.id, column.tasks, moveTask, reorderTasks]
  );

  const handleAddTask = useCallback(() => {
    const trimmed = taskTitle.trim();
    if (!trimmed) return;
    if (
      column.tasks.some((t) => t.title.toLowerCase() === trimmed.toLowerCase())
    ) {
      alert("Task with this title already exists.");
      return;
    }
    if (trimmed) {
      addTask(column.id, trimmed);
      setTaskTitle("");
      setShowAddForm(false);
    }
  }, [taskTitle, column.id, addTask, column.tasks]);

  return (
    <div
      className={`column ${
        draggedTask?.fromColumnId !== column.id ? "column--drag-over" : ""
      }`}
      style={{ background: column.color }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <ColumnHeader column={column} onRequestDelete={onRequestDelete} />
      <div className="tasks-list">
        {column.tasks.map((task, idx) => (
          <div
            key={task.id}
            className={`task-wrapper ${
              dragOverIndex === idx ? "task-wrapper--drag-over" : ""
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOverIndex(idx);
            }}
            onDrop={(e) => handleTaskDrop(e, idx)}
            onDragLeave={() => setDragOverIndex(null)}
          >
            <TaskCard
              task={task}
              columnId={column.id}
              onRequestDelete={() => onRequestDeleteTask(task.id)}
            />
          </div>
        ))}
      </div>

      <div className="add-task">
        {!showAddForm ? (
          <Button
            variant="button"
            className="add-task-btn"
            onClick={() => setShowAddForm(true)}
          >
            <Icon name="plus" />
            Add a task
          </Button>
        ) : (
          <form
            className="add-task-input-wrapper"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddTask();
            }}
          >
            <Input
              name="add-task-input"
              value={taskTitle}
              onChange={setTaskTitle}
              placeholder="Enter task title..."
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Escape") setShowAddForm(false);
              }}
            />
            <div className="add-task-actions">
              <Button variant="submit" className="add-task-submit">
                Add
              </Button>
              <Button
                variant="button"
                className="add-task-cancel"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
