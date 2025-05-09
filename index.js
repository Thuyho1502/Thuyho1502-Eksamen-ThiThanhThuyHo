var user = localStorage.getItem("user");
if(user){
    var parseUser = JSON.parse(user);
    document.getElementById("wellcomeMessage").innerHTML = `Hello ${parseUser.name}`;
    document.getElementById("logOutBtn").classList.remove("hidden");
}else{
    document.getElementById("wellcomeMessage").innerHTML = "Hello, please <a href='login.html'>Login</a>";
}

document.getElementById("logOutBtn").addEventListener("click", function(){
    localStorage.removeItem("user");
    window.location.href = "Side1/login.html";
});
 