'use client'

import Microphone from "@/app/learn/Components/Microphone";
import {useRef} from "react";


export default function Home() {
    const isNovaSpeaking = useRef()
    if (isNovaSpeaking.current?.isLoading)
        console.log("Nova is speaking")
    return (<main>

        <Microphone />
    </main>);
}