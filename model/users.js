const db         = require('./db')
    , sql        = require('sql-query')
    , sqlBuilder = sql.Query()
    ;

const table = 'users';
var users;

module.exports = {
  select: function (where, cb) {
      var query = sqlBuilder.select()
                            .from (table)
                            .where (where)
                            .build();
      db (query, function (err, rows) {
          if (err) return cb (err);
          else {
              cb (null, rows);
          }
      });
  }
, selectAll: function (cb) {
      var query = sqlBuilder.select()
                            .from (table)
                            .build();

      db (query, function (err, rows) {
          if (err) return cb (err);
          else {
              users = rows;
              cb (null, rows);
          }
      });
  }
, find: function (id) {
      return users.find (user => (user.id == id))
  }
, update: function (id, name, password, role, cb) {
      var query = sqlBuilder.update()
                            .into (table)
                          	.set ({ name: name, password: password, role: role })
                            .where ({ id: id })
                           	.build();
      db (query, function (err, results) {
          if (err) return cb (err);
          else {
              cb (null, results);
          }
      });
  }
, insert: function (name, password, role, cb) {
      var query = sqlBuilder.insert()
                            .into (table)
                           	.set ({ name: name, password: password, role: role })
                          	.build();
      db (query, function (err, results) {
          if (err) return cb (err);
          else {
/* console.log (results);
OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 7,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0 }*/
              cb (null, results);
          }
      });
  }
, delete: function (id, cb) {
      var query = sqlBuilder.remove()
                            .from (table)
                            .where ({ id: id })
                           	.build();
      db (query, function (err, results) {
          if (err) return cb (err);
          else {

/*  console.log (results);
 OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0 }
  */
              cb (null, results);
          }
      });
  }
};
