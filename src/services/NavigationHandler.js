class NavigationHandler {

    constructor() {
        // Haal de pages op die er zijn
        this.pages = Array.from(document.querySelectorAll(".page")).map(el => el.dataset.pagename);
        this.pageElements = document.querySelectorAll(".page");

        // Stel de nav buttons in
        Array.from(document.querySelectorAll("button")).forEach(el => {

            // Als een button dataset pagename heeft assing onclick om te navigeren naar die page
            if (el.dataset.hasOwnProperty("pagename")) {
                el.addEventListener("click", (e) => {
                    this.Navigate(el.dataset.pagename);
                })
            }
        })

        // Selecteer de eerste page uit de pages array als actieve pagina
        this.activePage = this.pages ? this.pages.length ? this.pages[0] : null : null;

        // Navigeer naar active page
        this.NavigateToActive();
    }

    // Roep om te navigeren van page
    Navigate = (pageName) => {
        this.pages.forEach(page => {
            const index = this.pages.indexOf(page);
            if (pageName == page) {
                this.pageElements[index].style.display = "block"
            } else {
                this.pageElements[index].style.display = "none"
            }
        })
    }

    NavigateToActive = () => {
        this.Navigate(this.activePage);
    }
}

// INitialiseer de nav handler
const navigation = new NavigationHandler();