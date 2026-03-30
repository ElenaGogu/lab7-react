import './BaraDePagini.css';
import React from 'react';
import Pagina1 from '../Pagina1/Pagina1';
import Pagina2 from '../Pagina2/Pagina2';
import Pagina3 from '../Pagina3/Pagina3';
import Pagina4 from '../Pagina4/Pagina4';
import pasi from '../../../data/pasi.json';
import { useRetetaStare} from '../RetetaContext/RetetaContext';

function BaraDePagini() {
  const { pasActual, trimis } = useRetetaStare();

  const afiseazaPagina = () => {
    switch (pasActual) {
      case 1: return <Pagina1 />;
      case 2: return <Pagina2 />;
      case 3: return <Pagina3 />;
      case 4: return <Pagina4 />;
      default: return <Pagina1 />;
    }
  };

  return (
    <div className="baraDePagini">
      <div className="header">
        <h2 className="denumireaAp">Crearea unei Retete</h2>
        <p className="descrireaAp">Construieste reteta ta pas cu pas</p>
      </div>

      <div className="BaraPagini">
        {pasi.map((p) => {
          const esteGata = p.nr < pasActual || (p.nr === 4 && trimis);
          const esteActiv = pasActual === p.nr && !trimis;

          return (
            <div 
              key={p.nr} 
              className={`nrPasului ${esteActiv ? 'activ' : ''} ${esteGata ? 'completat' : ''}`}
            >
              <div className="stilButPag">
                {esteGata ? <i className="fa-solid fa-check"></i> : p.nr}
              </div>
              <span className="textButon">{p.text}</span>
            </div>
          );
        })}
      </div>

      <div className="nrPaginii">
        {afiseazaPagina()}
      </div>
    </div>
  );
}
export default BaraDePagini;
