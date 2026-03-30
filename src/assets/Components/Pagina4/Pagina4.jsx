import React from "react";
import {useRetetaStare, useRetetaDispatch} from "../RetetaContext/RetetaContext";
import retete from "../../../data/retete.json";
import "./Pagina4.css";

function Pagina4() {
  const { detalii, ingrediente, trimis } = useRetetaStare();
  const dispatch = useRetetaDispatch();

  const numeReteta = detalii.nume ? detalii.nume : "";
  const numeCautat = numeReteta.toLowerCase().trim();
  const pasiDinJson = retete[numeCautat] || [
    "Aceasta reteta nu poate fi pregatita."
  ];

  if (trimis) {
    return (
      <div className="containerSucces">
        <h2>Reteta "{detalii.nume}" a fost salvata!</h2>
        <p>Autor: {detalii.autor}</p>
        <button
          className="resetareBtn"
          onClick={() => dispatch({ tip: "resetare" })}
        >
          Creeaza o reteta noua.
        </button>
      </div>
    );
  }

  return (
    <div className="containerPagina4">
      <h2 className="titlu">{detalii.nume || "Reteta Noua"}</h2>

      <div className="modPreparareContainer">
        <h4>Mod de preparare</h4>
        <div className="pasiiPregatirii">
          {pasiDinJson.map((pas, index) => (
            <p key={index}>
              <strong>{index + 1}.</strong> {pas}
            </p>
          ))}
        </div>
      </div>

      <div className="descrierePasilor">
        <p><strong>Ingrediente folosite:</strong> {ingrediente.length}</p>
        <p><strong>Culoare banner:</strong> {detalii.culoare}</p>
        <p><strong>Caracteristici:</strong> {detalii.caracteristici.join(", ")}</p>
        <p><strong>Tip masa:</strong> {detalii.tipMasa}</p>
      </div>

      <div className="butoaneNavigare">
        <button className="inapoiBtn" onClick={() => dispatch({ tip: "set_pas", pas: 3 })}>
          Inapoi
        </button>

        <button
          className="finalizareBtn"
          onClick={() => dispatch({ tip: "trimite" })}
        >
          Finalizeaza
        </button>
      </div>
    </div>
  );
}
export default Pagina4;
