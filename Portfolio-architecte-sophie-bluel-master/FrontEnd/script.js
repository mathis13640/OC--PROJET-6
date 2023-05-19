let worksData; // Déclarez la variable en dehors de la structure fetch
const btn = document.querySelector("btn");
const dataWorks = "http://localhost:5678/api/works";
const dataCategories = "http://localhost:5678/api/categories";

const getCategories = () => {
    fetch(dataCategories)
    .then(function(res){
        return res.json()
    })
    .then(function(data) {
        console.log(data)
    })




}