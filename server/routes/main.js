const express = require('express')
const nodemailer = require("nodemailer")
require('dotenv').config()
const router = express.Router()
const post = require('../models/post')
const axios = require('axios')

//Routes
router.get('', async (req, res) => {
    try {
        const locals = {
            title: "Portfolio",
            description: "Welcome, I'm Azamat and this is my portfolio."
        }

        let perPage =5
        let page = req.query.page || 1;

        const data = await post.aggregate([ { $sort: { createdAt: -1 } } ])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

        const count = await post.countDocuments({});
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        const reposResponse = await axios.get(`https://api.github.com/users/T756/repos`, {
            headers: {
                Authorization: `token ${process.env.GITHUB_TOKEN}`
            }
        });
        const repos = reposResponse.data;

        const repoImages = {
            'blogging': 'img/image-url1.png',
            'WeatherApp': 'img/img-url2.png',
            'website': 'img/img-url3.png',
            'EmailSender': 'img/img-url4.png',
            'TODO': 'img/img-url5.png',
            'Portfolio': 'img/img-url6.png'
        };

        // Adding image URLs to each repository object
        repos.forEach(repo => {
            repo.image = repoImages[repo.name];
        });

        const quoteResponse = await axios.get('https://api.api-ninjas.com/v1/quotes?category=happiness', {
            headers: {
                'X-Api-Key': 'TNClr/OOqRX80soOxntp6g==Lp0Jeyl4YtXteoM0' // Replace 'Your-API-Key-Here' with your actual API key
            }
        });
        const quote = quoteResponse.data[0].quote;
        const author = quoteResponse.data[0].author;

        res.render('index', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute: '/',
            repos,
            quote,
            author
        });

    } catch (error) {
        console.log(error);
    }

});


router.get('/post/:id', async (req, res) => {
    try {
        let slug = req.params.id;

        const data = await post.findById({ _id: slug });

        const locals = {
            title: data.title,
            description: "Welcome, I'm Azamat and this is my portfolio."
        }

        res.render('post', {
            locals,
            data,
            currentRoute: `/post/${slug}`
        });
    } catch (error) {
        console.log(error);
    }

});

router.post('/search', async (req, res) => {
    try {
        const locals = {
            title: "Search",
            description: "Welcome, I'm Azamat and this is my portfolio."
        }

        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

        const data = await post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
                { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
            ]
        });

        res.render("search", {
            data,
            locals,
            currentRoute: '/'
        });

    } catch (error) {
        console.log(error);
    }

});

router.post('/main', async (req, res) => {
    const { email, body } = req.body;

    try {
        // Creating transporter
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL, // Gmail address
                pass: process.env.EMAIL_PASS // App Password
            },
        });

        // Sending email
        let info = await transporter.sendMail({
            from: "Your Name",
            to: email,
            subject: "Test Email Check",
            html: `
                <h1>Hello there</h1>
                <p>This is my message!</p>
                <p>${body}</p>
            `,
        });

        console.log("Message sent");
        res.redirect('./contact');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email');
    }

});

router.get('/about', (req, res) => {
    res.render('about', {
        currentRoute: '/about'
    });
});

router.get('/contact', (req, res) =>{
    res.render('contact', {
        currentRoute: '/contact'
    })
})

module.exports = router