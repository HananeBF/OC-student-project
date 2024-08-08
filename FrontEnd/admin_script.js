document.querySelector('form').addEventListener("submit", (event) => {
    event.preventDefault()
    console.log("pas de rechargement de page")
    let emailInput = document.querySelector("#email").value
    console.log(email)
    let passwordInput = document.querySelector("#password").value
    console.log(password)

    // POST request using fetch() 
    fetch("http://localhost:5678/api/users/login", {

        // Adding method type 
        method: "POST",

        // Adding body or contents to send 
        body: JSON.stringify({
            email: emailInput,
            password: passwordInput,
        }),

        // Adding headers to the request 
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

        // Converting to JSON 
        .then(response => response.json())
            
        // Displaying results to console 
        .then(json => {
            localStorage.setItem("token", json.token)
            console.log(json)
            console.log(json.token)
            window.location.href = "index.html"
        })

})

