import { CLICK2_AUDIO, CLICK_AUDIO, TICK_AUDIO } from "./Main.js";
import { Page } from "./Page.js";
import { Player } from "./Player.js";
import { dare, truth } from "./TruthOrDareText.js";

export class GamePage extends Page
{
    private players: Array<Player>;

    private currentPlayerText: HTMLParagraphElement;

    private cardDiv: HTMLDivElement;

    private cardRx: number;
    private cardRy: number;

    private todDiv: HTMLDivElement;
    private truthButton: HTMLDivElement;
    private truthButtonText: HTMLParagraphElement;
    private dareButton: HTMLDivElement;
    private dareButtonText: HTMLParagraphElement;

    private cardButtonsDiv: HTMLDivElement;
    private cardDoneButton: HTMLDivElement;
    private cardDoneButtonText: HTMLParagraphElement;
    private cardDrinkButton: HTMLDivElement;
    private cardDrinkButtonText: HTMLParagraphElement;

    private canClickTODButtons: boolean;
    private currentPlayer: Player | null;

    public constructor(players: Array<Player>)
    {
        super();

        this.players = players;

        this.currentPlayerText = document.createElement("p");
        this.todDiv = document.createElement("div");
        this.truthButton = document.createElement("div");
        this.truthButtonText = document.createElement("p");
        this.dareButton = document.createElement("div");
        this.dareButtonText = document.createElement("p");
        this.cardDiv  = document.createElement("div");
        this.cardButtonsDiv = document.createElement('div');
        this.cardDoneButton = document.createElement('div');
        this.cardDoneButtonText = document.createElement('p');
        this.cardDrinkButton = document.createElement('div');
        this.cardDrinkButtonText = document.createElement('p');

        this.canClickTODButtons = false;

        this.currentPlayer = null;
        
        this.cardRx = 0;
        this.cardRy = 0;


        this.getContent().style.display = "flex";
        this.getContent().style.flexDirection = "column";
        this.getContent().style.justifyContent = "center";
        this.getContent().style.alignItems = "center";

        this.currentPlayerText.style.fontFamily = "font1";
        this.currentPlayerText.style.fontSize = "6vw";
        this.currentPlayerText.style.color = "#F7F7FF";
        this.currentPlayerText.style.transition = "0.5s";

        this.getContent().appendChild(this.currentPlayerText);

        this.todDiv.style.display = "flex";
        this.todDiv.style.flexDirection = "column";

        this.getContent().appendChild(this.todDiv);

        this.dareButton.style.width = "40vw";
        this.dareButton.style.height = "15vw";
        this.dareButton.style.borderRadius = "15px";
        this.dareButton.style.backgroundColor = "#F7F7FF";
        this.dareButton.style.margin = "2vw";
        this.dareButton.style.display = "flex";
        this.dareButton.style.justifyContent = "center";
        this.dareButton.style.alignItems = "center";

        this.todDiv.appendChild(this.dareButton);

        this.dareButtonText.innerText = "Action";
        this.dareButtonText.style.fontFamily = "font1";
        this.dareButtonText.style.fontSize = "6vw";
        this.dareButtonText.style.color = "#FFBE0B";

        this.dareButton.appendChild(this.dareButtonText);

        this.truthButton.style.width = "40vw";
        this.truthButton.style.height = "15vw";
        this.truthButton.style.borderRadius = "15px";
        this.truthButton.style.backgroundColor = "#F7F7FF";
        this.truthButton.style.margin = "2vw";
        this.truthButton.style.display = "flex";
        this.truthButton.style.justifyContent = "center";
        this.truthButton.style.alignItems = "center";

        this.todDiv.appendChild(this.truthButton);

        this.truthButtonText.innerText = "Verite";
        this.truthButtonText.style.fontFamily = "font1";
        this.truthButtonText.style.fontSize = "6vw";
        this.truthButtonText.style.color = "#FFBE0B";

        this.truthButton.appendChild(this.truthButtonText);

        this.cardDiv.style.width = "90vw";
        this.cardDiv.style.height = "130vw";
        this.cardDiv.style.backgroundColor = "#F7F7FF";
        this.cardDiv.style.borderRadius = "20px";

        this.cardDiv.style.position = "absolute";
        this.cardDiv.style.translate = "-50% -50%";
        this.cardDiv.style.left = "50%";
        this.cardDiv.style.top = "50%";
        this.cardDiv.style.perspective = "10vw";
        this.cardDiv.style.boxShadow = "0 .1rem .15rem rgba(40,36,89,.2),0 .25rem .4rem rgba(40,36,89,.15)";

        this.cardDiv.style.display = "flex";
        this.cardDiv.style.alignItems = "center";
        this.cardDiv.style.justifyContent = "center";
        this.cardDiv.style.transformStyle = "preserve-3d";

        this.getContent().appendChild(this.cardDiv);

        let previousTouch:Touch | null;
        window.addEventListener("touchmove", function(this: GamePage, event: TouchEvent)
        {
            let factor: number = 0.01;
            let touch = event.touches[0];

            if(previousTouch)
            {
                let mx = touch.pageX - previousTouch.pageX;
                this.cardRx += mx*factor;

                let my = touch.pageY - previousTouch.pageY;
                this.cardRy += my*factor;

                // console.log(mx, my);

                // console.log(mx, my);

                // this.cardRy += 0.01;
                // this.cardRx += 0.01;
                // console.log(this.cardRx, this.cardRy);
                this.cardDiv.style.transform = "rotateX(" + -this.cardRy + "rad) rotateY(" + this.cardRx + "rad) rotateZ(0rad)";
            }

            previousTouch = touch;
        }.bind(this));

        window.addEventListener("touchstart", function(this: GamePage)
        {
            this.cardDiv.style.transition = "all 0.0s ease-out";
        }.bind(this));

        window.addEventListener("touchend", function(this: GamePage)
        {
            this.cardDiv.style.transition = "all 0.15s ease-out";
            previousTouch = null;
            this.cardRx = 0;
            this.cardRy = 0;
            this.cardDiv.style.transform = "rotateX(0rad) rotateY(0rad) rotateZ(0rad)";
        }.bind(this));

        let unmarge = 10;

        let back = document.createElement("div");
        back.style.width = 90 + "vw";
        back.style.height = 130 + "vw";
        back.style.backgroundColor = "#F2E2D2";
        back.style.borderRadius = "20px";
        back.style.position = "absolute";
        back.style.backfaceVisibility = "hidden";
        back.style.transform = "RotateY(180deg)";
        back.style.display = "flex";
        back.style.justifyContent = "center";
        back.style.alignItems = "center";
        back.style.display = "flex";
        this.cardDiv.appendChild(back);

        let backText = document.createElement("p");
        backText.innerText = "Antoine\n Bartoli\n P1";
        backText.style.fontFamily = "font1";
        backText.style.fontSize = "9vw";
        backText.style.color = "#F7F7FF";
        backText.style.textAlign = "center";
        back.appendChild(backText);

        let front = document.createElement("div");
        front.style.width = (90 - unmarge) + "vw";
        front.style.height = (130 - unmarge) + "vw";
        front.style.backgroundColor = "#FA8334";
        front.style.borderRadius = "20px";
        front.style.display = "flex";
        front.style.flexDirection = "column";
        front.style.alignItems = "center";
        this.cardDiv.appendChild(front);

        let frontTitleText = document.createElement("p");
        frontTitleText.innerHTML = "ACTION";
        frontTitleText.style.fontFamily = "font1";
        frontTitleText.style.fontSize = "9vw";
        frontTitleText.style.color = "#F7F7FF";
        frontTitleText.style.marginTop = "10vw";
        front.appendChild(frontTitleText);

        let frontTextContainer = document.createElement("div");
        frontTextContainer.style.width = "90%";
        frontTextContainer.style.height = "50%";
        frontTextContainer.style.display = "flex";
        frontTextContainer.style.flexDirection = "column";
        frontTextContainer.style.justifyContent = "center";
        front.appendChild(frontTextContainer);

        let frontText = document.createElement("p");
        frontText.innerHTML = "null";
        frontText.style.fontFamily = "font1";
        frontText.style.fontSize = "4vw";
        frontText.style.color = "#F7F7FF";
        frontText.style.textAlign = "center";
        frontTextContainer.appendChild(frontText);

        this.cardButtonsDiv.style.display = "flex";
        this.cardButtonsDiv.style.flexDirection = "row";
        this.cardButtonsDiv.style.justifyContent = "center";
        this.cardButtonsDiv.style.alignItems = "center";

        front.appendChild(this.cardButtonsDiv);

        this.cardDoneButton.style.width = "25vw";
        this.cardDoneButton.style.height = "10vw";
        this.cardDoneButton.style.borderRadius = "10px";
        this.cardDoneButton.style.backgroundColor = "#F7F7FF";
        this.cardDoneButton.style.margin = "2vw";
        this.cardDoneButton.style.display = "flex";
        this.cardDoneButton.style.justifyContent = "center";
        this.cardDoneButton.style.alignItems = "center";

        this.cardButtonsDiv.appendChild(this.cardDoneButton);

        this.cardDoneButtonText.innerText = "Fait !";
        this.cardDoneButtonText.style.fontFamily = "font1";
        this.cardDoneButtonText.style.fontSize = "4vw";
        this.cardDoneButtonText.style.color = "#FA8334";

        this.cardDoneButton.appendChild(this.cardDoneButtonText);

        this.cardDrinkButton.style.width = "25vw";
        this.cardDrinkButton.style.height = "10vw";
        this.cardDrinkButton.style.borderRadius = "10px";
        this.cardDrinkButton.style.backgroundColor = "#F7F7FF";
        this.cardDrinkButton.style.margin = "2vw";
        this.cardDrinkButton.style.display = "flex";
        this.cardDrinkButton.style.justifyContent = "center";
        this.cardDrinkButton.style.alignItems = "center";

        this.cardButtonsDiv.appendChild(this.cardDrinkButton);

        this.cardDrinkButtonText.innerText = "Je bois !";
        this.cardDrinkButtonText.style.fontFamily = "font1";
        this.cardDrinkButtonText.style.fontSize = "4vw";
        this.cardDrinkButtonText.style.color = "#FA8334";

        this.cardDrinkButton.appendChild(this.cardDrinkButtonText);

        this.cardDoneButton.addEventListener("click", function(this: GamePage)
        {
            this.hideCard();
            this.showTOD();

            CLICK_AUDIO.play();

            window.setTimeout(this.round.bind(this), 1000);
        }.bind(this));

        this.cardDrinkButton.addEventListener("click", function(this: GamePage)
        {
            this.hideCard();
            this.showTOD();

            CLICK_AUDIO.play();

            window.setTimeout(this.round.bind(this), 1000);
        }.bind(this));


        this.truthButton.addEventListener("click", function(this: GamePage)
        {
            if(!this.canClickTODButtons) return;

            CLICK_AUDIO.play();

            frontTitleText.innerText = "VERITE";

            let i: number = Math.floor(Math.random()*truth.length);
            frontText.innerText = truth[i];

            this.showCard();
            this.hideTOD();
        }.bind(this));

        this.dareButton.addEventListener("click", function(this: GamePage)
        {
            if(!this.canClickTODButtons) return;

            CLICK_AUDIO.play();

            frontTitleText.innerText = "ACTION";

            let i: number = Math.floor(Math.random()*dare.length);
            frontText.innerText = dare[i];

            this.showCard();
            this.hideTOD();
        }.bind(this));

        // HIDE CARD
        this.cardDiv.style.transition = "1.0s";
        this.cardDiv.style.translate = "-50% 1000%";
    }

    private round()
    {
        this.canClickTODButtons = false;

        this.randomDraw(0, 50.0, function(this: GamePage, player: Player)
        {
            // this.showCard();
            this.canClickTODButtons = true;
            this.currentPlayer = player;
        }.bind(this));
    }

    protected start(): void 
    {
        
        this.round();
        

        // this.hideCard();
    }

    private hideTOD()
    {
        window.setTimeout(function(this: GamePage)
        {
            this.todDiv.style.transition = "1.0s";
            this.todDiv.style.translate = "0% -1000%";

            this.currentPlayerText.style.opacity = "0";
        }.bind(this), 0.1);
    }

    private showTOD()
    {
        window.setTimeout(function(this: GamePage)
        {
            this.todDiv.style.transition = "1.0s";
            this.todDiv.style.translate = "0% 0%";

            this.currentPlayerText.style.opacity = "1";
        }.bind(this), 0.1);
    }

    private hideCard()
    {
        window.setTimeout(function(this: GamePage)
        {
            this.cardDiv.style.transition = "1.0s";
            this.cardDiv.style.translate = "-50% 1000%";
        }.bind(this), 0.1);
    }

    private showCard()
    {
        window.setTimeout(function(this: GamePage)
        {
            this.cardDiv.style.transition = "1.0s";
            this.cardDiv.style.translate = "-50% -50%";
        }.bind(this), 0.1);
    }

    /**
     * Tirage au sort du joueur
     */
    private randomDraw(index: number, dt: number, callback: Function)
    {
        // Cas de base de la recurtion
        if(dt >= 500)
        {
            let player = this.players[index];
            callback(player);
            return;
        }

        // On tire au sort un indice
        let randomIndex: number = Math.floor(Math.random()*this.players.length);
        if(randomIndex == index) randomIndex = (randomIndex + 1)%this.players.length;

        // On dessine le nom du joueur dans le HTML
        this.currentPlayerText.innerText = this.players[randomIndex].getName();

        dt *= 1.1;

        
        (TICK_AUDIO.cloneNode(true) as HTMLAudioElement).play();
        window.setTimeout(this.randomDraw.bind(this, randomIndex, dt), dt, callback);
    }
}