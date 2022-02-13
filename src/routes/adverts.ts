import express from 'express';
import { Advert } from '@src/utils/databaseTypes';
import { getAllAdverts, addNewAdvert, updateAdvert } from '@src/models/adverts';

const router: express.Router = express.Router();

router.get('/', async (req, res): Promise<void> => {
  try {
    //  Get adverts from DB
    const result = await getAllAdverts();
    res.json({
      success: true,
      message: 'All the adverts.',
      payload: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error ${err}`);
  }
});

router.post('/', async (req, res): Promise<void> => {
  try {
    const newAdvert: Advert = req.body;
    const newAdvertId = await addNewAdvert(newAdvert);
    res.json({
      success: true,
      message: 'Added a new advert',
      payload: newAdvertId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error:${error}`);
  }
});

router.put('/', async (req, res): Promise<void> => {
  try {
    const id = req.header('id');
    const newAdvertProperties: Partial<Advert> = req.body;
    const updatedUser = await updateAdvert(newAdvertProperties, Number(id));
    res.json({
      message: 'Advert updated',
      payload: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error ${err}`);
  }
});

export default router;
