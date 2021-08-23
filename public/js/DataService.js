export default class DataService {

    constructor() {

        this.photographers = [];
        this.medias = []
        this.totalLikesByPhotographer;

    }

    async loadPhotographers() {

        const dataResponse = await fetch('./public/json/photographs-DB.json');
        this.photographers = (await dataResponse.json()).photographers;

    }

    async loadMedias() {

        const dataResponse = await fetch('./public/json/photographs-DB.json');
        this.medias = (await dataResponse.json()).media;

    }

    getPhotographersByTags(tag = "") {
        if (!tag) return this.photographers;
        return this.photographers.filter(({ tags }) => tags.includes(tag));
    }

    getPhotographerByName(namePhotographer) {
        return this.photographers.find(obj => {
            return obj.name === namePhotographer
        });
    }

    getPhotographerById(idPhotographer) {
        return this.photographers.find(obj => {
            return obj.id === idPhotographer
        });
    }

    getTotalOfLikes(idPhotographer) {
        const photographerMedias = this.medias.filter(obj => obj.photographerId === idPhotographer);
        var arrayOfLikes = [];
        for (const element of photographerMedias) {
            arrayOfLikes.push(element.likes)
        }
        return arrayOfLikes.reduce((accumulator, currentValue) => accumulator + currentValue)
    }

    getMediasByPhotographerId(idPhotographer) {
        return this.medias.filter(obj => obj.photographerId === idPhotographer);
    }

    getMediasPhotographerByPopularity(idPhotographer) {
        const photographerMedias = this.medias.filter(obj => obj.photographerId === idPhotographer);
        return photographerMedias.sort((a, b) => {
            return a.likes - b.likes
        });
    }

    getMediasPhotographerByDate(idPhotographer) {
        const photographerMedias = this.medias.filter(obj => obj.photographerId === idPhotographer);
        return photographerMedias.sort((a, b) => {
            let date1 = new Date(a.date);
            let date2 = new Date(b.date);
            date1.getTime() - date2.getTime()
        });
    }

    getMediasPhotographerByTitle(idPhotographer) {
        const photographerMedias = this.medias.filter(obj => obj.photographerId === idPhotographer);
        return photographerMedias.sort((a, b) => a.title.localeCompare(b.title));
    }

    getTags() {
        const allTags = this.photographers.reduce(
            (allTags, { tags }) => [...allTags, ...tags], []);
        return Array.from(new Set(allTags))
    }

}