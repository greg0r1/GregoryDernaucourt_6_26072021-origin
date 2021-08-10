// Model
import DataService from './DataService.js';
import EventService from './EventService.js';


// View
const displayPhotographers = (photographers = []) => {
    document.getElementById('main').innerHTML = `

    <section class="photographers">
    <header>
        <h1>Nos photographes</h1>
    </header>
    <div class="container">

    ${photographers.map(({ portrait, name, city, country, tagline, price, tags }) => `
        <article class="article">
        <a href="#" alt="" aria-label="Lien vers le photographe" focusable="true">
        <div class="article__img" aria-label="Image">
        <img src="./public/images/Sample Photos/Photographers ID Photos/${portrait}" alt="">
        </div>
        <h2 class="article__title">${name}</h2>
        </a>
        <div class="article__details" aria-label="Détails concernant le photographe">
        <p aria-label="Ville d'origine">${city}, ${country}</p>
        <p aria-label="Description">${tagline}</p>
        <p aria-label="Prix">${price}€/jour</p>
        </div>
        <div class="article__tags" aria-label="Liste de tags concernant le photographe">
        <ul>
        ${tags.map((tag) => `<li class="tag" name="${tag}">#${tag}</li>`).join("")}
        </ul></div></article>
        `
    ).join('')
        }

        </div></section>
    `
}

const displayNav = (tags) => {

    // On affiche le logo
    document.querySelector('header').innerHTML = `
        <a id="logo" href="index.html" alt="Fisheye Home page">
        <img src="./public/images/logo.svg" alt="Fisheye Home page"></a>`;

    // On affiche la nav avec les tags
    document.querySelector('header').innerHTML += `
        <nav class="nav">
        <ul class="tags">
        ${tags.map((tag) => `<li class="tag" name="${tag}">#${tag.charAt(0).toUpperCase()}${tag.slice(1)}</li>`).join("")}
        </ul></nav>
    `

}


// Controller
const main = async () => {

    const dataService = new DataService();

    try {

        // On récupère l'ensemble des photographes du Json
        await dataService.loadPhotographers();
        // On affiche la nav
        displayNav(dataService.getTags());
        // On affiche les photographes
        displayPhotographers(dataService.getPhotographersByTags());
        // On ajoute l'événement "click" à l'élément "tag"
        EventService.handleTagClick((element) => {
            displayPhotographers(
                dataService.getPhotographersByTags(element.getAttribute('name')))
        })


    } catch (error) {

        console.error('Unable to load data :', error)

    }

}

main()

