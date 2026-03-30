import React from "react";
import {useRetetaStare,useRetetaDispatch} from "../RetetaContext/RetetaContext";
import unitati from "../../../data/unitati.json";
import "./Pagina2.css";

function Pagina2() {
  const { ingrediente, atins, eroarePas2 } = useRetetaStare();
  const dispatch = useRetetaDispatch();

  const iesire = (cheie) => {
    dispatch({ tip: "atinge_camp", cheie });
  };

  const verifSaNuFieNegativ = (id, camp, valoare) => {
    if (camp === "cantitate" && valoare < 0) {
      return;
    }
    dispatch({ tip: "modifica_ingredient", id, camp, valoare });
  };

  const adaugaIngredient = () => {
    dispatch({ tip: "adauga_ingredient" });
    dispatch({ tip: "set_eroare_pas2", mesaj: "" });
  };

  const paginaUrmatoare = () => {
    const toateCampurile = [];
    for (let i = 0; i < ingrediente.length; i++) {
      toateCampurile.push("ingrediente." + i + ".nume");
      toateCampurile.push("ingrediente." + i + ".cantitate");
      toateCampurile.push("ingrediente." + i + ".unitate");
    }
    dispatch({ tip: "atinge_tot_pasul", campuri: toateCampurile });

    let totulEsteIndeplinit = true;
    for (let i = 0; i < ingrediente.length; i++) {
      const ing = ingrediente[i];
      const numeValid = ing.nume && ing.nume.trim() !== "";
      const cantitateValida = ing.cantitate && ing.cantitate > 0;
      const unitateValida = ing.unitate && ing.unitate !== "";

      if (!numeValid || !cantitateValida || !unitateValida) {
        totulEsteIndeplinit = false;
      }
    }

    if (ingrediente.length < 2 || !totulEsteIndeplinit) {
      dispatch({
        tip: "set_eroare_pas2",
        mesaj: "Adauga cel putin 2 ingrediente.",
      });
      return;
    }

    dispatch({ tip: "set_eroare_pas2", mesaj: "" });
    dispatch({ tip: "set_pas", pas: 3 });
  };

  return (
    <div className="ingrediente">
      <h3>Ingrediente</h3>
      {eroarePas2 && <div className="textEroare">{eroarePas2}</div>}

      <div className="ingredienteLista">
        {ingrediente.map((ing, index) => (
          <div key={ing.id} className="ingredienteRind">
            <div className="grupInputTabel">
              <input
                type="text"
                placeholder="Ex: Faina"
                className={
                  atins[`ingrediente.${index}.nume`] && !ing.nume
                    ? "inputEroare"
                    : ""
                }
                value={ing.nume}
                onBlur={() => iesire(`ingrediente.${index}.nume`)}
                onChange={(e) =>
                  verifSaNuFieNegativ(ing.id, "nume", e.target.value)
                }
              />
              {atins[`ingrediente.${index}.nume`] && !ing.nume && (
                <span className="textEroare">Nume obligatoriu</span>
              )}
            </div>

            <div className="grupInputTabel">
              <input
                type="number"
                placeholder="Cant."
                className={`inputMic ${atins[`ingrediente.${index}.cantitate`] && !ing.cantitate ? "inputEroare" : ""}`}
                value={ing.cantitate}
                onBlur={() => iesire(`ingrediente.${index}.cantitate`)}
                onChange={(e) =>
                  verifSaNuFieNegativ(ing.id, "cantitate", e.target.value)
                }
              />
              {atins[`ingrediente.${index}.cantitate`] && !ing.cantitate && (
                <span className="textEroare">Necesar</span>
              )}
            </div>

            <div className="grupInputTabel">
              <select
                className={`selectUnitate ${atins[`ingrediente.${index}.unitate`] && !ing.unitate ? "inputEroare" : ""}`}
                value={ing.unitate}
                onBlur={() => iesire(`ingrediente.${index}.unitate`)}
                onChange={(e) =>
                  verifSaNuFieNegativ(ing.id, "unitate", e.target.value)
                }
              >
                <option value="">Unitate</option>
                {unitati.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.label}
                  </option>
                ))}
              </select>
              {atins[`ingrediente.${index}.unitate`] && !ing.unitate && (
                <span className="textEroare">Alege</span>
              )}
            </div>

            <button
              className="stergeBtn"
              onClick={() => dispatch({ tip: "sterge_ingredient", id: ing.id })}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        ))}
      </div>

      <button className="adaugaBtn" onClick={adaugaIngredient}>
        <i className="fa-solid fa-plus"></i> Adauga Ingredient
      </button>

      <div className="butoaneInstructiuni">
        <button
          className="inapoiBtn"
          onClick={() => dispatch({ tip: "set_pas", pas: 1 })}
        >
          <i className="fa-solid fa-arrow-left"></i> Inapoi
        </button>

        <button className="continuaBtn" onClick={paginaUrmatoare}>
          Continua <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}
export default Pagina2;
