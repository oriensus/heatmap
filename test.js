const con = console.log;
const sequelize = require('sequelize');
const axios = require('axios');
const fs = require('fs');
const db = require('./server/data');
const HD = require('./server/data/historicalData');
const Sec = require('./server/data/securities');


function extractQuote(symbol, obj){
    var counter = 1;
    var keys = Object.keys(obj);
    keys.forEach(function(key){
        var tempObj = {};
        tempObj.symbol = symbol;
        tempObj.open = obj[key]['1. open'];
        tempObj.high = obj[key]['2. high'];
        tempObj.low = obj[key]['3. low'];
        tempObj.close = obj[key]['4. close'];
        tempObj.volume = obj[key]['5. volume'];
        tempObj.counter = counter++;
        HD.create(tempObj).catch(err => con('HD create error --- ', err));
    })
}

var getMarketData = function(symbol){
    //setTimeout(function(){con('blocking.......')}, 3000);
    //var url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + symbol + "&interval=5min&apikey=6SQS9DKXOBSEYD7G";
    var url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SPY&apikey=6SQS9DKXOBSEYD7G";
    axios.get(url)
    .then((response) => {
        //extractQuote(symbol, response.data['Time Series (5min)']);
        extractQuote(symbol, response.data['Time Series (Daily)']);
    })
    .catch(err => con('getMarketData error --- ',err) );
}

var populateSecurities = function(){
    new Promise( (resolve, reject) => {
        fs.readFile('/Users/poby/foundation/stackathon/server/data/data.txt', 'utf8', (err, data) => {
            if(err) throw err
            resolve(data)
        })
    })
    .then(data => {
        const securities = data.split('\n');
        securities.shift();
        securities.forEach(security => {
            var symbol = security.substring(security.indexOf('(')+1, security.indexOf(')'));
            var prevClose = security.split('|')[2]
            Sec.create({symbol, type: 1, prevClose});
        })
    })
    .catch(err => con('dddddddddddd', err));
}

function populatePrevClose(){
    new Promise( (resolve, reject) => {
        fs.readFile('/Users/poby/foundation/stackathon/server/data/data.txt', 'utf8', (err, data) => {
            if(err) throw err
            resolve(data)
        })
    })
    .then(data => {
        var lines = data.split('\n');
        lines.shift();
        lines.forEach((line, idx) => {         
            Sec.findById(idx+1).then(sec => {
                var prevClose = Number( line.split('|')[2]);
                sec.update({prevClose})
            })
        })
    })
    .catch(err => con('zzzzzzzzz', err));
}

function elSleepo(wait){
    setTimeout(function(){con('blocking.......')}, wait);
}

db.sync({force: false})
.then(() => {
    //populateSecurities(); //populates the securities table

    ////// populates the historicalData table //////
    // Sec.findAll( { limit: 10 } )
    // .then(securities => {
    //     securities.forEach(security => {
    //         con('Processing: ', security.dataValues.symbol);
    //         getMarketData(security.dataValues.symbol);
    //         con('');
    //     })
    // })
    // .catch(err => con('zzzzzzzaaaaazzz ', err));

    getMarketData('SPY');

    // db.query("SELECT DISTINCT symbol FROM securities", { type: sequelize.QueryTypes.SELECT})
    // .then(secs => {
    //         con(secs);
    // }).catch(err => con('vvvvvvvvvvvvv', err))

    //populatePrevClose();

    // Sec.findAll({ attributes: ['symbol', 'prevClose'] })
    // .then(data => {
    //     data.forEach(d => {
    //         con('sssss', d.dataValues.symbol)
    //     })
    // })
})
.catch(err => con('db connect error', err) )
