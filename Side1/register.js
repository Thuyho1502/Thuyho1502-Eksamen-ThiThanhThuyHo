document.getElementById("registerForm").addEventListener("submit", function(event){
    event.preventDefault();
    var  name = document.getElementById("name").value;
    var userName = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;


    if(password !== confirmPassword){
        alert("Password do not match");
        return;
    }
    const user ={
        name : name,
        userName : userName,
        password: password,


    }
    localStorage.setItem(userName, JSON.stringify(user));
    alert("Registration successfull! Please login.");
    window.location.href = "login.html";
});

