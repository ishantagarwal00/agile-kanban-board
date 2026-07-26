# GEMINI.md

This file provides context and guidelines for interacting with the **Agile Kanban Board** project.

## Project Overview
A collaborative-ready, client-side Kanban board application built with **React 19**, **TypeScript**, and **CSS**. It features dynamic columns, task management, detail modals with comments, and drag-and-drop capabilities. State is managed via the **React Context API** and `useReducer`, with persistence in `localStorage`.

### Tech Stack
- **Framework:** React 19 (Functional components, Hooks)
- **Language:** TypeScript 4.9+
- **Styling:** CSS (per-component styles + global variables)
- **State Management:** Context API + `useReducer`
- **Analytics:** Vercel Analytics
- **Build Tool:** Create React App (`react-scripts`)

## Directory Structure
The project follows an **Atomic Design** pattern for components:
- `src/components/atoms/`: Smallest functional units (Buttons, Icons, Inputs, etc.)
- `src/components/molecules/`: Groups of atoms (TaskCard, ColumnHeader)
- `src/components/organisms/`: Complex UI sections (Column, TaskModal, CommentSection)
- `src/components/pages/`: Full screen views (KanbanBoard)
- `src/components/templates/`: Page layouts (BoardLayout)
- `src/contexts/BoardContext/`: Core business logic and state orchestration.
- `src/types/`: Centralized TypeScript interfaces for data models.
- `src/styles/`: Global styles and CSS variables.

## Building and Running
The project uses standard `npm` scripts:
- **Start:** `npm start` (Runs the app in development mode at `http://localhost:3000`)
- **Build:** `npm run build` (Builds the app for production to the `build` folder)
- **Test:** `npm test` (Launches the test runner in interactive watch mode)
- **Lint:** `npm run lint` (Checks for linting errors using ESLint)

## Development Conventions
- **Component Design:** Adhere to Atomic Design. Place CSS files alongside their respective components (e.g., `Button.tsx` and `Button.css`).
- **State Management:** All board-wide state changes (columns, tasks, comments, drag-and-drop) MUST go through `BoardContext`. Avoid local state for data that should persist or be shared across the board.
- **Styling:** Use CSS variables defined in `src/styles/variables.css` for colors, spacing, and transitions to ensure UI consistency. Follow BEM-like naming for component classes.
- **Persistence:** Board state is automatically synced to `localStorage` via an effect in `BoardProvider`. If adding new data types, update the `getInitialBoardState` initializer and the `BoardAction` type.
- **TypeScript:** Use strict typing. Avoid `any`. Interfaces for all major data models are located in `src/types/index.ts`.
- **Validation:** Always verify changes by running `npm test` and ensuring `npm run lint` passes.

## Key Files
- `src/contexts/BoardContext/BoardContext.tsx`: The heart of the application. Contains the reducer logic for all board operations.
- `src/types/index.ts`: The source of truth for all data structures (Column, Task, Comment).
- `src/components/pages/KanbanBoard/KanbanBoard.tsx`: The main entry point for the UI.
- `src/styles/variables.css`: Central repository for design tokens.
