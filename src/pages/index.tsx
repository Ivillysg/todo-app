import { api } from "@/lib/api";
import { useEffect, useState } from "react";

interface Todo {
  id: number;
  description: string;
  created_at: string;
}
export default function Home() {
  const [todos, setTodo] = useState<Array<Todo>>([]);
  const [description, setDescription] = useState<string>();

  const fetchTodos = async () => {
    try {
      const { data } = await api.get("/todo");
      setTodo(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreateTodo = async () => {
    await api.post("/todo/create", { description }).finally(() => {
      alert("Tarefa adicionada com sucesso!");
      setDescription("");
      fetchTodos();
    });
  };

  return (
    <div className="min-h-screen bg-zinc-800 flex flex-col items-center p-12">
      <h1 className="text-4xl font-bold text-white mb-4">Todo List</h1>
      <div className="flex w-full max-w-xl rounded-lg bg-zinc-700">
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-transparent p-3 placeholder:italic border-none outline-none text-white"
          type="text"
          placeholder="Adicionar uma tarefa"
        />
        <button
          onClick={handleCreateTodo}
          className="bg-blue-600 rounded-r-md w-1/6 text-white font-medium"
          type="button"
        >
          Add
        </button>
      </div>
      <div className="w-full max-w-xl flex flex-col items-center justify-center mt-6">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="w-full rounded-lg bg-zinc-100 mt-4 flex flex-col p-3 gap-2"
          >
            <span className="text-2xl font-semibold">{todo.description}</span>
            <span className="text-sm text-zinc-500">
              Criado em: {new Date(todo.created_at).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
