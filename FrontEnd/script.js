const cat = localStorage.getItem("token")
const modalGalery = document.querySelector(".modal_photo")
console.log(cat)
if (cat !== null) {
    document.querySelector("#logIn").textContent = "logout"
    document.querySelector(".category").style.display = "none"
    document.querySelector("#modify").style.display = "inline-block"
    document.querySelector("#edition-banner").style.display = "inline-block"
    


    // ajouter listener sur ajouter une photo qui amène à une autre page
    //Add modal_container when I click on modify
    document.querySelector("#modify").addEventListener("click", () => {
        document.querySelector(".modal_container").style.display = "flex"
        
    })
    document.querySelector(".modal_container").addEventListener("click", (event) => {
        if (event.target.className == "modal_container")
            document.querySelector(".modal_container").style.display = "none"
    })

    document.querySelector("#croix").addEventListener("click", () => {
        document.querySelector(".modal_container").style.display = "none"
    })
    /*document.querySelector("#addPhoto").addEventListener("click", (event) => {

    })*/
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
//creer une constante du fetch ?
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

    //console.log(categoryFilter)
    for (elem of categoryFilter) {
        //console.log(elem)
        elem.addEventListener("click", (event) => {

            let productAll = document.querySelectorAll(".gallery > figure")

            for (item of productAll) {
                item.classList.remove("gallery_hidden")
                //console.log(elem)
                document.querySelector(".tout").classList.add("category_selected")

            }

            if (event.target.dataset.id !== "0") {
                const productFilter = document.querySelectorAll(".gallery > figure:not([data-categoryId='" + event.target.dataset.id + "'])")
                //console.log(event)
                //console.log(event.target.dataset.id)

                for (item of productFilter) {
                    item.classList.add("gallery_hidden")
                    document.querySelector(".tout").classList.remove("category_selected")
                    elem.dataset.id.classList.add("category_selected")
                }

            } else {
                categoryFilter.classList.remove("category_selected")
            }

        })
    }
    
    async function displayGaleryModal() {
        modalGalery.innerHTML =""
        const galleryPhoto = await fetch("http://localhost:5678/api/works")
        .then(res => res.json())
        .then(data => {
    
            let display = ``
    
            for (let figure of data) {
    
                display += `
    
                <figure data-categoryId="${figure.categoryId}">
                    <img src="${figure.imageUrl}" alt="${figure.title}"/>
                </figure>
    
              `
    
            }
            document.querySelector(".modal_photo").insertAdjacentHTML("beforeend", display)
        })
        .catch(err => {
            console.log(err)
        })
        
        galleryPhoto.forEach(photo => {
            const figure = document.createElement("figure")
            figure.classList.add("modal_photo")
            const img = document.createElement("img")
            const spanTrash = document.createElement("span")
            const trash = document.createElement("i")
            trash.classList.add("fa-regular", "fa-trash-can")
            trash.id = photo.categoryId
            img.src = photo.imageUrl
            spanTrash.appendChild("trash")
        })
        console.log(photo)
    }
    displayGaleryModal() 
}