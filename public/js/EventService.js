export default class EventService {

    constructor() {
        document.addEventListener('keyup', this.onKeyUp)
    }

    static handleTagClick(call) {
        const array = Array.from(document.getElementsByClassName("tag")).forEach((element) => {
            element.addEventListener("click", () => call(element));
        });
    }

    static handlePhotographerSelection(call) {
        const array = Array.from(document.getElementsByClassName("link-to-photographer")).forEach((element) => {
            element.addEventListener("click", () => call(element));
        });
    }

    static toggleDropdownButton(element) {
        element.addEventListener("click", () => {
            let dropdownElement = document.querySelector(".dropdown");
            let chevronElement = document.querySelector(".fa-chevron-down");
            dropdownElement.classList.toggle("show");
            chevronElement.classList.toggle("fa-chevron-up");
        });
    }

    static handleMediasFilter(call) {
        const array = Array.from(document.querySelectorAll(".filter a, .dropdown-item")).forEach((element) => {
            element.addEventListener("click", () => call(element));
        });
    }

    static closeModal(selector, elementToRemove) {
        selector.addEventListener("click", () => document.getElementById('main').removeChild(elementToRemove))
        document.removeEventListener('keyup', this.onKeyUp)
    }

    static handleImagesClick(call) {
        const array = Array.from(document.querySelectorAll(".medias .image")).forEach((element) => {
            element.addEventListener("click", () => call(element))
        });
    }

    static handleInputsFormClick(call) {
        const array = Array.from(document.getElementsByTagName("input")).forEach((element) => {
            element.addEventListener("input", () => call(element));
        });
    }

}
