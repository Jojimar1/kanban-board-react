import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { TaskCard } from './TaskCard';

export function Column({ title, status }) {
  const { tasks } = useContext(TaskContext);

  // Filtramos las tareas que corresponden única y exclusivamente a esta columna 
  const filteredTasks = tasks.filter(task => task.status === status);

  return (
    <div className="kanban-column" style={{ flex: 1, background: '#f4f5f7', padding: '15px', borderRadius: '8px', margin: '0 10px' }}>
      <h3>{title} ({filteredTasks.length})</h3>
      <div className="tasks-container">
        {filteredTasks.map(task => (
          // Obligatorio usar la key única al hacer el map (Requisito 2) [cite: 81]
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}