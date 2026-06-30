import 'dotenv/config';
import { createApp } from './app.js';
import { connectDatabase } from './config/database.js';
export function getApiBaseUrl() {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : 'http://localhost:8000';
}
const port = Number(process.env.PORT ?? 8000);
const app = createApp();
async function startServer() {
    await connectDatabase();
    app.listen(port, () => {
        console.log(`OctoFit Tracker backend listening on port ${port} (${getApiBaseUrl()})`);
    });
}
void startServer();
