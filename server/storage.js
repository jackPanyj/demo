const Kraken = require("kraken")
const fs = require('fs')

const apiKey = '0cde5a31c855d719f25aabde33987c48'
const apiSecret = 'e0db9a940438b63701b0a08b6109c0edaae7da53'

const kraken = new Kraken({
    "api_key": apiKey,
    "api_secret": apiSecret
})


module.exports = {
    uploadFileToCloud(filePath) {
        return new Promise((resolve, reject) => {
            const opts = {
                file: fs.createReadStream(filePath),
                wait: true
            }
            kraken.upload(opts, function (err, data) {
                if (err) {
                    console.log('Failed. Error message: %s', err);
                    reject(err)
                } else {
                    console.log('Success. Optimized image URL: %s', data.kraked_url);
                    resolve(data)
                }
            });
        })
    }
}