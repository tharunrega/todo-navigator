import { useQuery } from "@tanstack/react-query";
import type { Todo } from "@/types/todo";

const LIMIT = 10;

const fetchTodos = async (page: number): Promise<Todo[]> => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${LIMIT}`
  );
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};

export const useTodos = (page: number) => {
  return useQuery<Todo[]>({
    queryKey: ["todos", page],
    queryFn: () => fetchTodos(page),
    staleTime: 5 * 60 * 1000,
  });
};

export const TODOS_PER_PAGE = LIMIT;
// JSONPlaceholder has 200 todos total
export const TOTAL_PAGES = 20;
