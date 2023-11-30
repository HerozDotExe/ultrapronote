export function log(...msg) {
    console.log("[ULTRA PRONOTE] :", ...msg);
}

export function moyenne(v) {
    const r = parseFloat(v.replace(",", "."));

    if(isNaN(r)) log(`Moyenne égale ${v} ignorée.`)

    if(!isNaN(r)) {return r} else return 0
}

export function reduce(moyennes) {
    return moyennes.reduce((p, c) => {
        if (typeof p === "number") return p + moyenne(c);

        return moyenne(p) + moyenne(c);
    });
}

export function waitForElm(selector) {
    return new Promise((resolve) => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver((mutations) => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    });
}

const originalXHR = window.XMLHttpRequest;
export function moyenneGénérale() {
    const xhr = new originalXHR();

    xhr.addEventListener("load", function () {
        try {
            const r = JSON.parse(xhr.responseText);

            if (!r.nom || r.nom !== "DernieresNotes") return;

            log("Détéction d'une demande d'affichage des notes, affichage des la moyenne générale...")

            const moyennes = r.donneesSec.donnees.listeServices["V"].filter((m) => {
                if(isNaN(parseFloat(m.moyEleve["V"].replace(",", ".")))) log(`Moyenne égale à ${m.moyEleve["V"]} ignorée, car elle ne semble pas être un nombre (non noté par exemple ?).`)
                return !isNaN(parseFloat(m.moyEleve["V"].replace(",", ".")))
            }).map((m) => {
                return m.moyEleve["V"];
            });

            const moyenneGénérale = reduce(moyennes) / moyennes.length;
            const parent = document.getElementsByClassName(
                "objetBandeauEntete_thirdmenu"
            )[0];

            const e = document.createElement("h2");
            e.innerText = `Moyenne générale : ${Math.round(moyenneGénérale * 100) / 100
                }`;
            parent.appendChild(e);
        } catch (error) {
            log(
                "Une erreur est survenu lors du calcul de la moyenne générale :",
                error
            );
        }
    });

    return xhr;
}