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


function Roll() {


    const [jornadasData, setjornadasData] = useState<jornadas[]>([]);
    const [equipos, setequipos] = useState<string[]>([]);



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
    const equiposFiltrados = objetosFiltrados.map(objeto => objeto.Nombre_Equipo);
    const ocurrencias: Ocurrencias = {};

    equiposFiltrados.filter(equipo => {
        if (!ocurrencias[equipo]) {
          ocurrencias[equipo] = 1;
          return true;
        }
        ocurrencias[equipo]++;
        return false;
      });

      console.log('Equipo a Evaluar:', equipos[6]);

      console.log('Conteo de ocurrencias:', ocurrencias);
}

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

    </div>
  )
}

export default Roll
