import express from 'express';
import { registerUser } from '~server/controllers';

const router = express.Router();

router.post('/', registerUser);

module.exports = router;
