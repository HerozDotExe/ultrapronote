/// <reference path="main.d.ts" />
"use strict";

import { log, waitForElm, moyenneGénérale } from "./utils"

async function init() {
    log("Initialisation...");

    // Remplace la function de requête internet de façon à intercépter les infromations recues.
    //@ts-ignore
    window.XMLHttpRequest = moyenneGénérale;

    // Attend que le formulaire de connexion soit chargé, puis demande à pronote de se connecter avec les informations de connexion définis pas l'utilisateur.
    if (connexionAutomatique) {
        waitForElm("#id_11").then(() => {
            log("Formulaire de connexion détécté, tentative d'auto connexion...");
            GInterface.moteurConnexion.setLogin(Identifiant);
            GInterface.moteurConnexion.setMotDePasse(MotDePasse);
            GInterface.moteurConnexion.identification();
        });
    }
}

// Supprime la sécurité empêchant de cliquer sur un bouton depuis du code.
let u_SurEventMouse_0x0 = false;
const u_estEventEn0x0 = function (aEvent) {
    return (
        (aEvent.pageX === 0 && aEvent.pageY === 0) ||
        (aEvent.clientX === 0 && aEvent.clientY === 0)
    );
};
//@ts-ignore
$.fn.eventValidation = function (aCallback) {
    return this.each(function () {
        $(this).on({
            keyup: function (aEvent) {
                return aCallback.call(this, aEvent);
            },
            click: function (aEvent) {
                if (aEvent.target.id !== "id_11") {
                    if (!u_SurEventMouse_0x0 && u_estEventEn0x0(aEvent)) {
                        return;
                    }
                    u_SurEventMouse_0x0 = false;
                }
                return aCallback.call(this, aEvent);
            },
        });
    });
};

// Quand la page a finnit de chargé, la fonction d'initialisation est appelée.
window.addEventListener("load", init);