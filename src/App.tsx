import React from "react";
import { BoardProvider } from "./contexts/BoardContext/BoardContext";
import { KanbanBoard } from "./components/pages/KanbanBoard/KanbanBoard";
import { Analytics } from "@vercel/analytics/react";

export const App: React.FC = () => (
  <BoardProvider>
    <KanbanBoard />
    <Analytics />
  </BoardProvider>
);
