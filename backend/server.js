const express = require('express');
const app = express();
const port = 3000;
var server = require('http').createServer(app);

app.use(
    express.urlencoded({
        extended:true
    })
);

app.use(express.static('../public'));

app.get('/scoring', function (req, res){
    res.sendFile('D:/3 курс/web/credit_scoring/public/index.html');
});

app.post('/scoring', (req, res)=>{
    console.log(req.body);
    let scoring = 0.0
    if (req.body.gender === 'female'){
        scoring = scoring + 0.4;
    }

    var now = new Date();
    var diffdates = Math.floor((now - Date.parse(req.body.birthDate)) / (1000 * 60 * 60 * 24 * 365))

    if (diffdates > 20){
        if (diffdates < 23){
            scoring = scoring + (diffdates - 20) * 0.1
        }else{
            scoring = scoring + 0.3
        }
    }
    if (Number(req.body.periodLife) < 10){
        scoring = scoring + Number(req.body.periodLife) * 0.042
    }else {
        scoring = scoring + 0.42
    }
    if (req.body.bankAccount === 'on'){
        scoring = scoring + 0.45
    }
    if (req.body.realEstate === 'on'){
        scoring = scoring + 0.3
    }
    if (req.body.insurancePolicy === 'on'){
        scoring = scoring + 0.19
    }
    if (req.body.sphere === 'public'){
        scoring = scoring + 0.21
    }
    if ((req.body.profession === 'manager') || (req.body.profession === 'developer') || (req.body.profession === 'teacher')){
        scoring = scoring + 0.55
    }else{
        if (!((req.body.profession === 'policeman') || (req.body.profession === 'pilot') || (req.body.profession === 'judge'))){
            scoring = scoring + 0.16
        }
    }
    scoring = scoring + Number(req.body.periodWork) * 0.059

    if (scoring > 1.25){
        res.send('Поздравляем, Ваш скоринг равен ' + scoring + '. Вам может быть одобрен кредит')
    }else {
        res.send('К сожалению Ваш скоринг равен ' + scoring + '. Вы считаетесь неплатежеспособным')
    }
});

server.listen(port, function (){
    console.log(`listening on ${port}`)
});