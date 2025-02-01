import dotenv from 'dotenv';

dotenv.config();

const config = {
    PORT: process.env.PORT || 5000,
    OPENAI_KEY: process.env.OPENAI_KEY,
};

export default config;
