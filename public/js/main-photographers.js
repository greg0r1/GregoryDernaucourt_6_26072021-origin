// Model
import DataService from './DataService.js';
import EventService from './EventService.js';



// View
const displayNavTags = (tags) => {
    // On affiche la nav avec les tags
    document.querySelector('header').innerHTML += `
        <nav class="nav">
            <ul class="tags">
            ${tags.map((tag) => `
                <li class="tag" name="${tag}">#${tag.charAt(0).toUpperCase()}${tag.slice(1)}</li>
                `).join("")}
            </ul></nav>`

}

const displayPhotographers = (photographers = []) => {
    const section = document.getElementById('section');
    section.classList = "photographers";

    section.innerHTML = `

    <header>
        <h1>Nos photographes</h1>
    </header>
        <div class="container">

        ${photographers.map(({ portrait, name, city, country, tagline, price, tags }) => `
        <article class="article">
            <a class="link-to-photographer" href="#" alt="" aria-label="Lien vers le photographe" focusable="true">
                <div class="article__img" aria-label="Image">
                    <img src="./public/images/Sample Photos/Photographers ID Photos/${portrait}" alt="">
                </div>
                <h2 class="article__title title">${name}</h2>
            </a>
            <div class="details" aria-label="Détails concernant le photographe">
                <p class="localisation" aria-label="Ville d'origine">${city}, ${country}</p>
                <p class="description" aria-label="Description">${tagline}</p>
                <p class="price" aria-label="Prix">${price}€/jour</p>
            </div>
            <div class="tags" aria-label="Liste de tags concernant le photographe">
                <ul>
                ${tags.map((tag) => `<li class="tag" name="${tag}">#${tag}</li>`).join("")}
                </ul></div></article>
        `
    ).join("")
        }
        </div>
        `
}



// Scripts

/**
 * Fonction pour gérer l'événement clique des tags
 *
 * @param {*} dataService
 */
function putEventCickOnTags(dataService, tag) {
    // On ajoute l'événement "click" à l'élément "tag"
    EventService.handleTagClick((element) => {
        const nameAttributeOfTag = element.getAttribute('name');
        const photographersByTags = dataService.getPhotographersByTags(nameAttributeOfTag);
        displayPhotographers(photographersByTags);
        putEventCickOnTags(dataService);
        putEventCickOnPhotographerProfile(dataService);
        // On ajoute le tag au titre
        document.title = `Fisheye | ${nameAttributeOfTag.charAt(0).toUpperCase()}${nameAttributeOfTag.slice(1)}`;
    });
}

/**
 * Fonction pour gérer l'événement clique de chaque fiche
 * de photographess
 *
 * @param {*} dataService
 */
function putEventCickOnPhotographerProfile(dataService) {
    // On ajoute l'événement "click" à chaque fiche de photographes
    EventService.handlePhotographerSelection((element) => {
        const nameOfPhotographer = element.textContent.trim();
        const firstNameOfPhotographer = nameOfPhotographer.slice(0, nameOfPhotographer.indexOf(' '));
        const id = dataService.getPhotographerByName(nameOfPhotographer).id;
        const url = new URL(`/photographer.html?id=${id.toString()}&firstName=${firstNameOfPhotographer}`, location);
        element.setAttribute('href', url)
    });
}

/**
 * Fonction qui affiche le bouton scroll to top
 * si on scroll vers le bas
 *
 */
function putEventClickToButtonIfScrolled() {
    const scrollToMainButtonElt = document.querySelector('.scrollToMainButton');
    if (window.scrollY) {
        scrollToMainButtonElt.classList.add('display');
        scrollToMainButtonElt.addEventListener('click', () => window.scrollTo(0, 0));
    } else if (window.screenY === 0) {
        scrollToMainButtonElt.classList.remove('display')
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
        // On affiche la nav en récupérant tous les tags utilisés (getTags())
        displayNavTags(dataService.getTags());
        // On affiche les photographes en commençant par récupérer un paramètre dans l'url:
        // s'il y a un tag dans l'url, alors on affiche une séléection par le tag transmis,
        // sinon tous les photographes sont affichés
        const params = new URLSearchParams(document.location.search.substring(1));
        const tag = params.get("tag");
        displayPhotographers(dataService.getPhotographersByTags(tag));
        // On ajoute un événement au scroll de window pour afficher un bouton scroll to top
        window.addEventListener('scroll', putEventClickToButtonIfScrolled);
        // On ajoute l'événement "click" à l'élément "tag"
        putEventCickOnTags(dataService);
        // On ajoute l'événement "click" à chaque fiche de photographes
        putEventCickOnPhotographerProfile(dataService);


    } catch (error) {

        console.error('Unable to load data :', error)

    }

}

main()
