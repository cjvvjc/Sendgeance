const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middleware/auth')

const Workout = require('../models/Workout')

//@desc Process add form
//@Route POST /new
router.post('/', ensureAuth, async (req,res) => {
    try {
        req.body.user = req.user.id
        await Workout.create(req.body)
        res.redirect('/new')
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

//@desc Show edit page
//@route GET /review/:id
router.get('/:id', ensureAuth, async (req,res) => {
    try {
        let workout = await Workout.findOne({ _id: req.params.id }).lean()
        
        if(!workout) {
            return res.render('error/404')
        }
    
        if(workout.user != req.user.id) {
            res.redirect('/new')
        } else {
            res.render('review', {
                workout
            })
        }
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})

//@desc edit workout
//@route PUT /review/:id
router.put('/:id', ensureAuth, async (req,res) => {
    try {
        let workout = await Workout.findById(req.params.id).lean()

        if (!workout) {
            return res.render('error/404')
        }

        if (workout.user != req.user.id) {
            res.redirect('/new')
        } else {
            workout = await Workout.findOneAndUpdate({ _id: req.params.id}, req.body, {
                new: true,
                runValidators: true
            })
        }
        
        res.redirect('/new')
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})

//@desc Delete workout
//@route DELETE /review/:id
router.delete('/:id', ensureAuth, async (req,res) => {
    try {
        await Workout.remove({_id: req.params.id })
        res.redirect('/new')
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})

// //@desc Show current workout
// //@Route GET /new
// router.get('/new', ensureAuth, async (req,res) => {
//     try {
//         const workouts = await Workout.find({ user: req.user.id }).lean()
//         res.render('new', {
//             name: req.user.firstName,
//             workouts,
//         })
//         console.log(workouts)
//     } catch (err) {
//         console.error(err)
//         res.render('error/500')
//     }
// })


module.exports = router