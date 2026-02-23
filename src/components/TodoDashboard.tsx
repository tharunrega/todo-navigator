import { useState, useCallback } from "react";
import { Loader2, AlertCircle, ListTodo } from "lucide-react";
import { useTodos, TOTAL_PAGES } from "@/hooks/useTodos";
import type { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";
import AddTodoForm from "./AddTodoForm";
import Pagination from "./Pagination";

const TodoDashboard = () => {
  const [page, setPage] = useState(1);
  const { data: todos, isLoading, isError, error } = useTodos(page);

  // Local additions & toggled states per page
  const [localTodos, setLocalTodos] = useState<Record<number, Todo[]>>({});
  const [toggledIds, setToggledIds] = useState<Set<number>>(new Set());

  const handleToggle = useCallback((id: number) => {
    // For local todos, toggle in localTodos state
    setLocalTodos((prev) => {
      const pageLocals = prev[page] || [];
      const found = pageLocals.find((t) => t.id === id);
      if (found) {
        return {
          ...prev,
          [page]: pageLocals.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        };
      }
      return prev;
    });
    // For API todos, track toggled state
    setToggledIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, [page]);

  const handleAddTodo = useCallback(
    (title: string) => {
      const newTodo: Todo = {
        id: Date.now(),
        userId: 1,
        title,
        completed: false,
        isLocal: true,
      };
      setLocalTodos((prev) => ({
        ...prev,
        [page]: [newTodo, ...(prev[page] || [])],
      }));
    },
    [page]
  );

  const mergedTodos: Todo[] = [
    ...(localTodos[page] || []),
    ...(todos || []).map((t) => ({
      ...t,
      completed: toggledIds.has(t.id) ? !t.completed : t.completed,
    })),
  ];

  const completedCount = mergedTodos.filter((t) => t.completed).length;

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <ListTodo className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Todo Dashboard
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Manage your tasks — {completedCount}/{mergedTodos.length} completed on
          this page
        </p>
      </div>

      {/* Add Todo */}
      <AddTodoForm onAdd={handleAddTodo} />

      {/* Content */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-sm">Loading todos…</span>
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 py-12 text-destructive">
          <AlertCircle className="h-6 w-6" />
          <span className="text-sm font-medium">Failed to load todos</span>
          <span className="text-xs text-destructive/70">
            {error instanceof Error ? error.message : "Unknown error"}
          </span>
        </div>
      ) : (
        <div className="space-y-2">
          {mergedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination page={page} totalPages={TOTAL_PAGES} onPageChange={setPage} />
    </div>
  );
};

export default TodoDashboard;
