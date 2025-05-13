import { apiUrl } from "../Authentication/AUTH.js";



document.getElementById("loginForm").addEventListener("submit", async function(event){
event.preventDefault();
const userName = document.getElementById("username").value;
const password = document.getElementById("password").value;

    
        try{
            const response = await axios.get(apiUrl);
            const user = response.data;
            const matchedUser = user.find
            (user=> user.userName === userName && user.password === password);
            
            if(matchedUser){
                localStorage.setItem("user_id",matchedUser._id);
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