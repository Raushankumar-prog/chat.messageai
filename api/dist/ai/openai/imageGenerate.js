import { OpenAI } from "openai";
const openai = new OpenAI();
async function generateImage(prompt) {
    const image = await openai.images.generate({
        prompt: prompt,
    });
    console.log(image.data[0].url);
}
generateImage("generate a image of the cow");
