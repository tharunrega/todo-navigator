import { Check, Circle } from "lucide-react";
import type { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
}

const TodoItem = ({ todo, onToggle }: TodoItemProps) => {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition-all animate-fade-in cursor-pointer hover:shadow-sm ${
        todo.completed
          ? "bg-todo-completed-bg border-todo-completed/20"
          : "bg-card border-border"
      }`}
      onClick={() => onToggle(todo.id)}
    >
      <button
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          todo.completed
            ? "border-todo-completed bg-todo-completed"
            : "border-muted-foreground/40"
        }`}
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {todo.completed && <Check className="h-3 w-3 text-accent-foreground" />}
      </button>
      <span
        className={`text-sm leading-snug transition-colors ${
          todo.completed
            ? "text-muted-foreground line-through"
            : "text-foreground"
        }`}
      >
        {todo.title}
      </span>
      {todo.isLocal && (
        <span className="ml-auto shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          Local
        </span>
      )}
      <span
        className={`ml-auto shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
          todo.completed
            ? "bg-todo-completed/10 text-todo-completed"
            : "bg-todo-pending/10 text-todo-pending"
        } ${todo.isLocal ? "ml-1" : ""}`}
      >
        {todo.completed ? "Done" : "Pending"}
      </span>
    </div>
  );
};

export default TodoItem;
