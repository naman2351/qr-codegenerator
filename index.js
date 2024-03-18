/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";


inquirer
    .prompt([
        {
            message: "Paste the required URL here: ",
            name: "URL",
        }
    ])
    .then((answers) => {
        const url = answers.URL;
        const qr_svg = qr.imageSync(url, { type: 'png' });
        fs.writeFileSync("qr_img.png", qr_svg);
        fs.writeFile("url.txt", url, (err) => {
            if (err) {
                console.error("Error writing URL file:", err);
            } else {
                console.log("Files created!");
            }
        });
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log("The prompt could not be rendered in the current environment.");
        } else {
            console.log("Something went wrong, please try again.");
        }
    });
