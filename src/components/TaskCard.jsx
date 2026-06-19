import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

export function TaskCard({ task }) {
  const { deleteTask, moveTask } = useContext(TaskContext);

  // Aplicamos un borde rojo dinámico si la prioridad es Alta (Requisito 5.3) [cite: 123]
  const cardStyle = {
    borderLeft: task.priority === 'Alta' ? '5px solid #ff4d4d' : '5px solid #ccc',
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  return (
    <div style={cardStyle}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <span className={`priority-${task.priority.toLowerCase()}`}>
        Prioridad: {task.priority}
      </span>
      
      <div className="card-actions" style={{ marginTop: '10px' }}>
        {/* Botones para mover la tarea dinámicamente según su estado actual */}
        {task.status === 'To Do' && (
          <button onClick={() => moveTask(task.id, 'In Progress')}>▶ En Progreso</button>
        )}
        {task.status === 'In Progress' && (
          <>
            <button onClick={() => moveTask(task.id, 'To Do')}>◀ Pendiente</button>
            <button onClick={() => moveTask(task.id, 'Done')}>▶ Completar</button>
          </>
        )}
        {task.status === 'Done' && (
          <button onClick={() => moveTask(task.id, 'In Progress')}>◀ Reabrir</button>
        )}
        
        {/* Botón de borrar permanente */}
        <button onClick={() => deleteTask(task.id)} style={{ marginLeft: '5px', color: 'red' }}>
          🗑️ Borrar
        </button>
      </div>
    </div>
  );
}
