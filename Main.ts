import { GamePage } from "./Game.js";
import { StartPage } from "./StartPage.js";

export const NEXT_AUDIO = new Audio('audio.wav');
export const TICK_AUDIO = new Audio('audio4.wav');
export const CLICK_AUDIO = new Audio('audio3.wav');
export const CLICK2_AUDIO = new Audio('audio2.wav');

async function main()
{
    console.log("Ce jeu a été developpé par Antoine Bartoli, élève de Cy-Tech, pour un defi !");

    // Service Worker pour transformer le site en PWA
    // https://www.freecodecamp.org/news/build-a-pwa-from-scratch-with-html-css-and-javascript/
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function() 
        {
            navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
        })
    }

    // Ajoute une font personalisée
    document.fonts.add(await new FontFace("font1", "url(Font.otf)").load());
    new StartPage();
}

main();