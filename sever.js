let users = [
  { name: "MG MG", email: "mgmg@gmail.com", age: 19 },
  { name: "AG AG", email: "agag@gmail.com", age: 21 },
  { name: "Ko Ko", email: "kgkg@gmail.com", age: 19 },
];

const { constants } = require("buffer");
const fs = require("fs");
const http = require("http");
const port = 3000;

const sever = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile("index.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/style.css") {
    fs.readFile("style.css", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/bootstrap.min.css") {
    fs.readFile("bootstrap.min.css", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/script.js") {
    fs.readFile("script.js", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/users") {
    if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(users));
      res.end();
    } else if (req.method === "POST") {
      let dataFromJs = "";
      req.on("data", (e) => {
        dataFromJs += e;
      });
      req.on("end", () => {
        users.push(JSON.parse(dataFromJs));
      });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(users));
      // } else if (req.method === "PUT") {
      //   let dataFromScript = "";
      //   req.on("data", (chunk) => {
      //     dataFromScript += chunk;
      //   })
      //   req.on("end", () => {
      //     const newEmail = JSON.parse(dataFromScript);
      //     users = users.find(user => user.email === newEmail.email)
      //     users.
      //   })
    } else if (req.method === "DELETE") {
      let delData = "";
      req.on("data", (param) => {
        delData += param;
      });
      req.on("end", () => {
        const newEmail = JSON.parse(delData);
        users = users.filter((user) => user.email !== newEmail.email);
      });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(users));
    }
    res.end();
  } else {
    res.write("<h1>404 | not found!</h1>");
    res.end();
  }
});

sever.listen(port, () => {
  console.log(`Sever Listened port on: ${port}`);
});
