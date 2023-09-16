import  {useEffect, useState} from 'react'
import Card from '../Card';
import '../cards.css';

interface CampeonatoData {
  id_campeonato: number;
  fecha_campeonato: string;
  id_Equipo: number;
  Torneo: string;
  Categoria: string;
  Liga: string;
  Foto: string;
  id_plantel: number;
  Nombre_Equipo: string;
  Delegado: string;
  Escudo: string;
  Fecha_Registro: string;
}


function Campeones() {

  const [campeonesData, setCampeonesData] = useState<CampeonatoData[]>([]);



  useEffect(() => {
    // Realizar la petición GET a la API cuando el componente se monta
    fetch('/api/campeones')
      .then(response => response.json())
      .then(data => {
       // console.log('Data from API:', data); // Imprimir la data en la consola
       setCampeonesData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        (<p>La data fallo , si el errror persiste , llama a;</p>)
      });
  }, []);

  console.log("Fuera de useffect")

  console.log(campeonesData)

  return (
    <>
    <header>
    <div className='publicidad'>
      <a href='https://www.facebook.com/Impactounder'>Promocion de Uniformes clon da click y CONTACTANOS </a>
    </div>
    <h2 className='titulo'>Historial de Campeones</h2>
    <h2 className='subtitulo'>"Los Heroes Tecamac"</h2>
    </header>
    <div className='Cards_Content'>
   
      {campeonesData.map((campeonato, index) => (
        <Card key={index} campeonato={campeonato} />
      ))}
     
    </div>
    </>
  )
}

export default Campeones