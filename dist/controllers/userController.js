import User from '../models/User.js';
import Thought from '../models/Thought.js';
const userController = {
    async getAllUsers(res) {
        try {
            const users = await User.find()
                .populate('thoughts')
                .populate('friends');
            res.json(users);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async getUserById(req, res) {
        try {
            const { userId } = req.params;
            const user = await User.findById(userId)
                .populate('thoughts')
                .populate('friends');
            if (!user)
                return res.status(404).json({ message: 'User not found.' });
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
        return res.status(404).json({ message: 'Error.' });
    },
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
                new: true,
                runValidators: true,
            });
            if (!user)
                return res.status(404).json({ message: 'User not found.' });
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
        return res.status(404).json({ message: 'Error.' });
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.userId);
            if (!user)
                return res.status(404).json({ message: 'User not found.' });
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and thoughts deleted. ' });
        }
        catch (err) {
            res.status(500).json(err);
        }
        return res.status(404).json({ message: 'Error.' });
    },
    async addFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
            if (!user)
                return res.status(404).json({ message: 'User not found.' });
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
        return res.status(404).json({ message: 'Error.' });
    },
    async removeFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
            if (!user)
                return res.status(404).json({ message: 'User not found.' });
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
        return res.status(404).json({ message: 'Error.' });
    },
};
export default userController;
