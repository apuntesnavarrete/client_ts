import  {useEffect, useState} from 'react'
import '../cards.css';
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
    <h2 className='subtitulo'>"Los Heroes Tecamac"</h2>
    <p>Jugadores campeones </p>

    </header>


    <div className='Cards_Content'>
   


      {campeonesData.map((campeonato, index) => (
       <div key={index}>

        <img className='Card-center_img' src={`${url_jugador + campeonato.Foto}`} alt="" />

      <p>{campeonato.Foto}</p>  
      <p>{campeonato.Nombres}</p>  

       
       </div>
      

      ))}
     
    </div>


    <div className='Cards_Content'>
   

<p>Mejores Jugadores</p>
   {equipos.map((campeonato, index) => (
    <div key={index}>

     <img className='Card-center_img' src={`${url_jugador + campeonato.Foto}`} alt="" />

   <p>{campeonato.Foto}</p>  
   <p>{campeonato.Nombres}</p>  

    
    </div>
   

   ))}
  
 </div>

    </>
  )
}

export default Campeon