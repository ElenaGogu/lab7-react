import React from "react";
import culori from "../../../data/culori.json";
import imaginileProduselor from "../../../data/imaginile.json";
import "./VizualizareLive.css";
import { useRetetaStare } from "../RetetaContext/RetetaContext";

function VizualizareLive() {
  const { detalii, ingrediente } = useRetetaStare();

  let culoareSelectata = null;
  for (let i = 0; i < culori.length; i++) {
    if (culori[i].nume === detalii.culoare) {
      culoareSelectata = culori[i];
      break;
    }
  }

  const imagineIngredient = (nume) => {
    if (!nume) return null;
    const numeVerificat = nume.toLowerCase().trim().replace(/\s+/g, "");
    return imaginileProduselor[numeVerificat] || null;
  };

  return (
    <div className="containerLive">
      <h3 className="titluLive">Previzualizarea Retetei</h3>

      {!detalii.nume ? (
        <p>Completeaza formularul...</p>
      ) : (
        <div
          className="banerLive"
          style={{
            backgroundColor: culoareSelectata ? culoareSelectata.hex : "#eee",
          }}
        >
          <strong>{detalii.nume}</strong>
          {detalii.autor && <div>{detalii.autor}</div>}
        </div>
      )}

      {detalii.caracteristici && detalii.caracteristici.length > 0 && (
        <div className="cardLive">
          <div className="caracteristiciTitlu">Caracteristici</div>
          {detalii.caracteristici.map((c, i) => (
            <div key={i}>{c}</div>
          ))}
        </div>
      )}

      {detalii.tipMasa && (
        <div className="alegemTipMasa">{detalii.tipMasa}</div>
      )}

      {ingrediente.length > 0 && (
        <div className="ingredLive">
          <div className="titluLive">Ingrediente</div>
          {ingrediente.map((ing) => {
            let kcalRind = 0;
            if (ing.optiuniSelectate) {
              for (let i = 0; i < ing.optiuniSelectate.length; i++) {
                kcalRind += ing.optiuniSelectate[i].kcal;
              }
            }

            return (
              <div key={ing.id} className="ingredientLive">
                {imagineIngredient(ing.nume) && (
                  <img
                    src={imagineIngredient(ing.nume)}
                    alt={ing.nume}
                    className="imagineIngredient"
                  />
                )}
                <span className="numeLive">{ing.nume || ".."}</span>

                <span className="detaliiLive">
                  {ing.cantitate} {ing.unitate}
                </span>

                <div className="totalCalorii">
                  <span>{kcalRind} kcal</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default VizualizareLive;
