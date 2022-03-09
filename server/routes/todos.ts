import { Router } from 'express';
import { createTodo, deleteTodo } from '../controllers/todos';
import { getTodos, updateTodo } from './../controllers/todos';

export const router = Router();

router.get('/', getTodos);
router.post('/', createTodo);
router.patch('/:id', updateTodo);
router.delete('/:id', deleteTodo);
