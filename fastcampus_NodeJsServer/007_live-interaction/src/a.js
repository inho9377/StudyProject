// @ts-check
const Koa = require('koa')
const Pug = require('koa-pug')
const path = require('path')
const route = require('koa-route')
const websockify = require('koa-websocket')
const serve = require('koa-static')
const mount = require('koa-mount')

const app = websockify(new Koa)

// @ts-ignore
new Pug({
    viewPath: path.resolve(__dirname, './views'),
    app, //Binding 'ctx.render()', equals to pug.use(app)
})

app.use(mount('/public', serve('src/public')))

app.use(async (ctx) => {
    ctx.body = `<${ctx.body}}>`
})

app.ws.use(
    // 해당 주소로 접속시 처리할 일
    route.all('/ws/:id', (ctx) => {
        ctx.websocket.send('Hello world!')
        ctx.websocket.on('message', (message) => {
            console.log(message)
        })
    })
)

app.listen(5001)