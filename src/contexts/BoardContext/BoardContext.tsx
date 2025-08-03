import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import { Column, Task, BoardAction } from "./../../types/index";
import { COLUMN_COLORS } from "../../utils/colors";
interface BoardState {
  columns: Column[];
  selectedTask: Task | null;
  draggedTask: { taskId: string; fromColumnId: string } | null;
}

const initialColumns: Column[] = [
  { id: "col-1", title: "To Do", tasks: [], order: 1, color: COLUMN_COLORS[0] },
  {
    id: "col-2",
    title: "In Progress",
    tasks: [],
    order: 2,
    color: COLUMN_COLORS[1],
  },
  { id: "col-3", title: "Done", tasks: [], order: 3, color: COLUMN_COLORS[2] },
];

const initialState: BoardState = {
  columns: initialColumns,
  selectedTask: null,
  draggedTask: null,
};

function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case "INIT":
      return { ...state, columns: action.payload };
    case "ADD_COLUMN":
      const color = COLUMN_COLORS[state.columns.length % COLUMN_COLORS.length];
      const newColumn: Column = {
        id: `col-${Date.now()}`,
        title: action.payload.title,
        tasks: [],
        order: state.columns.length + 1,
        color,
      };
      return { ...state, columns: [...state.columns, newColumn] };
    case "RENAME_COLUMN":
      return {
        ...state,
        columns: state.columns.map((col) =>
          col.id === action.payload.columnId
            ? { ...col, title: action.payload.title }
            : col
        ),
      };
    case "DELETE_COLUMN":
      return {
        ...state,
        columns: state.columns.filter(
          (col) => col.id !== action.payload.columnId
        ),
      };
    case "ADD_TASK":
      return {
        ...state,
        columns: state.columns.map((col) =>
          col.id === action.payload.columnId
            ? {
                ...col,
                tasks: [
                  ...col.tasks,
                  {
                    id: `task-${Date.now()}`,
                    title: action.payload.title,
                    description: "",
                    comments: [],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  },
                ],
              }
            : col
        ),
      };
    case "SELECT_TASK":
      return { ...state, selectedTask: action.payload };
    case "UPDATE_TASK":
      return {
        ...state,
        columns: state.columns.map((col) => ({
          ...col,
          tasks: col.tasks.map((task) =>
            task.id === action.payload.taskId
              ? {
                  ...task,
                  title: action.payload.title,
                  description: action.payload.description,
                  updatedAt: new Date(),
                }
              : task
          ),
        })),
      };
    case "ADD_COMMENT":
      return {
        ...state,
        columns: state.columns.map((col) => ({
          ...col,
          tasks: col.tasks.map((task) =>
            task.id === action.payload.taskId
              ? {
                  ...task,
                  comments: [
                    ...task.comments,
                    {
                      id: `cmt-${Date.now()}`,
                      content: action.payload.content,
                      timestamp: new Date(),
                    },
                  ],
                }
              : task
          ),
        })),
      };
    case "SET_DRAGGED_TASK":
      return { ...state, draggedTask: action.payload };

    case "MOVE_TASK": {
      const { taskId, fromColumnId, toColumnId, toIndex } = action.payload;

      const sourceColumn = state.columns.find((col) => col.id === fromColumnId);
      if (!sourceColumn) return state;

      const taskToMove = sourceColumn.tasks.find((task) => task.id === taskId);
      if (!taskToMove) return state;

      const newColumns = state.columns.map((col) => {
        if (col.id === fromColumnId) {
          return {
            ...col,
            tasks: col.tasks.filter((task) => task.id !== taskId),
          };
        }
        if (col.id === toColumnId) {
          const newTasks = [...col.tasks];
          const insertIndex = toIndex !== undefined ? toIndex : newTasks.length;
          newTasks.splice(insertIndex, 0, taskToMove);
          return {
            ...col,
            tasks: newTasks,
          };
        }
        return col;
      });

      return {
        ...state,
        columns: newColumns,
        draggedTask: null,
      };
    }

    case "REORDER_TASKS": {
      const { columnId, fromIndex, toIndex } = action.payload;
      return {
        ...state,
        columns: state.columns.map((col) => {
          if (col.id !== columnId) return col;

          const newTasks = [...col.tasks];
          const [movedTask] = newTasks.splice(fromIndex, 1);
          newTasks.splice(toIndex, 0, movedTask);

          return { ...col, tasks: newTasks };
        }),
        draggedTask: null,
      };
    }

    default:
      return state;
  }
}

interface BoardContextProps extends BoardState {
  addColumn: (title: string) => void;
  renameColumn: (columnId: string, title: string) => void;
  deleteColumn: (columnId: string) => void;
  addTask: (columnId: string, title: string) => void;
  selectTask: (task: Task | null) => void;
  addComment: (taskId: string, content: string) => void;
  updateTask: (taskId: string, title: string, description: string) => void;
  setDraggedTask: (taskId: string, fromColumnId: string) => void;
  moveTask: (
    taskId: string,
    fromCol: string,
    toCol: string,
    idx: number
  ) => void;
  reorderTasks: (colId: string, fromIdx: number, toIdx: number) => void;
}

export const BoardContext = createContext<BoardContextProps | undefined>(
  undefined
);

export const BoardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(boardReducer, initialState);

  // Persist to localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("kanban-board");
      if (!raw) return; // nothing to init

      const parsed = JSON.parse(raw);
      // basic validation
      if (!parsed || !Array.isArray(parsed.columns)) throw new Error();

      dispatch({ type: "INIT", payload: parsed.columns });
    } catch {
      console.warn("Invalid or missing board data; using defaults");
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "kanban-board",
        JSON.stringify({ columns: state.columns })
      );
    } catch {
      console.error("Failed to persist board state to localStorage");
    }
  }, [state.columns]);

  const addColumn = (title: string) =>
    dispatch({ type: "ADD_COLUMN", payload: { title } });
  const renameColumn = (columnId: string, title: string) =>
    dispatch({ type: "RENAME_COLUMN", payload: { columnId, title } });
  const deleteColumn = (columnId: string) =>
    dispatch({ type: "DELETE_COLUMN", payload: { columnId } });
  const addTask = (columnId: string, title: string) =>
    dispatch({ type: "ADD_TASK", payload: { columnId, title } });
  const selectTask = (task: Task | null) =>
    dispatch({ type: "SELECT_TASK", payload: task });
  const addComment = (taskId: string, content: string) =>
    dispatch({ type: "ADD_COMMENT", payload: { taskId, content } });
  const updateTask = (taskId: string, title: string, description: string) =>
    dispatch({ type: "UPDATE_TASK", payload: { taskId, title, description } });
  const setDraggedTask = (taskId: string | null, fromColumnId?: string) => {
    if (taskId && fromColumnId) {
      dispatch({ type: "SET_DRAGGED_TASK", payload: { taskId, fromColumnId } });
    } else {
      dispatch({ type: "SET_DRAGGED_TASK", payload: null });
    }
  };

  const moveTask = (
    taskId: string,
    fromColumnId: string,
    toColumnId: string,
    toIndex?: number
  ) => {
    dispatch({
      type: "MOVE_TASK",
      payload: { taskId, fromColumnId, toColumnId, toIndex },
    });
  };

  const reorderTasks = (
    columnId: string,
    fromIndex: number,
    toIndex: number
  ) => {
    dispatch({
      type: "REORDER_TASKS",
      payload: { columnId, fromIndex, toIndex },
    });
  };

  return (
    <BoardContext.Provider
      value={{
        ...state,
        addColumn,
        renameColumn,
        deleteColumn,
        addTask,
        selectTask,
        addComment,
        updateTask,
        setDraggedTask,
        moveTask,
        reorderTasks,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
