const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    fs.readdir("./files", function (err, files) {
        if (err) {
            console.log("Error reading files:", err);
            return res.status(500).send("Error reading files");
        }
        res.render("index", { files: files });
    });
});

app.get("/file/:file_name", (req,res)=>{
   fs.readFile(`./files/${req.params.file_name}`, "utf-8",(err,filedata)=>{
      console.log(filedata)
   })
})
app.post('/create', function (req, res) {
    // Use the correct 'title' field (not 'tile') from the form
    const fileName = req.body.title.split(' ').join('') + '.txt';  // Remove spaces in title
    const fileContent = req.body.details;  // Get the details content
    
    // Write the file asynchronously
    fs.writeFile(`./files/${fileName}`, fileContent, function (err) {
        if (err) {
            console.log("Error writing file:", err);
            return res.status(500).send("Error writing file");
        }
        // Redirect after successful file creation
        res.redirect("/");
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
