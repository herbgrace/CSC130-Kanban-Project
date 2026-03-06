const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

function getClient() {
    if (!uri) {
        throw new Error('Missing MONGODB_URI. Add it to back-end/.env');
    }
    return new MongoClient(uri);
}

let dal = {
    addUser : async function(user) {
        const client = getClient();

        try {
            await client.connect();
            const database = client.db('AnimeWebScrape');
            const users = database.collection('Users');
            const result = await users.insertOne(user);
            return result;
        } finally {
            await client.close();
        }
    },

    getUser : async function(user) {
        const client = getClient();

        try {
            await client.connect();
            const database = client.db('AnimeWebScrape');
            const users = database.collection('Users');
            const query = { username: user.username, password: user.password };
            const foundUser = await users.findOne(query);
            return foundUser;
        } finally {
            await client.close();
        }
    },


    getAllShows : async function(userId) {
        // Return all user shows from the database
        const client = getClient();

        try {
            await client.connect();

            const database = client.db('AnimeWebScrape');
            const shows = database.collection('Shows');
            const query = { userId: userId };
            const userShows = await shows.find(query).toArray();
            return userShows;
        } finally {
            await client.close();
        }
    },

    getCountShows : async function(count) {
        const client = getClient();

        try {
            await client.connect();
            const database = client.db('AnimeWebScrape');
            const shows = database.collection('Shows');
            const result = await shows.insertOne(show);
            return result;
        } finally {
            await client.close();
        }
    },

    addShow : async function(show) {
        const client = getClient();
        try {
            await client.connect();
            const database = client.db('AnimeWebScrape');
            const shows = database.collection('Shows');
            const result = await shows.insertOne(show);
            return result;
        } finally {
            await client.close();
        }
    },

    deleteShow : async function(showId) {
        const client = getClient();

        try {
            await client.connect();
            const database = client.db('AnimeWebScrape');
            const shows = database.collection('Shows');
            const query = { _id: showId };
            const result = await shows.deleteOne(query);
            return result;
        } finally {
            await client.close();
        }
    },

    updateShow : async function(showId, updatedShow) {
        const client = getClient();

        try {
            await client.connect();
            const database = client.db('AnimeWebScrape');
            const shows = database.collection('Shows');
            const query = { _id: showId };
            const update = { $set: updatedShow };
            const result = await shows.updateOne(query, update);
            return result;
        } finally {
            await client.close();
        }
    }


};

module.exports.dal = dal;