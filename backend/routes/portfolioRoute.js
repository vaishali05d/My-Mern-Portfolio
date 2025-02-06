const router = require('express').Router();

const { Intro, About, Projects, Contact, Experience, Course } = require('../models/portfolioModel');

const User = require("../models/userModel");

// get all portfolio data
router.get('/get.portfolio.data', async (request, response) => {
    try {
        const intro = await Intro.find();
        const about = await About.find();
        const experience = await Experience.find();
        const project = await Projects.find();
        const contact = await Contact.find();
        const courses = await Course.find();

        response.status(200).send({
            intro: intro[0],
            about: about[0],
            project: project,
            contact: contact[0],
            experience: experience,
            courses: courses,
        })

    } catch (err) {
        response.status(500).send(err);
    }
});

// update intro
router.post('/update-intro', async (req, res) => {
    try {
        const intro = await Intro.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: intro,
            success: true,
            message: "Intro updated succesfully !!"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//update about
router.post('/update-about', async (req, res) => {
    try {
        const about = await About.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: about,
            success: true,
            message: "About updated succesfully !!"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//add experience
router.post('/add-experience', async (req, res) => {
    try {
        const experience = new Experience(req.body);
        await experience.save();
        res.status(200).send({
            data: experience,
            success: true,
            message: "Experience added succesfully !!"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//update-experience
router.post('/update-experience', async (req, res) => {
    try {
        const experience = await Experience.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: experience,
            success: true,
            message: "Experience updated succesfully !!"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//delete-experience
router.post('/delete-experience', async (req, res) => {
    try {
        const experience = await Experience.findOneAndDelete({ _id: req.body._id });
        res.status(200).send({
            data: experience,
            success: true,
            message: "Experience deleted successfully !!"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//add projects
router.post('/add-project', async (req, res) => {
    try {
        const project = new Projects(req.body);
        await project.save();
        res.status(200).send({
            data: project,
            success: true,
            message: "Project added succesfully !!"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//update-projects
router.post('/update-project', async (req, res) => {
    try {
        const project = await Projects.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: project,
            success: true,
            message: "Project updated succesfully !!"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//delete-projects
router.post('/delete-project', async (req, res) => {
    try {
        const project = await Projects.findOneAndDelete({ _id: req.body._id });
        res.status(200).send({
            data: project,
            success: true,
            message: "Project deleted successfully !!"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//add courses
router.post('/add-courses', async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(200).send({
            success: true,
            message: "courses added succesfully !!"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//update-courses
router.post('/update-courses', async (req, res) => {
    try {
        const course = await Course.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: course,
            success: true,
            message: "courses updated succesfully !!"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//delete-courses
router.post('/delete-courses', async (req, res) => {
    try {
        const course = await Course.findOneAndDelete({ _id: req.body._id });
        res.status(200).send({
            data: course,
            success: true,
            message: "courses deleted successfully !!"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//update-contact
router.post('/update-contact', async (req, res) => {
    try {
        const contact = await Contact.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: contact,
            success: true,
            message: "Contact updated succesfully !!"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//admin login
router.post("/admin-login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username, password: req.body.password });
        user.password = "";
        if (user) {
            res.status(200).send({
                data: user,
                success: true,
                message: "Login Successfully !!",
            });

        }
        else {
            res.status(200).send({
                data: user,
                success: false,
                message: "Invalid username or passsword !!",
            });

        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
module.exports = router;