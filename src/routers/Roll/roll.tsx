import { useEffect , useState } from "react";


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

 

  interface Equipos {
    nombres: string[];
    encuentros: {
      [equipo: string]: {
        vs: {
          [equipoOponente: string]: {
            veces: number;
            ultimaFecha: string;
          };
        };
      };
    };
  }

function Roll() {


    const [jornadasData, setjornadasData] = useState<jornadas[]>([]);
    const [equipos, setequipos] = useState<string[]>([]);
    const [EnfrentamientosEquipos, setEnfrentamientosEquipos] = useState<Equipos | null>(null);



    useEffect(() => {
      // Realizar la petición GET a la API cuando el componente se monta
      fetch('api/jornadas/ed/sub23')
        .then(response => response.json())
        .then(data => {
          console.log('Data from API:', data); // Imprimir la data en la consola
          setjornadasData(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          (<p>La data fallo , si el errror persiste , llama a;</p>)
        });


       

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
  const enfrentamientosEquipos: Equipos = {
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



    </div>
    </div>


    
  )
}

export default Roll
