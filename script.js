const accessKey = '14vUu1ATbwCxQ92oZMqhWAfbv0hRDscNrnDwAXzbeaY';
let page = 1;
let container = document.getElementById('imageContainer');
let searchInput = document.getElementById('searchInput');
let search_btn =  document.getElementById('searchBtn');
let btnMore = document.getElementById('more');


async function searchImages() {
    const query = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results);
    if(data.results.length === 0){
        alert("No more images");
        return;
    }
    displayImages(data.results);
}

function displayImages(images) {

    if(page === 1){
        container.innerHTML = '';
    }

    images.forEach(result => {
        const imageDiv = document.createElement("div");
        imageDiv.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        imageDiv.appendChild(image);

        const text = document.createElement("p");
        text.classList.add("para");
        text.textContent = result.alt_description;
        imageDiv.appendChild(text);

        container.appendChild(imageDiv);
    });

    page++;
    if(page > 1){
        btnMore.style.display = "block";
    }
}

function moreImgFn(){
        searchImages();
}

search_btn.addEventListener('click', (e)=>{
    e.preventDefault();
    page = 1;
    searchImages();
});
