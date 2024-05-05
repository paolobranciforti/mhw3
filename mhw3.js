
function onJson(json) {
    console.log('JSON ricevuto');
    console.log(json);
    // Svuotiamo la libreria
    const library = document.querySelector('#album-view');
    library.innerHTML = '';
    // Leggi il numero di risultati
    const results = json.albums.items;
    let num_results = results.length;
    // Mostriamone al massimo 10
    if(num_results > 10)
    num_results = 10;
    // Processa ciascun risultato
    for(let i=0; i<num_results; i++)
    {
      // Leggi il documento
    const album_data = results[i]
      // Leggiamo info
    const title = album_data.name;
    const selected_image = album_data.images[0].url;
      // Creiamo il div che conterrà immagine e didascalia
    const album = document.createElement('div');
    album.classList.add('album');
      // Creiamo l'immagine
    const img = document.createElement('img');
    img.src = selected_image;
      // Creiamo la didascalia
    const caption = document.createElement('span');
    caption.textContent = title;
      // Aggiungiamo immagine e didascalia al div
    album.appendChild(img);
    album.appendChild(caption);
      // Aggiungiamo il div alla libreria
    library.appendChild(album);
    }
}

function onResponse(response) {
console.log('Risposta ricevuta');
return response.json();
}

function search(event){
    // Impedisci il submit del form
    event.preventDefault();
    // Leggi valore del campo di testo
    const album_input = document.querySelector('#album');
    const album_value = encodeURIComponent(album_input.value);
    console.log('Eseguo ricerca: ' + album_value);
    // Esegui la richiesta
    fetch("https://api.spotify.com/v1/search?type=album&q=" + album_value,{
        headers:{
        'Authorization': 'Bearer ' + token
        }
    }).then(onResponse).then(onJson);
}

function onTokenJson(json){
    console.log(json)
    // Imposta il token global
    token = json.access_token;
}

function onTokenResponse(response){
    return response.json();
}

  // OAuth credentials --- NON SICURO!
const client_id = 'XXXXXXXXXXXXXXXXXXXXXXXXX';
const client_secret = 'YYYYYYYYYYYYYYYYYYYYYYYYY';
  // Dichiara variabile token
let token;
  // All'apertura della pagina, richiediamo il token
fetch("https://accounts.spotify.com/api/token",
    {
    method: "post",
    body: 'grant_type=client_credentials',
    headers:{
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
    }
}).then(onTokenResponse).then(onTokenJson);
// Aggiungi event listener al form
const form = document.querySelector('form');
form.addEventListener('submit', search);




//funzione per cambiare l'immagine e il testo della promo widget quando si clicca sul bottone rosso
function scopriPWC(event) {
    const nuovo_h2 = document.createElement('h2');
    nuovo_h2.textContent = '';
    const nuovo_h3 = document.createElement('h3');
    nuovo_h3.textContent = 'F.Bagnaia è caduto e ha vinto J.Martin, seguito da E.Bastianini e il mitico P.Acosta';
    const nuova_img = document.createElement('img');
    nuova_img.src = 'https://resources.motogp.pulselive.com/photo-resources/2024/03/24/aa27bf97-607a-43e1-a6f0-bc63b1ee66b6/report_MGP-RACE.jpg?width=800&height=450';
    const nuovo_pwc_container = document.querySelector('.promo-widget-container');
    nuovo_pwc_container.innerHTML = '';
    nuovo_pwc_container.appendChild(nuovo_h2);
    nuovo_pwc_container.appendChild(nuovo_h3);
    nuovo_pwc_container.appendChild(nuova_img);
}
const nuovoPWC = document.querySelector('.promo-widget-text a');
nuovoPWC.addEventListener('click', scopriPWC);



//funzione per cambiare l'immagine del fantasy motogp quando si clicca sull'immagine
function changeFantasy(event){
  const imageFantasy = event.currentTarget;
  imageFantasy.removeEventListener('click',changeFantasy)
  const fantasyOne = document.querySelector('.fantasy-widget-foto');
  const fantasyTwo = document.querySelector('#fantasy-second-image');
  fantasyOne.classList.add('hidden');
  fantasyTwo.classList.remove('hidden');
}
const imageFantasy=document.querySelector('.fantasy-widget-foto img');
imageFantasy.addEventListener('click',changeFantasy);


//funzione per cambiare immagine e testo del single promo quando si clicca sul bottone rosso
function scopriSPC(event) {
  const nuovo_h2_spc = document.createElement('h2');
  nuovo_h2_spc.textContent = '';

  const nuovo_h3_spc  = document.createElement('h3');
  nuovo_h3_spc.textContent = 'Loro sono i campioni di Valencia 2022';

  const nuova_img_spc  = document.createElement('img');
  nuova_img_spc.src = 'https://resources.motogp.pulselive.com/photo-resources/2023/03/30/529bcb84-c456-4257-970d-b94689da910a/g29RxTCj.jpg?width=2880&height=1620';

  const nuovo_spc_container = document.querySelector('.single-promo-container');
  nuovo_spc_container.innerHTML = '';
  
  nuovo_spc_container.appendChild(nuovo_h2_spc);
  nuovo_spc_container.appendChild(nuovo_h3_spc);
  nuovo_spc_container.appendChild(nuova_img_spc);
}

const nuovoSPC = document.querySelector('.single-promo-text a');
nuovoSPC.addEventListener('click', scopriSPC);

/*
// funzione per zoomare momentaneamente sulle immagini del tickets quando si passa con il mouse sopra
const immaginez = document.getElementById('.tickets-element img');
immaginez.addEventListener('mouseover', () => {
    immaginez.style.transform = 'scale(1.5)';
});

immaginez.addEventListener('mouseout', () => {
    immaginez.style.transform = 'scale(1)';
});
*/


//funzione per cambiare momentaneamente l'immagine dei piloti quando si passa con il mouse sopra
function changepilota(event) {
  // per trovare il data-index del div su cui è avvenuto l'evento
  const index = event.target.getAttribute('data-index');
  // per ottenere l'immagine all'interno del div
  const img = event.target.querySelector('img');
  console.log(index);
  switch(index){
      case '0':
          img.src = "https://resources.motogp.pulselive.com/photo-resources/2024/03/19/97518882-02b5-4102-9a9f-040a262b73fa/_LGZ1807.jpg?width=800&height=450";
          break;
      
      case '1':
          img.src = "https://resources.motogp.pulselive.com/photo-resources/2024/03/08/6c0d7fab-381a-4ca8-a8e4-4baae319fb42/_LG94128.jpg?width=800&height=450";
          break;

      case '2':
          img.src = "https://resources.motogp.pulselive.com/photo-resources/2024/03/24/6a38784f-105f-4abf-a64c-9f98e698824f/DS_05974-1-.jpg?width=800&height=450";
          break;

      case '3':
          img.src = "https://resources.motogp.pulselive.com/photo-resources/2023/08/20/7bd2635f-5e1d-4e22-96c5-4a0eca9eb4d5/_LG96079.jpg?height=510&width=800";
          break;
      
      default:
          console.log(`Non ho trovato l'indice`);
  }
}

function restorepilota(event) {
  const index = event.target.getAttribute('data-index');
  // Ottieni l'immagine all'interno del div
  const img = event.target.querySelector('img');
  switch(index){
      case '0':
          img.src = "https://resources.motogp.pulselive.com/photo-resources/2024/03/07/46c65a83-f2bf-42cc-afe3-727ad13f9759/01-bagnaia-profile-card.png?width=280&height=420";
          break;
      
      case '1':
          img.src = "https://resources.motogp.pulselive.com/photo-resources/2024/03/07/7ad40c9e-1a2b-490a-ab50-69dd1a52acd3/89-martin-profile-card.png?width=280&height=420";
          break;

      case '2':
          img.src = "https://resources.motogp.pulselive.com/photo-resources/2024/03/07/0ca47f8a-953f-41fc-9afe-d99acadb3773/mgp-card-riders-profile-31-PAacp.png?width=280&height=420";
          break;

      case '3':
          img.src = "https://resources.motogp.pulselive.com/photo-resources/2024/03/07/de854d5c-f948-4cb1-9472-fc985c7b908e/72-bezzecchi-profile-card.png?width=280&height=420";
          break;
      
      default:
          console.log(`Non ho trovato l'indice`);
  }
}
// prende tutti i div con classe ".piloti"
const pilotiDivs = document.querySelectorAll('.pilota');
// Aggiungi event listeners a ciascun div
pilotiDivs.forEach(div => {
  div.addEventListener('mouseenter', changepilota);
  div.addEventListener('mouseleave', restorepilota);
});




/*
info piloti
const options = {method: 'GET', headers: {accept: 'application/json',"Access-Control-Allow-Origin": "*"}};

fetch('https://api.sportradar.com/motogp/trial/v2/en/competitors/sr%3Acompetitor%3A49401/profile.json?api_key=wg6haETHJV5BM72O75ZCo5GZjnuxcbzF2BHdpjmo', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

*/
// Seleziona il pulsante per il Portogallo
const btnPortogallo = document.getElementById('btn_portogallo');
const btnAmerica = document.getElementById('btn_america');
const btnSpagna = document.getElementById('btn_spagna');

// Aggiungi un gestore di eventi click a tutti e tre i pulsanti
btnPortogallo.addEventListener('click', handleClick);
btnAmerica.addEventListener('click', handleClick);
btnSpagna.addEventListener('click', handleClick);

// Funzione gestore per il click del pulsante
function handleClick() {
    // Ottieni i valori degli attributi lat e lon specifici per il pulsante cliccato
    const lat = this.getAttribute('lat');
    const lon = this.getAttribute('lon');

    // Chiamata alla tua funzione con lat e lon come parametri
    console.log('Latitudine:', lat);
    console.log('Longitudine:', lon);
    getMeteo(lat, lon);
}

// Funzione getMeteo che accetta lat e lon come parametri
async function getMeteo(lat, lon) {
    const url = `https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${lon}&lat=${lat}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);
        console.log(json["data"][0]["city_name"]); //per debug
        costruisciTabellaMeteo(json);
        // Esegui altre operazioni con i dati ottenuti
    } catch (error) {
        console.error(error);
    }
}

function costruisciTabellaMeteo(json){
    const tableBody = document.querySelector('#meteoTable tbody');

    tableBody.innerHTML = "";

    // Crea una riga per ogni città nei dati
    const row = document.createElement('tr');

    // Aggiungi le celle con i dati
    const cityNameCell = document.createElement('td');
    cityNameCell.textContent = json["data"][0]["city_name"];
    row.appendChild(cityNameCell);

    const tempCell = document.createElement('td');
    tempCell.textContent = json["data"][0]["app_temp"];
    row.appendChild(tempCell);

    const weatherCell = document.createElement('td');
    weatherCell.textContent = json["data"][0]["weather"]["description"];
    row.appendChild(weatherCell);

    // Aggiungi la riga alla tabella
    tableBody.appendChild(row);
}
