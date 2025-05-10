import { apiUrl } from "../Authentication/AUTH.js";



document.getElementById("loginForm").addEventListener("submit", async function(event){
event.preventDefault();
const userName = document.getElementById("username").value;
const password = document.getElementById("password").value;

const storeUser = localStorage.getItem(userName);

/* if(storeUser){
    const user = JSON.parse(storeUser);
    if(user.userName === userName && user.password === password){
        console.log("Login successful (local)!");
         alert("Login successful (local)!");
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href ="../index.html";
        return;
       
    } else{
        alert("Incorrect username or password");
    }
}  */
//else{
    
        try{
            const response = await axios.get(apiUrl);
            const user = response.data;
            const matchedUser = user.find
            (user=> user.userName === userName && user.password === password);
            
            if(matchedUser){
                localStorage.setItem("user",JSON.stringify(matchedUser));
                alert("Login successful!");
                window.location.href ="../index.html";   
            }else{
                alert("Incorrect username or password.");
            }

        }catch(error){
            console.error("Login error:", error);
             alert("Something went wrong while logging in.");
            

        }
    });
//}