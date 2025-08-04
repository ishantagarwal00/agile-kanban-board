import React, {
  useState,
  useContext,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { BoardContext } from "../../../contexts/BoardContext/BoardContext";
import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";
import { TextArea } from "../../atoms/TextArea/TextArea";
// import { Icon } from "../../atoms/Icon/Icon";
import { ConfirmationModal } from "../../organisms/ConfirmationModal/ConfirmationModal";
import "./CommentSection.css";

interface CommentSectionProps {
  taskId: string;
  onRequestDeleteComment: (taskId: string, commentId: string) => void;
}

const formatRelativeTime = (date: Date | string) => {
  const now = Date.now();
  const d =
    typeof date === "string" ? new Date(date).getTime() : date.getTime();
  const diff = Math.floor((now - d) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 172800) return "yesterday";
  return new Date(d).toLocaleDateString();
};

export const CommentSection: React.FC<CommentSectionProps> = ({
  taskId,
  onRequestDeleteComment,
}) => {
  const { columns, addComment, editComment, deleteComment } =
    useContext(BoardContext)!;
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const task = useMemo(
    () => columns.flatMap((col) => col.tasks).find((t) => t.id === taskId),
    [columns, taskId]
  );
  const comments = task?.comments ?? [];

  const handleAdd = useCallback(() => {
    const trimmed = input.trim();
    if (trimmed) {
      addComment(taskId, trimmed);
      setInput("");
      inputRef.current?.focus();
    }
  }, [input, addComment, taskId]);

  const handleDelete = () => {
    if (pendingDelete) {
      deleteComment(taskId, pendingDelete);
      setDeletePopupOpen(false);
      setPendingDelete(null);
    }
  };

  const startEdit = (id: string, content: string) => {
    setEditingId(id);
    setEditingValue(content);
  };

  const handleEditSave = () => {
    if (editingId && editingValue.trim()) {
      editComment(taskId, editingId, editingValue.trim());
      setEditingId(null);
      setEditingValue("");
    }
  };

  return (
    <div className="comment-section">
      <div className="comment-input-card">
        <TextArea
          ref={inputRef}
          className="comment-input"
          value={input}
          onChange={setInput}
          placeholder="Write a comment…"
          rows={2}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAdd();
            }
          }}
          aria-label="Write a comment"
        />
        <div className="comment-actions">
          <Button variant="button" onClick={handleAdd} disabled={!input.trim()}>
            Add
          </Button>
        </div>
      </div>
      <div className="comment-list" aria-live="polite">
        {comments.length === 0 ? (
          <div className="comment-empty">No comments yet</div>
        ) : (
          comments.map((c) => (
            <div className="comment-entry" key={c.id}>
              <div className="comment-meta">
                <div className="comment-meta-details">
                  <span className="comment-author">You</span>
                  <span className="comment-time">
                    {formatRelativeTime(c.timestamp)}
                  </span>
                </div>
                <div className="comment-action-wrapper">
                  <Button
                    className="comment-btn"
                    variant="button"
                    onClick={() =>
                      editingId === c.id
                        ? setEditingId(null)
                        : startEdit(c.id, c.content)
                    }
                  >
                    {editingId === c.id ? "Cancel" : "Edit"}
                  </Button>
                  <Button
                    className="comment-btn"
                    variant="button"
                    onClick={() => onRequestDeleteComment(taskId, c.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <div className="comment-body">
                {editingId === c.id ? (
                  <form
                    className="comment-edit-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleEditSave();
                    }}
                  >
                    <Input
                      name="edit-comment-input"
                      value={editingValue}
                      onChange={setEditingValue}
                      autoFocus
                      className="comment-edit-input"
                    />
                    <Button
                      variant="submit"
                      onClick={handleEditSave}
                      disabled={!editingValue.trim()}
                    >
                      Save
                    </Button>
                  </form>
                ) : (
                  c.content
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <ConfirmationModal
        open={deletePopupOpen}
        title="Delete Comment"
        description="Are you sure you want to delete this comment?"
        onCancel={() => setDeletePopupOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};
