import React from "react";
import {useRetetaStare, useRetetaDispatch} from "../RetetaContext/RetetaContext";
import optiuniPosibile from "../../../data/optiuni.json";
import "./Pagina3.css";

function Pagina3() {
  const { ingrediente, atins, eroarePas3 } = useRetetaStare();
  const dispatch = useRetetaDispatch();

  const verifica = () => {
    const campuriDeAtins = [];
    for (let i = 0; i < ingrediente.length; i++) {
      const ingredientCurent = ingrediente[i];
      const idIngredient = ingredientCurent.id;
      const cheieDeAtins = "optiuni." + idIngredient;
      campuriDeAtins.push(cheieDeAtins);
    }
    dispatch({
      tip: "atinge_tot_pasul",
      campuri: campuriDeAtins,
    });

    let totulEsteIndeplinit = true;
    for (let i = 0; i < ingrediente.length; i++) {
      const ing = ingrediente[i];
      if (!ing.optiuniSelectate || ing.optiuniSelectate.length === 0) {
        totulEsteIndeplinit = false;
      }
    }

    if (totulEsteIndeplinit) {
      dispatch({ tip: "set_eroare_pas3", mesaj: "" });
      dispatch({ tip: "set_pas", pas: 4 });
    } else {
      dispatch({
        tip: "set_eroare_pas3",
        mesaj: "Alege cel putin o optiune pentru fiecare ingredient.",
      });
    }
  };

  return (
    <div className="containerPagina3">
      <h3>Compozitia ingredientelor</h3>
      {eroarePas3 && <div className="mesajEroare">{eroarePas3}</div>}

      <div className="listaIngredientePersonalizate">
        {ingrediente.map((ing) => {
          const idCurent = ing.id;
          const cheieAtins = "optiuni." + idCurent;
          const listaEstSelectata = ing.optiuniSelectate;

          let areOptiuni = false;
          if (listaEstSelectata && listaEstSelectata.length > 0) {
            areOptiuni = true;
          }

          const esteAtins = atins[cheieAtins];
          let eroareVizibila = false;
          if (esteAtins === true && areOptiuni === false) {
            eroareVizibila = true;
          }
          return (
            <div
              key={idCurent}
              className={
                eroareVizibila
                  ? "sectiuneIngredient sectiuneEroare"
                  : "sectiuneIngredient"
              }
            >
              <h4 className="numeIngredientTitlu">{ing.nume}</h4>
              <div className="optiuni">
                {optiuniPosibile.map((opt) => {
                  let esteBifat = false;
                  if (ing.optiuniSelectate) {
                    for (let i = 0; i < ing.optiuniSelectate.length; i++) {
                      if (ing.optiuniSelectate[i].id === opt.id) {
                        esteBifat = true;
                      }
                    }
                  }
                  return (
                    <div
                      key={opt.id}
                      className={`cardOptiune ${esteBifat ? "bifat" : ""}`}
                      onClick={() => {
                        dispatch({ tip: "atinge_camp", cheie: cheieAtins });
                        dispatch({
                          tip: "bifeaza_optiune",
                          ingredientId: ing.id,
                          optiune: opt,
                        });
                      }}
                    >
                      <input type="checkbox" checked={esteBifat} readOnly />
                      <div className="infoOptiune">
                        <span className="numeOptiune">{opt.nume}</span>
                        <span className="kcalOptiune">{opt.kcal} kcal</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {eroareVizibila ? (
                <span className="textEroare">Nu ai ales nici o optiune</span>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="butoaneNavigare">
        <button
          className="inapoiBtn"
          onClick={() => dispatch({ tip: "set_pas", pas: 2 })}
        >
          <i className="fa-solid fa-arrow-left"></i> Inapoi
        </button>
        <button className="continuaBtn" onClick={verifica}>
          Continua <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}
export default Pagina3;
