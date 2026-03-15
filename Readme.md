# Crearea unui Formular Multi-Step cu Vizualizare Live în React

## Cerințe Generale

### Configurare Proiect
- Creează un proiect `React` folosind `Vite`.
- Folosește fișiere `.json` pentru a stoca datele statice necesare formularului (e.g., opțiuni pentru select-uri, liste de elemente pentru checkbox-uri, configurații de culori/teme etc.).

### Tematica
- **Fiecare student își alege propria tematică** pentru formularul multi-step. Tematica trebuie să fie unică și suficient de complexă pentru a acoperi toate cerințele tehnice de mai jos.
- Exemple orientative: configurator de vehicul, planificator de călătorie, formular de înscriere la eveniment, constructor de profil de personaj, formular de comandă restaurant, aplicație de adopție animale, configurator PC, planificator de fitness etc.
- **Nu se acceptă** tematica identică cu exemplul demonstrativ prezentat mai jos.

### Interfață Utilizator (UI) & Experiență
- Stilizarea se poate face cu CSS pur / CSS Modules sau biblioteci externe (e.g., Tailwind, Material-UI).
- Interfața trebuie să fie curată, funcțională și plăcută vizual.

---

## Funcționalități

### 1. Formular Multi-Step (minim 3 pași + pas de recapitulare)

- Formularul trebuie să conțină **minim 3 pași de completare** + **1 pas final de recapitulare/review**.
- Fiecare pas colectează un grup logic de informații (e.g., date personale, preferințe, configurare, confirmare).
- Afișează un **indicator de progres** (stepper/progress bar) care arată pasul curent și starea fiecărui pas (completat, curent, necompletat).
- **Navigare înainte/înapoi** între pași:
  - Navigarea **înainte** este permisă **doar dacă** pasul curent nu conține erori de validare.
  - Navigarea **înapoi** este permisă oricând, fără validare.

### 2. Tipuri de Input-uri (minim 5 tipuri diferite)

Formularul trebuie să utilizeze **cel puțin 5 tipuri diferite** de input-uri din lista de mai jos:

| Tip | Exemple |
|-----|---------|
| `text` | Nume, email, adresă |
| `number` / `range` | Cantitate, buget, vârstă |
| `select` | Categorie, țară, tip |
| `radio` | Alegere unică (gen, plan, culoare) |
| `checkbox` | Alegeri multiple (opțiuni, preferințe, termeni) |
| `textarea` | Comentarii, descriere, note |
| `date` | Data nașterii, data evenimentului |

- Opțiunile pentru `select`, `radio` și `checkbox` trebuie **încărcate din fișiere `.json`**.

### 3. Validare cu Errors și Touched

- Implementează un **sistem complet de validare** cu două concepte cheie:
  - **`errors`** — mesajele de eroare derivate din starea curentă.
  - **`touched`** — marchează câmpurile care au fost "atinse" de utilizator (prin `onBlur` sau la apăsarea butonului "Next").

- **Regulile de afișare a erorilor:**
  - Erorile se afișează **doar pentru câmpurile touched**.
  - La apăsarea butonului **"Next"**, toate câmpurile din pasul curent devin automat `touched`.
  - Mesajele de eroare trebuie să fie vizibile și clare (text roșu, border colorat etc.).

- **Validări necesare (minim):**
  - Câmpuri obligatorii (required).
  - Validare de format (e.g., lungime minimă, pattern email).
  - Cel puțin o validare între câmpuri sau la nivel de pas (e.g., "selectați cel puțin 2 opțiuni", "data de sfârșit trebuie să fie după data de început").

### 4. State Management cu Context + useReducer

- **Obligatoriu:** Întreaga stare a formularului trebuie gestionată prin pattern-ul **Context API + useReducer**.
- Creează:
  - Un **`FormContext`** (sau denumire specifică temei) cu doi provideri separați:
    - `StateContext` — pentru citirea stării.
    - `DispatchContext` — pentru dispatch-ul acțiunilor.
  - Un **reducer** cu acțiuni clare și bine definite (minim 6 tipuri de acțiuni).
  - **Custom hooks** (`useFormState()`, `useFormDispatch()`) pentru acces ușor din componente.

- **Acțiuni necesare (minim):**

| Acțiune | Descriere |
|---------|-----------|
| `SET_FIELD` | Actualizează valoarea unui câmp |
| `TOUCH_FIELD` | Marchează un câmp ca `touched` |
| `VALIDATE_STEP` | Marchează toate câmpurile din pasul curent ca `touched` |
| `SET_STEP` | Navighează la un alt pas (cu validare la navigare înainte) |
| `RESET` | Resetează formularul la starea inițială |
| + altele | Acțiuni specifice temei alese (e.g., adăugare/ștergere element dintr-o listă, toggle opțiune etc.) |

- Toate actualizările de state trebuie să fie **imutabile** (spread operator, `.map()`, `.filter()` — fără mutații directe).

### 5. Vizualizare Live

- Afișează un **panou lateral** sau o **secțiune vizibilă permanent** care arată în timp real datele completate în formular.
- Preview-ul se actualizează **instant** la fiecare modificare a unui câmp.
- Preview-ul trebuie să fie **vizual diferit** de formular (nu o simplă copie a câmpurilor, ci o reprezentare stilizată a datelor — card, banner, sumar vizual etc.).
- Preview-ul este vizibil pe **toți pașii** formularului.

### 6. Pasul de Review și Submit

- Ultimul pas afișează un **sumar read-only** al tuturor datelor completate, organizat pe secțiuni.
- Buton de **Submit** care marchează formularul ca trimis.
- După submit, afișează un **mesaj de confirmare/succes** (banner, animație, pagină de confirmare etc.).

---

## Barem de notare

| Punctaj | Sarcina |
|---------|---------|
| 1 | Crearea corectă a proiectului (Vite + React) și structura fișierelor |
| 1 | Utilizarea fișierelor `.json` pentru date statice (opțiuni select/radio/checkbox) |
| 1 | UI plăcut și funcțional (stilizare coerentă, responsive minimal) |
| 1 | Utilizarea a minim 5 tipuri diferite de input-uri |
| 1 | Implementarea corectă a Context API + useReducer (state + dispatch separate, custom hooks) |
| 1 | Reducer cu acțiuni imutabile și bine structurate (minim 6 acțiuni) |
| 1 | Sistem de validare cu `errors` derivate + `touched` (afișare condiționată a erorilor) |
| 1 | Navigare multi-step cu validare (stepper, blocare la erori, navigare liberă înapoi) |
| 1 | Vizualizare live (preview lateral actualizat în timp real) |
| 1 | Pas de review + submit cu confirmare |

### Link de exemplu de soluție: [Party Roster Builder](https://lab7-react-example.vercel.app/)

## !! BAREM-UL DE MAI SUS ESTE PENTRU VERIFICAREA INIȚIALĂ A LABORATORULUI — LA ÎNCĂRCAREA ACESTUIA PE GITHUB. NOTA FINALĂ POATE FI MODIFICATĂ ÎN DEPENDENȚA APĂRĂRII LABORATORULUI ÎN CADRUL ORELOR !!

## !! NU SE ACCEPTĂ ÎNTÂRZIERI !!
