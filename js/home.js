const personaContainer = document.getElementById("personaContainer");

fetch("http://persona-compendium.onrender.com/personas/", {
    method: 'GET'
})
.then(result => result.json())
.then(data => displayPersonas(data))
.catch(error => console.error(error))

function displayPersonas(personas){
    personaContainer.innerHTML = "";
    personas.forEach(persona => {
        createPersona(persona);
    });
}

function createPersona(persona){
    let personaCard = document.createElement("div");
    personaCard.setAttribute("class","personaCard");

    let cardInner = document.createElement("div");
    cardInner.setAttribute("class","cardInner");

    let cardFront = document.createElement("div");
    cardFront.setAttribute("class","cardFront");

    let cardBack = document.createElement("div");
    cardBack.setAttribute("class","cardBack");

    let personaImg = document.createElement("img");
    personaImg.setAttribute("src", persona.image);

    let personaName = document.createElement("h1");
    personaName.innerText = persona.name;

    let buttonInfo = document.createElement("button");
    buttonInfo.innerText = "Info";
    buttonInfo.addEventListener("click", () => {
        sessionStorage.setItem("selectedPersona",persona.query);
        window.location.href = "persona.html";
    });

    cardFront.appendChild(personaImg);
    cardFront.appendChild(personaName);

    cardBack.appendChild(buttonInfo);

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);

    personaCard.appendChild(cardInner);

    personaContainer.appendChild(personaCard);
}