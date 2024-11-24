import React, { useState } from 'react';

const App = () => {
  // Estado para manejar la opción seleccionada
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    codigo: '',
    cantidad: '',
    sede: ''
  });

  // Maneja el cambio de los valores del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Maneja la selección de la opción
  const handleOptionChange = (e) => {
    setOpcionSeleccionada(e.target.value);
    setFormData({
      nombre: '',
      codigo: '',
      cantidad: '',
      sede: ''
    }); // Resetear campos del formulario
  };

  // Enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la solicitud a la API para agregar los datos
    console.log('Datos enviados:', formData);
  };

  return (
    <div>
      <h1>Formulario Dinámico</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="opcion">Selecciona lo que quieres agregar:</label>
          <select id="opcion" value={opcionSeleccionada} onChange={handleOptionChange}>
            <option value="">--Selecciona una opción--</option>
            <option value="estudiante">Estudiante</option>
            <option value="item">Item</option>
          </select>
        </div>

        {opcionSeleccionada && (
          <div>
            <h2>Agregar {opcionSeleccionada.charAt(0).toUpperCase() + opcionSeleccionada.slice(1)}</h2>
            
            {/* Dependiendo de la opción seleccionada, los campos cambiarán */}
            {opcionSeleccionada === 'estudiante' && (
              <>
                <div>
                  <label htmlFor="nombre">Nombre:</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="codigo">Código:</label>
                  <input
                    type="text"
                    id="codigo"
                    name="codigo"
                    value={formData.codigo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cantidad">Cantidad:</label>
                  <input
                    type="number"
                    id="cantidad"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="sede">Sede:</label>
                  <input
                    type="text"
                    id="sede"
                    name="sede"
                    value={formData.sede}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

            {opcionSeleccionada === 'item' && (
              <>
                <div>
                  <label htmlFor="nombre">Nombre del Item:</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="codigo">Código:</label>
                  <input
                    type="text"
                    id="codigo"
                    name="codigo"
                    value={formData.codigo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cantidad">Cantidad:</label>
                  <input
                    type="number"
                    id="cantidad"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="sede">Sede:</label>
                  <input
                    type="text"
                    id="sede"
                    name="sede"
                    value={formData.sede}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

            <button type="submit">Enviar</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default App;