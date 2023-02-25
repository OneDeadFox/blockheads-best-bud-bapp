const { connect, connection } = require('mongoose');

connect('mongodb://localhost/bestBuds_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
