export class Page {
    constructor() {
        /**
         * Creation de l'element central sur lequel l'utilisateur doit clicker pour commencer je jeu
         *
         * Cet element est une div, on la resize pour qu'elle prenne la taille de l'ecran
         */
        this.content = document.createElement("div");
        document.body.appendChild(this.content);
        // DEBUG
        // /**
        //  * Pour debuger on mets une couleur a notre div
        //  */
        // this.content.style.backgroundColor = "red";
        /**
         * Parametrage de la div principale
         */
        this.content.style.position = "absolute";
        this.content.style.overflow = "hidden";
        this.fadeOut();
        this.content.style.backgroundColor = "transparent";
        this.content.style.transition = "0.5s";
        this.resize();
        window.addEventListener('resize', this.resize.bind(this));
        /**
         * L'element body a un margin par defaut, on l'enleve
         *
         * En plus on peut "parametrer" le body (meme si le code est degueu j'ai pas un max de temps pour reflechir a tout haha)
         */
        document.body.style.margin = "0px";
        document.body.style.backgroundColor = "#FFBE0B";
        document.body.style.userSelect = "none";
        document.body.style.overflow = "hidden";
        window.setTimeout(this.fadeIn.bind(this), 0.1);
        // this.fadeIn();
    }
    /**
     * Resize
     */
    resize() {
        this.content.style.width = '100%';
        this.content.style.height = '100%';
        // console.log(window.innerWidth);
    }
    getContent() {
        return this.content;
    }
    fadeIn() {
        this.content.style.transform = "translate(0%, 0%)";
        window.setTimeout(this.start.bind(this), 500);
    }
    fadeOut() {
        this.content.style.transform = "translate(1000%, 0%)";
    }
}
