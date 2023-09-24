import { GamePage } from "./Game.js";
import { NEXT_AUDIO } from "./Main.js";
import { Page } from "./Page.js";
import { PlayerPage } from "./PlayerPage.js";

export class StartPage extends Page
{
    /** Texte central */
    private startText: HTMLParagraphElement;

    public constructor()
    {
        super();


        /**
         * Creation du text
         */
        this.startText = document.createElement("p");
        this.startText.innerText = "CLICKEZ POUR COMMENCER";

        /**
         * Parametrage du text
         */
        this.startText.style.fontFamily = "font1";
        this.startText.style.fontSize = "6vw";
        this.startText.style.color = "#F7F7FF";
        this.startText.style.transition = "1.0s";


        /**
         * On le positionne a la main 
         */
        this.startText.style.position   = "absolute";
        this.startText.style.transform   = "translate(-50%, -50%)";
        this.startText.style.left       = 50 + "%";
        this.startText.style.top        = 50 + "%";

        this.startText.style.textAlign = "center";

        /**
         * Lorsqu'on click sur l'ecran le jeu se lance
         */
        this.getContent().addEventListener('click', function(this: StartPage)
        {
            NEXT_AUDIO.play();

            new PlayerPage();
            document.body.removeChild(this.getContent());
        }.bind(this));

        this.getContent().appendChild(this.startText);
        this.showText();
    }

    protected start(): void 
    {
    }

    private showText()
    {
        this.startText.style.opacity = (1).toString();
        window.setTimeout(this.hideText.bind(this), 1000);
    }

    private hideText()
    {
        this.startText.style.opacity = (0.5).toString();
        window.setTimeout(this.showText.bind(this), 1000);
    }
}