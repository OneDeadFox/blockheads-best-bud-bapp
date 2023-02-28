const express = require(`express`);
const router = express.Router();
const {Thought, User, Reaction} = require(`../models`);
const { findOneAndUpdate } = require("../models/User");


router.get(`/`, async (req, res) => {
    try {
        const getAllThoughts = await Thought.find()
        res.send(getAllThoughts);
    } catch(err) {
        console.log(err);
        res.status(500).json({msg: `Internal server error`, err});
    }
});

router.get(`/:id`, async (req, res) => {
    try {
        const getOneThought = await Thought.findOne({_id: req.params.id})
            // .populate('Tought')
            // .populate('Friend');
        res.json(getOneThought);
    } catch(err) {
        console.log(err);
        res.status(500).json({msg: `Internal server error`, err});
    }
});

router.post(`/`, async (req, res) => {
    try {
        const createThought = await Thought.create(req.body);
        const updateUser = await User.findOneAndUpdate(
            {username: req.body.username},
            {$push: {thoughts: createThought._id}},
            {new: true}
            );
        res.json(createThought);
    } catch(err) {
        console.log(err);
        res.status(500).json({msg: `Internal server error`, err});
    }
});

router.put(`/:id`, async (req, res) => {
    
    
    try{
        const updateThought = await Thought.findOneAndUpdate(
            {_id: req.params.id},
            {$set: {thoughtText: req.body.thoughtText}},
            {new: true}
        );

        if(!updateThought){
            return res.status(404).json({msg: `There is no thought with that id`})
        }

        return res.json(updateThought);
    } catch(err) {
        console.log(err);
        return res.status(500).json({msg: `Internal server error`, err});
    }
});

router.delete(`/:id`, async (req, res) => {
    
    try{
        const deleteThought = await Thought.findOneAndDelete({_id: req.params.id});
        //try to solve this if you have time
        // const updateUser = await User.findOneAndUpdate(
        //     {username: deleteThought.username},
        //     {$pull: {thoughts: [{_id: req.params.id}]}}
        // )
        
        if(!deleteThought){
            return res.status(404).json({msg: `There is no thought with that id`})
        }
    
        return res.json(deleteThought);
    } catch(err) {
        console.log(err);
        return res.status(500).json({msg: `Internal server error`, err});
    }
});

router.post(`/reactions/:id`, async (req, res) => {
    try{
        const createReaction = await Thought.findOneAndUpdate(
            {_id: req.params.id},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        );

        if(!createReaction){
            return res.status(404).json({msg: `There is no thought with that id`})
        }

        return res.json(createReaction);
    } catch(err) {
        console.log(err);
        return res.status(500).json({msg: `Internal server error`, err});
    }
});

router.delete(`/:reactionId/reactions/:id`, async (req, res) => {
    
    try{
        const deleteReaction = await Thought.findOneAndUpdate(
            {_id: req.params.id},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
        );
        
        if(!deleteReaction){
            return res.status(404).json({msg: `Provided ids do not match database records`})
        }
    
        return res.json(deleteReaction);
    } catch(err) {
        console.log(err);
        return res.status(500).json({msg: `Internal server error`, err});
    }
});

module.exports = router