'use server'
import Together from "together-ai";
import llmPrompt from "@/app/learn/Components/llmPrompt";
import removeMarkdown from "markdown-to-text";
import {novaAddCards} from "@/app/learn/Components/novaAddCards";

export default async function talkToNova(messages) {
    const together = new Together({apiKey: process.env.TOGETHER_API_KEY});
    const response = await together.chat.completions.create({
        messages: [{
            "role": "system",
            "content": llmPrompt,
        }, ...messages],
        model: "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo",
        max_tokens: 512,
        temperature: 0.7,
        top_p: 0.7,
        top_k: 50,
        repetition_penalty: 1,
        stop: ["<|eot_id|>"],
        stream: false
    });
    console.log(removeMarkdown(response.choices[0].message.content))
    if (removeMarkdown(response.choices[0].message.content).includes("{"))
        return novaAddCards(response.choices[0].message.content)


    return removeMarkdown(response.choices[0].message.content.replace(/[!.?]/g, "\n"));
}
