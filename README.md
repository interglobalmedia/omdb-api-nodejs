# Implementing the OMDB API Using Nodejs

This is a cool little project we were challenged to figure out in the NYCDA Part Time Evening FullStack JS Intensive class yesterday by our teacher. I first attempted in school with no success, and then continued when I got home. It took a little while to wrap my head around it, but I finally did. When I started thinking in terms of React, it made more sense!

As there would be with **React**, there are essentially two parts to this little movie scraping app.

First, however, before I did anything else, I had to require the `request` **npm package** at the top of the file, and the built in `http` node module:

```
const request = require('request');
const http = require('http');
```

the `http` **node module** enables access to a `localhost/dev server` on a computer. The interface is careful to never buffer entire requests or responses, so the user is able to stream data. The `request` **npm package** is designed to be the simplest way possible to make http calls. It supports **HTTPS** and follows redirects by default.

Next, there is the function definition/declaration for `function getMovies(arr)` to which the parameter `arr` is passed. Within the body of the function, a request is made to the OMDB api:

```
request('https://www.omdbapi.com/?apikey=60f7bdd3&t=' + movies[i],
```
`movies[i]` refers to the movies array I create that is the value of the argument passed into `function getMovies(arr)`. Why `movies[i]`? Because the request is looped over since I am making a request to retrieve data for a ***number*** of movies, not just one:

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
In order to retrieve data for an **indeterminate** number of movies greater than 1, I had to create a function I could call that encapsulates the request to the **OMDB** api, and parses the streamed data from it. Why does it have to be parsed? Because when data is received from a web server, the data is always a string. If the data is parsed with `JSON.parse()`, it becomes a **JavaScript object** which can then be used in the application. 

The if statement states that if there is **no error** and the **response status code** is equal to **200**, a successful request, then `movies[i]` equals the total parsed content returned from **OMDB**. Then, however, I had to grab the specific data I wanted. That is the purpose of the **variables** following `movies[i]` which store the various **OMDB** ***properties*** from which I pull the data I want: **actors**, **releaseDate**, **year**, and **poster**.

Now for **part two**. Part two **writes** the **data** to the page:

```
// https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    movies.map((movie, i) => {
        let poster = movies[i]["Poster"];
        res.write('<div id="movie-container" style="margin: 0 auto; text-align: center"><img src=' + poster + '>');
        res.write('<br><h1>' + movies[i]["Title"] + '</h1>');
        res.write('<p><b>Release Date:</b> ' + movies[i]["Year"] + '</p>');
        res.write('<p><b>Actors:</b> ' + movies[i]["Actors"] + '</p></div>');
    })
    res.end();
}).listen(8080, function() {
    console.log('Server has started ...');
})
```

I had to require the built in `http` Node module so that we could `http.createServer({})`. `http.createServer({})` creates a `web server object`. The **anonymous function** that's passed to **createServer** is called once for every **HTTP request** that is made against the server, so it is called the **request handler**. The **Server** object 
returned by createServer is an **EventEmitter**. Here, it is `http`, which I require at the top of the file. This **EventEmitter** emits the `newListener` `.listen({})` starts the **HTTP server** listening for **HTTP connections**. In my case here, it is specifically listening for a connection to **localhost port 8080**. `localhost` means `this computer`, and is the standard hostname given to the address of the **loopback network interface**. The **loopback device** is a special, virtual network interface that a computer uses to communicate with itself. It is used mainly for diagnostics and troubleshooting, and to **connect to servers** running on the `local` machine.

The magic happens within the body of the `createServer()` method. First I pass two arguments, `req` and `res`, to the anonymous function passed to `http.createServer()`. When an HTTP request hits the OMDB server, node calls the request handler with a few handy objects for dealing with the `transaction`: res (response) and req (request). But to actually serve requests, as mentioned above, the listen method needs to be called on the server object. In most cases, as here, all I need to do is pass the port number I want the server to listen on to `.listen()`. There are some [other options](https://nodejs.org/api/http.html) as well.

The second line of the http.createServer() method is very important:

```
res.writeHead(200, { 'Content-Type': 'text/html' });
```

The `content-type:text/html` is required for browsers to recognize a page as HTML. The `content-type` is not part of the `HTML5 (or HTML4)` spec. It's part of the **HTTP headers**. It is what tells the browser what kind of content is is receiving.

Once I have made sure that the browser recgnizes my content as HTML, I can loop over the array of movies and return their data as HTML. I do this by mapping over the movies array:

```
movies.map((movie, i) => {
        let poster = movies[i]["Poster"];
        res.write('<div id="movie-container" style="margin: 0 auto; text-align: center"><img src=' + poster + '>');
        res.write('<br><h1>' + movies[i]["Title"] + '</h1>');
        res.write('<p><b>Release Date:</b> ' + movies[i]["Year"] + '</p>');
        res.write('<p><b>Actors:</b> ' + movies[i]["Actors"] + '</p></div>');
    })
```

**Related Resources:**

[Hostname to Localhost with Port - OSX](https://serverfault.com/questions/574116/hostname-to-localhost-with-port-osx)

[Find (and kill) process locking port 3000 on Mac](https://stackoverflow.com/questions/3855127/find-and-kill-process-locking-port-3000-on-mac)

[What is the whole point of "localhost", hosts and ports at all?](https://stackoverflow.com/questions/1946193/whats-the-whole-point-of-localhost-hosts-and-ports-at-all)

[What is the loopback device and how do I use it?](https://askubuntu.com/questions/247625/what-is-the-loopback-device-and-how-do-i-use-it)

[Should I have to include res.writeHead in node.js when I deal with HTML5?](https://stackoverflow.com/questions/17003590/should-i-have-to-include-res-writehead-in-node-js-when-i-deal-with-html5)