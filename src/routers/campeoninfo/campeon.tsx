import  {useEffect, useState} from 'react'
import '../Campeones/campeones.css';
import './campeon.css';

import { useParams } from 'react-router-dom';

interface CampeonatoDataPlayers {
  Apellido_Materno: string;
  Apellido_Paterno: string;
  Categoria: string;
  Curp: string;
  Delegado: string | null;
  Escudo: string;
  Fecha_Nacimiento: string;
  Fecha_Registro: string | null;
  Foto: string;
  ID_FB: number;
  Id_campeonato: number;
  Liga: string;
  Nombre_Equipo: string;
  Nombres: string;
  Torneo: string;
  id_Equipo: number;
  id_jugador: number;
  id_plantel: number;
  id_registro: number;
}


interface mejoresDataPlayers {
  id_registro: number;
  id_Equipo: number;
  Torneo: string;
  Categoria: string;
  Liga: string;
  id_jugador: number;
  Id_campeonato: number;
  Posicion: string;
  Podio: string;
  ID_FB: number;
  Nombres: string;
  Apellido_Paterno?: string;
  Apellido_Materno?: string;
  Fecha_Nacimiento?: string;
  Curp?: string;
  Foto?: string;
  id_plantel: number;
  Nombre_Equipo: string;
  Delegado?: string;
  Escudo?: string;
  Fecha_Registro?: string;
}


function Campeon() {

  const [campeonesData, setCampeonesData] = useState<CampeonatoDataPlayers[]>([]);
  const [equipos, setEquipos] = useState<mejoresDataPlayers[]>([]);



  const { id } = useParams();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jugadoresRespuesta, mejoresRespuesta] = await Promise.all([
          fetch(`/api/campeones/jugadores/${id}`).then((response) => response.json()),
          fetch(`/api/campeones/mejores_jugadores/${id}`).then((response) => response.json())
        ]);
  
        

        setCampeonesData(jugadoresRespuesta)
        setEquipos(mejoresRespuesta)
       
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle the error appropriately (e.g., set an error state)
      }
    };
  
    fetchData();
  }, []);

//  let url_liga="http://18.188.110.39:82/ligas/"
  let url_jugador="http://18.188.110.39:82/public/jug" 

 console.log(equipos)



  return (
    <>
    <header>
    <div className='publicidad'>
      <a href='https://www.facebook.com/Impactounder'>Promocion de Uniformes clon da click y CONTACTANOS </a>
    </div>
    <h2 className='titulo'>Historial de Campeones</h2>
    <p className='subtitulo'>"Los Heroes Tecamac"</p>

    </header>


    <section className='content-campeones'>
   <h3>Jugadores Campeones</h3>

      <div className='content-campeones-data'>

      {campeonesData.map((campeonato, index) => (
       <div className='content-jugador' key={index}>

        <img className='img-jugador' src={`${url_jugador + campeonato.Foto}`} alt="" />
        <p>{campeonato.Nombres}</p>  

       
       </div>
      

      ))}
      </div>
    
     
    </section >

        <section  className='content-campeones'>
        <h3>Mejores Jugadores</h3>
        <div className='content-campeones-data'>


        {equipos.map((campeonato, index) => (
            <div className='content-jugador' key={index}>

          <p>{campeonato.Podio} Mejor {campeonato.Posicion}</p>  
            <img className='img-jugador' src={`${url_jugador + campeonato.Foto}`} alt="" />
          <p>{campeonato.Nombres}</p>  

    
    </div>
   

   ))}

          </div>

        </section> 
        

    </>
  )
}

export default Campeon