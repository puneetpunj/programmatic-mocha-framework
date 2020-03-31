const sql = require("mssql");

const sendSQLServerQuery = async (query) => {
    const config = {
        user: 'sa',
        password: 'Stupipassword123!',
        server: 'localhost',
        port: 60666,
        database: 'TutorialDB',
        options: {
            enableArithAbort: true
        }
    };

    const pool = await sql.connect(config)
    try {
        // create Request object
        const result = await pool.request()
            .query(query)
        await sql.close()
        return result;
    }
    catch (e) {
        throw e
    }
}

module.exports = { sendSQLServerQuery }