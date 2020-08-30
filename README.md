# Implementing the OMDB API Using Node.js

This little project is a "nodification" of the OMDB API project from Week 8. Here, we will be going over how one can protect/hide one's API key by adding a backend server to the application.

As there would be with **React**, there are essentially two parts to this little movie scraping app.

First, before I did anything else, I had to require the `request` **npm package** at the top of the file, and the built-in `http` node module:

``` js
const request = require('request');
const http = require('http');
```

The `http` **node module** enables access to a `localhost/dev server` on a computer. The interface is careful to never buffer entire **requests** or **responses**, so the user is able to stream data. The `request` **npm package** is designed to be the simplest way possible to make **http calls**. It supports **HTTPS** and follows redirects by default.

Next, there is the function definition/declaration for `function getMovies(arr)` to which the parameter `arr` is passed. Within the body of the function, a request is made to the OMDB api:

``` js
request('https://www.omdbapi.com/?apikey=60f7bdd3&t=' + movies[i],
```

`movies[i]` refers to the (global) **movies array** I create that is the value of the argument passed into `function getMovies(arr)` . Why `movies[i]` ? The `request` is looped over because I am making a request to retrieve data for a ***number*** of movies, not just one:

``` js
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

In order to retrieve data for an **indeterminate** number of movies greater than 1, I had to create a function I could call, which encapsulates the request to the **OMDB** api, and parses the streamed data from it. Why does it have to be parsed? Because when data is received from a **web server**, the **data** is ***always*** a **string**. If the **data** is parsed with `JSON.parse()` , it becomes a **JavaScript object** which can then be used in the application. 

The `if` **statement** states that if there is **no error** and the **response status code** is equal to **200**, a successful request, then `movies[i]` equals the total parsed content returned from **OMDB**. Then, however, I had to grab the ***specific*** **data** I wanted. That is the purpose of the **variables** following `movies[i]` which store the various **OMDB** ***properties*** from which I pull the data I want: **actors**, **releaseDate**, **year**, and **poster**.

Now for **part two**. **Part two** **writes** the **data** to the page:

``` js
// https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
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

I had to require the built in `http` node module so that we could `http.createServer()` . The `http.createServer({})` method creates a `web server object` . The **anonymous callback function** that's passed to **createServer** is called once for every **HTTP request** that is made against the **server**. It is called a **request handler**. The **Server** object 
returned by `createServer()` is an **EventEmitter**. Here, it is `http` , which I require at the top of the file. This **EventEmitter** emits the `newListener` method, `.listen()` . `.listen()` starts the **HTTP server** listening for **HTTP connections**. In my case here, it is specifically listening for a connection to **localhost port 8080**. `localhost` means `this computer` , and is the `standard hostname` given to the address of the **loopback network interface**. The **loopback device** is a special, virtual network interface that a computer uses to communicate with itself. It is used mainly for diagnostics and troubleshooting, and to **connect to servers** running on the `local` **machine**.

The ***magic*** happens within the body of the `createServer()` method. First I pass two arguments, `req` and `res` , to the anonymous callback function passed to `http.createServer()` . When an **HTTP** request hits the **OMDB server**, **node** calls the **request handler** with a couple of objects for dealing with the `transaction` : `res` (response) and `req` (request). But to actually ***serve*** **requests**, as mentioned above, the `.listen()` method needs to be called on the **server object**. In most cases, as here, all I need to do is pass the **port number** I want the **server** to ***listen on*** `.listen()` . There are some [other options](https://nodejs.org/api/http.html) as well.

The second line of the `http.createServer()` method is very important:

``` 
res.writeHead(200, { 'Content-Type': 'text/html' });
```

`writHead` writes the **HTTP header** (with status of 200).

The `content-type:text/html` is required for browsers to recognize a page as HTML. The `content-type` is not part of the `HTML5 (or HTML4)` spec. It's part of the **HTTP headers**. It is what tells the browser what kind of content it is receiving.

Once I have made sure that the **browser** ***recognizes*** my content as `HTML` , I can loop over the **array of movies** and return their **data** as `HTML` . I do this by **mapping** over the **movies array**:

``` js
movies.map((movie, i) => {
    let poster = movies[i]["Poster"];
    res.write('<div id="movie-container" style="margin: 0 auto; text-align: center"><img src=' + poster + '>');
    res.write('<br><h1>' + movies[i]["Title"] + '</h1>');
    res.write('<p><b>Release Date:</b> ' + movies[i]["Year"] + '</p>');
    res.write('<p><b>Actors:</b> ' + movies[i]["Actors"] + '</p></div>');
})
```

The `res` object is a `WritableStream` , so writing a `res body` to the **client** is just a matter of using `stream methods` . `body` is first introduced in the **anonymous callback function** passed to the `request()` method in the **first part** of the application. It is then passed to the `JSON.parse()` method to convert it from a string into a `JS object` . This `JS object` is then stored as the value of `movies[i]` . That is what makes looping over the movies array and returning all the movies data in **html format** possible, thereby ***rendering*** them to the page.

The `res.end()` method, which follows the `.map()` method, writes the `body` and closes the `res` .

The last part of the **callback** to the `createServer()` method is the `.listen()` method, which listens for **port 8080**, and prints `Server has started ...` to the **Terminal** console.

***Last***, but **not least**, is the **call** to `getMovies()` :

``` js
getMovies(movies);
```

The **movies array** **variable** is passed in to `getMovies()` as an argument. Without this **call**, ***no*** **movie data** would be ***rendered*** to the page. **Everything** would return `undefined` .

**Related Resources:**

[Hostname to Localhost with Port - OSX](https://serverfault.com/questions/574116/hostname-to-localhost-with-port-osx)

[Find (and kill) process locking port 3000 on Mac](https://stackoverflow.com/questions/3855127/find-and-kill-process-locking-port-3000-on-mac)

[What is the whole point of "localhost", hosts and ports at all?](https://stackoverflow.com/questions/1946193/whats-the-whole-point-of-localhost-hosts-and-ports-at-all)

[What is the loopback device and how do I use it?](https://askubuntu.com/questions/247625/what-is-the-loopback-device-and-how-do-i-use-it)

[Should I have to include res.writeHead in node.js when I deal with HTML5?](https://stackoverflow.com/questions/17003590/should-i-have-to-include-res-writehead-in-node-js-when-i-deal-with-html5)

[response.writeHead and response.end in NodeJs](https://stackoverflow.com/questions/14243100/response-writehead-and-response-end-in-nodejs)
