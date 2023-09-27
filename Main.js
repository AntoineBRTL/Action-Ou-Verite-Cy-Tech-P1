var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { StartPage } from "./StartPage.js";
export const NEXT_AUDIO = new Audio('audio.wav');
export const TICK_AUDIO = new Audio('audio4.wav');
export const CLICK_AUDIO = new Audio('audio3.wav');
export const CLICK2_AUDIO = new Audio('audio2.wav');
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Ce jeu a été developpé par Antoine Bartoli, élève de Cy-Tech, pour un defi !");
        // Bloque l'access si c'est un pc
        if (window.innerWidth >= window.innerHeight) {
            alert("Ce jeu est disponible uniquement sur mobile !!");
            throw new Error('Platform Error...');
        }
        // Service Worker pour transformer le site en PWA
        // https://www.freecodecamp.org/news/build-a-pwa-from-scratch-with-html-css-and-javascript/
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", function () {
                navigator.serviceWorker
                    .register("/serviceWorker.js")
                    .then(res => console.log("service worker registered"))
                    .catch(err => console.log("service worker not registered", err));
            });
        }
        // Ajoute une font personalisée
        document.fonts.add(yield new FontFace("font1", "url(Font.otf)").load());
        new StartPage();
    });
}
main();
