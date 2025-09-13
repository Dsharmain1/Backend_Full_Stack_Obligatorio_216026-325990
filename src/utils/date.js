
const getISODate = () => {
    const date = new Date().toISOString(); 
    return date.split("T")[0]; 
}

const getLoggerDate = () => {
    const now = new Date().toISOString();
    const splittedDate = now.split("T"); 
    const date = splittedDate[0] 
    const time = splittedDate[1].split(".")[0] 
    return `${date} ${time}`; 
}

module.exports = { getISODate, getLoggerDate }