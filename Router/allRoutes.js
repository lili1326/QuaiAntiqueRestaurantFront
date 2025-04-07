import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html",[]),
    new Route("/galerie","La galerie","/pages/galerie.html",[]),
    new Route("/carte","La  carte","/pages/carte.html",[]),
    new Route("/connection","Connection","/pages/auth/connection.html",["disconnected"],"js/auth/connection.js"),
    new Route("/inscription","Inscription","/pages/auth/inscription.html",["disconnected"],"/js/auth/inscription.js"),
    new Route("/compte","Mon compte","/pages/auth/compte.html",["user","admin"]),
    new Route("/modifPassword","Modifier le mot de passe","/pages/auth/modifPassword.html",["user","admin"]),
    new Route("/allResa","Vos réservations","/pages/reservation/allResa.html",["user"]),
    new Route("/reserver","Reserver","/pages/reservation/reserver.html",["user"]),
    //new route ici
];
//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique";