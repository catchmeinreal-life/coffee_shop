const mysql = require("mysql2");

const DB = mysql.createConnection({
    host : "localhost",
    user : process.env.USER, //mysql user name
    password : process.env.PASSWORD, //mysql password
    database : process.env.DATABASE
})

try {
    DB.connect();
    // console.log('successfull connection..');
    let sql = 'CREATE DATABASE IF NOT EXITS coffee_Shop1;';
    try{
        con.query(sql);
        console.log('db created');
    }catch (err){
        console.log(err, 'error creating database');
    };

    con.end((err)=>{
        if(err) throw err;
    });
} catch(err){
    console.log(err.name);
}


export default DB