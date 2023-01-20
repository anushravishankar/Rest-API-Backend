const asyncHandler = require('express-async-handler')

const Goal = require('../model/goalModel')

const getGoals = asyncHandler(async(req,res) => {
    const goals = await Goal.find()

    res.status(200).json(goals);
}) 

const setGoal = asyncHandler(async(req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add some text')
    }

    const goal = await Goal.create({
        text: req.body.text
    })

    res.status(200).json(goal);
})

const updateGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedGoal);
})

const deleteGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found! Nothing to delete')
    }
        await goal.remove()
        res.status(200).json(`Goal with id: ${req.params.id} deleted`);
    
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}