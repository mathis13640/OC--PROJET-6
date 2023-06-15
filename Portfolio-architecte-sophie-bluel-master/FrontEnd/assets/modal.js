
/**************OUVERTURE FERMETURE MODAL*************/


// Cette fonction ouvre la fenêtre modale lorsqu'elle est déclenchée par un événement de clic sur un élément ayant la classe "js-modal"
const openModal = function(event) {
    event.preventDefault();
    const target = document.querySelector('.modal1');
    target.style.display = null;
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal','true');
    modal = target;

    // Ajoute des écouteurs d'événements pour fermer la fenêtre modale lorsque l'on clique à l'extérieur ou sur le bouton de fermeture
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click',closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);

    // Appelle la fonction modalWorks
    modalWorks();    
};

// Cette fonction ferme la fenêtre modale lorsqu'elle est déclenchée par un événement de clic sur le bouton de fermeture ou lorsque l'on clique à l'extérieur de la fenêtre modale
const closeModal = function(event) {
    if (modal === null) return;
    event.preventDefault();
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');

    // Supprime les events d'événements pour éviter les fuites de mémoire
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click',closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    modal = null;
};

// Cette fonction arrête la propagation des événements aux éléments enfants
const stopPropagation = function (event){
    event.stopPropagation();
}

// Attache la fonction openModal à tous les éléments ayant la classe "js-modal" en utilisant une boucle
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
});



/************CONTENU MODAL*******************/

// récupère les images à partir de l'API et remplit la galerie modale avec les elements demandés
const token = localStorage.getItem("authToken");
const modalGallery = document.querySelector(".modal-gallery");
const gallery = document.querySelector(".gallery");
async function modalWorks() {
  modalGallery.innerHTML = "";

  try {
    const response = await fetch(`http://localhost:5678/api/works`);
    const data = await response.json();

    // Parcourt chaque objet du tableau de données et crée des éléments image, bouton d'édition, bouton de suppression et div parent
    data.forEach((e) => {
      const imageElement = document.createElement("img");
      const editButton = document.createElement("button");
      const trashButton = document.createElement("button");
      const div = document.createElement("div");
      const icon = document.createElement("i");
      imageElement.src = e.imageUrl;
      // Définit le texte interne du bouton d'édition
      editButton.innerText = "éditer";

      // Ajoute la classe "trash" à l'élément bouton de suppression
      trashButton.classList.add("trash");

      // Ajoute les classes "fa-solid" et "fa-trash-can" à l'élément icône
      icon.classList.add("fa-solid");
      icon.classList.add("fa-trash-can");

      // Définit l'attribut "id" de l'élément icône avec la propriété "id" de l'objet
      icon.setAttribute("id", e.id);

      // Ajoute les éléments enfants à l'élément parent div et l'élément parent div à la galerie modale
      modalGallery.appendChild(div);
      div.appendChild(trashButton);
      div.appendChild(imageElement);
      div.appendChild(editButton);    
      trashButton.appendChild(icon);
    });
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }

  /************SUPPRESSION IMAGES*************/

  // Sélectionne tous les boutons "fa-trash-can" et ajout d'un event au clic
  const buttonTrash = document.getElementsByClassName("fa-trash-can");
   for (element of buttonTrash) {
     element.addEventListener("click", (e) => {
     e.preventDefault();
     delWorks(e);
    });
  };
}

// Fonction  pour supprimer un projet
const delWorks = async (e) => {
  const response = await fetch(`http://localhost:5678/api/works/${e.target.id}`, {
  method: "DELETE",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    Authorization: `Bearer ${token}`, //envoi du token à l'api pour récupérer les droits 
  },
});

if (response.status == 200 || response.status == 204) {
  alert ("Un projet a été supprimé");
};

modalWorks();
gallery.innerHTML="";
getWorks();
};

// **************************************  SECONDE MODAL ************************************** //

//Fonction pour ouvrir la seconde modale 
const openModal2 = function (e) {
  e.preventDefault();
  const modal1 = document.querySelector(".modal1");//cache la modale1
  modal1.style.display = "none";
  const target = document.querySelector(".modal2");//affiche la modale2
  target.style.display = null;
  resetForm();
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.addEventListener("click", openModal);
  modal.querySelector(".fa-arrow-left").addEventListener("click", closeModal);
  modal.querySelector(".fa-arrow-left").addEventListener("click", openModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", openModal);
  modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
  modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
  modalWorks();
};
document.querySelectorAll(".js-modal2").forEach((e) => {
  e.addEventListener("click", openModal2);
});


// Fonction pour réinitialiser le formulaire de chargement de photo
function resetForm() {
  document.getElementById("form-photo").reset();
  const modalAjoutPhoto = document.querySelector(".modal-ajout-photo");
  modalAjoutPhoto.innerHTML = `<i class="fa-sharp fa-regular fa-image"></i>
                  <label for="importPhoto" id="labelPhoto">+ Ajouter photo</label>
                  <p>jpg, png : 4mo max</p>`;
}

//Sélectionne le bouton "importPhoto" et ajout événement pour le changement
const importPhoto = document.querySelector("#importPhoto");
importPhoto.addEventListener("change", previewFile);

//Fonction pour afficher une prévisualisation de l'image sélectionnée par l'utilisateur
function previewFile() {
  const file_extension_regex = /\.(jpg|png)$/i;
  if (this.files.length == 0 || !file_extension_regex.test(this.files[0].name)) {
    return;
  }
  
  const file = this.files[0];
  const file_reader = new FileReader();
  file_reader.readAsDataURL(file);
  file_reader.addEventListener("load", (e) => displayImage(e, file));
}

// Fonction pour afficher l'image sélectionnée par l'utilisateur
function displayImage(event, file) {
  const modalAjoutPhoto = document.querySelector(".modal-ajout-photo");
  modalAjoutPhoto.innerHTML = "";
  const photo = document.createElement("img");
  photo.classList.add("photoChoose");
  photo.src = event.target.result;
  modalAjoutPhoto.appendChild(photo);
}

// **************************************  AJOUTER UN TRAVAIL **************************************

//Crée une fonction qui prend un objet formData en paramètre 
const addForm = async (formData) => {
  try {
    //Requête POST vers works"
    const response = await fetch("http://" + window.location.hostname + ":5678/api/works/", {
      method: "POST", 
      headers: { 
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData, //Le corps de la requête est l'objet FormData qui a été fourni en paramètre
    });    
    if (response.status == 201) {alert ("Un nouveau projet a été ajouté")}; //Si la réponse est OK (201), affiche une alerte indiquant qu'un nouveau projet a été ajouté
  } catch (error) { //Si une erreur se produit, logguez-la dans la console
    console.log(error);
  }
  
  const modal1 = document.querySelector(".modal1"); 
  const modal2 = document.querySelector(".modal2"); 
  modal2.style.display = "none"; //Cache la modal
  closeModal(); //Appelle la fonction closeModal 
  modal1.style.display = null; //Change la propriété style.display de modal1 pour la montrer
  modal = modal1; //Assigner modal1 à la variable modal
  modal.addEventListener("click", closeModal); //Ajoute un écouteur d'événements de clic pour appeler la fonction closeModal lorsqu'un clic est détecté sur modal
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal); //Sélectionne l'élément du DOM ayant la classe .js-modal-close, ajoute un écouteur d'événements de clic pour appeler la fonction closeModal lorsqu'un clic est détecté sur cet élément
  modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation); //Sélectionne l'élément du DOM ayant la classe .js-modal-stop, ajoute un écouteur d'événements de clic pour appeler la fonction stopPropagation lorsqu'un clic est détecté sur cet élément
  modalWorks(); //Appelle la fonction modalWorks (dont le contenu n'est pas fourni ici)
  
  gallery.innerHTML=""; //Change la propriété innerHTML de l'élément avec l'id gallery pour vider son contenu
  getWorks(); //Appelle la fonction getWorks (dont le contenu n'est pas fourni ici)
};

//Ajoute event de soumission de formulaire qui prend l'événement d'entrée en argument
let formPhoto = document.querySelector("#form-photo"); 
formPhoto.addEventListener("submit", (e) => { 
  e.preventDefault(); //Empêche le comportement par défaut de l'événement (c'est-à-dire la soumission du formulaire)

  const image = document.getElementById('importPhoto').files[0]; //Sélectionne l'élément du DOM ayant l'id importPhoto puis récupère le premier fichier sélectionné et assigne-le à la variable image
  const titre = document.getElementById('titre').value; //Sélectionne l'élément du DOM ayant l'id titre et récupère sa valeur à l'aide de la propriété .value. Le résultat est stocké dans la variable titre
  const category = document.getElementById('category-select').value; //Sélectionne l'élément du DOM ayant l'id category-select et récupère sa valeur à l'aide de la propriété .value. Le résultat est stocké dans la variable category

  const formData = new FormData(); //Crée un objet FormData nommé formData
  formData.append("image", image); //Ajoute la variable image en tant que champ "image" dans l'objet formData
  formData.append("title", titre); //Ajoute la variable titre en tant que champ "title" dans l'objet formData
  formData.append("category", category); //Ajoute la variable category en tant que champ "category" dans l'objet formData
  

  let myCara = /^[a-zA-Z-\s]+$/; //Crée une expression régulière qui correspond aux chaînes de caractères ne contenant que des lettres majuscules ou minuscules, des tirets ou des espaces
  let buttonPhoto = document.querySelector("#submit-photo"); //Sélectionne l'élément du DOM ayant l'id submit-photo et assigne-le à la variable buttonPhoto
  if ((titre == "") || (category == "") || (image == undefined) || (myCara.test(titre) == false)) { //Vérifie que les variables titre, category et image ont bien été remplies et que titre ne contient que des lettres, des tirets ou des espaces. Si l'une de ces conditions est vraie ...
    alert("Vous devez remplir tous les champs et le titre ne doit comporter que des lettres et des tirets"); //Affiche une alerte indiquant que tous les champs doivent être remplis et que le titre ne doit contenir que des lettres et des tirets
    return; //Sort de la fonction (on ne va pas plus loin)
  } else if (buttonPhoto.classList.contains("grey")){ //Sinon si la classe "grey" est incluse dans la liste des classes de buttonPhoto ...
    buttonPhoto.classList.remove("grey"); //Retire la classe "grey"
    buttonPhoto.classList.add("green"); //Ajoute la classe "green"
    return; //Sort de la fonction (on ne va pas plus loin)
  } else { //Sinon
    addForm(formData); //Appelle la fonction addForm en lui passant l'objet FormData en paramètre
  }
});
