import 'dotenv/config';
import mysql from 'mysql2/promise';

async function testConnection() {
    const originalUrl = process.env.DATABASE_URL;
    if (!originalUrl) {
        console.error('DATABASE_URL is not set');
        return;
    }

    // Try connecting with parsed URL and explicit SSL options
    console.log('Testing connection with updated SSL config...');

    // Remove the ssl query param from the URL string as it causes issues with mysql2
    const baseUrl = originalUrl.split('?')[0];

    try {
        const connection = await mysql.createConnection({
            uri: baseUrl,
            ssl: {
                rejectUnauthorized: true
            }
        });
        console.log('Successfully connected to database with explicit SSL object!');
        await connection.end();
    } catch (error) {
        // console.error('Connection failed with explicit SSL object:', error);
        console.log('Failed with object config, trying simpler URL param ssl=true...');

        try {
            const simpleSslUrl = `${baseUrl}?ssl={"rejectUnauthorized":true}`;
            // Wait, the original error was "Unknown SSL profile". 
            // Let's try just ?ssl=true if the server supports it, or maybe "Amazon RDS" profile which is common for AWS hosted DBs if available, but TiDB implies standard SSL usually.
            // Actually, let's try a connection string that is known to work with mysql2:
            // mysql://user:pass@host:port/db?ssl={"rejectUnauthorized":true} 
            // failed before.
            // Let's try parsing the JSON manually and passing it? No, createConnection(string) doesn't support that well for complex objects.

            // Let's try constructing the connection option object manually from the URL parts
            const urlObj = new URL(originalUrl);
            const config = {
                host: urlObj.hostname,
                port: parseInt(urlObj.port),
                user: urlObj.username,
                password: urlObj.password,
                database: urlObj.pathname.slice(1),
                ssl: { rejectUnauthorized: true }
            };

            const conn2 = await mysql.createConnection(config);
            console.log('Successfully connected using config object!');
            await conn2.end();
        } catch (err2) {
            console.error('All connection attempts failed. Last error:', err2);
        }
    }
}

testConnection();
