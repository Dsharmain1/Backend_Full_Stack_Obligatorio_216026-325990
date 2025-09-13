const fs = require('fs');
const { getISODate, getLoggerDate } = require('./date');


const logRequest = req => {
    const fileName = `./logs/${getISODate()}.log`
    const content = `[${getLoggerDate()}] ${req.method} ${req.url}\n`
    fs.appendFile(fileName, content, error => {
        if(error) {
            console.log("Error writing log", error);
        }
    })
}

module.exports = { logRequest };