const fetch = require('node-fetch');
const MAX_POKEMON_COUNT = 898;
let masterJSON = '';
let promisesFulfilled = 0;
let pokemons = [];
let processedPokemons = [];

console.log('Loading Pokemon Data...');

function processData()
{
    console.log('Processing Pokemon Data...');
    console.log('Total Pokemon in list : ', pokemons.length);

    pokemons.sort(function(a, b)
    {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    for (let i = 0; i < pokemons.length; i++)
    {
        let obj = { name: pokemons[i].name, types: pokemons[i].types };

        processedPokemons.push(obj);
    }

    pokemons = [];
    console.log('Processing Complete...');
    startMain();
}

for (let i = 0; i < MAX_POKEMON_COUNT; i++)
{
    fetch(`https://pokeapi.co/api/v2/pokemon/${i+1}`)
    .then(function(response){
        //promises++;
        return response.json();
    })
    .then(function(json)
    {
        pokemons.push(json);
        masterJSON += json;
        promisesFulfilled++;
        if (promisesFulfilled === MAX_POKEMON_COUNT)
            processData();
    })
    .catch(function(error){
        console.log('Unable to load Pokemon database');
        console.error('Error Report : ',error);
    })
}

function startMain()
{
    console.log('Ready to process commands');
    console.log(process.argv);
}

