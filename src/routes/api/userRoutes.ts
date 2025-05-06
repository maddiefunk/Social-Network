import express from 'express';
import userController from '../../controllers/userController';

const router = express.Router();

// api/users
router.route('/')
.get(userController.getAllUsers)
.post(userController.createUser);


// api/users/:userid
router.route('/:userId')
.get(userController.getUserById)
.put(userController.updateUser)
.delete(userController.deleteUser);


// api/users/userid/friend/friendid
router.route('/:userId/friends/:friendId')
.post(userController.addFriend)
.delete(userController.removeFriend);

export default router;