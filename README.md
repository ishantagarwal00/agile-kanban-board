# Agile Kanban Board

**Mini Kanban board application built with React and TypeScript**. Manage tasks across dynamic columns, view details with comments, and drag-and-drop between stages. Data persists via localStorage.

**Live demo:** [agile-kanban-board.vercel.app](https://agile-kanban-board.vercel.app/)

---

## Features

- **Dynamic Columns**: Three defaults - To Do, In Progress, Done. Add, rename, delete columns.
- **Task Cards**: Create, edit (title & description), delete tasks. Title displayed on card.
- **Task Details & Comments**: Click card to open modal with full info and comment thread (add/edit/delete comments).
- **Drag & Drop**: Move and reorder tasks
- **Data Persistence**: Board state stored in `localStorage`, surviving page reloads.

---

## Demo

<img width="1300" height="776" alt="image" src="https://github.com/user-attachments/assets/6983a0c2-0b71-47e6-b453-67b90dbf88c1" />

---

## Architecture

### Client

- React with functional components and hooks.
- TypeScript throughout.
- Global state via React Context API + `useReducer`.

### State Management

Global board state (columns, tasks, comments) is managed via React Context + `useReducer`. Actions include:

- `ADD_COLUMN`, `RENAME_COLUMN`, `DELETE_COLUMN`
- `ADD_TASK`, `EDIT_TASK`, `DELETE_TASK`
- `ADD_COMMENT`, `EDIT_COMMENT`, `DELETE_COMMENT`
- `MOVE_TASK`, `REORDER_TASKS`

### Persistence

Utility functions abstract CRUD operations to save and load board state as JSON in `localStorage`. State initializes from storage on app load, then updates on each dispatch.

### Styling

CSS styles per component for maintainability. Follows BEM-like conventions for class naming.

### Project Structure

```
src/
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   ├── Icon/
│   │   ├── Input/
│   │   ├── TextArea/
│   │   └── Typography/
│   ├── molecules/
│   │   ├── ColumnHeader/
│   │   ├── TaskCard/
│   │   └── templates/
│   ├── organisms/
│   │   ├── AddColumnCard/
│   │   ├── Column/
│   │   ├── CommentSection/
│   │   ├── ConfirmationModal/
│   │   └── TaskModal/
│   ├── pages/
│   │   └── KanbanBoard/
│   └── templates/
│       └── BoardLayout/
├── context/
│   └── BoardContext/
├── hooks/
├── styles/
│   ├── globals.css
│   └── variables.css
├── types/
├── utils/
└── App.tsx
```

---

## How to Run

### Prerequisites

- Node.js >=14
- npm or Yarn

### Installation

1. Clone the repo

   ```bash
   git clone https://github.com/ishantagarwal00/agile-kanban-board.git
   cd agile-kanban-board
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

### Usage

- Start the dev server:

  ```bash
  npm start
  # or
  yarn start
  ```

- Open `http://localhost:3000` in your browser.
- Build for production:

  ```bash
  npm run build
  ```

---

## Notes

- There is no backend yet — data lives only in the browser via `localStorage`.
- No user accounts or real-time multi-user sync yet.

---

## Future Improvements

- **Reddit-style nested comments**
- **Backend integration** for multi-user real-time sync

---
