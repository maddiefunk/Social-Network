import express from 'express';
import thoughtController from '../../controllers/thoughtController';
const router = express.Router();
// api/thoughts
router.route('/')
    .get(thoughtController.getAllThoughts)
    .post(thoughtController.createThought);
// api/thoughts/thoughtid
router.route('/:thoughtId')
    .get(thoughtController.getThoughtById)
    .put(thoughtController.updateThought)
    .delete(thoughtController.deleteThought);
// api/thoguts/thoughtid/reacitons
router.route('/:thoughtId/reactions')
    .post(thoughtController.addReaction);
// api.thoguths/thoughtid/reacitons/ractionid
router.route('/:thoughtId/reactions/:reactionId')
    .delete(thoughtController.removeReaction);
export default router;
