
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  const user = {
    email: email,
    password: password
  };

  //Sending data to API
  fetch("http://localhost:5678/api/users/login", {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
    
  })
  .then(response => {
    if (response.ok) {
      return response.json(); // Converted response in JSON
    } else {
      throw new Error('La combinaison utilisateur - mot de passe est incorrecte.');
    }
  })
  .then(data => {
    const token = data.token; // retrieve the token from the JSON reponse
    localStorage.setItem('authToken', token); // Stock the token in the localStorage
    
    window.location.href = './index.html'; // Redirige the user to the home page
  })
  .catch(error => { //Display an ERROR message for the user
    alert(error.message);
    console.error('Une erreur s\'est produite:', error);
  });
});