const sql = require('mssql');
const express = require('express');
let poolPromise = require('../config/connection')

class Message {
    static create(content) {
        // let pool = poolPromise
        // let result = pool.Request()
        //     .input('msg', sql.VarChar, req.query.input_parameter)
        //     .query('INSERT INTO MESSAGE(1, @msg, null);');

        async () => {
            try {
                // make sure that any items are correctly URL encoded in the connection string
                await sql.connect('Server=LAPTOP-UPNMOI7H;Database=NodeJS_Tuto;Trusted_Connection=True;');
                const result = await sql.query`INSERT INTO MESSAGE(1, ${content}, null)`;
                console.dir(result);
            } catch (err) {
                // ... error checks
            }
        }
    }
}



module.exports = Message;