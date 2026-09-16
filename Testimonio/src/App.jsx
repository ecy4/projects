import { useState } from 'react';
import { Testimonio } from './components/Testimonio';
import { AgregarTestimoni } from './components/AgregarTestimonio';
import './App.css';

const res = [
  {
    id: 1,
    Imagen: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    Nombre: 'Eccy',
    Cargo: 'Ingeniero de software',
    Empresa: 'Apple',
    Pais: 'Colombia',
    TestimonioCliente: 'Llevaba tiempo buscando una forma efectiva de mejorar mis habilidades como desarrollador. Aquí encontré no solo conocimiento técnico, sino las herramientas reales para crear soluciones útiles día a día.'
  },
  {
    id: 2,
    Imagen: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    Nombre: 'Emma',
    Cargo: 'Diseñadora UX/UI',
    Empresa: 'Spotify',
    Pais: 'España',
    TestimonioCliente: 'El contenido y la metodología superaron por completo mis expectativas. Logré entender de forma clara cómo integrar el desarrollo frontend con el diseño de interfaces, optimizando muchísimo mi flujo de trabajo diario.'
  },
  {
    id: 3,
    Imagen: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    Nombre: 'Sarah',
    Cargo: 'Desarrolladora Frontend',
    Empresa: 'Netflix',
    Pais: 'México',
    TestimonioCliente: 'Lo que más destaco es lo estructurado del aprendizaje. Pasar de conceptos teóricos a crear componentes reales con React me dio la confianza que necesitaba para aplicar a mejores puestos laborales.'
  },
  {
    id: 4,
    Imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    Nombre: 'Daniel',
    Cargo: 'Ingeniero DevOps',
    Empresa: 'Amazon',
    Pais: 'Argentina',
    TestimonioCliente: 'Aprender la integración continua y el despliegue de componentes reactivos transformó por completo nuestra entrega de código en producción.'
  },
  {
    id: 5,
    Imagen: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    Nombre: 'Sofía',
    Cargo: 'Data Scientist',
    Empresa: 'Google',
    Pais: 'Chile',
    TestimonioCliente: 'La claridad con la que se explican conceptos complejos facilitó la integración de dashboards interactivos en nuestros modelos de datos.'
  },
  {
    id: 6,
    Imagen: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    Nombre: 'Carlos',
    Cargo: 'Líder Técnico',
    Empresa: 'Mercado Libre',
    Pais: 'Uruguay',
    TestimonioCliente: 'Adoptar estas buenas prácticas en la estructura de nuestro frontend redujo significativamente los tiempos de desarrollo de todo el equipo.'
  },
  {
    id: 7,
    Imagen: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    Nombre: 'Lucía',
    Cargo: 'Diseñadora de Producto',
    Empresa: 'Airbnb',
    Pais: 'Perú',
    TestimonioCliente: 'Comprender la comunicación por props me permitió diseñar interfaces mucho más coherentes y alineadas con la lógica de los desarrolladores.'
  },
  {
    id: 8,
    Imagen: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
    Nombre: 'Mateo',
    Cargo: 'Desarrollador Full Stack',
    Empresa: 'Globant',
    Pais: 'Colombia',
    TestimonioCliente: 'La capacidad de reutilizar componentes dinámicos mejoró la modularidad de nuestras aplicaciones a un nivel sumamente profesional.'
  },
  {
    id: 9,
    Imagen: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    Nombre: 'Valentina',
    Cargo: 'Especialista QA',
    Empresa: 'Microsoft',
    Pais: 'Costa Rica',
    TestimonioCliente: 'Tener componentes estructurados e independientes simplificó considerablemente las pruebas unitarias y de integración.'
  },
  {
    id: 10,
    Imagen: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    Nombre: 'Gabriel',
    Cargo: 'Arquitecto Cloud',
    Empresa: 'IBM',
    Pais: 'Ecuador',
    TestimonioCliente: 'El rendimiento de las aplicaciones construidas con esta arquitectura demuestra un estándar de calidad impecable en producción.'
  },
  {
    id: 11,
    Imagen: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    Nombre: 'Camila',
    Cargo: 'Gerente de Producto',
    Empresa: 'Uber',
    Pais: 'Panamá',
    TestimonioCliente: 'Logramos lanzar nuevas funcionalidades al mercado en tiempo récord gracias a la modularidad y flexibilidad del código.'
  },
  {
    id: 12,
    Imagen: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    Nombre: 'Alejandro',
    Cargo: 'Desarrollador Mobile',
    Empresa: 'Rappi',
    Pais: 'México',
    TestimonioCliente: 'Entender las bases del manejo de estados en la Web facilitó enorme y naturalmente mi transición hacia el desarrollo móvil.'
  },
  {
    id: 13,
    Imagen: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
    Nombre: 'Elena',
    Cargo: 'Especialista en Ciberseguridad',
    Empresa: 'Cloudflare',
    Pais: 'España',
    TestimonioCliente: 'El manejo limpio de dependencias y código seguro nos ayudó a evitar vulnerabilidades comunes en el cliente.'
  }
];

function App() {
  const [data, setData] = useState(() => {
    const datosGuardados = window.localStorage.getItem("datos form");
    return datosGuardados ? JSON.parse(datosGuardados) : res;
  });

  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    Imagen: "",
    Nombre: "",
    Cargo: "",
    Empresa: "",
    Pais: "",
    TestimonioCliente: ""
  });

  const abrirModal = () => {
    setModal(!modal);
  };
  const eliminar = (id) => {
    setData(data.filter(pers => pers.id !== id))
    
  }
  


  return (
    <div className='App'>
      <div className='contenedor-principal'>
        <h1>Esto es lo que dicen nuestros clientes sobre nosotros</h1>

        <div>
          <button onClick={abrirModal} className="btn-navegacion">
            {modal ? "Cerrar formulario" : "Agregar nuevo testimonio"}
          </button>
        </div>

        {modal && (
          <AgregarTestimoni
            setModal={setModal}
            form={form}
            setForm={setForm}
            setData={setData}
            data={data}
          />
        )}

        <div className="contenedor-testimonios">
          {data?.map((list) => (
            <Testimonio eliminar={eliminar} key={list.id} {...list} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;