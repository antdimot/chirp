module.exports =
{
    server: {
        api: '/api/v1',
        limit: 20,
        imagepath: 'data/images'
    },
    image: 'default.png',
    mongodb: {
        connectionString: process.env.MDB || 'mongodb://localhost/chirp?autoReconnect=true'
    }
};
