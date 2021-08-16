// Model
import DataService from './DataService.js';
import EventService from './EventService.js';

// View
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

const displayPhotographerInfos = (photographer, totalLikes) => {
    const section = document.getElementById('section');
    section.classList = "photographer";

    section.innerHTML = `
    <header class="photographerHeader">
        <div class="details">
            <h1 class="title">${photographer.name}</h1>
            <p class="localisation">${photographer.country}, ${photographer.city}</p>
            <p class="tagline">${photographer.tagline}</p>
            <div class="tags" aria-label="Liste de tags concernant le photographe">
                <ul>
                ${photographer.tags.map((tag) => `<li class="tag" name="${tag}">#${tag}</li>`).join("")}
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
    </header>
        `
}

const displayFilterButton = () => {
    const div = document.createElement('div');
    div.className = 'filter';
    const html = `        
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
    div.innerHTML = html;
    document.querySelector('.photographerHeader').after(div)
}

const displayPhotographerMedias = (medias, firstName) => {
    const div = document.createElement('div');
    div.className = 'medias';
    div.innerHTML = `
        <div class="container">
            ${medias.map(({ image, video, title, likes }) => `
            <figure class="media">
                <div class="image">
                    <img src="./public/images/Sample Photos/${firstName}/${image}">
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
    document.querySelector('.filter').after(div)

}

const displayModalForm = (name) => {
    const div = document.createElement('div');
    div.className = 'bground';

    div.innerHTML = `
      <div class="content">
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

const displayModalLightbox = (url, caption) => {
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
                        <img src="${url}" alt="">
                    </div>
                    <figcaption>${caption}</figcaption>
                </figure>
            </div>
        </div>`;

    document.getElementById('main').appendChild(div);

}





// Controller
const main = async () => {

    const dataService = new DataService();

    try {
        // On récupère l'ensemble des photographes du Json
        await dataService.loadPhotographers();
        // On récupère l'ensemble des médias des photographes du Json
        await dataService.loadMedias();
        // On affiche la nav
        displayNav(dataService.getTags());
        // On affiche les photographes
        displayPhotographers(dataService.getPhotographersByTags());
        // On ajoute l'événement "click" à l'élément "tag"
        EventService.handleTagClick((element) => {
            const getTag = element.getAttribute('name');
            displayPhotographers(dataService.getPhotographersByTags(getTag));
            // On ajoute le tag au titre
            document.title = `Fisheye | ${getTag.charAt(0).toUpperCase()}${getTag.slice(1)}`;
        });
        // On ajoute l'événement "click" à chaque fiche de photographes
        EventService.handlePhotographerSelection((element) => {
            const name = element.textContent.trim();
            const firstName = name.slice(0, name.indexOf(' '));
            //On affiche les infos du photographes
            const id = dataService.getPhotographerByName(name).id;
            displayPhotographerInfos(dataService.getPhotographerByName(name), dataService.getTotalOfLikes(id));
            // Event sur bouton contact
            document.querySelector('.photographerHeader .button').addEventListener('click', () => {
                (document.querySelector('.bground')) ? EventService.closeModal() : displayModalForm(name);
                EventService.closeModal(document.querySelector('.bground .close'), document.querySelector('.bground'));
            });
            //On affiche le bouton de filtre
            displayFilterButton();
            const chevronElement = document.querySelector(".dropdown-toggle .fas");
            EventService.toggleDropdownButton(chevronElement);
            // Filtres
            EventService.handleMediasFilter((element) => {
                if (element.textContent.trim() === "Popularité") {
                    displayPhotographerMedias(dataService.getMediasPhotographerByPopularity(id), firstName);
                }
                if (element.textContent.trim() === "Date") {
                    displayPhotographerMedias(dataService.getMediasPhotographerByDate(id), firstName);
                }
                if (element.textContent.trim() === "Titre") {
                    displayPhotographerMedias(dataService.getMediasPhotographerByTitle(id), firstName);
                }
            });
            //On affiche les médias du photographes
            displayPhotographerMedias(dataService.getMediasByPhotographerId(id), firstName);
            //On ajoute l'événement sur chaque image pour afficher la lightbox
            EventService.handleImagesClick((e) => {
                displayModalLightbox(e.firstElementChild.getAttribute('src'), 'Mon texte');
                EventService.closeModal(document.querySelector('.lightbox .close'), document.querySelector('.lightbox-bg'));
            })
            // On ajoute le nom du photographe au titre
            document.title = `Fisheye | ${element.textContent.trim().charAt(0).toUpperCase()}${element.textContent.trim().slice(1)}`;
            // On enlève les tags du header
            document.querySelector('nav').style.display = 'none'

        });

    } catch (error) {

        console.error('Unable to load data :', error)

    }

}

main()

