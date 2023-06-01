//*********LOGIN********//

// Ajout d'évènement à l'envoi du formulaire //
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  // Récupère les valeurs des champs email et password
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  // Crée un objet utilisateur avec les valeurs saisies
  const user = {
    email: email,
    password: password
  };

  //Envoie les données à l'API en utilisant la méthode POST
  fetch("http://localhost:5678/api/users/login", {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
    
  })
  .then(response => {
    if (response.ok) {
      // Converti la réponse en JSON 
      return response.json(); 
    } else {
      //Si l'identification est incorecte affiche message avertissant l'utilisateur
      throw new Error('La combinaison utilisateur - mot de passe est incorrecte.');
    }
  })
  .then(data => {
    // Récupère le token depuis la réponse JSON
    const token = data.token; 
    //Token stocké dans le localStorage
    localStorage.setItem('authToken', token); 
    //Redirige l'utilisateur vers la page d'accueil
    window.location.href = './index.html';
  })
  .catch(error => { 
    //Si une erreur se produit, affiche message d'erreur
    alert(error.message);
    console.error('Une erreur s\'est produite:', error);
  });
});

//Déclaration des variables et récupération des éléments html//
const logoutButton = document.querySelector('#logout');
const loginButton = document.querySelector('#login');
const spanElements = document.querySelectorAll('span');
const edition = document.querySelector('.edition');


//Met à jour l'interface basé sur le status de connexion de l'utilisateur
function updateUI() {
  if (localStorage.getItem('authToken')) {

    //L'utilisateur est connecté
    logoutButton.classList.remove('notDisplay');
    loginButton.classList.add('notDisplay');
    edition.classList.remove('notDisplay');
    spanElements.forEach(span => {
      span.classList.remove('notDisplay');
    });
  } else {

    //L'utilisateur est déconnecté///
    logoutButton.classList.add('notDisplay');
    loginButton.classList.remove('notDisplay');
    edition.classList.add('notDisplay');
    spanElements.forEach(span => {
      span.classList.add('notDisplay');
    });
  }
}

//Supprime le token du LocalStore en cliquant sur le bouton déconnexion - [Perte de droits administrateurs] //
logoutButton.addEventListener('click', function(event) {
  event.preventDefault();
  // Supression du TOKEN
  localStorage.removeItem('authToken');
  // Met à jour l'interface utilisateur
  updateUI();
});

// Mettre à jour l'interface utilisateur au chargement de la page
document.addEventListener('DOMContentLoaded', updateUI);