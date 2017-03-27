// http://knexjs.org/#knexfile

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './moose.sqlite3'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: './moose.sqlite3'
    },
    useNullAsDefault: true
  }
};
