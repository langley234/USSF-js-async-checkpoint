const IOHandler = require('./IOHandler');

let io = new IOHandler();
let arr = process.argv.slice(2);

if (!arr || arr === undefined || arr.length === 0)
    console.log(`Must provide a value for 'name'`);

for (let i = 0; i < arr.length ; i++)
{
    io.query(arr[i]);
}