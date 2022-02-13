import { User } from '@src/utils/databaseTypes';
import express from 'express';
import { getAllUsers, updateUser } from '../models/users';

const router: express.Router = express.Router();

router.get('/', async (req, res): Promise<void> => {
  try {
    const result = await getAllUsers();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error ${err}`);
  }
});
router.put('/', async (req, res): Promise<void> => {
  try {
    const id = req.header('id');
    const newUserProperties: Partial<User> = req.body;
    const updatedUser: User = await updateUser(newUserProperties, Number(id));
    res.json({
      message: 'User updated',
      payload: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error ${err}`);
  }
});

export default router;
