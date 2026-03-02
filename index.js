const {animesearch, animeinfo, animedl } = require('anime-heaven');

async function searchAnime(query) { 
    const results = await animesearch(query);
    console.log(results);
}

searchAnime("Guilty Gear");