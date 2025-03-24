const mailInput =document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSingin = document.getElementById("btnInscription");

btnSingin.addEventListener("click", checkCredentials);//information de connection

function checkCredentials(){
    //Ici, il faudra appeler l'API pour vérifier les credentials en BDD
  
    if(mailInput.value == "test@mail.com" && passwordInput.value == "123"){
         
        //Il faudra récupérer le vrai token
        const token = "lkjsdngfljsqdnglkjsdbglkjqskjgkfjgbqslkfdgbskldfgdfgsdgf";
        setToken(token);

        //placer ce token en cookie
        //setCookie(RoleCookieName, "admin", 7);
        window.location.replace("/");
    }
    else{
        mailInput.classList.add("is-invalid");
        passwordInput.classList.add("is-invalid");
    }
}