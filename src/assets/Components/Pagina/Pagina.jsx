import React from "react";
import BaraDePagini from "../BaraDePagini/BaraDePagini";
import VizualizareLive from "../VizualizareLive/VizualizareLive";
import "./Pagina.css";

function Pagina() {
  return (
    <div className="containerImpartit">
      <div className="rind">
        <div className="parteaStinga">
          <BaraDePagini />
        </div>

        <div className="parteaDreapta">
          <VizualizareLive />
        </div>
      </div>
    </div>
  );
}
export default Pagina;
