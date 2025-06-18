 //  Sélection des champs du formulaire HTML
const inputNom = document.getElementById("NomInput");
const inputPreNom = document.getElementById("PrenomInput");
const inputMail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidationPassword = document.getElementById("ValidatePasswordInput");
const btnValidation = document.getElementById("btn-validation-inscription");
const formInscription = document.getElementById("formulaireInscription");

//  Déclenche la validation à chaque frappe sur les champs du formulaire
inputNom.addEventListener("keyup", validateForm);
inputPreNom.addEventListener("keyup", validateForm);
inputMail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputValidationPassword.addEventListener("keyup", validateForm);

//  Lancement de la fonction d’inscription si le bouton est cliqué
btnValidation.addEventListener("click", InscrireUtilisateur);

/**
 *  Fonction de validation globale du formulaire
 * Active ou désactive le bouton selon si les champs sont valides
 */
function validateForm() {
    const nomOk = validateRequired(inputNom);
    const prenomOk = validateRequired(inputPreNom);
    const mailOk = validateMail(inputMail);
    const passwordOk = validatePassword(inputPassword);
    const passwordConfirmOk = validateConfirmationPassword(inputPassword, inputValidationPassword);

    // Si tout est OK, on active le bouton
    btnValidation.disabled = !(nomOk && prenomOk && mailOk && passwordOk && passwordConfirmOk);
}

/**
 *  Vérifie qu’un champ requis n’est pas vide
 */
function validateRequired(input) {
    if (input.value !== '') {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

/**
 *  Vérifie que le champ email est au bon format via regex
 */
function validateMail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if (mailUser.match(emailRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

/**
 *  Vérifie que le mot de passe est fort :
 * Majuscule, minuscule, chiffre, caractère spécial, au moins 8 caractères
 */
function validatePassword(input) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if (passwordUser.match(passwordRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

/**
 *  Vérifie que les deux mots de passe sont identiques
 */
function validateConfirmationPassword(inputPwd, inputConfirmPwd) {
    if (inputPwd.value === inputConfirmPwd.value) {
        inputConfirmPwd.classList.add("is-valid");
        inputConfirmPwd.classList.remove("is-invalid");
        return true;
    } else {
        inputConfirmPwd.classList.add("is-invalid");
        inputConfirmPwd.classList.remove("is-valid");
        return false;
    }
}

/**
 * Envoie les données du formulaire au serveur via fetch en JSON
 */
function InscrireUtilisateur() {
    let dataForm = new FormData(formInscription);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "firstName": dataForm.get("nom"),
        "lastName": dataForm.get("prenom"),
        "email": dataForm.get("email"),
        "password": dataForm.get("mdp")
    });

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    // Envoi des données à l’API backend
    fetch(apiUrl + "registration", requestOptions)
        .then(response => {
            if (response.ok) return response.json();
            else alert("Erreur lors de l'inscription");
        })
        .then(result => {
            alert("Bravo " + dataForm.get("prenom") + ", vous êtes maintenant inscrit, vous pouvez vous connecter.");
            document.location.href = "/connection";
        })
        .catch(error => console.log('error', error));
}
