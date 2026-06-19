import { createContext, useState, useEffect } from 'react';

// 1. Creamos el contexto
export const TaskContext = createContext();

// 2. Creamos el Provider que envolverá la app
export function TaskProvider({ children }) {
  // Inicializamos el estado leyendo de localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('kanban_tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // useEffect para guardar automáticamente en localStorage cada vez que cambien las tareas
  useEffect(() => {
    localStorage.setItem('kanban_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Función para Añadir una nueva tarea usando el Spread Operator (Inmutabilidad)
  const addTask = (title, description, priority) => {
    const newTask = {
      id: Date.now(), // Key única
      title,
      description,
      priority,
      status: 'To Do' // Estado inicial por defecto
    };
    setTasks([...tasks, newTask]);
  };

  // Función para Borrar usando .filter()
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Función para Mover tareas (avanzar o retroceder) usando .map()
  const moveTask = (id, newStatus) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status: newStatus } : task));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, moveTask }}>
      {children}
    </TaskContext.Provider>
  );
}