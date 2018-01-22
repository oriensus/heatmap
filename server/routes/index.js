const router = require('express').Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const historicalData = require('../data/historicalData');
const securities = require('../data/securities');

const con = console.log;
var counter = 0;

// API KEY: 6SQS9DKXOBSEYD7G
// https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=6SQS9DKXOBSEYD7G

router.get('/textdata', (req, res, next) => {
    var getData = new Promise((resolve, reject) => {
        fs.readFile('/Users/poby/foundation/stackathon/server/data/data.txt', 'utf8', (err, data) => {
            if(err) reject(err)
            else resolve(data)
        });
    });
    getData.then(data => {
        var arr = data.split("\n");
        arr.shift();
        var securities = arr.map((line) => {
            var temp = line.split('|');
            //return temp[0] + '|' + temp[4];
            return {symbol: temp[0], pctChange: temp[4]};
        });
        res.send({securities}) 
    } );
});

router.get('/heatmap', (req, res, next) => {


    //////////should use promise.all

    securities.findAll({ attributes: ['symbol', 'prevClose'] })
    .then(secs => {
        let securities = secs.map(sec => {
            historicalData.find({where: {symbol: sec.dataValues.symbol, counter: 1} })
            .then(result => {
            });
            var obj = {};
            obj.symbol = sec.dataValues.symbol;
            obj.prevClose = sec.dataValues.prevClose;
            return obj;
        })
        res.send({securities});
    })
    .catch(err => con('heatmap errorrrrrrrrrrrrr', err))


    // var firstOpenPriceArr = [];
    // Promise.all([
    //     securities.findAll({ attributes: ['symbol', 'prevClose'] }),
    //     securities.findAll({ attributes: ['symbol', 'prevClose'] })
    //     .then(secs => {
    //              secs.map( sec => {
    //                 historicalData.find({where: {symbol: sec.dataValues.symbol, counter: 1} })
    //                 .then( result => {
    //                     //con('result ---- ', result.dataValues.symbol, result.dataValues.open)
    //                     firstOpenPriceArr.push(result);
    //                     con('************************** ', firstOpenPriceArr.length);
    //                 })
    //             })
    //             return firstOpenPriceArr;
    //         })
    // ]).then(([allSecurities, firstOpenPrice]) => {
    //     //con(allSecurities);
    //     con('ppppppppppppppppppppppppp')
    //     //con(firstOpenPrice);
    // })
    // .catch(err => con('heatmap errorrrrrrrrrrrrr', con(err)))

});

router.get('/getquote/:symbol', (req, res, next) => {
    historicalData.find( { where: {symbol: req.params.symbol, counter: (counter >= 100 ? counter = 0 : counter++) } })
    .then(result => {
        if( result )
            res.send({quote: result.dataValues.open});
        else
            res.send({quote: '999'})
    } )
    .catch()
})

router.get('/getlastpx', (req, res, next) => {
    if (counter >= 100 ) counter = 0;
    historicalData.findAll( {  attributes: ['symbol', 'open'], where: {counter: counter++ } })
    .then(result => {
        res.send({securities: result});
    } )
    .catch()
})

router.get('/getchart/:symbol', (req, res, next) => {
    historicalData.findAll( {where: {symbol: req.params.symbol.toUpperCase()}, order: [ ['id', 'DESC'] ] } )
    .then(data => res.send(data) )
    .catch(err => con('getchart errorrrrrrrr', err) );
})

module.exports = router;
