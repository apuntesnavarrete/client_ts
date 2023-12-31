import { useEffect , useState,   } from "react";
//import '../Campeones/campeones.css';
//import './campeon.css';

import { useParams } from 'react-router-dom';

interface jornadas {
    Delegado: null | string;
    Delegadolc: null | string;
    Equipo: number;
    Equipolc: string;
    Escudo: string;
    Escudolc: string;
    Fecha: string;
    Fecha_Registro: null | string;
    Fecha_Registrolc: null | string;
    GC: number;
    GF: number;
    ID: number;
    Jornada: string;
    Nombre_Equipo: string;
    Puntos: number;
    Rival: number;
    id_plantel: number;
    idlc: number;
  }

  type Ocurrencias = Record<string, number>;

 
  interface EnfrentamientosEquipos {
    nombres: string[]; // Supongo que 'equipos' es un arreglo de cadenas
    encuentros: {
      [equipo: string]: {
        vs: {
          [equipo: string]: {
            veces: number;
            ultimaFecha: string;
          };
        };
      };
    };
  }

function rolldinamic() {

    const [jornadasData, setjornadasData] = useState<jornadas[]>([]);
    const [equipos, setequipos] = useState<string[]>([]);
    const [EnfrentamientosEquipos, setEnfrentamientosEquipos] = useState<EnfrentamientosEquipos | null>(null);


  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resul] = await Promise.all([          
          fetch(`/api/jornadas/ed/${id}`).then((response) => response.json()),
        ]);

        setjornadasData(resul);


        console.log("respuesta del servidor")
        console.log(id)
        console.log(resul)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const obtenerEquipos = ()=>{
    console.log("prueba botton obtener equipo")

    const nombresEquipos :string[] = jornadasData.map((partido) => partido.Equipolc);
 

    const equiposUnicos : string[]= [];

    nombresEquipos.map(equipo => {
  if (!equiposUnicos.includes(equipo)) {
    equiposUnicos.push(equipo);
  }
});

    setequipos(equiposUnicos)

      
      console.log(equiposUnicos); // { "Uruguay", "Chispas", "Francia","uruguay" }
}

const deleteEquipo = (equipo : string) =>{

    const newEquipos = equipos.filter((elemento) => elemento !== equipo);

    setequipos(newEquipos)

    console.log("equipo a borrar")
    console.log(newEquipos)
}

const verVersus = (equipo : string) =>{
    console.log("logica de prueba")
    console.log(jornadasData)
    console.log(equipos[0])
    const objetosFiltrados = jornadasData.filter(objeto => objeto.Equipolc === equipo);


    const equiposFiltrados : string[] = objetosFiltrados.map(objeto => objeto.Nombre_Equipo);

    const fechasFiltradas = objetosFiltrados.map(objeto => objeto.Fecha);

    console.log(fechasFiltradas)

    const fechaMasReciente = fechasFiltradas.reduce((fechaMaxima, fechaActual) => {
        return fechaActual > fechaMaxima ? fechaActual : fechaMaxima;
      }, '');
      
      console.log('Fecha más reciente:', fechaMasReciente)

    const ocurrencias: Ocurrencias = {};

    equiposFiltrados.filter(equipo => {
        if (!ocurrencias[equipo]) {
          ocurrencias[equipo] = 1;
          return true;
        }
        ocurrencias[equipo]++;
        return false;
      });





      console.log('Conteo de ocurrencias:', ocurrencias);
}

const prueba = () => {
  const enfrentamientosEquipos: EnfrentamientosEquipos = {
    nombres: equipos,
    encuentros: {},
  };
  // Inicializar los encuentros para cada equipo
  equipos.forEach((equipo) => {
    enfrentamientosEquipos.encuentros[equipo] = {
      vs: {},
    };
  });

  // Actualizar los encuentros
  jornadasData.forEach((enfrentamiento) => {
    const equipoLocal: string = enfrentamiento.Equipolc;
    const equipoVisitante: string = enfrentamiento.Nombre_Equipo;
    const fecha: string = enfrentamiento.Fecha;

    // Verificar si el equipoLocal y equipoVisitante existen en el objeto
    if (!enfrentamientosEquipos.encuentros[equipoLocal]) {
      enfrentamientosEquipos.encuentros[equipoLocal] = {
        vs: {},
      };
    }
    if (!enfrentamientosEquipos.encuentros[equipoLocal].vs[equipoVisitante]) {
      enfrentamientosEquipos.encuentros[equipoLocal].vs[equipoVisitante] = {
        veces: 0,
        ultimaFecha: '',
      };
    }

    enfrentamientosEquipos.encuentros[equipoLocal].vs[equipoVisitante].veces++;
    enfrentamientosEquipos.encuentros[equipoLocal].vs[equipoVisitante].ultimaFecha = fecha;

    // Actualizar el equipo visitante, asegurándose de manejar la posible inexistencia de la combinación previamente
    if (!enfrentamientosEquipos.encuentros[equipoVisitante]) {
      enfrentamientosEquipos.encuentros[equipoVisitante] = {
        vs: {},
      };
    }

    if (!enfrentamientosEquipos.encuentros[equipoVisitante].vs[equipoLocal]) {
      enfrentamientosEquipos.encuentros[equipoVisitante].vs[equipoLocal] = {
        veces: 0,
        ultimaFecha: '',
      };
    }

    enfrentamientosEquipos.encuentros[equipoVisitante].vs[equipoLocal].veces++;
    enfrentamientosEquipos.encuentros[equipoVisitante].vs[equipoLocal].ultimaFecha = fecha;
  });

  setEnfrentamientosEquipos(enfrentamientosEquipos)
  console.log(enfrentamientosEquipos);
};


return (
    <div>
     <div>
    <button onClick={obtenerEquipos}>Obtener equipos</button>
    </div>
    <div className="content-equipos">

    {equipos.map((equipo, index) => (
            <button onClick={()=>deleteEquipo(equipo)} key={index}>{equipo}</button>
          ))}

    </div>
 
    <div>
        <p>Prueba Equipos</p>
        {equipos.map((equipo, index) => (
            <button onClick={()=>verVersus(equipo)} key={index}>{equipo}</button>
          ))}
    </div>

          <button onClick={prueba}>Prueba</button>
    
    
    <div>
    <div>
  <h2>Enfrentamientos entre Equipos</h2>
  {EnfrentamientosEquipos && (
    <table>
      <thead>
        <tr>
          <th>Equipo Local</th>
          <th>Equipo Visitante</th>
          <th>Veces Enfrentados</th>
          <th>Última Fecha</th>
        </tr>
      </thead>
      <tbody>
        {equipos.map((equipoLocal, indexLocal) => (
          equipos.map((equipoVisitante, indexVisitante) => (
            indexLocal !== indexVisitante && ( // Evita comparar un equipo consigo mismo
              <tr key={`${indexLocal}-${indexVisitante}`}>
                <td>{equipoLocal}</td>
                <td>{equipoVisitante}</td>
                <td>
                  {EnfrentamientosEquipos.encuentros[equipoLocal]?.vs[equipoVisitante]?.veces/2 || 0}
                </td>
                <td>
                  {EnfrentamientosEquipos.encuentros[equipoLocal]?.vs[equipoVisitante]?.ultimaFecha || 'N/A'}
                </td>
              </tr>
            )
          ))
        ))}
      </tbody>
    </table>
  )}
</div>


    </div>

    <div>
      <h1>Planificación de Jornada</h1>
     
    </div>

    </div>


    
  )
}

export default rolldinamic