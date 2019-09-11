const SQL_LOGIN = 'SELECT userid,username,password FROM users WHERE username=$1'
const SQL_REGISTER = 'SELECT userid FROM users WHERE username = $1'
const SQL_REGISTER_INSERT = 'INSERT INTO users(username,password) VALUES($1,$2)'
const SQL_DELETE_TASK = 'DELETE FROM check_list WHERE listid = $1'
const SQL_INSERT_TASK = 'INSERT INTO check_list(tasks,userid) VALUES($1,$2)'
const SQL_SHOW_LIST = 'SELECT listid,tasks,is_checked FROM check_list WHERE userid=$1 AND is_checked=$2'
const SQL_CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS users (
        userid serial PRIMARY KEY,
        username VARCHAR NOT NULL,
        password VARCHAR NOT NULL,
        PRIMARY KEY (userid)
    );

    CREATE TABLE IF NOT EXISTS check_list (
        listid serial PRIMARY KEY,
        tasks TEXT,
        is_checked BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT current_timestamp NOT NULL,
        updated_at TIMESTAMP DEFAULT current_timestamp NOT NULL,
        userid INTEGER REFERENCES users (userid)
    );
`
module.exports = {
    SQL_CREATE_TABLE,
    SQL_LOGIN,
    SQL_REGISTER,
    SQL_REGISTER_INSERT,
    SQL_DELETE_TASK,
    SQL_INSERT_TASK,
    SQL_SHOW_LIST
}
