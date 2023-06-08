const openModal = function(event) {
    event.preventDefault();
    const target = document.querySelector('.modal1');
    target.style.display = null;
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal','true');
    modal = target;
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close',).addEventListener('click',closeModal)
    
};

const closeModal = function(event) {
    if (modal === null) return;
    event.preventDefault();
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close',).removeEventListener('click',closeModal)
    modal = null;
};

const stopPropagation = function (event){
    event.stopPropagation();
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
});


/*
fetch("http://localhost:5678/api/works")
    .then(res => res.json())
    .then((data) => {

        const allPics = document.querySelector("#all-pics");

        function displayImages(displayModaleE) {
            gallery.innerHTML = "";
            displayModaleE.forEach(function (e) {
                const img = document.createElement("img");
                const figcaption = document.createElement("figcaption");
                const figure = document.createElement("figure");
                img.src = e.imageUrl;
                figcaption.textContent = e.title;
                figure.appendChild(img);
                figure.appendChild(figcaption);
                gallery.appendChild(figure);
            });


        }

    */