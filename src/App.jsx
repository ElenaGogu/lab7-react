import Pagina from './assets/Components/Pagina/Pagina';
import './App.css'
import { RetetaProvider } from './assets/Components/RetetaContext/RetetaContext';

function App() {
  return (
    <RetetaProvider>
      <Pagina />
    </RetetaProvider>
  );
}
export default App