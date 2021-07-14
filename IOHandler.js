const fetch = require('node-fetch');
const FileHandler = require('./fileHandler');

class IOHandler
{
    constructor()
    {
        this.m_fileHandler = new FileHandler();
        this.m_currWorkingFile = '';
        this.m_activePromises = 0;
        this.m_activeQueries = [];
        this.m_resultData = '';
        this.m_promise;
    }

    _finishQueryProcessing()
    {
        for (let i = 0; i < this.m_activeQueries.length; i++)
        {
            this.m_resultData += `${this.m_activeQueries[i].name}: `;

            for (let j = 0; j < this.m_activeQueries[i].types.length; j++ )
            {
                this.m_resultData += `${this.m_activeQueries[i].types[j].type.name}`;

                if (j < parseInt(this.m_activeQueries[i].types.length - 1))
                    this.m_resultData += ', '
            }
            if (i < parseInt(this.m_activeQueries.length - 1))
                this.m_resultData += '\n';
        }

        console.log(this.m_resultData);
    }

    query(name)
    {
        if (name === '' || name === undefined)
            return -1;

        
        this._queryExternalDatabase(
            `https://pokeapi.co/api/v2/pokemon/${name}`, name);
    }

    _queryExternalDatabase(url, name)
    {
        this.m_activePromises++;
        fetch(url)
        .then(function (response) 
        {
            return response.json();
        }.bind(this))
        .then(function (json) 
        {
            this.m_activePromises--;
            this.m_activeQueries.push(json);
            if (this.m_activePromises === 0)
                this._finishQueryProcessing();
        }.bind(this))
        .catch(function (error) 
        {
            this.m_activePromises--;
            console.log('There is no Pokemon with the name : ', name);
            console.error('Error Report : ', error);
        }.bind(this))
    }

    loadFileSync(filename, presentImmediate = false) {
        return this.m_fileHandler.loadFileSync(filename, presentImmediate);
    }

    _processFile(file)
    {
        this.m_currWorkingFile = file.split(/[\n\r]+/);
    }

    processFile(file)
    {
        this._processFile(file);

        for (let i = 0; i < this.m_currWorkingFile.length; i++)
        {
           this._queryExternalDatabase(
            `https://pokeapi.co/api/v2/pokemon/${this.m_currWorkingFile[i]}`);
        }
       console.log(this.m_currWorkingFile[0]);
    }
}

module.exports = IOHandler;