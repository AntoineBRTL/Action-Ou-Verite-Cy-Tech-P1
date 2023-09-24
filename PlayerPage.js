import { GamePage } from "./Game.js";
import { NEXT_AUDIO } from "./Main.js";
import { Page } from "./Page.js";
import { Player } from "./Player.js";
export class PlayerPage extends Page {
    constructor() {
        super();
        /**
         * Creation du text
         */
        this.presText = document.createElement("p");
        this.presText.innerText = "QUI JOUE ?";
        /**
         * Parametrage du text
         */
        this.presText.style.fontFamily = "font1";
        this.presText.style.fontSize = "9vw";
        this.presText.style.color = "#F7F7FF";
        this.playersDiv = document.createElement("div");
        this.playersDiv.style.width = "100%";
        this.playersDiv.style.display = "flex";
        this.playersDiv.style.flexDirection = "column";
        this.playersDiv.style.alignItems = "center";
        this.playersDiv.style.overflowY = "scroll";
        this.playersDiv.style.maxHeight = "50%";
        this.generatePlayerPanel();
        let buttonSize = 10; // en vw
        this.addPlayerDiv = document.createElement("div");
        this.addPlayerDiv.style.width = buttonSize + "vw";
        this.addPlayerDiv.style.height = buttonSize + "vw";
        this.addPlayerDiv.style.borderRadius = "50%";
        this.addPlayerDiv.style.backgroundColor = "#F7F7FF";
        this.addPlayerDiv.style.marginTop = "6vw";
        this.addPlayerDiv.style.display = "flex";
        this.addPlayerDiv.style.justifyContent = "center";
        this.addPlayerDiv.style.alignItems = "center";
        this.addPlayerDiv.style.boxShadow = "0 .1rem .15rem rgba(40,36,89,.2),0 .25rem .4rem rgba(40,36,89,.15)";
        let addPlayerDivIcon = document.createElement("p");
        addPlayerDivIcon.innerHTML = '<ion-icon name="add-outline"></ion-icon>';
        addPlayerDivIcon.style.fontSize = "5vw";
        addPlayerDivIcon.style.color = "#FFBE0B";
        this.addPlayerDiv.appendChild(addPlayerDivIcon);
        this.addPlayerDiv.addEventListener("click", function () {
            this.generatePlayerPanel();
        }.bind(this));
        /**
         * Bon... on veut centrer une div et c'est bien galere, meilleur technique -> display flex
         */
        this.getContent().style.display = "flex";
        this.getContent().style.flexDirection = "column";
        this.getContent().style.alignItems = "center";
        this.validateDiv = document.createElement("div");
        this.validateDiv.style.width = 60 + "vw";
        this.validateDiv.style.height = 20 + "vw";
        this.validateDiv.style.borderRadius = "30px";
        this.validateDiv.style.backgroundColor = "#F7F7FF";
        this.validateDiv.style.display = "flex";
        this.validateDiv.style.justifyContent = "center";
        this.validateDiv.style.alignItems = "center";
        this.validateDiv.style.position = "absolute";
        this.validateDiv.style.transform = "translate(-50%, -50%)";
        this.validateDiv.style.bottom = "5vw";
        this.validateDiv.style.left = "50%";
        this.validateDiv.style.boxShadow = "0 .1rem .15rem rgba(40,36,89,.2),0 .25rem .4rem rgba(40,36,89,.15)";
        let validateText = document.createElement('p');
        validateText.innerText = "Lancer la partie !";
        validateText.style.fontFamily = "font1";
        validateText.style.fontSize = "6vw";
        validateText.style.color = "#FFBE0B";
        this.validateDiv.appendChild(validateText);
        this.validateDiv.addEventListener('click', function () {
            let players = new Array();
            for (let element of this.playersDiv.childNodes) {
                players.push(new Player(element.childNodes[1].value || "Joueur " + (players.length + 1)));
            }
            if (players.length <= 1) {
                alert("Vous ne pouvez pas commencer de partie avec moins de 2 joueurs");
                return;
            }
            NEXT_AUDIO.play();
            new GamePage(players);
            document.body.removeChild(this.getContent());
        }.bind(this));
        this.getContent().appendChild(this.presText);
        this.getContent().appendChild(this.playersDiv);
        this.getContent().appendChild(this.addPlayerDiv);
        this.getContent().appendChild(this.validateDiv);
    }
    start() {
    }
    /**
     * Cree un input dans lequel on peut choisir le nom d'un joueur
     */
    generatePlayerPanel(name) {
        let border = 40;
        let inputHeight = 10; // en vw
        let space = 6;
        let buttonSize = 10;
        let div = document.createElement("div");
        div.style.width = "90%";
        div.style.display = "flex";
        div.style.height = inputHeight + "vw";
        div.style.backgroundColor = "#F7F7FF";
        div.style.borderRadius = border + "px";
        div.style.textAlign = "center";
        div.style.boxShadow = "0 .1rem .15rem rgba(40,36,89,.2),0 .25rem .4rem rgba(40,36,89,.15)";
        let delPlayerDiv = document.createElement("div");
        delPlayerDiv.style.width = buttonSize + "vw";
        delPlayerDiv.style.height = buttonSize + "vw";
        delPlayerDiv.style.display = "flex";
        delPlayerDiv.style.justifyContent = "center";
        delPlayerDiv.style.alignItems = "center";
        let delPlayerDivButton = document.createElement("div");
        delPlayerDivButton.style.backgroundColor = "#FFBE0B";
        delPlayerDivButton.style.borderRadius = "50%";
        delPlayerDivButton.style.width = "80%";
        delPlayerDivButton.style.height = "80%";
        delPlayerDivButton.style.display = "flex";
        delPlayerDivButton.style.justifyContent = "center";
        delPlayerDivButton.style.alignItems = "center";
        delPlayerDiv.appendChild(delPlayerDivButton);
        let delPlayerDivIcon = document.createElement("p");
        delPlayerDivIcon.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
        delPlayerDivIcon.style.fontSize = "5vw";
        delPlayerDivIcon.style.color = "#F7F7FF";
        delPlayerDivButton.appendChild(delPlayerDivIcon);
        let input = document.createElement("input");
        input.style.width = "80%";
        input.style.height = "100%";
        input.style.fontFamily = "font1";
        input.style.fontSize = "6vw";
        input.style.border = "0px solid transparent";
        input.style.textAlign = "center";
        input.style.backgroundColor = "#F7F7FF";
        input.placeholder = "NOM DU JOUEUR";
        input.type = "text";
        if (name)
            input.value = name;
        input.focus();
        div.style.marginTop = space / 2.0 + "vw";
        div.style.marginBottom = space / 2.0 + "vw";
        div.appendChild(delPlayerDiv);
        div.appendChild(input);
        delPlayerDiv.addEventListener("click", function () {
            this.playersDiv.removeChild(div);
        }.bind(this));
        this.playersDiv.appendChild(div);
        return div;
    }
}
