import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../db.js';

export async function createUser(req, res) {
    const { nome, email, senha } = req.body;

    try {
        const passwordHash = bcrypt.hashSync(senha, 10);
        console.log(passwordHash);
        await db.query(`
        INSERT INTO usuarios 
        (nome,email,senha)
        VALUES ($1,$2,$3)
        `, [nome, email, passwordHash]);

        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function createProdutos(req, res) {
    const produtos = req.body;
    const { user } = res.locals;
    console.log(user.id)
    try {       

        await db.query(`
    INSERT INTO produtos 
    (nome,preco,idUsuario)
    VALUES ($1,$2,$3)
    `, [produtos.nome, produtos.preco, user.rows[0].id]);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}
