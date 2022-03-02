import db from "../db.js";

export async function validateToken(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }

  const sessao=await db.query(`
  SELECT * FROM sessoes WHERE token=$1
  `,[token]);
  
  if (sessao.rows.length===0) {
    return res.sendStatus(401);
  }
 
  const user = await db.query(`
  SELECT * FROM usuarios 
  WHERE usuarios.id=${sessao.rows[0].idUsuario}
  `);
  if (user.rows.length===0) {
    return res.sendStatus(401);
  }

  res.locals.user = user;
  next();
}