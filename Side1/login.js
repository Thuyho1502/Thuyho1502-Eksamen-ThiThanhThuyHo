


document.getElementById("loginForm").addEventListener("submit", function(event){
event.preventDefault();
var userName = document.getElementById("username").value;
var password = document.getElementById("password").value;

var user = localStorage.getItem(userName);

if(user){
    var parseUser = JSON.parse(user);
    if(parseUser.password === password){
        localStorage.setItem("user", JSON.stringify(parseUser));
        window.location.href ="../index.html";
        console.log("login success!")
    } else{
        alert("Incorrect password");
    }
}else{
    alert("User not found");
    
}

});