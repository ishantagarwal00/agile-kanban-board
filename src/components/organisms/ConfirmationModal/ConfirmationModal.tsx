import React from "react";
import { Typography } from "../../atoms/Typography/Typography";
import { Button } from "../../atoms/Button/Button";
import "./ConfirmationModal.css";

interface ConfirmationModalProps {
  open: boolean;
  title: string;
  description?: string | React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onCancel();
  };

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div
        className="confirm-modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        onKeyDown={handleKeyDown}
      >
        <Typography variant="h3" className="modal-title">
          {title}
        </Typography>
        <div className="modal-body">
          {typeof description === "string" ? (
            <Typography variant="body">{description}</Typography>
          ) : (
            description
          )}
        </div>
        <footer className="modal-footer">
          <Button onClick={onCancel}>{cancelLabel}</Button>
          <Button className="btn-danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </footer>
      </div>
    </div>
  );
};
