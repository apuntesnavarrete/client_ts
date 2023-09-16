import { useParams } from 'react-router-dom';

function Pruebapararms() {

    const { id } = useParams();

    console.log(id)
  return (
    <div>
      <p>paramas</p>
    </div>
  )
}

export default Pruebapararms
