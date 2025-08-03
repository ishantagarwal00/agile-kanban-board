import React from "react";
import { BoardLayout } from "../../templates/BoardLayout/BoardLayout";
import { ErrorBoundary } from "../../ErrorBoundary";

export const KanbanBoard: React.FC = () => {
  return (
    <>
      <ErrorBoundary>
        <BoardLayout />
      </ErrorBoundary>
    </>
  );
};
