import React, { useContext, useState, useEffect } from "react";
import { BoardContext } from "../../../contexts/BoardContext/BoardContext";
import { Button } from "../../atoms/Button/Button";
import { CommentSection } from "../../organisms/CommentSection/CommentSection";
import "./TaskModal.css";

export const TaskModal: React.FC = () => {
  const { selectedTask, selectTask, updateTask } = useContext(BoardContext)!;

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
  };

  const handleSave = () => {
    if (selectedTask) {
      updateTask(selectedTask.id, title.trim(), description.trim());
      selectTask(null);
    }
  };

  return (
    <div className="modal-backdrop" onClick={closeModal} role="presentation">
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
      >
        <div className="modal-upper-wrapper">
          <header className="modal-header">
            <span id="task-modal-title" className="modal-title">
              Edit Task
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
            <input
              name="task-title"
              className="task-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              autoFocus
            />
            <textarea
              className="task-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
              rows={3}
            />

            <div className="comments-label">Comments</div>
            <CommentSection taskId={selectedTask.id} />
          </section>
        </div>
        <div className="modal-lower-wrapper">
          <footer className="modal-footer">
            <Button onClick={closeModal}>Close</Button>
            <Button onClick={handleSave}>Save</Button>
          </footer>
        </div>
      </div>
    </div>
  );
};
