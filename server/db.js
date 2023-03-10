const sqlite3 = require('sqlite3')
const {open} = require('sqlite')
const { v4 } = require('uuid')
const crypto = require('crypto')

const root = 'admin'
const password = 'admin'
const encryptPassword = crypto.createHash('md5').update(password).digest('hex')

const DBNAME = 'sqlite.db'

const createInfoTableSql = `
    CREATE TABLE IF NOT EXISTS PERSONINFO(
        id TEXT PRIMARY KEY    NOT NULL,
        name           TEXT    NOT NULL,
        govNumber      TEXT    NOT NULL,
        govPicture     TEXT    NOT NULL
    );
`

const createAdminTable = `
    CREATE TABLE IF NOT EXISTS ADMIN(
        id TEXT PRIMARY KEY    NOT NULL,
        name           TEXT    NOT NULL,
        password       TEXT    NOT NULL
    );
`

module.exports = {
    async initDb() {
        const db = await open({filename: DBNAME, driver: sqlite3.Database})
        await Promise.all([db.run(createInfoTableSql), db.run(createAdminTable)])
        const data = await db.get('select * from admin where name=? and password=?', root, encryptPassword)
        if (data == null) {
            await db.run('INSERT INTO ADMIN values(?, ?, ?);', v4(), root, encryptPassword)
        }
        await db.close()
    },

    async saveItem(name, id, picUrl) {
        const db = await open({filename: DBNAME, driver: sqlite3.Database})
        const sql = 'insert into personinfo values(?,?,?,?)'
        const data = await db.run(sql, v4(), name, id, picUrl)
        await db.close()
        return data
    },

    async getAll() {
        const db = await open({filename: DBNAME, driver: sqlite3.Database})
        const data = await db.all('select * from personinfo')
        await db.close()
        return data
    },

    async login(name, password) {
        console.log(name, password, 1)
        const encryptPassword = crypto.createHash('md5').update(password).digest('hex')
        const db = await open({filename: DBNAME, driver: sqlite3.Database})
        const sql = `select * from admin where name="${name}" and password="${encryptPassword}";`
        const data = await db.get(sql)
        await db.close()
        return data
    }

}