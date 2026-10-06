const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer(function(req, res) {
const page = url.parse(req.url).pathname;
const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  } else if (page == '/api') {
      const userInput = params.palindrome;
      console.log(userInput);
      // Turn the users input to all lowercase and then remove anything that isn't a letter or numebr with regex
      // the ^ will look for anythign that isnt a lowercase letter or a umber and the g after the / is a gloabal flag that 
      // doesnt stop after the first match, it will replace all the instances in a string
      const stripClean = userInput.toLowerCase().replace(/[^a-z0-9]/g, ''); // Remove conditions for edgecases
      const reverseString = stripClean.split('').reverse().join('');
      
      // userInput = Leon Noel
      // strip = leonnoel
      // reverseString = leonnoel = palindrome
      // userInput = Leon
      // strip = leon
      // reverseString = noel = not a palindrome
      if (stripClean === reverseString) {             // Checks to see if stripClean is the same as reverseString(stripClean reversed)
        res.write (`is a Palindrome`)
      } else {
        res.write (`is not a Palindrome`)
      }
      //res.writeHead(200, {'Content-Type': 'application/json'});
      res.end();
  
  } else if (page == '/css/main.css'){
    fs.readFile('css/main.css', function(err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('404 Error');
  }
});

server.listen(8000);
