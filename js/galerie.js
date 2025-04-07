
const galerieImage = document.getElementById("allImages");


//récupérer les informations des images

 // Images principales
const images = [
    { titre: 'Chef cuisinier', url: '../assets/image/chef-cuisinier.png' },
    { titre: 'Plat cuisiné', url: '../assets/image/Plat-cuisiné.png' },
    { titre: 'Verre de vin', url: '../assets/image/verre-vin.jpg' },
    { titre: 'Fruits & légumes', url: '../assets/image/légumes -fruits.png' },
    { titre: 'Salle de restaurant', url: '../assets/image/Salle-restaurant.png' },
    { titre: 'Plateau aliments', url: '../assets/image/plateau-aliments .png' }
];

let contenuHTML = "";
images.forEach(image => {
    contenuHTML += getImage(image.titre, image.url);
});

galerieImage.innerHTML = contenuHTML;


//Exemple avec une image "dangereuse"
let titre ='<img scr x onerror="window.location.replace(\'htpps://google.com\')"/>';
let imgSource = "../assets/image/chef-cuisinier.png"
let monImage = getImage(titre,imgSource);
galerieImage.innerHTML += monImage;


function sanitiezHtml(text){
    // Créez un élément HTML temporaire de type "div"
    const tempHtml = document.createElement('div');
    
    // Affectez le texte reçu en tant que contenu texte de l'élément "tempHtml"
    tempHtml.textContent = text;
    
    // Utilisez .innerHTML pour récupérer le contenu de "tempHtml"
    // Cela va "neutraliser" ou "échapper" tout code HTML potentiellement malveillant
    return tempHtml.innerHTML;
} 

function getImage(titre, urlImage) {
    titre = sanitiezHtml(titre);
    urlImage = sanitiezHtml(urlImage);
    return `
    <div class="col p-3">
        <div class="image-card text-white">
            <img src="${urlImage}" class="rounded w-100"/>
            <p class="titre-image">${titre}</p>
            <div class="action-image-buttons" data-show="admin">
                <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#EditionPhotoModal">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#DeletePhotoModal">
                    <i class="bi bi-trash"></i>
                </button>
            </div>        
        </div>
    </div>`;
}
