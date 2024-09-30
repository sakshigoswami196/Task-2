import bodyParser from 'body-parser';
import express from 'express';
import chalk from 'chalk';
import path from 'path'; 

const app = express();
const PORT = 8000;

// middleware to handle form data
app.use(bodyParser.urlencoded({extended: true}));

//serve static files (e.g.,index.html, css, js)
app.use(express.static(path.join(path.resolve(), 'public')));

//log requests to the console
app.use((req,res, next) => {
    console.log(chalk.blue(`[${new Date(). toISOString()}] ${req.method} request for '${req.url}'`));
    next();
});

//Handle form submission
app.post('/submit', (req, res) => {
    const { name,email,password} = req.body;

    //Basic server-side validation
    let message;
    let messageColor;

    if (!name || !email || !password){ 
        message = 'All fields are required!';
        messageColor = '#ff4d4d'; //Red
    }else {
        message = 'Registerd successfully!';
        messageColor = '#4caf50'; //Green
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Form Submission</title>

            <style>
                body {
                    font-family: 'Lora', serif;
                    background: url('background.jpg') no-repeat center center fixed;
                    background-size: cover;
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .response-box {
                    background-color: rgba(30, 30, 30, 0.9);
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
                    text-align: center;
                    max-width: 400px;
                    width: 100%;
                    color: ${messageColor};
                }
                h1 {
                    font-size: 1.5em;
                    margin-bottom: 20px;
                    color: ${messageColor};
                }
                p {
                    font-size: 0.9em;
                }
                a {
                    display: inline-block;
                    margin-top: 20px;
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: white;
                    text-decoration: none;
                    border-radius: 4px;
                    transition: background-color 0.3s ease;
                }
                a:hover {
                    background-color: #0056b3;
                }
            </style>
        </head>
        <body>
            <div class="response-box">
                <h1><span style="color: ${messageColor}; font-size: 2em;">✔</span> ${message}</h1>
                <p>Your form data has been processed.</p>
                <a href="/">Go Back</a>
            </div>
        </body>
        </html>
    `);
});

    //Start the server
    app.listen(PORT, () => {
        console.log(chalk.green(`server is runing on http://localhost:${PORT}`));
    });


