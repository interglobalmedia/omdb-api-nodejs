# Implementing the OMDB API Using Nodejs

This is a cool little project we were challenged to figure out in the NYCDA Part Time Evening FullStack JS Intensive class yesterday by our teacher. I first attempted in school with no success, and then continued when I got home. It took a little while to wrap my head around it, but I finally did. When I started thinking in terms of React, it made more sense!

As with react, there are essentially two parts to this little movie scraping app.

First, however, before I did anything else, I had to require the `request` **npm package** at the top of the file, and the built in `http` node module:

```
const request = require('request');
const http = require('http');
```

the `http` **node module** enables access to a `localhost/dev server` on a computer. The interface is careful to never buffer entire requests or responses, so the user is able to stream data.

Next, there is the function definition/declaration for `function getMovies(arr)` to which the parameter `arr` is passed. Within the body of the function, a request is made to the OMDB api:

```
request('https://www.omdbapi.com/?apikey=60f7bdd3&t=' + movies[i],
```
`movies[i]` refers to the movies array I create that is the value of the argument passed into `function getMovies(arr)`. Why movies[i]? Because the request is looped over since I am making a request to retrieve data for a number of movies, not just one:

```
const movies = ['saw', 'reds', 'titanic', 'the sting', 'scary movie', 'sunset boulevard', 'scream', 'rear window', 'all about eve', 'suspicion'];

function getMovies(arr) {
    for (let i = 0; i < arr.length; i++) {
        request('https://www.omdbapi.com/?apikey=60f7bdd3&t=' + movies[i],
            function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    movies[i] = JSON.parse(body);
                    const actors = JSON.parse(body)["Actors"];
                    const releaseDate = JSON.parse(body)["Released"];
                    const year = JSON.parse(body)["Year"];
                    const poster = JSON.parse(body)["Poster"];
                    console.log(releaseDate);
                    console.log(movies[i]);
                }
            })
    }
}
```
In order to retrieve data for an indeterminate number of movies greater than 1, I had to create a function I could call that encapsulates the request to the omdb api, and parses the streamed data from the OMDB api. Why does it have to be parsed? Because when data is received from a web server, the data is always a string. If the data is parsed with JSON.parse(), it becomes a JavaScript object which can then be used in the application.