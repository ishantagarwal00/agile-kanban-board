export interface Comment {
  id: string;
  content: string;
  timestamp: Date;
  replies?: Comment[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
  order: number;
  color?: string;
}

export interface Board {
  id: string;
  title: string;
  columns: Column[];
}

export interface BoardState {
  board: Board;
  selectedTask: Task | null;
  isTaskModalOpen: boolean;
  draggedTask: Task | null;
  draggedColumn: Column | null;
}

export type BoardAction =
  | { type: "INIT"; payload: Column[] }
  | { type: "ADD_COLUMN"; payload: { title: string } }
  | { type: "RENAME_COLUMN"; payload: { columnId: string; title: string } }
  | { type: "DELETE_COLUMN"; payload: { columnId: string } }
  | { type: "ADD_TASK"; payload: { columnId: string; title: string } }
  | { type: "SELECT_TASK"; payload: Task | null }
  | {
      type: "UPDATE_TASK";
      payload: { taskId: string; title: string; description: string };
    }
  | { type: "ADD_COMMENT"; payload: { taskId: string; content: string } }
  | {
      type: "SET_DRAGGED_TASK";
      payload: { taskId: string; fromColumnId: string } | null;
    }
  | {
      type: "MOVE_TASK";
      payload: {
        taskId: string;
        fromColumnId: string;
        toColumnId: string;
        toIndex?: number;
      };
    }
  | {
      type: "REORDER_TASKS";
      payload: { columnId: string; fromIndex: number; toIndex: number };
    };
