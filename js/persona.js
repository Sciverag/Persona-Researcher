const body = document.querySelector("body");
const arcana = document.getElementById("arcanaText");
const personaName = document.getElementById("nameText");
const level = document.getElementById("level");
const cardTransition = document.getElementById("cardTransition");
const backTransition = document.getElementById("backTransition");
const toggleSound = document.getElementById("toggleSound");
const hoverSound = document.getElementById('hoverSound');
const personaHoverSound = document.getElementById('personaHoverSound');
const invalidSound = document.getElementById('invalidSound');
const nextPageSound = document.getElementById('nextPageSound');
const arcanaSound = document.getElementById('arcanaSound');
const backgroundMusic = document.getElementById('backgroundMusic');
const loader = document.createElement("div");
loader.setAttribute("id","loader");
let favoritePersonas = new Array(0);
let soundEnabled = false;
let selectedPersona;

cardTransition.style.display = "block";
backTransition.style.display = "block";

setTimeout(() => {
    cardTransition.style.display = "none";
    backTransition.style.display = "none";
}, 2000);

if(localStorage.getItem("FavoritePersonas")){
    favoritePersonas = JSON.parse(localStorage.getItem("FavoritePersonas"));
}else{
    localStorage.setItem("FavoritePersonas",JSON.stringify([]));
}

if(localStorage.getItem("SelectedPersona")){
    console.log("obtainingPersona");
    body.appendChild(loader);
    fetch("https://persona-compendium.onrender.com/personas/"+localStorage.getItem("SelectedPersona")+"/", {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => asignPersona(data))
    .catch(error => console.error(error));
}else{
    window.location.href = "home.html";
}


backgroundMusic.volume = 0;
hoverSound.volume = 0;
invalidSound.volume = 0;
personaHoverSound.volume = 0;
nextPageSound.volume = 0;
arcanaSound.volume = 0;

toggleSound.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    const volumeIcon = document.getElementById("volumeIcon");

    if (soundEnabled) {
        backgroundMusic.play();
        backgroundMusic.volume = 0.2;
        hoverSound.volume = 0.5;
        invalidSound.volume = 0.5;
        personaHoverSound.volume = 0.1;
        nextPageSound.volume = 0.2;
        arcanaSound.volume = 0.2;
        volumeIcon.innerText = "volume_up";
        toggleSound.setAttribute("active","");
    } else {
        backgroundMusic.volume = 0;
        hoverSound.volume = 0;
        invalidSound.volume = 0;
        personaHoverSound.volume = 0;
        nextPageSound.volume = 0;
        arcanaSound.volume = 0;
        volumeIcon.innerText = "volume_off";
        toggleSound.removeAttribute("active");
    }
});

toggleSound.addEventListener("mouseenter", () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
});

function asignPersona(data){
    body.removeChild(loader);
    selectedPersona = data;
    showInfo()
}

function showInfo(){
    arcana.innerText = selectedPersona.arcana;
    personaName.innerText = selectedPersona.name;
    level.innerText += " " + selectedPersona.level;
}