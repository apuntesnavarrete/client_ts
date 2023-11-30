import  { useEffect, useState} from 'react'
import { url_jugador_img } from '../../var_global/direciones';
import { jugador } from '../../functions/datatypes';



function Jugadores() {
     const [loading, setLoading] = useState(true);
    const [jugadoresData, setjugadoresData] = useState<jugador[]>([]);
    const [jugadoresDatatodos, setjugadoresDatatodos] = useState<jugador[]>([]);
    const [busqueda, setBusqueda] = useState('');

    
  useEffect(() => {
    // Realizar la petición GET a la API cuando el componente se monta
    fetch('/api/jugadores')
      .then(response => response.json())
      .then((data: jugador[]) => {
        const jugadoresOrdenados = data.sort((b, a) => a.ID_FB - b.ID_FB);
        // Tomar solo los primeros 100 resultados
        const primeros100Jugadores = jugadoresOrdenados.slice(0, 100);
        setjugadoresData(primeros100Jugadores);
        setjugadoresDatatodos(data)
        setLoading(false); // Marcar como no cargando


      })
      .catch(error => {
        console.error('Error fetching data:', error);
        (<p>La data fallo , si el errror persiste , manda un mns al whatsapp 5552108059;</p>)
        setLoading(false); // Marcar como no cargando en caso de error

      });

     
  }, []);


  const handleBusquedaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorBusqueda = e.target.value;
    setBusqueda(valorBusqueda);
    // Filtrar los datos basándonos en la búsqueda
   const datosFiltrados = jugadoresDatatodos.filter((jugador) =>
   jugador.Nombres.toLowerCase().includes(valorBusqueda.toLowerCase())
    );
    setjugadoresData(datosFiltrados)
   


  };




  return (
    <div>
      
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={busqueda}
        onChange={handleBusquedaChange}
      />
      
      <h2>Lista de Jugadores</h2>

    {loading ? (
      <p>cargando ...</p>
    ) : (
      <table>
      <thead>
        <tr>
          <th>ID_FB</th>
          <th>Nombres</th>
  
          <th>Fecha de Nacimiento</th>
          <th>CURP</th>
          <th>Foto</th>
        </tr>
      </thead>
      <tbody>
        {jugadoresData.map(jugador => (
          <tr key={jugador.ID_FB}>
            <td>{jugador.ID_FB}</td>
            <td>{jugador.Nombres}</td>
            <td>{jugador.Fecha_Nacimiento}</td>
            <td>{jugador.Curp}</td>
            <td>
            <img className='img-jugador' src={`${url_jugador_img + jugador.Foto}`} alt={`Foto de ${jugador.Nombres}`} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    )}
     
    </div>
  );

}

export default Jugadores
