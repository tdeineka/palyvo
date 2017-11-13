const mysql     = require('mysql')
    , cError    = require('../lib/customError')
    , config    = require('../config')
    ;

var pool = mysql.createPool (config.db);

var getConnection = function (sqlSelect, cb) {
    pool.getConnection (function (err, connection) {
        //pass the error to the cb instead of throwing it
        if (err) return cb (err);

        connection.query (sqlSelect, function (err, rows) {
            connection.release();
            if (err) return cb (err);
            else cb (null, rows);
        });
    });
};

module.exports = getConnection;
