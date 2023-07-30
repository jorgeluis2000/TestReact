import logo from './assets/images/logo.svg';
import './assets/css/App.css';
import { Router } from './Router';

// Importar componentes
import { Micomponente } from './components/Micomponente';

function App() {
  var nombre = (
    <div>
      <h1>
        <b>Bienvenido al curos de ReactJs de Jorge Luis Guiza Granobles</b>
      </h1>
    </div>
  );

  var prueba = (
    <div>
      <img src={logo} alt="logo" />
      <p>
        {nombre}
      </p>
      <section className='componentes'>
        <Micomponente />
      </section>
    </div>
  );
  
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
