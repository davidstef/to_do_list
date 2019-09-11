const CONNECTION_STRING = "postgres://postgres:postgres@localhost:5432/todolistdb"
const PORT = process.env.PORT || 3000;
const SALT_ROUNDS = 10;
const SESSION_SECRET = 'lhadhlsdalh'

module.exports = {
    PORT,
    CONNECTION_STRING,
    SALT_ROUNDS,
    SESSION_SECRET
}
