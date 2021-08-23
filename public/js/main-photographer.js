// Model
import DataService from './DataService.js';
import EventService from './EventService.js';

// View

const displayPhotographerInfos = (photographer, totalLikes) => {
    const headerPhotographerInfosElement = document.querySelector('.photographerHeader');

    headerPhotographerInfosElement.innerHTML = `
        <div class="details">
            <h1 class="title">${photographer.name}</h1>
            <p class="localisation">${photographer.country}, ${photographer.city}</p>
            <p class="tagline">${photographer.tagline}</p>
            <div class="tags" aria-label="Liste de tags concernant le photographe">
                <ul>
                    ${photographer.tags.map((tag) => `
                    <a class="tag" name="${tag}" href="#" focusable="true">
                        <li>#${tag}</li>
                    </a>
                `).join("")}
                </ul>
            </div>
            <div class="info">
                <div class="likes">
                    <span>${totalLikes}</span><span class="fas fa-heart"></span>
                </div>
                <div class="price">
                    <span>${photographer.price}€ / jour</span>
                </div>
            </div>
        </div>
        <div class="button">
            <button class="btn">Contactez-moi</button>
        </div>
        <div class="img" aria-label="Image">
            <img src="./public/images/Sample Photos/Photographers ID Photos/${photographer.portrait}" alt="">
        </div>
        `
}

const displayFilterButton = () => {
    const filterButtonElement = document.querySelector('.filter');
    filterButtonElement.innerHTML = `        
        <span>Trier par</span>
        <div class="btn-group dropdown show">
            <button class="btn dropdown-toggle"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
                <a>Popularité</a>
                <span class="fas fa-chevron-down"></span>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <div class="dropdown-divider"></div>
                <button class="dropdown-item" href="">Date</button>
                <button class="dropdown-item" href="">Titre</button>
            </div>
        </div>
    `
}

const displayPhotographerMedias = (medias, firstName) => {
    const photographerMediasElement = document.querySelector('.medias');
    photographerMediasElement.innerHTML = `
        <div class="container">
            ${medias.map(({ image, video, title, likes, id }) => `
            <figure class="media">
                <div class="image">
                    <img id="${id}" src="./public/images/Sample Photos/${firstName}/${image}">
                </div>
            <figcaption>
                <span>${title}</span>
                <span>${likes} </span><span class="fas fa-heart"></span>
            </figcaption>
            </figure>
        `).join("")}
        </div>
    </section>
    `
}

const displayModalForm = (name) => {
    const div = document.createElement('div');
    div.className = 'bground';

    div.innerHTML = `
      <div class="modalContent">
        <span class="close"></span>
        <div class="modal-body">
            <h1>Contactez-moi</br>
            ${name}</h1>
          <form id="validate" name="reserve" action="index.html" method="get">
            <div class="formData">
              <label for="first">Prénom</label><br>
              <input class="text-control" type="text" id="first" name="first" /><br>
              <span class="error"></span>
            </div>
            <div class="formData">
              <label for="last">Nom</label><br>
              <input class="text-control" type="text" id="last" name="last" /><br>
              <span class="error"></span>
            </div>
            <div class="formData">
              <label for="email">E-mail</label><br>
              <input class="text-control" type="email" id="email" name="email" /><br>
              <span class="error"></span>
            </div>
            <div class="formData">
              <label for="message">Votre message</label><br>
              <textarea class="text-control" type="date" id="message" name="birthdate">
              </textarea>
              <br>
              <span class="error"></span>
            </div>
            <input class="btn-submit button" type="submit" value="Envoyer" />
          </form>
        </div>
    </div>`;

    document.getElementById('main').appendChild(div);
}

const displayModalLightbox = (image, title, name, id) => {
    const div = document.createElement('div');
    div.className = 'lightbox-bg';
    div.innerHTML = `
        <div class="lightbox">
            <button class="close"></button>
            <button class="lightbox__next"></button>
            <button class="lightbox__prev"></button>
            <div class="lightbox__container">
                <figure>
                    <div class="img">
                        <img id="${id}" src="./public/images/Sample Photos/${name}/${image}" alt="">
                    </div>
                    <figcaption>${title}</figcaption>
                </figure>
            </div>
        </div>`;

    document.getElementById('main').appendChild(div);

}



// Scripts

/**
 *
 *
 * @param {*} data
 */
function eventOnTags() {
    // On ajoute l'événement "click" à chaque élément "tag"
    EventService.handleTagClick((element) => {
        const nameAttributeOfTag = element.getAttribute('name');
        const url = new URL(`/index.html?tag=${nameAttributeOfTag}`, location);
        element.setAttribute('href', url.href)
        console.log(url.href);
    });
}

/**
 * Fonction qui change l'image et le titre dans la lightbox
 * à l'aide des boutons
 *
 * @param {*} getMedias // Tableau contenant les objets des médias du photographe
 * @param {*} firstNameOfPhotographer // le prénom du photographe pour l'url de l'image
 * @param {*} indexOfElementImage // l'index de l'image dans le tableau "getMedias"
 */
function nextImage(getMedias, firstNameOfPhotographer, indexOfElementImage) {
    console.log(indexOfElementImage);
    (indexOfElementImage === getMedias.length - 1) ? indexOfElementImage = - 1 : indexOfElementImage;
    let nextImage = getMedias[indexOfElementImage + 1].image;
    let nextTitle = getMedias[indexOfElementImage + 1].title;
    let nextId = getMedias[indexOfElementImage + 1].id;

    document.querySelector('.lightbox img').setAttribute('src', `./public/images/Sample Photos/${firstNameOfPhotographer}/${nextImage}`);
    document.querySelector('.lightbox img').setAttribute('id', nextId);
    document.querySelector('.lightbox figcaption').textContent = nextTitle;
}

/**
 * Fonction qui change l'image et le titre dans la lightbox
 * à l'aide des boutons
 *
 * @param {*} getMedias // Tableau contenant les objets des médias du photographe
 * @param {*} firstNameOfPhotographer // le prénom du photographe pour l'url de l'image
 * @param {*} indexOfElementImage // l'index de l'image dans le tableau "getMedias"
 */
function prevImage(getMedias, firstNameOfPhotographer, indexOfElementImage) {
    (indexOfElementImage === 0) ? indexOfElementImage = getMedias.length : indexOfElementImage;
    let nextImage = getMedias[indexOfElementImage - 1].image;
    let nextTitle = getMedias[indexOfElementImage - 1].title;
    let nextId = getMedias[indexOfElementImage - 1].id;

    document.querySelector('.lightbox img').setAttribute('src', `./public/images/Sample Photos/${firstNameOfPhotographer}/${nextImage}`);
    document.querySelector('.lightbox img').setAttribute('id', nextId);
    document.querySelector('.lightbox figcaption').textContent = nextTitle;
}

function filterMediasOnDropdownButton(element, dataService, idFromUrlParams, firstNameOfPhotographer) {

    if (element.textContent.trim() === "Popularité") {
        displayPhotographerMedias(dataService.getMediasPhotographerByPopularity(idFromUrlParams), firstNameOfPhotographer);
    }
    if (element.textContent.trim() === "Date") {
        displayPhotographerMedias(dataService.getMediasPhotographerByDate(idFromUrlParams), firstNameOfPhotographer);
    }
    if (element.textContent.trim() === "Titre") {
        displayPhotographerMedias(dataService.getMediasPhotographerByTitle(idFromUrlParams), firstNameOfPhotographer);
    }
}

/**
 * Affiche la lightbox
 *
 * @param {*} element // l'élément de l'event
 * @param {*} medias // tableau des medias
 * @param {*} firstNameOfPhotographer // nom du photographe
 */
function lightbox(element, medias, firstNameOfPhotographer) {
    // On affiche la lightbox avec l'image sur laquelle on acliqué
    let IdCurrentImage = Number(element.querySelector('img').getAttribute("id"));
    const getMedia = medias.find((obj) => {
        return obj.id === IdCurrentImage
    });
    displayModalLightbox(getMedia.image, getMedia.title, firstNameOfPhotographer, IdCurrentImage);

    // Events sur les boutons de la modal lightbox
    const getIdCurrentImage = () => Number(document.querySelector('.lightbox img').getAttribute("id"));
    const indexOfCurrentElementInArray = () => medias.findIndex((element) => element.id === getIdCurrentImage());
    document.querySelector('.lightbox__next').addEventListener('click', () => {
        nextImage(medias, firstNameOfPhotographer, indexOfCurrentElementInArray())
    }
    );
    document.querySelector('.lightbox__prev').addEventListener('click', () => {
        prevImage(medias, firstNameOfPhotographer, indexOfCurrentElementInArray())
    }
    );

    EventService.closeModal(document.querySelector('.lightbox .close'), document.querySelector('.lightbox-bg'));
}

/**
 * Fonction qui affiche le formulaire de contact
 *
 * @param {*} nameOfPhotographer
 */
function displayModalFormOnEvent(nameOfPhotographer) {

    (document.querySelector('.bground')) ? EventService.closeModal() : displayModalForm(nameOfPhotographer);
    EventService.closeModal(document.querySelector('.bground .close'), document.querySelector('.bground'));
    // On vérifie les champs des formulaires
    EventService.handleInputsFormClick((e) => checkField(e))
}

// Modal Form


function checkField(element) {
    // Definition of the rules of the patterns of the inputs
    const regExName = "[a-zA-Z-s\u00C0-\u024F\u1E00-\u1EFF]{3,}$"; // Regex qui vérifie si le champ a plus de 3 caractères, les accents, et espaces des noms composés

    if (element.id === "first") {
        element.pattern = regExName;
        if (!element.validity.valid) {
            element.setAttribute("style", "border:2px solid red; outline:none");

        } else {
            element.removeAttribute("style");
        }
    }
    if (element.id === "last") {
        element.pattern = regExName;
        if (!element.validity.valid) {
            element.setAttribute("style", "border:2px solid red; outline:none");

        } else {
            element.removeAttribute("style");
        }
    }
    if (element.id === "email") {
        element.pattern = "[a-z0-9-_]+[a-z0-9.-_]*@[a-z0-9-_]{2,}.[a-z.-_]+[a-z-_]+"; // Regex qui vérifie si le champ a un email valide
        if (!element.validity.valid) {
            element.setAttribute("style", "border:2px solid red; outline:none");

        } else {
            element.removeAttribute("style");
        }
    }
}





// Controller
const main = async () => {

    const dataService = new DataService();

    try {
        // On récupère l'ensemble des photographes du Json
        await dataService.loadPhotographers();
        // On récupère l'ensemble des médias des photographes du Json
        await dataService.loadMedias();

        // On display le photographe avec ses infos grâce à son id récupéré dans l'url
        const paramsFromUrl = new URLSearchParams(document.location.search.substring(1));
        const idFromUrlParams = Number(paramsFromUrl.get("id"));
        const nameOfPhotographer = dataService.getPhotographerById(idFromUrlParams).name;
        const firstNameOfPhotographer = nameOfPhotographer.slice(0, nameOfPhotographer.indexOf(' '));

        displayPhotographerInfos(dataService.getPhotographerById(idFromUrlParams), dataService.getTotalOfLikes(idFromUrlParams));
        // On ajoute les events sur les tags qui renvoients sur la page index
        eventOnTags();
        // Event sur bouton contact
        document.querySelector('.photographerHeader .button').addEventListener('click', () => displayModalFormOnEvent(nameOfPhotographer));
        //On affiche le bouton de filtre
        displayFilterButton();
        const chevronElement = document.querySelector(".dropdown-toggle .fas");
        EventService.toggleDropdownButton(chevronElement);
        // Filtres
        EventService.handleMediasFilter((element) => filterMediasOnDropdownButton(element, dataService, idFromUrlParams, firstNameOfPhotographer));
        //On affiche les médias du photographes
        const medias = dataService.getMediasByPhotographerId(idFromUrlParams);
        displayPhotographerMedias(medias, firstNameOfPhotographer);

        //On ajoute l'événement sur chaque image pour afficher la lightbox
        EventService.handleImagesClick((element) => lightbox(element, medias, firstNameOfPhotographer))

        // On ajoute le nom du photographe au titre
        document.title = `Fisheye | ${nameOfPhotographer}`;


    } catch (error) {

        console.error('Unable to load data :', error)

    }

}

main()
