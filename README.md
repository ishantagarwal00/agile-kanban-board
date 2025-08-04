# Agile Kanban Board

**Mini Kanban board application built with React and TypeScript**. Manage tasks across dynamic columns, view details with comments, and drag-and-drop between stages. Data persists via localStorage.

---

## Table of Contents  
- [Demo](#demo)  
- [Features](#features)  
- [Built With](#built-with)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
- [Usage](#usage)  
- [Project Structure](#project-structure)  
- [State Management](#state-management)  
- [Styling](#styling)  
- [LocalStorage Persistence](#localstorage-persistence)  
- [Contributing](#contributing)  
- [Future Improvements](#future-improvements)  

---

## Demo  
<img width="1300" height="776" alt="image" src="https://github.com/user-attachments/assets/6983a0c2-0b71-47e6-b453-67b90dbf88c1" />


https://agile-kanban-board.vercel.app/

---

## Features  
- **Dynamic Columns**: Three defaults - To Do, In Progress, Done. Add, rename, delete columns.  
- **Task Cards**: Create, edit (title & description), delete tasks. Title displayed on card.  
- **Task Details & Comments**: Click card to open modal with full info and comment thread (add/edit/delete comments).  
- **Drag & Drop**: Move and reorder tasks  
- **Data Persistence**: Board state stored in `localStorage`, surviving page reloads.  

---

## Built With  
- React (Functional components & Hooks)  
- TypeScript  
- React Context API + `useReducer`  
- CSS

---

## Getting Started  

### Prerequisites  
- Node.js ≥14  
- npm or Yarn  

### Installation  
1. Clone the repo  
   ```bash
   git clone https://github.com/ishantagarwal/agile-kanban-board.git
   cd agile-kanban-board
   ```
2. Install dependencies  
   ```bash
   npm install
   # or
   yarn install
   ```

---

## Usage  
- Start dev server:  
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

## Project Structure  
```
src/
├── components/
│   ├── atoms/
│   │   └── Button/
│   │   └── Icon/
│   │   └── Input/
│   │   └── TextArea/
│   │   └── Typography/
│   ├── molecules/
│   │   └── ColumnHeader/
│   │   └── TaskCard/
│   │   └── templates/
│   │   └── templates/
│   ├── organisms/
│   │   └── AddColumnCard/
│   │   └── Column/
│   │   └── CommentSection/
│   │   └── ConfirmationModal/
│   │   └── TaskModal/
|   |── pages
│   │   └── KanbanBoard/
│   └── templates/
│       └── BoardLayout/
├── context/
│   └── BoardContext/
├── hooks/
├── styles/
│   └── globals.css/
│   └── variables.css/
├── types/
├── utils/
└── App.tsx
```

---

## State Management  
Global board state (columns, tasks, comments) managed via React Context + `useReducer`. Actions include:  
- `ADD_COLUMN`, `RENAME_COLUMN`, `DELETE_COLUMN`  
- `ADD_TASK`, `EDIT_TASK`, `DELETE_TASK`  
- `ADD_COMMENT`, `EDIT_COMMENT`, `DELETE_COMMENT`  
- `MOVE_TASK`, `REORDER_TASKS`  

---

## Styling  
CSS styles per component for maintainability. Follows BEM-like conventions for class naming.  

---

## LocalStorage Persistence  
Utility functions abstract CRUD operations to save and load board state as JSON in `localStorage`. State initializes from storage on app load, then updates on each dispatch.  

---

## Contributing  
Contributions welcome!  
1. Fork the repository  
2. Create a feature branch (`git checkout -b feature/YourFeature`)  
3. Commit your changes (`git commit -m "Add your feature"`)  
4. Push to branch (`git push origin feature/YourFeature`)  
5. Open a Pull Request  

---

## Future Improvements  
- **Reddit-style nested comments**
- **Backend integration** for multi-user real-time sync  

---
