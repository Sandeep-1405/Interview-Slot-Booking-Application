const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const twilio = require("twilio");
const jwt = require("jsonwebtoken")

const app = express();

app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : ""
})

const connecttwilio = {
    accountSid: "AC3e2a5b4225bf67a601d125197b4564ee",
    authToken: "82ddbcccfb636b70e45b97bf734e0630",
    twilioPhoneNumber: "+1 630 517 5751",
};


const twilioclient = twilio(connecttwilio.accountSid,connecttwilio.authToken)

function generateotp(){
    return Math.floor(100000 + Math.random() * 900000)
}

function saveOTPToDatabase(email, otp) {
    db.query('INSERT INTO users (Email, otp) VALUES (?, ?)', [email, otp], (error) => {
      if (error) {
        console.error('Error saving OTP to database:', error);
      }
    });
  }

  function sendOTPviaTwilio(phoneNumber, otp) {
    twilioclient.messages.create({
        body: `Your OTP is: ${otp}`,
        from: connecttwilio.twilioPhoneNumber,
        to: phoneNumber,
    })
    .then(message => console.log('OTP sent via Twilio:', message.sid))
    .catch(error => console.error('Error sending OTP via Twilio:', error));
}

//OTP

app.post('/otp',async(req,res)=>{

    const {email,phonenumber} = req.body

    const checkSql = "SELECT PhoneNumber FROM users WHERE PhoneNumber = ?";
    db.query(checkSql, [phonenumber], (error, data) => {

        if (error) {
            return res.json(error);
        } else if (data.length > 0) {
            return res.json("PhoneNumber Already Exists");
        }else{
            const otp = generateotp()
            saveOTPToDatabase(email,otp)
            sendOTPviaTwilio(phonenumber,otp)
            return res.json({ otp: otp });
        }
    })
}); 


//signup Details

app.post('/create', async(req, res) => {
    const { name, email, password, phonenumber, otp } = req.body;

    const fetchOtpSql = "SELECT otp FROM users WHERE Email = ?";
    
    db.query(fetchOtpSql, [email], (error, data) => {
        if (error) {
            return res.json(error);
        }
        const dbOtp = data[0].otp;

        //console.log('Entered OTP:', otp);
        //console.log('Stored OTP:', dbOtp);

        if (dbOtp == otp) {
            
            const updateSql = "UPDATE users SET `Name` = ?, `PhoneNumber` = ?, `Password` = ? WHERE Email = ?";
            db.query(updateSql, [name, phonenumber, password, email], (error, data) => {
                if (error) {
                    return res.json(error);
                }
                return res.json(data);
            });
        } else {
            return res.json("Invalid OTP");
        }
    });
});

// Login API

app.post('/login',async(req,res)=>{
    const {email,password} = req.body
    const sql = "Select Email , Password from users where Email = ?"
    db.query(sql,[email],(error,data)=>{
        if(error){
            return res.json(error)
        }else{
            const jwttoken = jwt.sign(req.body.email,"MY_Secreate_key")
            //console.log({jwttoken})
            return res.json([...data,data.twt = {jwttoken}])   
        }
    })
    
})


//forgot password API

app.put('/forgot',async(req,res)=>{
    const emailcheck = "SELECT Email from users where Email = ?"
    db.query(emailcheck,[req.body.email],(error,data)=>{
        if (error) return res.json(error)
        else if(data.length === 0){
            return res.json("Email not Exist")
        }else{
            const sql = "UPDATE users SET Password = ? where Email = ?";
            db.query(sql,[req.body.password,req.body.email],(error,data)=>{
                if (error) return res.json(error)
                return res.json(data)
            })
        }
    })

})

//Get Data

app.get('/getdata',async(req,res)=>{
    const sql = "Select * from users"
    db.query(sql,(error,data)=>{
        if (error){
            return res.json(error)
        }
        return res.json(data)
    })
})

app.listen(8081,()=>{
    console.log("Listening")
})


// Interview Shedule

app.put('/interview',async(req,res)=>{
    const {email,date,time,topic} = req.body

    const getsql = "select Email from users where Email = ?"
    db.query(getsql,[email],(error,data)=>{
        if (error){
            return res.json(error)
        }else if(data.length ===0){
            return res.json("Please Provide Registered Email (Which Given While Registering)")
        }else{
            const sql = "update users SET `Date` = ?, `Time` = ?, `Topic` = ? where Email = ?"

            db.query(sql,[date,time,topic,email],(error,data)=>{
                if (error){
                    return res.json(error)
                }
                return res.json(data)
            })
        }
    })
    
})

//Interview Cancel

app.put('/cancel',(req,res)=>{
    const {email,date,time,topic} = req.body
    const date1 = '0000-00-00';
    const time2 = '00:00:00';
    const topic3 = 'None'
    
    const cancelquery = "update users SET `Date` = ?, `Time` = ?, `Topic` = ? where Email = ?"

     db.query(cancelquery,[date1,time2,topic3,email],(error,data)=>{
        if (error){
            return res.json(error)
        }
        return res.json(data)
    })
})

//update status

app.put('/status',async(req,res)=>{
    const {email,option} = req.body
    const qry = 'update users set `Status` = ? where Email = ?'
    await db.query(qry,[option,email],(error,data)=>{
        if (error){
            return res.json(error)
        }
        return res.json(data)
    })
})