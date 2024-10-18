import {createClient, sql} from '@vercel/postgres';
import {Post} from "@/app/lib/definition";

export async function connectToDB() {
    const client = createClient();
    await client.connect();

    try {
        if (client) {
            console.log('Connected to database');
            return client;
        }
    } catch (error) {
        console.error('Error connecting to database', error);
    }
}

export async function getPosts() : Promise<Post[]>{
    try {
        const data = await sql`SELECT * FROM posts`;

        return data.rows as Post[];
    } catch (error) {
        console.error('Error getting posts', error);
        return [];
    }
}