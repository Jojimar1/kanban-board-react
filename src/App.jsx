import { useContext } from 'react';
import { TaskProvider, TaskContext } from './context/TaskContext';
import { useForm } from './hooks/useForm';
import { Column } from './components/Column';
import './App.css'; // Añade aquí tus estilos visuales básicos

function KanbanBoard() {
  const { addTask } = useContext(TaskContext);

  // Inicializamos el Custom HookuseForm para capturar Título, Descripción y Prioridad [cite: 101]
  const [formValues, handleInputChange, resetForm] = useForm({
    title: '',
    description: '',
    priority: 'Media'
  });

  const { title, description, priority } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    // Añadimos la tarea a la "nube" global [cite: 64, 73]
    addTask(title, description, priority);
    resetForm(); // Limpiamos el formulario
  };

  return (
    <div className="app-container" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Gestor de Tareas Kanban</h1>

      {/* Formulario de Alta de Tareas */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input 
          type="text" 
          name="title" 
          placeholder="Título de la tarea..." 
          value={title} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          type="text" 
          name="description" 
          placeholder="Descripción..." 
          value={description} 
          onChange={handleInputChange} 
          required 
        />
        <select name="priority" value={priority} onChange={handleInputChange}>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
        <button type="submit">➕ Añadir Tarea</button>
      </form>

      {/* Tablero Kanban dividido en sus 3 columnas obligatorias (Requisito 2) [cite: 83] */}
      <div className="kanban-board" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Column title="Pendientes" status="To Do" /> [cite: 84]
        <Column title="En Progreso" status="In Progress" /> [cite: 85]
        <Column title="Completadas" status="Done" /> [cite: 86]
      </div>
    </div>
  );
}

// Envolvemos toda la aplicación en el Provider para que el Contexto funcione en cualquier nivel [cite: 72]
export default function App() {
  return (
    <TaskProvider>
      <KanbanBoard />
    </TaskProvider>
  );
}