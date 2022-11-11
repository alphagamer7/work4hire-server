module.exports = () => {
    const currentDate = new Date();
    let filenameStr = '';
    //get month
    const month = currentDate.getMonth() + 1;
    //get day
    const day = currentDate.getDate();
    //get year
    const year = currentDate.getFullYear();
    //get hour
    const hour = currentDate.getHours();
    //get minute
    const minutes = currentDate.getMinutes();
    //get random number 0 - 9999
    const milliseconds = currentDate.getMilliseconds();

    filenameStr = String(month).padStart(2,'0') + 
        String(day).padStart(2,'0') +
        String(year) + "_" +
        String(hour).padStart(2, '0') +
        String(minutes).padStart(2,'0') + "_" +
        String(milliseconds).padStart(5,'0');

    return filenameStr;
};