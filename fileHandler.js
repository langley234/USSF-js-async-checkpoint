const fs = require('fs');

class FileHandler
{
    constructor()
    {
        this.file = '';
        this.loadComplete = false;
        this.saveComplete = false;
    }

    readFileSync(filename, presentImmediate = false)
    {
        try
        {
            const data = fs.readFileSync(filename, 'utf8');
            return data;
        } catch(err)
        {
            console.log(err);
        }
    }
} // FileHandler

module.exports = FileHandler;