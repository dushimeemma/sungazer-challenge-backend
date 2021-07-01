import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Transactions SUNGAZER Challenge APIs',
    });
});

app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
    });
});

app.listen(port, () => console.log(`Server started on port ${port}`));

export default app;
