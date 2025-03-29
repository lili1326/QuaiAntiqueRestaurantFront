//specifique a la connection

const tokenCookieName = "accesstoken";
const RoleCookieName = "role";
const deconnectionBtn= document.getElementById("deconnection-btn");
const apiUrl = "http://127.0.0.1:8000/api/";

deconnectionBtn.addEventListener("click",deconnection);

function getRole(){
    return getCookie(RoleCookieName);
}

function deconnection(){
    eraseCookie(tokenCookieName);
    eraseCookie(RoleCookieName);
    window.location.reload();
}

function setToken(token){
    setCookie(tokenCookieName, token, 7);//7 jours
    console.log(document.cookie);
}

function getToken(){
    return getCookie(tokenCookieName);
}


// placer le cookie
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

//récupérer le cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}


//supprimer le cookie
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// savoir si connecter ou pas
function isConnected(){
    if(getToken() == null || getToken == undefined){
        return false;
    }
    else{
        return true;
    }
}
 

/*
avec data attribut en index.html
disconnect
connected (admid ou client)
  admin
  client
*/

function showAndHideElementsForRoles(){
    const userConnected = isConnected();
    const role = getRole();

    let allElementsToEdit = document.querySelectorAll('[data-show]');

    allElementsToEdit.forEach(element =>{
        switch(element.dataset.show){
            case 'disconnected': 
                if(userConnected){
                    element.classList.add("d-none");
                }
                break;
            case 'connected': 
                if(!userConnected){
                    element.classList.add("d-none");
                }
                break;
            case 'admin': 
                if(!userConnected || role != "admin"){
                    element.classList.add("d-none");
                }
                break;
            case 'user': 
                if(!userConnected || role != "user"){
                    element.classList.add("d-none");
                }
                break;
        }
    })
}