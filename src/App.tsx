import React from "react";
import { BoardProvider } from "./contexts/BoardContext/BoardContext";
import { KanbanBoard } from "./components/pages/KanbanBoard/KanbanBoard";

export const App: React.FC = () => (
  <BoardProvider>
    <KanbanBoard />
  </BoardProvider>
);
