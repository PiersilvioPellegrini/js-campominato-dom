// varibaile del bottone
const btnPLay = document.querySelector(".btn-play");
const difficoltà = document.querySelector('[name="difficoltà"]');
let contatore = 0;
let bombs;
// let contatore = 0

// evento sul bottone in cui richiamo la fuzione generaGrigliaCelle();
btnPLay.addEventListener("click", function () {
  let cells;

  //   CONDIZIONE PER ASSEGNARE IL VALORE DELLE CELLE IN BASE ALLA DIFFICOLTÀ
  if (difficoltà.value === "Facile") {
    generaGrigliaCelle(10);
    cells = 100;
  } else if (difficoltà.value === "Medio") {
    generaGrigliaCelle(9);
    cells = 81;
  } else if (difficoltà.value === "Difficile") {
    generaGrigliaCelle(7);
    cells = 49;
  }
  bombs = generateBombList(cells, 16);
  console.log(bombs);
});

/**
 *
 * @param {number} min
 * @param {number} max
 * @returns {number} - numero random
 */

// funzione che genera un numero random
function generateRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
   * nella funzione passiamao come argomento il valore massimo che i numeri randomici possono assumere
        
    * @param {number} totalCells - numero di celle totali
    * @param {Array} bombList - array contenente i numeri casuali delle bombe
    * @return {Array} - array di numeri randomici
   */

function generateBombList(totalCells, numBomb) {
  const bombList = [];

  while (bombList.length < numBomb) {
    const num = generateRandomNum(1, totalCells);
    // se il numero non è presente nell'array lo inserisco
    if (!bombList.includes(num)) {
      bombList.push(num);
    }
  }
  return bombList;
}

/**
 * 
 * 
      
  * @this {HTMLDivElement} - 
 */


function oncellCLick() {
  // creo una variabile a cui assegno il valore dell'elemento cliccato
  const numInsideCell = +this.dataset.numeroCella;
  // se il numero all'interno della cella è presente nell'array delle bombe

  if (bombs.includes(numInsideCell)) {
    // la partita finisce
    this.classList.add("bg-red");
    alert("Hai trovato una bomba dopo "+": " + contatore + " " + "tentativi");
  } else {
    this.classList.add("bg-celeste");
    contatore++;
    console.log(contatore);
  }
}

/**
 *
 * @param {number} numCelleRiga Numero di celle da generare ogni riga
 * @param {number} totalCells Numero di celle totali da generare
 * @returns {number} Numero di celle totali
 *
 */

// FUNZIONE CHE GENERA LE CELLE
function generaGrigliaCelle(numCelleRiga) {
  // variabile che contiene il valore delle celle da generare
  const totalCells = numCelleRiga * numCelleRiga;

  const container = document.querySelector(".container-cells");
  // resetto il contenuto del contenitore
  container.innerHTML = "";
  // ciclo che crea le celle base al valore delle celle totali
  for (let i = 0; i < totalCells; i++) {
    // creaziione elemento div
    const cell = document.createElement("div");
    // aggiungo la classe cell
    cell.classList.add("cell");
    // aggiungo style inline
    cell.style.flexBasis = `calc(100% / ${numCelleRiga})`;

    // inserisco il contenuto nella cella (i)
    //cell.innerHTML = i + 1;

    // creo un attributo personalizzato sull'elememto html
    cell.dataset.numeroCella = i + 1;

    // padding inline
    container.style.padding = "80px 0";

    // creo evento sull'elemento cella sinìgola
    cell.addEventListener("click", oncellCLick);
    
    // cell.addEventListener("click", contatore);

    // aggiungo la cella al contenitore
    container.appendChild(cell);
  }
  return totalCells;
}


