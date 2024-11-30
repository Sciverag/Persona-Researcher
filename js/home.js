const personaContainer = document.getElementById("personaContainer");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const pageNumbers = document.getElementById("pageNumbers");
let personaSizeStart = 0;
let personaSizeEnd = 13;
let totalOfPersonas = 213;

previous.addEventListener("click", () => {
    if (personaSizeStart > 0) {
        if(personaSizeEnd == totalOfPersonas){
            personaSizeEnd = personaSizeStart + 13;
        }
        personaSizeStart -= 14;
        personaSizeEnd -= 14;
        pageNumbers.innerText = (personaSizeStart + 1) + " - " + (personaSizeEnd + 1);
        obtainPersonas();
    }
})

next.addEventListener("click", () => {
    if (personaSizeStart < totalOfPersonas - 13) {
        personaSizeStart += 14;
        personaSizeEnd += 14;
        if(personaSizeEnd > totalOfPersonas){
            personaSizeEnd = totalOfPersonas;
        }
        pageNumbers.innerText = (personaSizeStart + 1) + " - " + (personaSizeEnd + 1);
        obtainPersonas();
    }
})

obtainPersonas();

function obtainPersonas(){
    fetch("http://persona-compendium.onrender.com/personas/", {
        method: 'GET'
    })
    .then(result => result.json())
    .then(data => displayPersonas(data))
    .catch(error => console.error(error))
}

function displayPersonas(personas){
    personaContainer.innerHTML = "";
    for(let i = personaSizeStart; i <= personaSizeEnd; i++){
        createPersona(personas[i]);
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

    personaContainer.appendChild(personaCard);
}