import express from 'express';
import { ROLES_LIST } from '~server/config';
import { deleteUser, getUser, getUsers } from '~server/controllers';
import { verifyRoles } from '~server/middleware';

const router = express.Router();

router
  .route('/')
  .get(verifyRoles(ROLES_LIST.Admin), getUsers)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

router.route('/:id').get(verifyRoles(ROLES_LIST.Admin), getUser);

module.exports = router;
