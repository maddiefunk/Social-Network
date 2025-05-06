import User from '../models/User.js';
import Thought from '../models/Thought.js';
import { Request, Response } from 'express';


const thoughtController = {

    // gets all thoughts
    async getAllThoughts(res: Response) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // get thought by id
    async getThoughtById(req: Request, res: Response) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought)
                return res.status(404).json({ message: 'Thought not found.'});
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
        return res.status(404).json({ message: 'Error.'});
    },

    // create new thought and add it to thoughts []
    async createThought(req: Request, res: Response) {
        try {
            const thought = await Thought.create(req.body);
            await User.findByIdAndUpdate(
                req.body.userId,
                { $push: { thoughts: thought._id } },
                { new: true }
            );
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //update thought

    async updateThought(req: Request, res: Response) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                req.body,
                { new: true, runValidators: true }
            );
            if (!thought) 
                return res.status(404).json({ message: 'Thought not found.' });
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
        return res.status(404).json({ message: 'Error.'});
    },

    // delete thought

    async deleteThought(req: Request, res: Response) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!thought) 
                return res.status(404).json({ message: 'Thought not found.' });

            await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } }
            );
            res.json({ message: 'Thought deleted.' });
        } catch (err) {
            res.status(500).json(err);
        }
        return res.status(404).json({ message: 'Error.'});
    },

    // add reaction to thought

    async addReaction(req: Request, res: Response) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $addToSet: { reactions: req.body } },
                { new: true, runValidators: true }
            );
            if (!thought) 
                return res.status(404).json({ message: 'Thought not found.' });
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
        return res.status(404).json({ message: 'Error.'});
    },

    // remove reaction from thought 

    async removeReaction(req: Request, res: Response) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!thought) 
                return res.status(404).json({ message: 'Thought not found.' });
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
        return res.status(404).json({ message: 'Error.'});
    },
};

export default thoughtController;