var express = require("express");
var cors = require('cors');
var mysql = require("mysql");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var {check,validationResult} = require("express-validator")
var { expressjwt: jwtVerify } = require("express-jwt");
var nodemailer = require("nodemailer");
require("dotenv").config();


var app = express();
app.use(cors());
app.use(express.json())
// app.use(jwt.verify())

// app.use(
//     jwtVerify({
//         secret: "iiissss",
//         algorithms: ["HS256"],
//     }).unless({ path: ["/signUpData", "/loginData", "/verify", "/validateEmail", "/valTokenPass"] })
// );

var jwt_key = "iiissss";


app.listen(3001, () => {
    console.log("Register server running....")
});


// ----------------------------- MYSQL connection --------------------------

var con = mysql.createConnection({
    'host': process.env.HOST,
    'user': process.env.MY_USER,
    'password': process.env.PASSWORD,
    'database': process.env.DATABASE
});

con.connect(err => {
    if (err) {
        console.error('error connecting ' + err.stack);
        return
    }
    console.log("connected as id" + con.threadId);
})


// ----------------------------------SEND MAIL Operation------------------------------------------------------

function sendmail(htmlLink, email) {

    console.log(htmlLink);

    return new Promise((resolve, reject) => {

        var transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "594b747d5faf6b",
                pass: "156e561cccbc78"
            }
        });

        


        message = {

            from: "from-example@email.com",
            to: email,
            subject: "Verify email",
            html: <div style=""><p>hi,</p>
            <p>please,verify your mail </p>
            <p>We'd like to confirm that your account was created successfully. To access you account click the link below to login</p>
            {/* <a href='http://localhost:4200/" +resDatatoken +"'>
            <button style=' padding: 8px 12px;font-family: Poppins; width: 200px; height: 36px;' >Click here to login</button></a> */}
            </div>
        }

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log(err);
                reject(false);
            } else {
                console.log(info);
                resolve(true);
            }
        })
    })

}


//------------------------------------SIGN UP Operation-----------------------------------------------------------

app.post("/signUpData",[]
, (req, res) => {

    let { email, password } = req.body;
    console.log(req.body);
    name = email;
    pass = password;

    obj = {
        'flag': false,
        'message': 'Something went wrong'
    }

    let sqlem = 'select * from user where email = ? '

    con.query(sqlem, [name], (err, result) => {

        if (err) {
            console.error(err.stack);
            res.json(obj);
            return;
        }

        else if (result.length == 0) {

            let token = jwt.sign({ 'email': name + parseInt(Math.random() * 10) }, jwt_key);

            let sql = 'INSERT INTO user (email,password,token) values (?,?,?)';

            bcrypt.hash(pass, 10, (err, hash) => {

                if (err) {
                    console.error("Error:" + err.stack);
                    res.json(obj);
                    return;
                }

                con.query(sql, [name, hash, token], async (err, values) => {

                    if (err) {
                        console.error("Insert" + err.stack);
                        res.json(obj);
                        return;
                    }

                    let htmlLink = '<html><body><br><br><p>please verify your mail <a href="http://localhost:4200/verify?token='
                        + token + '" > click </a> </p> </body> </html>'

                    let mailInfo = await sendmail(htmlLink, name);

                    if (mailInfo) {
                        console.log("sign upsss...")
                        obj = {
                            flag: true,
                            message: 'Please verify your email,The verfication link send to your mail'
                        }
                        res.json( obj );
                        return;
                    }
                    res.json(obj);
                    return;
                })
            })
        }

        else {

            console.log(getValue(result, 0));
            console.log(getValue(result, 1).is_verified);

            if (getValue(result, 0) && getValue(result, 0).is_verified == 0) {
                obj.message = "Please verify your mail"
                res.json(obj);
                return
            }
            obj.message = "Email is already registered.."
            res.json(obj);
        }
    })
});

//-----------------------------------LOGIN Operation---------------------------------------------


app.post("/loginData", (req, res) => {

    console.log(req.body);

    let { email, password } = req.body.userDetails;

    console.log(email, password);

    let sql = "select * from user where email = ? ";
    let obj = {
        'flag': false,
        'message': 'Something went wrong'
    }

    con.query(sql, [email], async(err, result) => {
        console.log(result);

        if (err) {
            console.error("Error" + err.stack);
            res.json( obj )
            return;
        }

        else if (result.length == 0) {
            res.json( obj );
        }

        else {
            console.log('checkkkk', result[0].is_verified);

            if (result[0].is_verified == 1) {

                if (result[0].login_fail_count == 5) {

                    let sqlBlockTimeUp = "UPDATE user SET block = 1, timestamp = unix_timestamp(now()) where id  = ?";
                    await updateData(sqlBlockTimeUp);
                    console.log("blocked");
                }

                if (result[0].block == 1) {

                    let currentTime = parseInt((new Date().getTime() / 1000).toFixed(0));
                    let refreshTime = 60;

                    console.log("CR Time = ", currentTime - result[0].timestamp, "Sec = ", refreshTime)

                    if (currentTime - result[0].timestamp > refreshTime) {
                        sqlBlockCountUp = "UPDATE user SET login_fail_count = 0, block = 0 where id = ?"
                        await updateData(sqlBlockCountUp)
                        console.log("unblock");
                    }
                }

                bcrypt.compare(password, result[0].password, (err, ismatch) => {

                    if (err) {
                        console.error("Error " + err.stack);
                        res.json( obj );
                        return;
                    }

                    else if (ismatch) {

                        console.log(result[0].block);

                        if (result[0].block == 0) {

                            var token_auth = jwt.sign(
                                {
                                    'id': result[0].id,
                                    'email': result[0].email
                                }, jwt_key)

                            obj = {
                                'flag': true,
                                'token': token_auth,
                                'roleId':3
                            };

                            res.json(obj);// login successfully
                            return;
                        }
                        console.log("Too many login fail counts");
                        obj.message = "Too many attempts..."
                        res.json( obj );//please verify your email  // true false
                        return;
                    }

                    else {

                        let sqlUp = "UPDATE user SET login_fail_count = ? where id = ?"

                        con.query(sqlUp, [result[0].login_fail_count + 1, result[0].id], (err, upResult) => {

                            if (err) {
                                console.error("error" + err.stack);
                                res.json( obj );
                                return
                            }

                            console.log(upResult);

                        })
                        res.json( obj );
                        return // password does not match
                    }
                })
            }
            else {
                obj.message = "Please verify your account"
                res.json(obj)
            }

        }

        function updateData(sqlBlockUp) {
            return new Promise((resolve, reject) => {
                con.query(sqlBlockUp, [result[0].id], (err, blockUpResult) => {

                    if (err) {
                        console.log(err.stack);
                        reject(err)
                        // res.json( obj );
                        // return;
                    }
                    resolve(blockUpResult)
                    // console.log(blockUpResult);
                })
            })
            
        }
    })
})



// --------------------Verify TOKEN ---------------------------------------------------------- 

app.post("/verify", (req, res) => {

    console.log('token verification.........');
   
    let obj = {
        "flag":false,
        "message":"something went wrong"
    };
    let sql = 'select id from user where is_verified = 0 && token = ?';

    con.query(sql, [req.body.token], (err, data) => {

        console.log(data);

        if (err) {
            console.error("Error:" + err.stack);
            res.json(obj);
            return;
        }

        else if (data.length == 0) {
            console.log("...........id not matched");
            obj.message = "token is not matched"
            res.json(obj);
            return;
        }

        else {

            console.log("Updating token.......................");
            let sqlup = 'UPDATE user SET is_verified = 1,token = null where id = ?'

            con.query(sqlup, [data[0].id], (err, result) => {
                console.log(result);

                if (err) {
                    console.error("error" + err.stack);
                    res.json(obj);
                    return;
                }
                
                obj.flag = true;
                obj.message = "Account Activated Successfully";
                res.json(obj);
                return;
            })
            console.log("token verified finished")
        }
    })

})


//---------------------------- FORM_INSERT Operation-----------------------------------

app.post("/insert", (req, res) => {

    data = req.body;

    let sql = 'INSERT INTO user_message(name,email,message) values (?,?,?)';

    con.query(sql, [data.name, data.email, data.message], (err, result) => {

        if (err) {
            console.error(err.stack);
            res.send("something went wrong")
            return;
        }
        res.send("submited successfully.....");
    })

})

//------------------------LIST VIEW DETAILS -------------------------------------------------

app.get("/view", (req, res) => {

    sql = 'select * from user_message where is_deleted != 1';

    con.query(sql, (err, data) => {


        if (err) {
            console.log(err.stack);
            res.send("something went wrong");
            return
        }

        res.json({ data });
    });
});


//------------------------------get EDIT details -----------------------------------------------------------------

app.get("/getbyid", (req, res) => {
    //console.log(req.query);

    let sql = 'select * from user_message where id =' + req.query.id;

    con.query(sql, (err, data) => {

        if (err) {
            console.log(err);
            res.send("something went wrong");
            return;
        }

        res.json({ data });
        //console.log(data);
    });
});

// -------------------------------update operation UPDATE ----------------------------------------------------

app.put("/updatebyid", (req, res) => {

    console.log(req.query);
    let data = req.body;

    let sql = "UPDATE user_message SET name = ?, email = ?, message = ? where id = ?";

    con.query(sql, [data.name, data.email, data.message, data.id], (err, result) => {

        if (err)
            console.log(err);

        res.json({ result });
    }
    );
});


// -----------------------------DELETE Operation ------------------------------------------

app.delete("/deleteUserMsg", (req, res) => {
    data = req.body;
    let sql = "UPDATE user_message SET is_deleted = 1 where id = ?";

    con.query(sql, [data.id], (err, result) => {
        console.log(result);

        if (err) {
            res.send(false);
        }

        else if (result.length == 0)
            res.send(false);

        else
            res.send(true);
    })
})


//-----------------------------Validate Email ------------------------------------------------------

app.post("/validateEmail",[
    check('email').not().isEmpty().withMessage('Email is empty')
    .isEmail().withMessage('Invalid Format')
], (req, res) => {
    console.log(req.body);

    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(422).json({errors:errors.array()})

    let obj = {
        "flag" : false,
        "message" : "something went wrong"
    }
    let sql = "select * from user where email = ?";

    con.query(sql, [req.body.email], (err, val) => {


        if (err) {
            console.error(err.stack);
            res.json(obj);
            return
        }

        else if (val.length == 0) {
            console.log("Email not matched.......")
            obj.flag = true;
            obj.message = "The forget Password link send to your mail";
            res.json(obj);
            return;
        }

        else {

            let generate_token = jwt.sign({ 'e': val[0].email }, jwt_key);
            let sqlin = "INSERT INTO user_forget_pass (email,token) values (?,?)";

            con.query(sqlin, [val[0].email, generate_token], async (err, result) => {

                if (err) {
                    console.error(err.stack);
                    res.json(obj);
                    return;
                }

                let htmlLink = '<html><body><br><br><p>please forget your  password using this link <a href="http://localhost:4200/new-password?token='
                    + generate_token + '" > click </a> </p> </body> </html>'
                // console.log(result);
                let mailInfo = await sendmail(htmlLink, val[0].email);

                if (mailInfo) {
                    obj.flag = true;
                    obj.message = "The forget Password link send to your mail";
                    res.json(obj);
                    return;
                }
                res.json(obj);
            })

        }
    })
})



//--------------------------------------VALIDATE TOKEN FORGET PASS-------------------------------------------------

app.post("/valTokenPass",[
    check('token').isEmpty().withMessage('Token is null'),
    check('password').isStrongPassword().withMessage("Weak password") 
], (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors:errors.array()});
    }

    let obj = req.body;

    let decode_token = jwt.verify(obj.token, jwt_key);
    console.log(decode_token);

    let return_obj = {
        'flag': false,
        'message': 'something went wrong'
    };

    let sql = "select email from user_forget_pass where id =" +
        " (select max(id) from user_forget_pass where email = ?) && token = ?";

    con.query(sql, [decode_token.e, obj.token], (err, result) => {

        console.log(result);

        if (err) {
            console.error(err.stack);
            res.json(return_obj);
            return;
        }

        else if (result.length == 0) {
            console.log("token not matched.....");
            return_obj.message = "token not matched";
            res.json(return_obj);
            return;
        }

        else {

            let sqlUp = 'UPDATE user SET password = ? WHERE email = ?';

            bcrypt.hash(obj.password, 10, (err, hashedpass) => {

                if (err) {
                    console.error(err.stack);
                    res.json(return_obj);
                    return;
                }

                con.query(sqlUp, [hashedpass, result[0].email], (err, info) => {

                    if (err) {
                        console.error(err.stack);
                        res.json(return_obj);
                        return;
                    }

                    return_obj = {
                        'flag': true,
                        'message': "Password changed successfully"
                    };
                    res.json(return_obj);
                })
            })
        }
    })
})



app.get("/logout", (req, res) => {

    req.auth = null;
    console.log(res);
    res['_header']['access-control-allow-origin'] = null
})

function getValue(arr, index) {
    
    if (arr[index] === undefined || arr[index] == null)
        return "NA";
    return arr[index];
}

app.post("/addEmployee",[
    check('name').not().isEmpty().withMessage("name is empty"),
    isAlpha().withMessage("Name Shoul be alphabet")
    .isLength(3).withMessage("Minimun 3 characters needed"),
    check('email').not().isEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),
    check('contact').isNumeric().withMessage("phone number must be numberic ")
    .isEmpty().withMessage("contact number is required"),
    check('location').isEmpty().withMessage("location is not empty")
], (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty())
        return res.status(422).json({errors:errors.array()});

    console.log(req.body);

    let { name, email, contact, location } = req.body;
    let obj = {
        'flag': false,
        'message': 'Something went wrong'
    };
    let sql = "Select email from  employee where email = ?"

    con.query(sql, [email], (err, result) => {

        console.log(result);

        if (err) {
            console.log(err.stack);
            res.json(obj);
            return;
        }

        if (result[0]?.email) {

            console.log("email is already registered");

            obj.message = "email is already registered..";
            res.json(obj);
            return;
        }
        let token = jwt.sign({ "email": email }, jwt_key);
        console.log(token);

        let sqlInsEmp = "INSERT INTO employee (name,email,contactNo,location,token) VALUES (?,?,?,?,?)";

        con.query(sqlInsEmp, [name, email, contact, location, token], async (err, insertResult) => {

            if (err) {
                console.log(err.stack);
                res.json(obj);
                return;
            }

            let htmlLink = '<html><body><br><br> <p> please set your  password using this link <a href="http://localhost:4200/emp-pass?token='
                + token + '" > click </a> </p> </body> </html>'

            let mailResponse = await sendmail(htmlLink, email);

            if (mailResponse) {
                console.log("inserted successfully");
                obj = {
                    "flag": true,
                    "message": "inserted successfully"
                }
                res.json(obj);
                return;
            }
            res.json(obj);

            console.log(insertResult);
        })
    })
})

app.post("/valEmpToken", [
    check('token').not().isEmpty().withMessage("Token is null"),
    check('password').not().isEmpty().withMessage("Password is empty")
    .isStrongPassword().withMessage("Password is weak..")
], (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({errors:errors.array()})
    }

    let { token, password } = req.body;
    console.log(req.body);

    let obj = {
        "flag": false,
        "message": "something went wrong"
    };


    if (token == null) {
        res.json(obj);
    }


    let sql = "SELECT id from employee where token = ?";

    con.query(sql, [token], async (err, result) => {

        if (err) {
            console.log(err.stack);
            res.json(obj);
            return;
        }

        if (result.length == 1) {

            bcrypt.hash(password, 10, (err, hashedpass) => {
                if (err) {
                    console.log(err.stack);
                    obj.message = "Token expired or mismatched"
                    res.json(obj);
                    return;
                }

                let sqlVal = "UPDATE employee SET password = ? ,token = null where id = ?";

                con.query(sqlVal, [hashedpass, result[0].id], (err, upResult) => {

                    if (err) {
                        console.log(err.stack);
                        res.json(obj);
                        return;
                    }

                    console.log(upResult);

                    obj = {
                        "flag": true,
                        "message": "Password set Successfully"
                    };

                    res.json(obj);
                    return;

                })
            })
        }

        else {
            console.log("token is not mached");
            res.json(obj);
        }
    })
})

app.post("/empLogin",[
    check('email').not().isEmpty().withMessage("email is empty")
    .isEmail().withMessage("invalid email"),
    check('password').not().isEmpty().withMessage("password is empty")
    .isStrongPassword().withMessage("Password is weak")
], (req, res) => {

    console.log('entering to login...');

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({errors : errors.array()})
    }

    let { email, password } = req.body;
    let obj = {
        "flag": false,
        "message": "Something went wrong"
    };
    let sql = "select email,password from employee where email = ?";

    con.query(sql, [email], (err, result) => {

        if (err) {
            console.log(err.stack);
            res.json(obj);
            return;
        }

        if (result.length == 1) {
            
            bcrypt.compare(password, result[0]?.password, (err, isMatch) => {
                if (err) {
                    console.log(err.stack);
                    res.json(obj);
                    return;
                }
                else if (isMatch) {

                    token = jwt.sign({ "email": email }, jwt_key);
                   
                    obj.token = token;
                    obj.roleId = 2; 
                    obj.flag = true;
                    obj.message = "logged in successfully";

                    res.json(obj);
                    return;
                }

                else {
                    console.log("password is not matched");
                    res.json(obj);
                }
            })
        }
        else {
            console.log("email is not matched..");
            res.json(obj);
        }
    })
})