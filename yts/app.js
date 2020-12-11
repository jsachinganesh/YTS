const subContainer = document.querySelector('.sub-container');
const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const movieContainer = document.createElement('div');
movieContainer.classList.add('movie-container');

const imdb = `https://yts.mx/api/v2/list_movies.json?query_term=`;

// console.log(data.data.movies)

function getData(e) {
    e.preventDefault();
    const search = input.value;
    if (search != '') {
        fetch(`${imdb}${search}&limit=50`)
            .then((res) => res.json())
            .then((data) => {
                getMovies(data.data,search);
                console.log(data.data);
                input.value = '';
            })
            .catch((err)=> console.log(err))
    }


}

function getMovies(dataArr,search) {
    const moviesArr = dataArr.movies
    movieContainer.innerHTML = '';
    subContainer.innerHTML = '';
    if (dataArr.movie_count != 0) {
        moviesArr.map((movie) => {
            const pDiv = document.createElement('div');
            const a = document.createElement('a');
            const div = document.createElement('div');
            const span = document.createElement('span');
            div.classList.add('image-container');
            div.style.backgroundImage = `url(${movie.large_cover_image})`;
           
            const torrent = movie.torrents[0].url;
            a.innerText = movie.slug;
            a.href = `${torrent}`;
            a.style.margin = "1rem";
            span.innerText = "CLICK THE NAME TO DOWNLOAD";
            span.style.textAlign = "center";
            pDiv.appendChild(div);
            pDiv.appendChild(span);
            pDiv.appendChild(a);
            pDiv.classList.add('pdiv');
    
            movieContainer.appendChild(pDiv);
        });
    
        subContainer.appendChild(movieContainer);
    } else {
        subContainer.innerHTML = `<div> ${search} NOT FOUND</div>`;
    }

}

function change(e) {
    getData(e);
    console.log(e);
}

btn.addEventListener('click', getData);
btn.addEventListener('touchstart', change);



