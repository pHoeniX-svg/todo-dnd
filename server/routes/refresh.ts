import express from 'express';
import { getRefreshToken } from '~server/controllers';

const router = express.Router();

router.get('/', getRefreshToken);

module.exports = router;
