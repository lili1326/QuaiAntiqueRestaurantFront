 //  Constantes pour le nom des cookies et l'URL de l'API
const tokenCookieName = "accesstoken";
const RoleCookieName = "role";
const deconnectionBtn = document.getElementById("deconnection-btn");
const apiUrl = "http://127.0.0.1:8000/api/";

//  Ajoute un écouteur d'événement sur le bouton "Déconnexion"
deconnectionBtn.addEventListener("click", deconnection);

/**
 * Récupère le rôle de l'utilisateur depuis le cookie
 * Retourne "user", "admin" ou null si non connecté
 */
function getRole() {
    const role = getCookie(RoleCookieName);
    if (role === "ROLE_USER") return "user";
    if (role === "ROLE_ADMIN") return "admin";
    return null;
}

/**
 *  Fonction de déconnexion : supprime les cookies et recharge la page
 */
function deconnection() {
    eraseCookie(tokenCookieName);
    eraseCookie(RoleCookieName);
    window.location.reload();
}

/**
 *  Stocke le token dans un cookie (durée : 7 jours)
 */
function setToken(token) {
    setCookie(tokenCookieName, token, 7);
    console.log(document.cookie); // debug
}

/**
 *  Récupère le token depuis le cookie
 */
function getToken() {
    return getCookie(tokenCookieName);
}

/**
 *  Crée un cookie avec nom, valeur et durée de validité en jours
 */
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

/**
 * Récupère la valeur d’un cookie à partir de son nom
 */
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (const element of ca) {
        let c = element;
        while (c.startsWith(' ')) c = c.substring(1, c.length);
        if (c.startsWith(nameEQ)) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

/**
 * Supprime un cookie en le réécrivant avec une date expirée
 */
function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

/**
 *  Indique si un utilisateur est connecté (présence du token)
 */
function isConnected() {
    return getToken() !== null && getToken !== undefined;
}

/**
 *  Gère l'affichage d'éléments HTML selon le rôle ou l’état de connexion
 * Utilise des data-attributes comme [data-show="admin"]
 */
function showAndHideElementsForRoles() {
    const userConnected = isConnected();
    const role = getRole();

    let allElementsToEdit = document.querySelectorAll('[data-show]');

    allElementsToEdit.forEach(element => {
        switch (element.dataset.show) {
            case 'disconnected':
                if (userConnected) element.classList.add("d-none");
                break;
            case 'connected':
                if (!userConnected) element.classList.add("d-none");
                break;
            case 'admin':
                if (!userConnected || role != "admin") element.classList.add("d-none");
                break;
            case 'user':
                if (!userConnected || role != "user") element.classList.add("d-none");
                break;
        }
    });
}

/**
 *  Nettoie une chaîne HTML pour éviter les failles XSS
 * Convertit le texte en entités HTML (ex. < en &lt;)
 */
function sanitiezHtml(text) {
    const tempHtml = document.createElement('div');
    tempHtml.textContent = text;
    return tempHtml.innerHTML;
}

/**
 * Récupère les infos du compte utilisateur connecté via l'API
 * Utilise le token dans l'en-tête "X-AUTH-TOKEN"
 */
function getInfosUser() {
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(apiUrl + "account/me", requestOptions)
        .then(response => {
            if (response.ok) return response.json();
            else console.log("Impossible de récupérer les informations utilisateur");
        })
        .then(result => {
            return result; // pour usage ultérieur
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données utilisateur", error);
        });
}
