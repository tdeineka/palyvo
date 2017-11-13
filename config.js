module.exports = {
  db : {
         host     : 'localhost'
       , port     : '3306'
       , user     : 'admin'
       , password : 'Qawsed'
       , database : 'palyvo'
       , connectionLimit: 10
       }
, session : { key: 'es' //session_cookie_name,
            , secret: 'unknown_secret_salt'
            , resave: false
            , saveUninitialized: false
            }
, auth : { usernameField: 'username'
         , passwordField: 'password'
         , passReqToCallback: true
         }
, user: { name:     { minlength: 4
                    , maxlength: 20
                    }
        , password: { minlength: 4
                    , maxlength: 20
                    }
        , roles: ["ADMIN","MASTER","OPERATOR"]
        }
};
