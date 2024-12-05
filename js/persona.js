const body = document.querySelector("body");
const arcana = document.getElementById("arcanaText");
const personaName = document.getElementById("nameText");
const personaImage = document.getElementById("personaImg");
const favoriteButton = document.getElementById("favoriteButton");
const level = document.getElementById("level");
const strength = document.getElementById("strength");
const magic = document.getElementById("magic");
const endurance = document.getElementById("endurance");
const agility = document.getElementById("agility");
const luck = document.getElementById("luck");
const dContainer = document.getElementById("descriptionContainer");
const description = document.createElement("p");
const fusionButton = document.getElementById("fusionButton");
const arcanaImage = document.getElementById("arcanaImage");
description.setAttribute("id","description");
const cardTransition = document.getElementById("cardTransition");
const backTransition = document.getElementById("backTransition");
const toggleSound = document.getElementById("toggleSound");
const backHome = document.getElementById("backHome");
const hoverSound = document.getElementById('hoverSound');
const personaHoverSound = document.getElementById('personaHoverSound');
const invalidSound = document.getElementById('invalidSound');
const nextPageSound = document.getElementById('nextPageSound');
const arcanaSound = document.getElementById('arcanaSound');
const selectSound = document.getElementById("selectSound");
const backgroundMusic = document.getElementById('backgroundMusic');
const loader = document.createElement("div");
loader.setAttribute("id","loader");
let personasLoaded = false;
let favoritePersonas = new Array(0);
let soundEnabled = false;
let isFavorite = false;
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
    localStorage.setItem("FavoritePersonas",JSON.stringify(favoritePersonas));
}

if(localStorage.getItem("SoundActive")){
    soundEnabled = JSON.parse(localStorage.getItem("SoundActive"));
    if (soundEnabled) {
        backgroundMusic.volume = 0.2;
        hoverSound.volume = 0.5;
        invalidSound.volume = 0.5;
        personaHoverSound.volume = 0.1;
        nextPageSound.volume = 0.2;
        arcanaSound.volume = 0.2;
        selectSound.volume = 0.2;
        volumeIcon.innerText = "volume_up";
        toggleSound.setAttribute("active","");
    } else {
        backgroundMusic.volume = 0;
        hoverSound.volume = 0;
        invalidSound.volume = 0;
        personaHoverSound.volume = 0;
        nextPageSound.volume = 0;
        arcanaSound.volume = 0;
        selectSound.volume = 0;
        volumeIcon.innerText = "volume_off";
        toggleSound.removeAttribute("active");
    }
}else{
    localStorage.setItem("SoundActive",JSON.stringify(false));
}

if(localStorage.getItem("MusicTime")){
    backgroundMusic.currentTime = localStorage.getItem("MusicTime");
}else{
    localStorage.setItem("MusicTime",0);
}

if(localStorage.getItem("SelectedPersona")){
    console.log("obtainingPersona");
    dContainer.appendChild(loader);
    fetch("https://persona-compendium.onrender.com/personas/"+localStorage.getItem("SelectedPersona")+"/", {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => asignPersona(data))
    .catch(error => console.error(error));
}else{
    window.location.href = "home.html";
}

backgroundMusic.play();

favoriteButton.addEventListener("mouseenter", () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
});

fusionButton.addEventListener("mouseenter",() => {
    hoverSound.currentTime = 0;
    hoverSound.play();
});

fusionButton.addEventListener("click", () => {
    selectSound.currentTime = 0;
    selectSound.play();
})

favoriteButton.addEventListener("click", () => {
    if(personasLoaded){
        if(isFavorite){
            isFavorite = false;
            favoriteButton.removeAttribute("active");
            let position = favoritePersonas.indexOf(selectedPersona.id);
            favoritePersonas.splice(position,1);
        }else{
            favoriteButton.setAttribute("active","");
            isFavorite = true;
            if(!favoritePersonas.includes(selectedPersona.id)){
                favoritePersonas.push(selectedPersona.id);
            }
        }

        selectSound.currentTime = 0;
        selectSound.play();
    
        localStorage.setItem("FavoritePersonas",JSON.stringify(favoritePersonas));
    }else{
        invalidSound.currentTime = 0;
        invalidSound.play();
        next.setAttribute("invalid","true");
        setTimeout(() => {
            next.removeAttribute("invalid");
        }, 200);
    }
    
})

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
        selectSound.volume = 0.2;
        volumeIcon.innerText = "volume_up";
        toggleSound.setAttribute("active","");
        localStorage.setItem("SoundActive",JSON.stringify(true));
    } else {
        backgroundMusic.volume = 0;
        hoverSound.volume = 0;
        invalidSound.volume = 0;
        personaHoverSound.volume = 0;
        nextPageSound.volume = 0;
        arcanaSound.volume = 0;
        selectSound.volume = 0;
        volumeIcon.innerText = "volume_off";
        toggleSound.removeAttribute("active");
        localStorage.setItem("SoundActive",JSON.stringify(false));
    }
});

toggleSound.addEventListener("mouseenter", () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
});

backHome.addEventListener("mouseenter", () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
});

backHome.addEventListener("click", () => {
    selectSound.currentTime = 0;
    selectSound.play();
    cardTransition.style.display = "block";
    cardTransition.removeAttribute("class");
    backTransition.style.display = "block";
    backTransition.removeAttribute("class");
    setTimeout(() => {
        localStorage.setItem("MusicTime",backgroundMusic.currentTime);
        window.location.href = "home.html";
    }, 2000)
})

function asignPersona(data){
    dContainer.removeChild(loader);
    dContainer.appendChild(description);
    personasLoaded = true;
    selectedPersona = data;
    showInfo()
}

function showInfo(){
    //Some personas from the API doesn't have images, so this first part of the code fixes that
    if(selectedPersona.name == 'Hermes'){
        selectedPersona.image = "https://megatenwiki.com/images/thumb/d/d4/P3_Hermes_Artwork.png/300px-P3_Hermes_Artwork.png";
    }
    if(selectedPersona.name == 'Mother Harlot'){
        selectedPersona.image = "https://megatenwiki.com/images/thumb/f/f2/SMT3NM_Mother_Harlot_Artwork.png/300px-SMT3NM_Mother_Harlot_Artwork.png";
    }
    if(selectedPersona.name == 'Take-Mikazuchi'){
        selectedPersona.image = "https://megatenwiki.com/images/thumb/7/71/SMT1_SFC_Mikazuchi_Artwork.png/299px-SMT1_SFC_Mikazuchi_Artwork.png";
    }
    if(selectedPersona.name == 'Odin'){
        selectedPersona.image = "https://megatenwiki.com/images/thumb/8/80/SMT1_SFC_Odin_Artwork.png/300px-SMT1_SFC_Odin_Artwork.png";
    }
    if(selectedPersona.name == 'Hanuman'){
        selectedPersona.image = "https://megatenwiki.com/images/d/dd/SMT1_SFC_Hanuman_Artwork.png";
    }
    if(selectedPersona.name == 'Abaddon'){
        selectedPersona.image = "https://megatenwiki.com/images/thumb/5/5f/SMT1_SFC_Abaddon_Artwork.png/300px-SMT1_SFC_Abaddon_Artwork.png";
    }
    if(selectedPersona.name == 'Bishamonten'){
        selectedPersona.image = "https://megatenwiki.com/images/thumb/c/cc/DeSu1_Bishamon_Artwork.png/299px-DeSu1_Bishamon_Artwork.png";
    }
    if(selectedPersona.name == 'Asura'){
        selectedPersona.image = "https://megatenwiki.com/images/thumb/d/d7/SMTSJ_Asura_Artwork.png/300px-SMTSJ_Asura_Artwork.png";
    }
    if(selectedPersona.name == 'Satan'){
        selectedPersona.image = "https://megatenwiki.com/images/thumb/9/9d/SMT2_Satan_Artwork.png/299px-SMT2_Satan_Artwork.png";
    }
    arcana.innerText = selectedPersona.arcana;
    personaName.innerText = selectedPersona.name;
    level.innerText += " " + selectedPersona.level;
    personaImage.style.backgroundImage = "url(" + selectedPersona.image + ")";

    if(favoritePersonas.includes(selectedPersona.id)){
        favoriteButton.setAttribute("active","");
        isFavorite = true;
    }

    selectedPersona.weak.forEach(element => {
        let resistElement = document.getElementById(element + "Container");
        console.log(element + "Container");
        resistElement.innerHTML = "";
        resistElement.setAttribute("class","weak");
        let span = document.createElement("span");
        span.setAttribute("class","material-symbols-outlined");
        span.innerText = "priority_high";
        resistElement.appendChild(span);
    });

    selectedPersona.resists.forEach(element => {
        let resistElement = document.getElementById(element + "Container");
        console.log(element + "Container");
        resistElement.innerHTML = "";
        resistElement.setAttribute("class","resists");
        let span = document.createElement("span");
        span.setAttribute("class","material-symbols-outlined");
        span.innerText = "shield";
        resistElement.appendChild(span);
    })

    selectedPersona.reflects.forEach(element => {
        let resistElement = document.getElementById(element + "Container");
        console.log(element + "Container");
        resistElement.innerHTML = "";
        resistElement.setAttribute("class","reflects");
        let span = document.createElement("span");
        span.setAttribute("class","material-symbols-outlined");
        span.innerText = "arming_countdown";
        resistElement.appendChild(span);
    })

    selectedPersona.absorbs.forEach(element => {
        let resistElement = document.getElementById(element + "Container");
        console.log(element + "Container");
        resistElement.innerHTML = "";
        resistElement.setAttribute("class","absorbs");
        let span = document.createElement("span");
        span.setAttribute("class","material-symbols-outlined");
        span.innerText = "shield_with_heart";
        resistElement.appendChild(span);
    })

    selectedPersona.nullifies.forEach(element => {
        let resistElement = document.getElementById(element + "Container");
        console.log(element + "Container");
        resistElement.innerHTML = "";
        resistElement.setAttribute("class","nullifies");
        let span = document.createElement("span");
        span.setAttribute("class","material-symbols-outlined");
        span.innerText = "block";
        resistElement.appendChild(span);
    })

    description.innerHTML = selectedPersona.description;

    fusionButton.setAttribute("href","https://aqiu384.github.io/megaten-fusion-tool/p3r/personas/"+selectedPersona.name+"/fissions");
    arcanaImage.setAttribute(selectedPersona.arcana,"");

    strength.setAttribute("value",selectedPersona.strength);
    document.getElementById("strengthNumber").innerText = addZero(selectedPersona.strength);
    magic.setAttribute("value",selectedPersona.magic);
    document.getElementById("magicNumber").innerText = addZero(selectedPersona.magic);
    endurance.setAttribute("value",selectedPersona.endurance);
    document.getElementById("enduranceNumber").innerText = addZero(selectedPersona.endurance);
    agility.setAttribute("value",selectedPersona.agility);
    document.getElementById("agilityNumber").innerText = addZero(selectedPersona.agility);
    luck.setAttribute("value",selectedPersona.luck);
    document.getElementById("luckNumber").innerText = addZero(selectedPersona.luck);
}

function addZero(stat){
    if(stat < 10){
        return "0" + stat;
    }

    return stat;
}