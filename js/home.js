const personaContainer = document.getElementById("personaContainer");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const pageNumbers = document.getElementById("pageNumbers");
const toggleSound = document.getElementById("toggleSound");
const arcanaText = document.getElementById("arcana");
const arcanaButton = document.getElementById("central");
const nameSearcher = document.getElementById("nameSearcher");
const hoverSound = document.getElementById('hoverSound');
const personaHoverSound = document.getElementById('personaHoverSound');
const invalidSound = document.getElementById('invalidSound');
const nextPageSound = document.getElementById('nextPageSound');
const arcanaSound = document.getElementById('arcanaSound');
const backgroundMusic = document.getElementById('backgroundMusic');
const loader = document.createElement("div");
let personaList;
let originalPersonaList;
let arcanaList = ['All','Fool','Magician','Priestess','Empress','Emperor','Hierophant','Lovers','Chariot','Justice','Hermit','Fortune','Strength','Hanged','Death','Temperance','Devil','Tower','Star','Moon','Sun','Judgement','Aeon'];
let currentArcanaID = 0;
let personasLoaded = false;
let soundEnabled = false;
let firstSearched = false;
loader.setAttribute("id","loader");

let personaSizeStart = 0;
let personaSizeEnd = 13;
let totalOfPersonas;

if(localStorage.getItem("PersonaName")){
    nameSearcher.value = localStorage.getItem("PersonaName");
}else{
    localStorage.setItem("PersonaName","");
}

fetch("https://persona-compendium.onrender.com/personas/", {
    method: 'GET'
})
.then(result => result.json())
.then(data => assignPersonas(data))
.catch(error => console.error(error));

backgroundMusic.volume = 0;
hoverSound.volume = 0;
invalidSound.volume = 0;
personaHoverSound.volume = 0;
nextPageSound.volume = 0;

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


previous.addEventListener("click", () => {
    if (personaSizeStart > 0 && personasLoaded) {
        firstSearched = false;
        if(personaSizeEnd == totalOfPersonas - 1){
            personaSizeEnd = personaSizeStart + 13;
        }
        personaSizeStart -= 14;
        personaSizeEnd -= 14;
        pageNumbers.innerText = (personaSizeStart + 1) + " - " + (personaSizeEnd + 1);
        obtainPersonas();
        nextPageSound.currentTime = 0;
        nextPageSound.play();
    }else{
        invalidSound.currentTime = 0;
        invalidSound.play();
        previous.setAttribute("invalid","true");
        setTimeout(() => {
            previous.removeAttribute("invalid");
        }, 200);
    }
})

previous.addEventListener("mouseenter", () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
})

next.addEventListener("click", () => {
    if (personaSizeStart < totalOfPersonas - 13 && personasLoaded) {
        firstSearched = false;
        personaSizeStart += 14;
        personaSizeEnd += 14;
        if(personaSizeEnd >= totalOfPersonas){
            personaSizeEnd = totalOfPersonas -1;
        }
        pageNumbers.innerText = (personaSizeStart + 1) + " - " + (personaSizeEnd + 1);
        obtainPersonas();
        nextPageSound.currentTime = 0;
        nextPageSound.play();
    }else{
        invalidSound.currentTime = 0;
        invalidSound.play();
        next.setAttribute("invalid","true");
        setTimeout(() => {
            next.removeAttribute("invalid");
        }, 200);
    }
})

next.addEventListener("mouseenter", () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
});

arcanaButton.addEventListener("mouseenter", () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
})

arcanaButton.addEventListener("click", () => {
    if(personasLoaded){
        if(currentArcanaID == arcanaList.length - 1){
            currentArcanaID = 0;
        }else{
            currentArcanaID++;
        }
    
        arcanaButton.setAttribute("pressed","");
        arcanaSound.currentTime = 0;
        arcanaSound.play();
        setTimeout(() => {
            arcanaText.innerText = arcanaList[currentArcanaID];
        }, 500);
        setTimeout(() => {
            arcanaButton.removeAttribute("pressed");
            filterByArcana();
        }, 1000);
    }else{
        invalidSound.currentTime = 0;
        invalidSound.play();
        arcanaButton.setAttribute("invalid","true");
        setTimeout(() => {
            arcanaButton.removeAttribute("invalid");
        }, 200);
    }
});

nameSearcher.addEventListener("mouseenter", () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
})

nameSearcher.addEventListener("change", () => {
    if(personasLoaded){
        firstSearched = true;
        localStorage.setItem("PersonaName",nameSearcher.value);
        filterByName();
    }else{
        invalidSound.currentTime = 0;
        invalidSound.play();
        nameSearcher.value = "";
    }
});

nameSearcher

function assignPersonas(data){
    originalPersonaList = data;
    originalPersonaList.sort((a, b) => {
        if (a.name < b.name) {
            return -1; 
        }
        if (a.name > b.name) {
            return 1; 
        }
        return 0; 
    });
    personaList = originalPersonaList;
    totalOfPersonas = personaList.length;
    personasLoaded = true;
    pageNumbers.innerText = 1 + " - " + 14;
    obtainPersonas();
}

function filterByName(){
    let name = localStorage.getItem("PersonaName").toLowerCase();
    let filteredList = personaList.filter(persona => {
        return persona.name.toLowerCase().includes(name);
    });
    if(firstSearched){
        personaSizeStart = 0;
        if(filteredList.length < 14){
            personaSizeEnd = filteredList.length - 1;
        }else{
            personaSizeEnd = 13;
        }
    }else{
        if(filteredList.length < 14){
            personaSizeEnd = filteredList.length - 1;
        }
    }
    
    totalOfPersonas = filteredList.length;
    pageNumbers.innerText = (personaSizeStart + 1) + " - " + (personaSizeEnd + 1);
    displayPersonas(filteredList);
}

function filterByArcana(){
    if(currentArcanaID != 0){
        personaList = new Array(0);
        personaSizeStart = 0;
        originalPersonaList.forEach(persona => {
            if(persona.arcana == arcanaList[currentArcanaID]){
                personaList.push(persona);
            }
        });
        personaSizeEnd = personaList.length - 1;
        totalOfPersonas = personaList.length;
    }else{
        personaList = originalPersonaList;
        personaSizeStart = 0;
        personaSizeEnd = 13;
        totalOfPersonas = personaList.length;
    }

    pageNumbers.innerText = (personaSizeStart + 1) + " - " + (personaSizeEnd + 1);
    
    obtainPersonas();
}

function obtainPersonas(){
    personaContainer.innerHTML = "";
    personaContainer.appendChild(loader);
    if(localStorage.getItem("PersonaName")){
        filterByName();
    }else{
        displayPersonas(personaList);
    }
}

function displayPersonas(personas){
    if(personas.length == 0){
        personaContainer.innerHTML = "<h1 invalid>There is no Persona whith that name!</h1>";
        invalidSound.currentTime = 0;
        invalidSound.play();
    }else{
        personaContainer.innerHTML = "";
        for(let i = personaSizeStart; i <= personaSizeEnd; i++){
            createPersona(personas[i]);
        }
    }
}

function createPersona(persona){
    //Some personas from the API doesn't have images, so this first part of the code fixes that
    if(persona.name == 'Hermes'){
        persona.image = "https://megatenwiki.com/images/thumb/d/d4/P3_Hermes_Artwork.png/300px-P3_Hermes_Artwork.png";
    }
    if(persona.name == 'Mother Harlot'){
        persona.image = "https://megatenwiki.com/images/thumb/f/f2/SMT3NM_Mother_Harlot_Artwork.png/300px-SMT3NM_Mother_Harlot_Artwork.png";
    }
    if(persona.name == 'Take-Mikazuchi'){
        persona.image = "https://megatenwiki.com/images/thumb/7/71/SMT1_SFC_Mikazuchi_Artwork.png/299px-SMT1_SFC_Mikazuchi_Artwork.png";
    }
    if(persona.name == 'Odin'){
        persona.image = "https://megatenwiki.com/images/thumb/8/80/SMT1_SFC_Odin_Artwork.png/300px-SMT1_SFC_Odin_Artwork.png";
    }
    if(persona.name == 'Hanuman'){
        persona.image = "https://megatenwiki.com/images/d/dd/SMT1_SFC_Hanuman_Artwork.png";
    }
    if(persona.name == 'Abaddon'){
        persona.image = "https://megatenwiki.com/images/thumb/5/5f/SMT1_SFC_Abaddon_Artwork.png/300px-SMT1_SFC_Abaddon_Artwork.png";
    }
    if(persona.name == 'Bishamonten'){
        persona.image = "https://megatenwiki.com/images/thumb/c/cc/DeSu1_Bishamon_Artwork.png/299px-DeSu1_Bishamon_Artwork.png";
    }
    if(persona.name == 'Asura'){
        persona.image = "https://megatenwiki.com/images/thumb/d/d7/SMTSJ_Asura_Artwork.png/300px-SMTSJ_Asura_Artwork.png";
    }
    if(persona.name == 'Satan'){
        persona.image = "https://megatenwiki.com/images/thumb/9/9d/SMT2_Satan_Artwork.png/299px-SMT2_Satan_Artwork.png";
    }
    let personaCard = document.createElement("div");
    personaCard.setAttribute("class","card");

    let wrapper = document.createElement("div");
    wrapper.setAttribute("class","wrapper");

    let cover_image = document.createElement("img");
    cover_image.setAttribute("src",persona.image);
    cover_image.setAttribute("alt","");
    cover_image.setAttribute("class","cover-image");

    let cardBackground = document.createElement("div");
    cardBackground.setAttribute("class","cardBackground");

    wrapper.appendChild(cover_image);
    wrapper.appendChild(cardBackground);

    personaCard.appendChild(wrapper);

    let personaName = document.createElement("h1");
    personaName.innerText = persona.name;
    personaName.setAttribute("class","title");

    personaCard.appendChild(personaName);

    let character = document.createElement("img");
    character.setAttribute("src",persona.image);
    character.setAttribute("class","character");

    personaCard.appendChild(character);

    personaCard.addEventListener("mouseenter", () => {
        personaHoverSound.currentTime = 0;
        personaHoverSound.play();
    })

    personaContainer.appendChild(personaCard);
}