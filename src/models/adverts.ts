import { Advert } from '@src/utils/databaseTypes';

const { query } = require('../database/config');

export async function getAllAdverts(): Promise<Array<Advert> | null> {
  try {
    const sqlString = 'SELECT * FROM advert;';
    const adverts = await query(sqlString);
    return adverts.rows;
  } catch (error) {
    console.error(error);
  }
  return null;
}
export async function addNewAdvert(advert: Advert): Promise<Array<Advert> | null> {
  const sqlString =
    'INSERT INTO advert (title, description,price,area,availability,experience) VALUES($1,$2,$3,$4,$5,$6) RETURNING id;';
  try {
    const response = await query(sqlString, [
      advert.title,
      advert.description,
      advert.price,
      advert.area,
      advert.availability,
      advert.experience,
    ]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
  }
  return null;
}

export async function updateAdvert(newAdvertProperties: Partial<Advert>, id: number): Promise<Advert | null> {
  try {
    const { rows: oldAdvertData }: { rows: Array<Advert> } = await query('SELECT * FROM advert WHERE id=$1', [id]);
    const newAdvert = { ...oldAdvertData[0], ...newAdvertProperties };
    const sqlString =
      'UPDATE advert SET title=$1, description=$2, price=$3, area=$4, availability=$5, experience=$6 WHERE id=$7 RETURNING *;';
    const { rows: updatedAdvert }: { rows: Array<Advert> } = await query(sqlString, [
      newAdvert.title,
      newAdvert.description,
      newAdvert.price,
      newAdvert.area,
      newAdvert.availability,
      newAdvert.experience,
      id,
    ]);
    return updatedAdvert[0];
  } catch (error) {
    console.error(error);
  }
  return null;
}

// TODO: functions to DELETE adverts
