const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')

const Workout = require('../models/Workout')

//@desc Login/landing page
//@route GET /
router.get('/', ensureGuest, (req,res) => {
    res.render('login', {
        layout: 'login',
    })
})

//@desc Dashboard
//@route GET /dashboard
router.get('/dashboard', ensureAuth, (req,res) => {
    console.log(req.user)
    res.render('dashboard', {
        name: req.user.firstName, //adds {{name}} to Dashboard homepage
    })
})

//@desc New workout
//@route GET /new
//@desc Show current workout
//@Route GET /new
// router.get('/new', ensureAuth, async (req,res) => {
//     try {
//         const workouts = await Workout.find({ user: req.user.id }).lean()
//         res.render('new', {
//             name: req.user.firstName,
//             workouts,
//         })
//     } catch (err) {
//         console.error(err)
//         res.render('error/500')
//     }
// })

router.get('/new', ensureAuth, async (req,res) => {
    const startDate = new Date().setHours(0)
    const endDate = new Date().setHours(23,59,59)
    try {
        const workouts = await Workout.find({ user: req.user.id, createdAt: {$gte: startDate, $lt: endDate}}).lean()
        res.render('new', {
            name: req.user.firstName,
            workouts,
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

//@desc Review all workouts
//@route Get /review

router.get('/review', ensureAuth, async (req,res) => {
    try {
    const workouts = await Workout.find({ user: req.user.id}).lean()
        res.render('review', {
            name: req.user.firstName,
            workouts,
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

// review all workout entries for specific date
router.get('/review/:date', ensureAuth, async (req,res) => {
    const date = req.params.date
    const startDate = date.setHours(0)
    const endDate = date.setHours(23,59,59)
    try {
    const workouts = await Workout.find({ user: req.user.id, createdAt: {$gte: startDate, $lt: endDate}}).lean()
        res.render('review', {
            name: req.user.firstName,
            workouts,
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})


module.exports = router