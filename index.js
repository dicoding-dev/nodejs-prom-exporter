import express from 'express';
import { collectDefaultMetrics, register } from 'prom-client';

collectDefaultMetrics({
    labels: { NODE_APP_INSTANCE: process.env.NODE_APP_INSTANCE },
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
