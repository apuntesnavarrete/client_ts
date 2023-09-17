import './home.css';
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <header>
    <div className='publicidad'>
      <a href='https://www.facebook.com/Impactounder'>Promocion de Uniformes clon da click y CONTACTANOS </a>
    </div>
    <h2 className='titulo'>Impacto Under</h2>
    <p className='subtitulo'>"Los Heroes Tecamac"</p>

    </header>

    <main className="Main-home">

<nav>
  <h3>Menu</h3>
  
  <div className='conten-iten-nav'>
    <p> <Link to="/campeones">Campeones</Link></p>
      
    <p>  <Link to="/roll">Simulador de Roll</Link></p>

  </div>
</nav>

      
    </main>

    </>
  )
}

export default Home
