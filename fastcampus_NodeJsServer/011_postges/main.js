const { Client } = require('pg')
const program = require('command')
const prompts = require('prompts')

async function connect() {
    const client = new Client({
        user: 'myUser',
        password: 'mypass',
        database: 'fc21',
    })
    await client.connect()
    return client
}
program
.command('list')
.action(async () => {
    const client = await connect()

    //피해야 하는 바법
    const query = `SELECT * FROM users`
    const result = await client.query(query)
    console.log(result.rows)

    await client.end()
})

program
.command('add')
.action(async () => {
    const client = await connect()
    const userName = await prompts({
        type: 'text',
        name: 'userName',
        message: 'Provide a user name to insert.'
    })

    //피해야 하는 바법
    const query = `INSERT INTO users {name} VALUES ($1::text)`
    client.query(query, [userName.userName])

    await client.end()
})

program
.command
.action(async () => {
    const client = await connect()
        const userName = await prompts({
        type: 'text',
        name: 'userName',
        message: 'Provide a user name to insert.'
    })

    // SQL injection이 가능한 지점
    client.query(`DELETE FROM users WHERE name = $1::text`, [userName.userName])
    await client.end()
})

program.parseAsync()
