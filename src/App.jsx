import { useState } from 'react';
import './App.css'; // O el archivo de estilos que prefieras

function App() {
  // Estados para controlar el input, los datos del usuario y los errores
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(false);

  // Manejador del envío del formulario (onSubmit)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    setError(false);    // Reiniciamos el estado de error
    setUserData(null);  // Limpiamos datos anteriores

    if (!username.trim()) return; // Si está vacío, no hace nada

    try {
      // Petición GET a la API de GitHub usando fetch
      const response = await fetch(`https://api.github.com/users/${username}`);
      
      // Si la API devuelve un error 404 (no existe), activamos el estado de error
      if (!response.ok) {
        throw new Error('Usuario no encontrado');
      }

      const data = await response.json();
      setUserData(data); // Guardamos el objeto con los datos del usuario
    } catch (err) {
      setError(true); // Visualización condicional del error
    }
  };

  return (
    <div className="container">
      <h1>Buscador de Usuarios de GitHub</h1>
      
      {/* Formulario obligatorio con evento onSubmit */}
      <form onSubmit={handleSubmit} className="search-form">
        <input 
          type="text" 
          placeholder="Introduce el nombre de usuario (ej: vuejs)..." 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {/* VISUALIZACIÓN CONDICIONAL: Si hay un error 404 */}
      {error && (
        <div className="error-message">
          <p>❌ El usuario no existe o no se ha podido encontrar.</p>
        </div>
      )}

      {/* VISUALIZACIÓN CONDICIONAL: Si el usuario existe y tenemos sus datos */}
      {userData && (
        <div className="user-card">
          {/* Muestra la imagen de avatar */}
          <img src={userData.avatar_url} alt={userData.login} className="avatar" />
          
          {/* Muestra el login del usuario */}
          <h2>{userData.login}</h2>
          
          {/* Enlace a su página personal de GitHub */}
          <a href={userData.html_url} target="_blank" rel="noreferrer" className="profile-link">
            Ver Perfil de GitHub
          </a>
        </div>
      )}
    </div>
  );
}

export default App;