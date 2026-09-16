import '../hojas-de-estilos/Agregar-testimonio.css';

export function AgregarTestimoni({ setForm, form, setModal, setData, data }) {
  const captura = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nuevoTestimonio = {
      ...form,
      id: Date.now()
    };

    const listaActualizada = [...data, nuevoTestimonio];

   
    setData(listaActualizada);


    window.localStorage.setItem("datos form", JSON.stringify(listaActualizada));

    
    setForm({
      Imagen: "",
      Nombre: "",
      Cargo: "",
      Empresa: "",
      Pais: "",
      TestimonioCliente: ""
    });

    
    setModal(false);
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-testimonio">
      <h2>Agregar nuevo testimonio</h2>

      <label>
        Link de la Imagen
        <input
          type="text"
          name="Imagen"
          value={form.Imagen}
          onChange={captura}
          placeholder="https://ejemplo.com/foto.jpg"
          required
        />
      </label>

      <label>
        Nombre
        <input
          type="text"
          name="Nombre"
          value={form.Nombre}
          onChange={captura}
          required
        />
      </label>

      <label>
        Cargo
        <input
          type="text"
          name="Cargo"
          value={form.Cargo}
          onChange={captura}
          required
        />
      </label>

      <label>
        Empresa
        <input
          type="text"
          name="Empresa"
          value={form.Empresa}
          onChange={captura}
          required
        />
      </label>

      <label>
        País
        <input
          type="text"
          name="Pais"
          value={form.Pais}
          onChange={captura}
          required
        />
      </label>

      <label>
        Testimonio
        <textarea
          name="TestimonioCliente"
          value={form.TestimonioCliente}
          onChange={captura}
          required
        />
      </label>

      <button type="submit">Agregar Testimonio</button>
    </form>
  );
}