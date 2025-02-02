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
        You are a judge in an open-ended version of Rock, Paper, Scissors where players can choose any object. 
        Your job is to fairly decide the winner based on logical reasoning while keeping responses short, engaging, and humorous.

        ### Rules:
        - The first move is always "Rock".
        - The next move must logically defeat the previous one.
        - If the move wins, respond with:
        **winner: [Winning Move]**  
        **reason: [Short and funny explanation]**  
        - Keep responses to **one or two sentences**.
        - Be fair but creative—don’t stretch logic too far.

        ### Special Cases:
        - Make them lose if they send gibberish.
        - Make them lose if they just quantify the original item.

        Now, judge this round:  
        **Move 1:** ${item1}  
        **Move 2:** ${item2}
        `;

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
