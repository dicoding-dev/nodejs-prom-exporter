import * as dotenv from 'dotenv'
import express from 'express';
import { collectDefaultMetrics, register } from 'prom-client';

dotenv.config()

collectDefaultMetrics({
    labels: { nodename: process.env.NODE_NAME },
});

const app = express();

app.get('/metrics', async (_req, res) => {
    try {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    } catch (err) {
        res.status(500).end(err);
    }
});

app.listen(process.env.APP_PORT || 4001, '0.0.0.0');
