fetch("http://localhost:5678/api/works")
    .then(res => res.json())
    .then((data) => {

        const objets = document.querySelector("#objets");
        const appartements = document.querySelector("#appartements");
        const hotels = document.querySelector("#hotels");
        const gallery = document.querySelector(".gallery");
        const allPics = document.querySelector("#all-pics");

        function displayImages(imgFilters) {
            gallery.innerHTML = "";
            imgFilters.forEach(function (projet) {
                const img = document.createElement("img");
                const figcaption = document.createElement("figcaption");
                const figure = document.createElement("figure");
                img.src = projet.imageUrl;
                figcaption.textContent = projet.title;
                figure.appendChild(img);
                figure.appendChild(figcaption);
                gallery.appendChild(figure);
            });
        }

        objets.addEventListener("click", function () {
            const imgFilters = data.filter(function (data) {
                return data.categoryId == 1;
            });
            displayImages(imgFilters);
        });

        appartements.addEventListener("click", function () {
            const imgFilters = data.filter(function (data) {
                return data.categoryId == 2;
            });
            displayImages(imgFilters);
        });

        hotels.addEventListener("click", function () {
            const imgFilters = data.filter(function (data) {
                return data.categoryId == 3;
            });
            displayImages(imgFilters);
        });

        allPics.addEventListener("click", function () {
            displayImages(data);
        });
        
        displayImages(data);
    });