export default class EventService {

    static handleTagClick(call) {
        const array = Array.from(document.getElementsByClassName("tag")).forEach((element) => {
            element.addEventListener("click", () => call(element));
        });
    }

}
