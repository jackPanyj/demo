const Router = require('@koa/router')
const { uploadFileToCloud } = require('./storage')
const { getAll, saveItem, login } = require('./db')
const fs = require('fs')
const path = require('path')


const router = new Router()


router.post('/api/upload', async (ctx) => {
    const file = ctx.request.files.file;
    const ext = path.extname(file.originalFilename)
    fs.renameSync(file.filepath, file.filepath + ext)
    try {
        const data = await uploadFileToCloud(file.filepath + ext)
        ctx.body = {
            code: 200,
            data
        }
    } catch (error) {
        ctx.body = {
            code: 400,
            error,
        }
    }
})

router.post('/api/save', async (ctx) => {
    const { name, id, picUrl } = JSON.parse(ctx.request.body || '{}')
    try {
        const data = await saveItem(name, id, picUrl)
        ctx.body = { code: 200, data }
    } catch (error) {
        ctx.body = {
            code: 400,
            error
        }
    }
})

router.get('/api/all', async (ctx) => {
    try {
        const data = await getAll()
        ctx.body = {code: 200, data}
    } catch (error) {
        ctx.body = {code: 400, error}
    }
})

router.get('/api/login', async (ctx) => {
    const {name, password} = ctx.request.query
    try {
        const data = await login(name, password)
        if (data) {
            ctx.body = {code: 200, data}
        } else {
            ctx.body = {code: 404, message: 'invalid name or password'}
        }
    } catch (error) {
        ctx.body = {code: 400, error}
    }
})

module.exports = router
