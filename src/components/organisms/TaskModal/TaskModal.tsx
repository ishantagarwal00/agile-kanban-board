import React, { useContext, useState, useEffect } from "react";
import { BoardContext } from "../../../contexts/BoardContext/BoardContext";
import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";
import { TextArea } from "../../atoms/TextArea/TextArea";
import { CommentSection } from "../../organisms/CommentSection/CommentSection";
import "./TaskModal.css";

interface TaskModalProps {
  onRequestDeleteComment: (taskId: string, commentId: string) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  onRequestDeleteComment,
}) => {
  const {
    selectedTask,
    selectTask,
    updateTask,
    taskModalMode,
    setTaskModalMode,
  } = useContext(BoardContext)!;

  const [title, setTitle] = useState(selectedTask?.title || "");
  const [description, setDescription] = useState(
    selectedTask?.description || ""
  );

  useEffect(() => {
    setTitle(selectedTask?.title || "");
    setDescription(selectedTask?.description || "");
  }, [selectedTask]);

  if (!selectedTask) return null;

  const closeModal = () => {
    selectTask(null);
    setTaskModalMode("view");
  };

  const handleSave = () => {
    if (selectedTask) {
      updateTask(selectedTask.id, title.trim(), description.trim());
      selectTask(null);
      setTaskModalMode("view");
    }
  };

  return (
    <div className="modal-backdrop" onClick={closeModal} role="presentation">
      <div
        className={`modal-content modal-content-${taskModalMode}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
        tabIndex={-1}
        onKeyDown={(e) => {
          if (e.key === "Escape") closeModal();
        }}
      >
        <header className="modal-header">
          <span id="task-modal-title" className="modal-title">
            {taskModalMode === "edit" ? "Edit Task" : "Task Details"}
          </span>
          <button
            type="button"
            className="modal-close-btn"
            aria-label="Close modal"
            onClick={closeModal}
          >
            ×
          </button>
        </header>

        <section className="modal-body">
          {taskModalMode === "edit" ? (
            <>
              <Input
                name="task-title"
                value={title}
                onChange={setTitle}
                placeholder="Task title"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Escape") closeModal();
                }}
                aria-label="Task title"
                className="task-input"
              />
              <TextArea
                value={description}
                onChange={setDescription}
                placeholder="Task description"
                aria-label="Task description"
                className="task-textarea"
                rows={3}
              />
            </>
          ) : (
            <>
              <div className="task-details-header">
                <div>
                  <div className="task-details-title">{selectedTask.title}</div>
                  <div className="task-details-desc">
                    <div className="task-details-desc" aria-live="polite">
                      {selectedTask.description ? (
                        selectedTask.description
                      ) : (
                        <em className="no-description-label">No description</em>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="button"
                  onClick={() => setTaskModalMode("edit")}
                  aria-label="Edit this task"
                >
                  Edit
                </Button>
              </div>
              <div className="comments-label">Comments</div>
              <CommentSection
                taskId={selectedTask.id}
                onRequestDeleteComment={onRequestDeleteComment}
              />
            </>
          )}
        </section>

        {taskModalMode === "edit" && (
          <footer className="modal-footer">
            <Button onClick={closeModal} aria-label="Close modal">
              Close
            </Button>
            <Button onClick={handleSave} aria-label="Save task changes">
              Save
            </Button>
          </footer>
        )}
      </div>
    </div>
  );
};
