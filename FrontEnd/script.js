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
}
// add figure on modal for admin version
async function displayGaleryModal() {
    try {


        document.querySelector(".modal_photo").innerHTML = ""
        const galleryPhoto = await fetch("http://localhost:5678/api/works")
        const data = await galleryPhoto.json()


        let display = ``

        for (let figure of data) {

            display += `
                
                <figure data-categoryId="${figure.categoryId}" >
                    <img src="${figure.imageUrl}" alt="${figure.title}"/>
                    
                    <i class="fa-regular fa-trash-can" id="${figure.id}"></i>
                    
                </figure>

              `

        }
        document.querySelector(".modal_photo").insertAdjacentHTML("beforeend", display)
        deleteGaleryModal()


    } catch (err) {
        console.log(err)
    }
}

//add trash can and delete method
const deleteGaleryModal = async () => {
    const deletePhoto = document.querySelectorAll(".fa-trash-can")
    for (elem of deletePhoto) {
        elem.addEventListener("click", event => {
            console.log(event.target.id)
            

        })
    
    }
    /*const deletePhoto = await fetch("http://localhost:5678/api/works/")
        .then(res => res.json())
        .then(element => {
            let display = ``

            for (let figure of element) {

            }

            deleteGaleryModal()
        })
        .catch(err => {
            console.log(err)
        })

    let id = trash.id
    const init = {
        method: "DELETE"
    }*/
}




displayGaleryModal()


//add new modal and addFigure
/*document.querySelector("#addFigure").addEventListener("click", () => {
        (document.createElement une nouvelle page puis
        window.location = url (à définir))
    })*/