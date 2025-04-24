import axios from "axios";

let title = process.argv[2];
let page = process.argv[3];
console.log(title, page);

async function getmovie(title, page) {
  //  let data = await fetch(`https:\\www.movies.com/movies?title=${title}&page=${page}`);
  //console.log(await data.json);

  axios
    .get(`https:\\www.movies.com/movies?title=${title}&page=${page}`)
    .then(function (response) {
      // handle success
      console.log(response);
    });
}

getmovie(title, page);
