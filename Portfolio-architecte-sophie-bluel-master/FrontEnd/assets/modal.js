
/**************OUVERTURE FERMETURE MODAL*******************/

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

    // Supprime les écouteurs d'événements pour éviter les fuites de mémoire
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click',closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    modal = null;
};

// Cette fonction arrête la propagation des événements aux éléments enfants
const stopPropagation = function (event){
    event.stopPropagation();
}

// Attache la fonction openModal à tous les éléments ayant la classe "js-modal" en utilisant une boucle forEach
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
});



/************CONTENU MODAL*******************/

// Cette fonction asynchrone récupère des données à partir d'une API et remplit la galerie modale avec des images et des boutons
const modalGallery = document.querySelector(".modal-gallery");
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

      // Définit les attributs de l'élément image pour afficher l'image à imageUrl
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
}