export default class DataService {

    constructor() {

        this.photographers = [];

    }

    async loadPhotographers() {

        const dataResponse = await fetch('./public/json/photographs-DB.json');
        this.photographers = (await dataResponse.json()).photographers;

    }

    getPhotographersByTags(tag = "") {
        if (!tag) return this.photographers;
        return this.photographers.filter(({ tags }) => tags.includes(tag));
    }

    getTags() {
        const allTags = this.photographers.reduce(
            (allTags, { tags }) => [...allTags, ...tags], []
        );
        return Array.from(new Set(allTags))
    }

}