document.querySelector('form').addEventListener("submit", (event) => {
    event.preventDefault()

    let emailInput = document.querySelector("#email").value
    console.log(emailInput)
    let passwordInput = document.querySelector("#password").value
    console.log(passwordInput)

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

            console.log(json.email)
            // checking informations users
            // json.email.forEach(user
            //     user.email == emailInput && user.password == passwordInput
            // )
            localStorage.setItem("token", json.token)
            console.log(json)
            console.log(json.token)
            try {
                
            } catch (error) {
                
            }
            window.location.href = "index.html"
        })
    // check 

})       
