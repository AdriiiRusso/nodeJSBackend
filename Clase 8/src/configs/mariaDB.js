const mariaDBConfig = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'SGOCYD2021.-',
        database: 'test'
    },
    pool: {min: 0, max: 7}
}

module.exports = {
    mariaDBConfig
}