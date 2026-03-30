import { createContext, useContext, useReducer } from "react";

const StareContext = createContext(null);
const DispatchContext = createContext(null);

const stareInitiala = {
  pasActual: 1,
  trimis: false,
  eroarePas2: "",
  eroarePas3: "",
  detalii: {
    nume: "",
    autor: "",
    culoare: "",
    caracteristici: [],
    tipMasa: "",
  },
  ingrediente: [],
  atins: {},
};

const reducer = (stare, actiune) => {
  switch (actiune.tip) {
    case "set_camp":
      return {
        ...stare,
        [actiune.grup]: {
          ...stare[actiune.grup],
          [actiune.camp]: actiune.valoare,
        },
      };

    case "set_pas":
      return { ...stare, pasActual: actiune.pas };

    case "atinge_camp":
      return {
        ...stare,
        atins: { ...stare.atins, [actiune.cheie]: true },
      };

    case "atinge_tot_pasul": {
      const campuriNoi = {};
      actiune.campuri.forEach((c) => {
        campuriNoi[c] = true;
      });
      return { ...stare, atins: { ...stare.atins, ...campuriNoi } };
    }

    case "apasa_caracteristica": {
      const exista = stare.detalii.caracteristici.includes(actiune.valoare);
      return {
        ...stare,
        detalii: {
          ...stare.detalii,
          caracteristici: exista
            ? stare.detalii.caracteristici.filter((c) => c !== actiune.valoare)
            : [...stare.detalii.caracteristici, actiune.valoare],
        },
      };
    }

    case "adauga_ingredient":
      return {
        ...stare,
        ingrediente: [
          ...stare.ingrediente,
          {
            id: Math.random() + Date.now(),
            nume: "",
            cantitate: "",
            unitate: "",
            optiuniSelectate: [],
          },
        ],
      };

    case "modifica_ingredient":
      return {
        ...stare,
        ingrediente: stare.ingrediente.map((ing) =>
          ing.id === actiune.id
            ? { ...ing, [actiune.camp]: actiune.valoare }
            : ing,
        ),
      };

    case "sterge_ingredient":
      return {
        ...stare,
        ingrediente: stare.ingrediente.filter((ing) => ing.id !== actiune.id),
      };

    case "bifeaza_optiune":
      return {
        ...stare,
        ingrediente: stare.ingrediente.map((ing) => {
          if (ing.id === actiune.ingredientId) {
            const optiuniExistente = ing.optiuniSelectate || [];
            let exista = false;
            for (let i = 0; i < optiuniExistente.length; i++) {
              if (optiuniExistente[i].id === actiune.optiune.id) {
                exista = true;
                break;
              }
            }

            return {
              ...ing,
              optiuniSelectate: exista
                ? optiuniExistente.filter((o) => o.id !== actiune.optiune.id)
                : [...optiuniExistente, actiune.optiune],
            };
          }
          return ing;
        }),
      };

    case "trimite":
      return { ...stare, trimis: true };

    case "resetare":
      return { ...stareInitiala };

    case "set_eroare_pas2":
      return { ...stare, eroarePas2: actiune.mesaj };

    case "set_eroare_pas3":
      return { ...stare, eroarePas3: actiune.mesaj };

    default:
      return stare;
  }
};
export function RetetaProvider({ children }) {
  const [stare, dispatch] = useReducer(reducer, stareInitiala);
  return (
    <StareContext.Provider value={stare}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StareContext.Provider>
  );
}

export function useRetetaStare() {
  return useContext(StareContext);
}

export function useRetetaDispatch() {
  return useContext(DispatchContext);
}
