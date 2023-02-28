const express = require(`express`);
const router = express.Router();
const {User, Reacion, Thought} = require(`../models`);

router.get(`/`, async (req, res) => {
    try {
        const getAllUsers = await User.find()
        res.send(getAllUsers);
    } catch(err) {
        console.log(err);
        res.status(500).json({msg: `Internal server error`, err});
    }
});

router.get(`/:id`, async (req, res) => {
    try {
        const getOneUser = await User.findOne({_id: req.params.id})
            .populate('thoughts')
            .populate('friends');
        res.json(getOneUser);
    } catch(err) {
        console.log(err);
        res.status(500).json({msg: `Internal server error`, err});
    }
});

router.post(`/`, async (req, res) => {
    try {
        const createUser = await User.create(req.body);
        res.json(createUser);
    } catch(err) {
        console.log(err);
        res.status(500).json({msg: `Internal server error`, err});
    }
});

router.put(`/:id`, async (req, res) => {
    
    
    try{
        const updateUser = await User.findOneAndUpdate(
            {_id: req.params.id},
            {$set: {username: req.body.username}},
            {new: true}
        );
        updateUser.thoughts.forEach(async thought => {
            await Thought.findOneAndUpdate(
                {_id: thought},
                {$set: {username: req.body.username}}
            )
        });

        if(!updateUser){
            return res.status(404).json({msg: `There is no user with that id`})
        }

        return res.json(updateUser);
    } catch(err) {
        console.log(err);
        return res.status(500).json({msg: `Internal server error`, err});
    }
});

router.delete(`/:id`, async (req, res) => {
    
    try{
        const deleteUser = await User.findOneAndDelete({_id: req.params.id});
        deleteUser.thoughts.forEach(async thought => {
            await Thought.findOneAndDelete(
                {_id: thought},
                {$set: {username: req.body.username}}
            )
        });
        
        if(!deleteUser){
            return res.status(404).json({msg: `There is no user with that id`})
        }
    
        return res.json(deleteUser);
    } catch(err) {
        console.log(err);
        return res.status(500).json({msg: `Internal server error`, err});
    }
});

//Friend routes
router.post(`/friends/:id`, async (req, res) => {
    try{
        const getFriend = await User.findOne(
            {username: req.body.username}
        );
        
        const updateFriend = await User.findOneAndUpdate(
            {_id: req.params.id},
            {$push: {friends: getFriend._id}},
            {new: true}
        );

        if(!updateFriend){
            return res.status(404).json({msg: `There is no user with that id`})
        }

        return res.json(updateFriend);
    } catch(err) {
        console.log(err);
        return res.status(500).json({msg: `Internal server error`, err});
    }
});

router.delete(`/:username/friends/:id`, async (req, res) => {
    
    try{
        const getFriend = await User.findOne(
            {username: req.params.username}
        );

        const deleteFriend = await User.findOneAndUpdate(
            {_id: req.params.id},
            {$pull: {friends: getFriend._id}},
            {new: true}
        );
        
        if(!deleteFriend){
            return res.status(404).json({msg: `There is no user with that id`})
        }
    
        return res.json(deleteFriend);
    } catch(err) {
        console.log(err);
        return res.status(500).json({msg: `Internal server error`, err});
    }
});

module.exports = router