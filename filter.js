const http = require('http');

const motoGPData = [
    {
        circuit: 'Losail',
        location: 'Qatar',
        winner: {
            firstName: 'Andrea',
            lastName: 'Davizioso',
            country: 'Italy'
        }
    },
    {
        circuit: 'AutoDromo',
        location: 'Argetine',
        winner: {
            firstName: 'Cal',
            lastName: 'Cruthlow',
            country: 'UK'
        }
    },
    {   
        circuit: 'De Jerez',
        location: 'Spain',
        winner: {
            firstName: 'Valentino',
            lastName: 'Rossi',
            country: 'Italy'
        }
    },
    {
        circuit: 'Mugello',
        location: 'Dovizioso',
        winner: {
            firstName: 'Andrea',
            lastName: 'Davizioso',
            country: 'Italy'
        }
    },
];

const server = http.createServer((req, res) => {
    const url = req.url;
    
    if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(motoGPData));
    } else if (url === '/country') {
        const countryData = groupByCountry(motoGPData);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(countryData));
    } else if (url === '/name') {
        const nameData = groupByName(motoGPData);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(nameData));
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad Request');
    }
});

function groupByCountry(data) {
    const countryMap = {};
    for (const race of data) {
        const country = race.winner.country;
        if (!countryMap[country]) {
            countryMap[country] = [];
        }
        countryMap[country].push(race);
    }
    return countryMap;
}

function groupByName(data) {
    const nameMap = {};
    for (const race of data) {
        const fullName = `${race.winner.firstName} ${race.winner.lastName}`;
        if (!nameMap[fullName]) {
            nameMap[fullName] = [];
        }
        nameMap[fullName].push(race);
    }
    return nameMap;
}

const port = 8000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
