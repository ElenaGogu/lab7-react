import React from "react";
import "./Pagina1.css";
import culori from "../../../data/culori.json";
import caracteristici from "../../../data/caracteristici.json";
import {useRetetaStare, useRetetaDispatch} from "../RetetaContext/RetetaContext";

function Pagina1() {
  const { detalii, atins } = useRetetaStare();
  const dispatch = useRetetaDispatch();

  const continua = () => {
    dispatch({
      tip: "atinge_tot_pasul",
      campuri: [
        "detalii.nume",
        "detalii.autor",
        "detalii.culoare",
        "detalii.caracteristici",
        "detalii.tipMasa",
      ],
    });

    const numeIntrodus = detalii.nume && detalii.nume.trim() !== "";
    const autorIntrodus = detalii.autor && detalii.autor.trim() !== "";
    const culoareBifata = detalii.culoare !== "";
    const caracteristiciBifate = detalii.caracteristici.length > 0;
    const tipMasaSelectat = detalii.tipMasa !== "";

    if (
      numeIntrodus &&
      autorIntrodus &&
      culoareBifata &&
      caracteristiciBifate &&
      tipMasaSelectat
    ) {
      dispatch({ tip: "set_pas", pas: 2 });
      console.log("Sunt completate");
    }
  };

  return (
    <div className="containerPagina1">
      <div className="inputGrup">
        <label>Denumirea Retetei</label>
        <input
          type="text"
          placeholder="Ex: Briose"
          className={
            atins["detalii.nume"] && !detalii.nume ? "inputEroare" : ""
          }
          value={detalii.nume}
          onBlur={() => dispatch({ tip: "atinge_camp", cheie: "detalii.nume" })}
          onChange={(e) => {
            const valoare = e.target.value;
            if (valoare === "" || /^[a-zA-Z\s]+$/.test(valoare)) {
            dispatch({
              tip: "set_camp",
              grup: "detalii",
              camp: "nume",
              valoare: valoare,
            })
          }
        }
          }
        />
        {atins["detalii.nume"] && !detalii.nume && (
          <span className="textEroare">Camp obligator</span>
        )}
      </div>

      <div className="grupImputuri">
        <label>Autor</label>
        <input
          type="text"
          placeholder="Ex: Gogu Elena"
          className={
            atins["detalii.autor"] && !detalii.autor ? "inputEroare" : ""
          }
          value={detalii.autor || ""}
          onBlur={() =>
            dispatch({ tip: "atinge_camp", cheie: "detalii.autor" })
          }
          onChange={(e) => {
            const valoare = e.target.value;
            if (valoare === "" || /^[a-zA-Z\s]+$/.test(valoare)) {
            dispatch({
              tip: "set_camp",
              grup: "detalii",
              camp: "autor",
              valoare: valoare,
            })
          }
        }
      }
        />
        {atins["detalii.autor"] && !detalii.autor && (
          <span className="textEroare">Camp obligator</span>
        )}
      </div>

      <div className="banerCulori">
        <label className="denumBan">Baner cu culori</label>
        <div className="culoriBtn">
          {culori.map((culoare, index) => (
            <div
              key={index}
              className={`butonCuloare ${detalii.culoare === culoare.nume ? "activ" : ""}`}
              onClick={() => {
                dispatch({
                  tip: "set_camp",
                  grup: "detalii",
                  camp: "culoare",
                  valoare: culoare.nume,
                });
              }}
            >
              <span
                className="cercCuloare"
                style={{ backgroundColor: culoare.hex }}
              ></span>
              <span className="numeCuloare">{culoare.nume}</span>
            </div>
          ))}
        </div>
        {atins["detalii.culoare"] && !detalii.culoare && (
          <span className="textEroare">Alege o culoare</span>
        )}
      </div>

      <div className="alegem">
        <label className="denumBan">Alegem caracteristici</label>
        <div className="listaDeAalege">
          {caracteristici.map((bife, index) => (
            <div key={index} className="bifaLista">
              <input
                type="checkbox"
                className="alegemBifam"
                checked={detalii.caracteristici.includes(bife)}
                onChange={() =>
                  dispatch({ tip: "apasa_caracteristica", valoare: bife })
                }
              />
              <label>{bife}</label>
            </div>
          ))}
        </div>
        {atins["detalii.caracteristici"] &&
          detalii.caracteristici.length === 0 && (
            <span className="textEroare">Selecteaza minim o optiune</span>
          )}
      </div>

      <div className="tipMasaGrup">
        <label className="denumBan">Tipul Mesei</label>
        <div className="radioGrup">
          {["Mic Dejun", "Pranz", "Cina"].map((tip) => (
            <label key={tip} className="radioLabel">
              <input
                type="radio"
                name="tipMasa"
                value={tip}
                checked={detalii.tipMasa === tip}
                onChange={(e) =>
                  dispatch({
                    tip: "set_camp",
                    grup: "detalii",
                    camp: "tipMasa",
                    valoare: e.target.value,
                  })
                }
              />
              {tip}
            </label>
          ))}
        </div>
        {atins["detalii.tipMasa"] && !detalii.tipMasa && (
          <span className="textEroare">Te rugam sa alegi tipul mesei</span>
        )}
      </div>

      <button className="butonContinua" onClick={continua}>
        Continua <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
}
export default Pagina1;
