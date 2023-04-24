const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;

    let user = await User.findOne({ email: email });

    let token = await jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: {
          email,
        },
      },
      process.env.SECRETKEY
    );

    if (user) {
      let storedPass = user.password;
      const passwordMatch = await bcrypt.compare(password, storedPass);

      if (passwordMatch) {
        res.send(
          `<html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
            <script>
            function download(blob, filename) {
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.style.display = 'none';
              a.href = url;
              // the filename you want
              a.download = filename;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);
            }
            function getPdf() {
              fetch("http://localhost:3000/pdf/getPdf", {
                method: "GET",
                headers: {
                  "authtoken": "${token}",
                },
              })
                .then((response) => response.blob())
                .then((response) => download(response, "pdf.pdf"))
                .catch((err) => console.error(err));
            }
            </script>
          </head>
            <body>
              <div align ='center'><h2>Login successful</h2></div>
              <button align ='center' onClick="getPdf()">Click me!</button>
              <br /><br />
              <a href='./login.html'>logout</a>
            </body>
        </html>`
        );
      } else {
        res.send(
          "<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>"
        );
      }
    } else {
      res.send(
        "<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>"
      );
    }
  } catch (err) {
    console.log(err);
    res.send("Internal server error");
  }
});
module.exports = router;
