
import { Link } from 'react-router-dom';


import './card.css';


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

interface CardProps {
  campeonato: CampeonatoData;
 
}

const Card: React.FC<CardProps> = ({ campeonato }) => {

   let url_liga="http://18.188.110.39:82/ligas/"
   let url_Equipo="http://18.188.110.39:82/public" 
   let url_equipo_campeon="http://18.188.110.39:82/campeones/"
   let equipo=campeonato.Escudo
   let name_equipo=campeonato.Nombre_Equipo
   let categoria=campeonato.Categoria
   let torneo=campeonato.Torneo
   let id_campeonato= campeonato.id_campeonato
   let liga=campeonato.Liga
   let fecha_campeonato=campeonato.fecha_campeonato


  return (
    <div key={id_campeonato}>
    <div className='Card_Content'>
      <div className='Card_top'>
        <img
          className='Card_top-img'
          src={`${url_equipo_campeon}${name_equipo}_${id_campeonato}.jpg`}
          alt="imagen equipo campeon"
        />
      </div>
      <div className='Card-center'>
        <img
          className='Card-center_img'
          src={`${url_Equipo}${equipo}`}
          alt="imagen escudo campeon"
        />

        <p className='Card_Equipo'>{name_equipo}</p>
        <p className='Card_Categoria'>Categoria {categoria}</p>
        <p className='Card_Torneo'>{torneo}</p>
        <div className='Card_center_top'>
          <p className='Card_ID'>{fecha_campeonato.substring(0, 10)}</p>
          <p className='Card_ID'>Campeonato ID.-{id_campeonato}</p>
        </div>
      </div>
      <div className='Card-Bottom'>
        <img
          className='Card-Bottom_img'
          src={`${url_liga}${liga}.png`}
          alt="liga participante"
        />
        <div>
          <p className='Card-Bottom_campeones'>Campeones</p>
          <p className='Card-Bottom_liga'>Liga {liga}</p>

        </div>
        <div>

        <Link className='Card-btn' to={`/campeones/${id_campeonato}`}>Ver mas..</Link>

       

        </div>
      </div>
    </div>
  </div>
  );
};

export default Card;