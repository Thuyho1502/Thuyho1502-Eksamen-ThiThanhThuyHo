import{apiUrl} from "../Authentication/AUTH.js";

document.getElementById("registerForm").addEventListener("submit", async function(event){
    event.preventDefault();
    var  name = document.getElementById("name").value;
    var userName = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    console.log(userName, password);


    if(password !== confirmPassword){
        alert("Password do not match");
        return;
    }
    const user ={
        name : name,
        userName : userName,
        password: password,
    }
    console.log(user);
    try{
        const response = await axios.post(apiUrl, user)
        console.log(response.user);
    }catch(error){
        console.log("Can not register user",error);
    }
    
    

    localStorage.setItem(userName, JSON.stringify(user));
    alert("Registration successfull! Please login.");
    window.location.href = "login.html";
});

