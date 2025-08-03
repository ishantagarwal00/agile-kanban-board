import React, {
  useState,
  useContext,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { BoardContext } from "../../../contexts/BoardContext/BoardContext";
import { Button } from "../../atoms/Button/Button";
import "./CommentSection.css";

interface CommentSectionProps {
  taskId: string;
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

export const CommentSection: React.FC<CommentSectionProps> = ({ taskId }) => {
  const { columns, addComment } = useContext(BoardContext)!;
  const [input, setInput] = useState("");
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

  return (
    <div className="comment-section">
      <div className="comment-input-card">
        <textarea
          ref={inputRef}
          className="comment-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
                <span className="comment-author">You</span>
                <span className="comment-time">
                  {formatRelativeTime(c.timestamp)}
                </span>
              </div>
              <div className="comment-body">{c.content}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
