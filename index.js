const IOHandler = require('./IOHandler');

let io = new IOHandler();
let arr = process.argv.slice(2);

function query(name) 
{
    io.query(name);
}

for (let i = 0; i < arr.length ; i++)
{
    query(arr[i]);
}