import OpenAI from 'openai';
import config from './config.js';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

const openai = new OpenAI({ apiKey: config.OPENAI_KEY });

const Output = z.object({
    winner: z.string(),
    reason: z.string(),
    // image_prompt: z.string(),
});

export const getGameResult = async (item1, item2) => {
    const prompt = `
        You are a judge in an unlimited rock-paper-scissors game where players choose any object.
        Your task is to decide which object wins based on creative logic, provide a reason for who wins, keep it a small amount of number like a sentence or 2.
        This round: ${item1} vs ${item2}.`;

    try {
        // Request the winner, reason, and image prompt
        const gptResponse = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'You are a judge in a creative game logic system.',
                },
                { role: 'user', content: prompt },
            ],
            response_format: zodResponseFormat(Output, 'output'),
        });

        const gptResult = JSON.parse(gptResponse.choices[0].message.content);

        // Generate the image
        // const imageResponse = await openai.images.generate({
        //     model: 'dall-e-3',
        //     prompt: gptResult.image_prompt,
        //     n: 1,
        //     size: '1024x1024',
        // });

        // gptResult.image_url = imageResponse.data[0].url;
        return gptResult;
    } catch (error) {
        console.error('Error:', error);
    }
};
