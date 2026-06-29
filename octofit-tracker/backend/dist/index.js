import 'dotenv/config';
import { createApp } from './app.js';
import { connectDatabase } from './config/database.js';
const port = Number(process.env.PORT ?? 8000);
const app = createApp();
async function startServer() {
    await connectDatabase();
    app.listen(port, () => {
        console.log(`OctoFit Tracker backend listening on port ${port}`);
    });
}
void startServer();
