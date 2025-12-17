import { Router } from 'express';
import * as controller from '../controllers/taskController.js';
import auth from '../middlewares/authMiddleware.js';

const router = Router();

router.use(auth);

router.post('/', controller.createTask);
router.get('/', controller.getAllTasks);
router.get('/:id', controller.getTaskById);
router.put('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);

export default router;

//auth/register
//auth/login
///tasks