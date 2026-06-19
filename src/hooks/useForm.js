import { useState } from 'react';

export function useForm(initialState = {}) {
  const [values, setValues] = useState(initialState);

  // Manejador genérico para cualquier input/select
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  // Función para limpiar los campos tras enviar
  const resetForm = () => {
    setValues(initialState);
  };

  return [values, handleChange, resetForm];
}