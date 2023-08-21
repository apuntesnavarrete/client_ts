import  {useEffect, useState} from 'react'

function App() {

  const [backenData, setbackenData] = useState([]);

  useEffect(() => {
    // Realizar la petición GET a la API cuando el componente se monta
    fetch('/api')
      .then(response => response.json())
      .then(data => {
        console.log('Data from API:', data); // Imprimir la data en la consola
        setbackenData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>hola</h1>
      <p></p>
    </div>
  )
}

export default App
