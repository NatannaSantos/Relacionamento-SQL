import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from "../db.js";

export async function login(req, res) {
  const { email, senha } = req.body;

  try {
    const user = await db.query(`
    SELECT * FROM usuarios WHERE email=$1
    `,[email]);
    if (user.rows.length===0) {
      return res.sendStatus(401);
    }
   
  
    if (bcrypt.compareSync(senha, user.rows[0].senha)) {
      const token = uuid();
  
      await db.query(`
      INSERT INTO sessoes ("idUsuario",token)
      VALUES ($1,$2)
      `,[user.rows[0].id,token]);
      
      return res.send(token);
    }
      res.sendStatus(401);
  } catch (error) {
    console.log(error);
  }
  
  
}