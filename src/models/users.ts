import { User } from '@src/utils/databaseTypes';

const { query } = require('../database/config');

export async function getAllUsers(): Promise<User> {
  const sqlString = 'SELECT * FROM "user";';
  const adverts = await query(sqlString);
  return adverts.rows;
}

export async function getUserByEmail(email: string): Promise<Array<User>> {
  const sqlString = 'SELECT * FROM "user" WHERE email = $1;';
  const { rows: usersFound }: { rows: Array<User> } = await query(sqlString, [email]);
  return usersFound;
}

export async function addUser(user: User): Promise<number> {
  const sqlString =
    'INSERT INTO "user" (username,first_name,last_name,email,password,role,gender,phone) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id; ';
  const { rows: ids }: { rows: Array<{ id: number }> } = await query(sqlString, [
    user.username,
    user.first_name,
    user.last_name,
    user.email,
    user.password,
    user.role,
    user.gender,
    user.phone,
  ]);
  return ids[0].id;
}

export async function updateUser(newUserProperties: Partial<User>, id: number): Promise<User> {
  const { rows: oldUserData }: { rows: Array<User> } = await query('SELECT * FROM "user" WHERE id=$1', [id]);
  const newUser = { ...oldUserData[0], ...newUserProperties };
  const sqlString =
    'UPDATE "user" SET username=$1, first_name=$2, last_name=$3, email=$4, password=$5, role=$6, gender=$7, phone=$8 WHERE id=$9 RETURNING *;';
  const { rows: updatedUser }: { rows: Array<User> } = await query(sqlString, [
    newUser.username,
    newUser.first_name,
    newUser.last_name,
    newUser.email,
    newUser.password,
    newUser.role,
    newUser.gender,
    newUser.phone,
    id,
  ]);
  return updatedUser[0];
}
