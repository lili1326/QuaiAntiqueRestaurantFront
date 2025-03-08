import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),//je créer le dossier pages et le fichier home  
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique";