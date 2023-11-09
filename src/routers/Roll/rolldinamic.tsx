import  {useEffect} from 'react'
//import '../Campeones/campeones.css';
//import './campeon.css';

import { useParams } from 'react-router-dom';


function rolldinamic() {

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resul] = await Promise.all([          
          fetch(`/api/jornadas/ed/${id}`).then((response) => response.json()),
        ]);
        console.log("respuesta del servidor")
        console.log(id)
        console.log(resul)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  return (
    <>
    </>
  )
}

export default rolldinamic