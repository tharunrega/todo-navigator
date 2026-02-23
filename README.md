# Todo Navigator – Todo Dashboard

Todo Navigator is a small frontend assignment project built for the **RoundTechSquare Frontend Internship – Assignment Round**.  
It implements a clean, responsive todo dashboard using **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **TanStack Query**, consuming the public `jsonplaceholder` todos API.

## Features

- **Todo list from API**
  - Fetches todos from `https://jsonplaceholder.typicode.com/todos`
  - Uses query keys like `["todos", page]` with **TanStack Query**
  - Proper loading and error states

- **Pagination**
  - Shows **10 todos per page**
  - `Previous` / `Next` buttons with disabled states at boundaries
  - Displays current page number
  - Page changes trigger the correct API call through TanStack Query

- **Toggle completed status (UI only)**
  - Each todo has a checkbox to mark it as completed / not completed
  - Toggling updates the UI immediately
  - API data is left unchanged; toggling is handled via local/optimistic state

- **Add new todo (local only)**
  - Input field plus button to add a new todo on the current page
  - New todos are kept only in local state (no backend persistence)

- **UI / UX**
  - Centered, responsive layout
  - Modern UI built with Tailwind and shadcn-style components
  - Clear separation between data hook, components, and routing

## Tech Stack

- **React 18 + TypeScript**
- **Vite** for bundling/dev server
- **TanStack React Query** for data fetching & caching
- **React Router** for basic routing
- **Tailwind CSS** + component primitives

## Project Structure (high level)

- `src/App.tsx` – App shell with `QueryClientProvider`, router, and global UI providers  
- `src/pages/Index.tsx` – Root page that renders the todo dashboard  
- `src/components/TodoDashboard.tsx` – Main dashboard: fetches todos, merges with local state, shows stats, and wires up pagination  
- `src/components/TodoItem.tsx` – Single todo row with completed toggle  
- `src/components/AddTodoForm.tsx` – Input + button for creating a new local todo  
- `src/components/Pagination.tsx` – Pagination controls and current page display  
- `src/hooks/useTodos.ts` – TanStack Query hook that calls the todos API with `?_page=<page>&_limit=10`  
- `src/types/todo.ts` – Shared `Todo` type

## Getting Started

### Prerequisites

- Node.js (LTS) and npm installed

### Installation

```bash
git clone https://github.com/tharunrega/todo-navigator.git
cd todo-navigator
npm install
```

### Running the app locally

```bash
npm run dev
```

Then open the URL printed in the terminal (usually `http://localhost:5173`).

## Deployment

The app can be deployed to any static hosting that supports Vite builds, for example:

- **Vercel**
- **Netlify**
- **GitHub Pages** (using `npm run build` and serving `dist/`)

Build command:

```bash
npm run build
```

The output will be in the `dist` folder.

