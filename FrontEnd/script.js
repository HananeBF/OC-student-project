const cat = localStorage.getItem("token")
console.log(cat)
if (cat !== null) {
    document.querySelector("#logIn").textContent="logout"
    document.querySelector(".category").style.display="none"
    document.querySelector("#modify").style.display="inline-block"
    document.querySelector("#edition-banner").style.display="inline-block"
    

}
// API categories via fetch
fetch("http://localhost:5678/api/categories")
    .then(res => res.json())
    .then(data => {


        let display = ``
        for (li of data) {
            display += `
            <li data-id="${li.id}" class="categoryBtn">${li.name}</li>
            `

        }
        document.querySelector(".category").insertAdjacentHTML("beforeend", display)
        startFilterListener()
    })

    .catch(err => { console.log(err) }
    )

// API works via fetch
fetch("http://localhost:5678/api/works")
    .then(res => res.json())
    .then(data => {

        let display = ``

        for (let figure of data) {

            display += `

            <figure data-categoryId="${figure.categoryId}">
                <img src="${figure.imageUrl}" alt="${figure.title}"/>
                <figcaption>${figure.title}</figcaption>
            </figure>

          `

        }
        document.querySelector(".gallery").insertAdjacentHTML("beforeend", display)
    })
    .catch(err => {
        console.log(err)
    })

const startFilterListener = () => {
    const categoryFilter = document.querySelectorAll(".categoryBtn")

    console.log(categoryFilter)
    for (elem of categoryFilter) {
        console.log(elem)
        elem.addEventListener("click", (event) => {

            let productAll = document.querySelectorAll(".gallery > figure")
            //elem.classList.add("category_selected")

            for (item of productAll) {
                item.classList.remove("gallery_hidden")
                console.log(elem)
                
                
            }

            if (event.target.dataset.id !== "0") {
                const productFilter = document.querySelectorAll(".gallery > figure:not([data-categoryId='" + event.target.dataset.id + "'])")
                console.log(event)
                console.log(event.target.dataset.id)

                for (item of productFilter) {
                    item.classList.add("gallery_hidden")
                    //document.querySelector("tout").classList.remove("category_selected")
                    
                }
            
            }
            
        })
    }
}