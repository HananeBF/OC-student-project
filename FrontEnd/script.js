const cat = localStorage.getItem("token")
const modalGalery = document.querySelector(".modal_photo")

if (cat !== null) {
    document.querySelector("#logIn").textContent = "logout"
    document.querySelector("#logIn").classList.add("logout")
    document.querySelector(".category").style.display = "none"
    document.querySelector("#modify").style.display = "inline-block"
    document.querySelector("#edition-banner").style.display = "inline-block"

    //Add modal_container when I click on modify
    document.querySelector("#modify").addEventListener("click", () => {
        document.querySelector(".modal_container").style.display = "flex"
        document.querySelector(".modal_gestion").style.display = "flex"
        document.querySelector("#apercu").setAttribute("src", "")
        document.querySelector("#apercu").style.display = "none"
        document.querySelector("#title").value = ''
        document.querySelector("#category").value = ''
        document.querySelector(".fa-image").style.display = "flex"
        document.querySelector("#ajouter_photo").style.display = "flex"
        document.querySelector(".format-image").style.display = "flex"
        document.querySelector("#validate").classList.remove("validate-picture")
        document.querySelector("#validate").classList.add("form-empty")

    })

    //close modal container when i click on x or outside the container
    document.querySelector(".modal_container").addEventListener("click", (event) => {
        if (event.target.className == "modal_container") {
            document.querySelector(".modal_container").style.display = "none"
            document.querySelector("#apercu").setAttribute("src", "")
            document.querySelector("#apercu").style.display = "none"
            document.querySelector("#title").value = ''
            document.querySelector("#category").value = ''
            document.querySelector(".fa-image").style.display = "flex"
            document.querySelector("#ajouter_photo").style.display = "flex"
            document.querySelector(".format-image").style.display = "flex"
            document.querySelector("#validate").classList.remove("validate-picture")
            document.querySelector("#validate").classList.add("form-empty")
        }
    })

    document.querySelector("#croix").addEventListener("click", () => {
        document.querySelector(".modal_container").style.display = "none"
        document.querySelector("#apercu").setAttribute("src", "")
        document.querySelector("#apercu").style.display = "none"
        document.querySelector("#title").value = ''
        document.querySelector("#category").value = ''
        document.querySelector(".fa-image").style.display = "flex"
        document.querySelector("#ajouter_photo").style.display = "flex"
        document.querySelector(".format-image").style.display = "flex"
        document.querySelector("#validate").classList.remove("validate-picture")
        document.querySelector("#validate").classList.add("form-empty")
    })

    document.querySelector("#croix2").addEventListener("click", () => {
        document.querySelector(".modal_container").style.display = "none"
        document.querySelector(".modal_add_file").style.display = "none"
        document.querySelector("#apercu").setAttribute("src", "")
        document.querySelector("#apercu").style.display = "none"
        document.querySelector("#title").value = ''
        document.querySelector("#category").value = ''
        document.querySelector(".fa-image").style.display = "flex"
        document.querySelector("#ajouter_photo").style.display = "flex"
        document.querySelector(".format-image").style.display = "flex"
        document.querySelector("#validate").classList.remove("validate-picture")
        document.querySelector("#validate").classList.add("form-empty")
    })

    //add new modal and addFigure
    document.querySelector("#addPhoto").addEventListener("click", (event) => {
        event.preventDefault()
        document.querySelector(".modal_gestion").style.display = "none"
        document.querySelector(".modal_add_file").style.display = "flex"

    })

    //return to the previous modal
    document.querySelector("#back_arrow").addEventListener("click", (event) => {
        event.preventDefault()
        document.querySelector(".galeriephoto").style.display = "flex"
        document.querySelector(".modal_add_file").style.display = "none"
        document.querySelector(".modal_photo").style.display = "grid"
        document.querySelector("#addPhoto").style.display = "flex"
        document.querySelector(".modal_gestion").style.display = "flex"
        document.querySelector("#apercu").setAttribute("src", "")
        document.querySelector("#apercu").style.display = "none"
        document.querySelector("#title").value = ''
        document.querySelector("#category").value = ''
        document.querySelector(".fa-image").style.display = "flex"
        document.querySelector("#ajouter_photo").style.display = "flex"
        document.querySelector(".format-image").style.display = "flex"
        document.querySelector("#validate").classList.remove("validate-picture")
        document.querySelector("#validate").classList.add("form-empty")
    })

}



// API categories via fetch
async function getCategories() {
    const response = await fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
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
}
getCategories()

// API works via fetch
async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works")
        .then(res => res.json())
        .then(data => {

            let display = ``

            for (let figure of data) {

                display += `

            <figure data-categoryId="${figure.categoryId}" data-imageId="${figure.id}">
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
}
getWorks()

//filter by categories buttons
const startFilterListener = () => {
    const categoryFilter = document.querySelectorAll(".categoryBtn")

    for (catg of categoryFilter) {

        catg.addEventListener("click", (event) => {

            if (event.target.dataset.id !== "0") {
                const productFilter = document.querySelectorAll(".gallery > figure:not([data-categoryId='" + event.target.dataset.id + "'])")
                document.querySelectorAll(".gallery_hidden").forEach(fig => {
                    fig.classList.remove("gallery_hidden")


                })


                for (filtered of productFilter) {
                    filtered.classList.add("gallery_hidden")

                    document.querySelector(".tout").classList.remove("category_selected")
                    const categoriesUnselected = document.querySelectorAll("li:not([data-id='" + event.target.dataset.id + "'])")
                    const categoriesSelected = document.querySelectorAll("[data-id='" + event.target.dataset.id + "']")

                    categoriesSelected.forEach(cat => {
                        cat.classList.add("category_selected")
                    })

                    categoriesUnselected.forEach(cat => {
                        cat.classList.remove("category_selected")
                    })

                }

            } else {
                const productFilter = document.querySelectorAll(".gallery > figure")

                productFilter.forEach(elem => {
                    elem.classList.remove("gallery_hidden")
                    document.querySelector(".tout").classList.add("category_selected")
                    categoriesUnselected = document.querySelectorAll("li:not([data-id='0'])")
                    categoriesUnselected.forEach(cat => {
                        cat.classList.remove("category_selected")
                    })
                })

            }

        })
    }
}




// inject figure on modal for admin version
async function displayGaleryModal() {
    try {

        document.querySelector(".modal_photo").innerHTML = ""
        const galleryPhoto = await fetch("http://localhost:5678/api/works")
        const data = await galleryPhoto.json()


        let display = ``

        for (let figure of data) {

            display += `
                
                <figure data-categoryId="${figure.categoryId}" data-imageId="${figure.id}" >
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
displayGaleryModal()

//add trash can and delete method
const deleteGaleryModal = async () => {
    const deletePhoto = document.querySelectorAll(".fa-trash-can")
    for (elem of deletePhoto) {
        elem.addEventListener("click", (event) => {
            event.preventDefault()

            let idPhoto = event.target.id
            const deleteJson = {
                method: "DELETE",
                headers: {
                    "content-Type": "application.json",
                    "accept": "*/*",
                    "Authorization": "Bearer: " + cat
                },
            }
            fetch("http://localhost:5678/api/works/" + idPhoto, deleteJson)
                .then((res => {
                    if (!res.ok) {
                        console.log("delete failed")
                        event.preventDefault()
                    }

                }))

                .then(elem => {
                    event.preventDefault()

                    displayGaleryModal()

                    const sup = document.querySelectorAll("[data-imageid='" + idPhoto + "']")
                    sup.forEach(imgDelete => {
                        imgDelete.remove()
                    })


                })

        })
    }

}
deleteGaleryModal()

// preview img on addFile and initialize 
let previewFile = document.querySelector("#apercu")
let addPreviewFile = document.querySelector(".addFile input")
let labelPreviewFile = document.querySelector(".addFile label")

addPreviewFile.addEventListener("change", (event) => {

    previewFile.style.display = "flex"
    previewFile.src = URL.createObjectURL(event.target.files[0])
    document.querySelector(".fa-image").style.display = "none"
    document.querySelector("#ajouter_photo").style.display = "none"
    document.querySelector(".format-image").style.display = "none"


})



//add category on form option category

fetch("http://localhost:5678/api/categories")
    .then(res => res.json())
    .then(data => {


        let display = ``
        for (option of data) {
            display += `
            <option value="${option.id}">${option.name}</option>
            `

        }
        document.querySelector("#category").insertAdjacentHTML("beforeend", display)



    })
    .catch(err => { console.log(err) }
    )

// // check form .validate-picture  => ok .form-empty
const handleInputChange = (event) => {
    const title = document.getElementById('title').value.trim();
    const file = document.getElementById('file').files[0];
    const category = document.getElementById('category').value;
    let isValid=true
    if (!title) {
        isValid = false;
    }
    if (!file) {
        isValid = false;
    }
    if (!category) {
        isValid = false;
    }
    if (isValid) {
        document.querySelector("#validate").classList.add("validate-picture")
        document.querySelector("#validate").classList.remove("form-empty")  
    }else{
        document.querySelector("#validate").classList.remove("validate-picture")
        document.querySelector("#validate").classList.add("form-empty")  
    }
        
};

// Ajouter des gestionnaires d'événements aux éléments de formulaire
document.getElementById('title').addEventListener('input', handleInputChange);
document.getElementById('file').addEventListener('input', handleInputChange);
document.getElementById('category').addEventListener('change', handleInputChange);




// add image from modale admin 
const postImage = async () => {
    const addImage = document.querySelector("#validate")
    document.querySelector("#validation").addEventListener("submit", async (event) => {
        event.preventDefault()
        let errorMsg = document.querySelector("#message-erreur")

        try {
            let data = new FormData()
            data.append('image', document.querySelector("#file").files[0])
            data.append('title', document.querySelector("#title").value)
            data.append('category', document.querySelector("#category").value)



            const addJson = {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + cat
                },
                body: data
            }


            const response = await fetch("http://localhost:5678/api/works/", addJson)
            if (!response.ok) {
                throw new Error('Le formulaire est incomplet. Merci de le remplir avant de poster votre nouveau projet.')

            }
            const param = await response.json()

            if (response.ok) {

                errorMsg.textContent = ""

                document.querySelector("#apercu").setAttribute("src", "")
                document.querySelector("#apercu").style.display = "none"
                document.querySelector("#title").value = ''
                document.querySelector("#category").value = ''
                document.querySelector(".fa-image").style.display = "flex"
                document.querySelector("#ajouter_photo").style.display = "flex"
                document.querySelector(".format-image").style.display = "flex"
                document.querySelector("#validate").classList.remove("validate-picture")
                document.querySelector("#validate").classList.add("form-empty")


                let display =
                    ` <figure data-categoryId="${param.categoryId}" data-imageId="${param.id}">
                        <img src="${param.imageUrl}" alt="${param.title}"/>
                        <figcaption>${param.title}</figcaption>
                    </figure> 
                `
                document.querySelector(".gallery").insertAdjacentHTML("beforeend", display)

                let newImage =
                    `
                <figure data-categoryId="${param.categoryId}" data-imageId="${param.id}">
                    <img src="${param.imageUrl}" alt="${param.title}"/>
                    <i class="fa-regular fa-trash-can" id="${param.id}"></i>
                </figure>

                 `
                document.querySelector(".modal_photo").insertAdjacentHTML("beforeend", newImage)

                deleteGaleryModal()

            }

        } catch (error) {
            errorMsg.textContent = error.message
        }
    })

    deleteGaleryModal()
}
postImage()


// init logout
document.querySelector(".logout").addEventListener("click", (event) => {


    if (cat !== null) {
        window.localStorage.removeItem("token")
        location.reload()

    }
}
)
