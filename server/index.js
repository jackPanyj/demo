const Koa = require('koa')
const { koaBody } = require('koa-body')
const { initDb } = require('./db')
const router = require('./router')
const serve = require('koa-static')
const path = require('path')
const fs = require('fs')


const app = new Koa()
app.use(serve(path.join(__dirname, '../dist')))

initDb()

app
    .use(koaBody({ multipart: true }))
    .use(router.routes())
    .use(router.allowedMethods())
    .use((ctx) => {
        ctx.type = 'html';
        ctx.body = fs.readFileSync(path.join(__dirname, '../dist/index.html'))
    });
    
    

app.listen(3000)
