const express = require("express");
const router = express.Router();
const passport = require("passport");
const Certificate = require("../../models/Certificate");
const Project = require("../../models/Project");
const Report = require("../../models/Report");
const Research = require("../../models/Research");
const Task = require("../../models/Task");
const Candidate = require("../../models/User").Candidate;
const Consultancy = require("../../models/User").Consultancy;
const Partner = require("../../models/User").Partner;
//Search everything in the website
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const certificates = await Certificate.find({
            name: {
                $regex: new RegExp(req.body.text)
            },
        });
        const projects = await Project.find({
            name: {
                $regex: new RegExp(req.body.text)
            },
        });
        const tasks = await Task.find({
            name: {
                $regex: new RegExp(req.body.text)
            },
        });
        const reports = await Report.find({
            title: {
                $regex: new RegExp(req.body.text)
            },
        });
        const researches = await Research.find({
            title: {
                $regex: new RegExp(req.body.text)
            },
        });
        const partners = await Partner.find({
            name: {
                $regex: new RegExp(req.body.text)
            },
        });
        const consultancies = await Consultancy.find({
            name: {
                $regex: new RegExp(req.body.text)
            },
        });
        const candidates = await Candidate.find({
            name: {
                $regex: new RegExp(req.body.text)
            },
        });
        res.json({
            certificates,
            projects,
            tasks,
            reports,
            researches,
            partners,
            consultancies,
            candidates
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//Filter certificates
router.post('/certificates', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const certificates = await Certificate.find({
            name: {
                $regex: new RegExp(req.body.text)
            },
        });
        res.json({
            certificates
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//Filter projects
router.post('/projects', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const projects = await Project.find({
            name: {
                $regex: new RegExp(req.body.text)
            },
        });
        res.json({
            projects
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//Filter tasks
router.post('/tasks', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const tasks = await Task.find({
            name: {
                $regex: new RegExp(req.body.text)
            },
        });
        res.json({
            tasks
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//Filter reports
router.post('/reports', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const reports = await Report.find({
            title: {
                $regex: new RegExp(req.body.text)
            },
        });
        res.json({
            reports
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//Filter researches
router.post('/researches', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const researches = await Research.find({
            title: {
                $regex: new RegExp(req.body.text)
            },
        });
        res.json({
            researches
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//Filter partners
router.post('/partners', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const partners = await Partner.find({
            name: {
                $regex: new RegExp(req.body.text)
            },
        });
        res.json({
            partners
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//Filter consultancies
router.post('/consultancies', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const consultancies = await Consultancy.find({
            name: {
                $regex: new RegExp(req.body.text)
            },
        });
        res.json({
            consultancies
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//Filter candidates
router.post('/candidates', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const candidates = await Candidate.find({
            name: {
                $regex: new RegExp(req.body.text)
            },
        });
        res.json({
            candidates
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
module.exports = router;
