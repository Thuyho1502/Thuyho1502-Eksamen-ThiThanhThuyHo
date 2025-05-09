import { apiUrl } from "../Authentication/AUTH.js";



document.getElementById("loginForm").addEventListener("submit", async function(event){
event.preventDefault();
var userName = document.getElementById("username").value;
var password = document.getElementById("password").value;

var storeUser = localStorage.getItem(userName);

if(storeUser){
    var user = JSON.parse(storeUser);
    if(user.userName === userName && user.password === password){
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href ="../index.html";
       console.log("User already logged in. Welcome!");
    } else{
        alert("Incorrect username or password");
    }
} else{
    
        try{
            const response = await axios.get(apiUrl);
            const user = response.data;
            const matchedUser = user.find(user=> user.userName === userName && user.password === password);
            
            if(matchedUser){
                localStorage.setItem("user",JSON.stringify(matchedUser));
                alert("Login successful!");
                window.location.href ="../index.html";   
            }else{
                alert("Incorrect username or password.");
            }

        }catch(error){
            console.error("Login error:", error);
            

        }
    }
});