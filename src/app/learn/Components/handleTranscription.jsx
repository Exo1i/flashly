import {AssemblyAI} from 'assemblyai';

const client = new AssemblyAI({

    apiKey: '557a978bfd9049f1b3f34034cbd0d26d',
});

export default async function handleTranscription(data) {
    return await client.transcripts.transcribe({audio: data})
};


