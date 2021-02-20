const Pool = require('pg').Pool
const pool = new Pool({
  user: 'client',
  host: 'localhost',
  database: 'tortoise_vs_hare',
  password: 'postgres',
  port: 5432,
});

const getAccount = (body) => {
    return new Promise(function(resolve, reject) {
        const {name, password} = body
        pool.query(`SELECT "name", "yearLevel", "tortoise", "progressLevel" FROM accounts WHERE name='${name}' AND password='${password}'`, (error, results) => {
            if (error) {
                console.log("MODEL ERROR: " + error)
                reject(error)
            }
            resolve(results.rows)
        })
    })
}

const createAccount = (body) => {
    console.log(body)
    return new Promise(function(resolve, reject) {
        const {name, password, yearLevel, tortoise} = body
        pool.query(`INSERT INTO accounts (name, password, "yearLevel", tortoise, "progressLevel") VALUES ('${name}', '${password}', ${yearLevel}, ${tortoise}, 0)`, (error, results) => {
            if (error) {
                console.log("MODEL ERROR: " + error)
                reject(error)
            }
            resolve(`Created account with name: ${name}, year level: ${yearLevel}, and tortoise: ${tortoise}`)
        })
    })
}

module.exports = {
    getAccount,
    createAccount
}