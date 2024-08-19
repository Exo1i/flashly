'use client'
import {forwardRef, useEffect, useRef, useState} from "react";
import talkToNova from "@/app/learn/Components/talkToNova";
import {useAudioRecorder} from "react-audio-voice-recorder";
import handleTranscription from "@/app/learn/Components/handleTranscription";
import Image from "next/image";

const Microphone = forwardRef(function Microphone({onTranscript, avatarRef, cards, cardsIndex, userId}, ref) {

    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const audioContext = useRef(null);
    const audioBufferSource = useRef(null);

    const {
        startRecording,
        stopRecording,
        togglePauseResume,
        recordingBlob,
        isRecording,
        isPaused,
        recordingTime,
        mediaRecorder
    } = useAudioRecorder();

    useEffect(() => {
        if (isRecording)
            avatarRef.current.changeStatus("listening");
    }, [isRecording]);

    useEffect(() => {
        // Initialize AudioContext
        audioContext.current = new (window.AudioContext || window.webkitAudioContext)();

        return () => {
            // Cleanup AudioContext on component unmount
            if (audioContext.current) {
                audioContext.current.close();
            }
        };
    }, []);

    const playAudio = async (audioArrayBuffer) => {
        if (audioBufferSource.current) {
            audioBufferSource.current.stop();
        }

        const audioBuffer = await audioContext.current.decodeAudioData(audioArrayBuffer);
        audioBufferSource.current = audioContext.current.createBufferSource();
        audioBufferSource.current.buffer = audioBuffer;
        audioBufferSource.current.connect(audioContext.current.destination);
        audioBufferSource.current.start();
    };

    useEffect(() => {
        const handleRecording = async () => {
            if (!recordingBlob) return;
            setIsLoading(true);
            avatarRef.current.changeStatus("computing");
            await handleTranscription(recordingBlob).then(async transcribe => {

                setHistory(prevHistory => [...prevHistory, {role: "user", content: transcribe.text}]);

                await talkToNova([...history, {
                    role: "user",
                    content: transcribe.text + ". Current card question " + cards[cardsIndex]?.question + "Current card answer " + cards[cardsIndex]?.answer
                }], userId).then(async response => {
                    avatarRef.current.changeStatus("speaking");

                    onTranscript({user: transcribe.text, assistant: response});

                    // Use the selected voice or default to en-us
                    const voice = 'en-GB';

                    await fetch(`https://api.voicerss.org/?key=14f89ef3aaff4078981e1e248f103780&hl=${voice}&v=Nancy&src=${encodeURIComponent(response)}`)
                        .then(response => response.arrayBuffer())
                        .then(arrayBuffer => {
                            playAudio(arrayBuffer);
                            setIsLoading(false)
                            avatarRef.current.changeStatus("neutral");

                        })
                        .catch(error => {
                            console.error("Error playing audio:", error);
                        });
                });
            })
        }
        handleRecording()
    }, [recordingBlob])

    return (
        <div className="absolute bottom-10 right-10 lg:right-16 z-50">
            <div
                className="relative flex justify-center items-center"
                onClick={isLoading ? null : isRecording ? stopRecording : startRecording} // Disable onClick when isLoading is true
            >
                {/* Outline with pulse animation only when active */}
                <div
                    className={`w-[60px] h-[60px] absolute rounded-full border-8 ${isRecording ? "border-[#FF91A4] animate-pulse" : "border-[#B5A4A4]"}`}
                ></div>
                <div
                    className={`w-[60px] h-[60px] absolute rounded-full border-8 ${isRecording ? "border-[#FF91A4] animate-pulse delay-1500" : "border-[#B5A4A4]"}`}
                ></div>

                {/* Microphone button with dimmed effect or loading animation */}
                <div
                    className={`w-[120px] h-[120px] absolute rounded-full ${isRecording ? "bg-[#FFAACD] shadow-[0px_0px_80px_#FFAACD]" : "bg-[#4A4A4A] shadow-[0px_0px_20px_#2A2A2A]"}`}
                ></div>
                <div
                    className={`w-[100px] h-[100px] absolute rounded-full flex justify-center items-center ${isLoading ? "animate-pulse bg-[#FFAACD]" : isRecording ? "bg-[#FFAACD] shadow-[0px_-2px_15px_#FFAACD]" : "bg-[#6B6B6B] shadow-[0px_-2px_10px_#3A3A3A]"}`}
                >
                    {isLoading ? (
                        <div
                            className="w-[40px] h-[40px] border-t-4 border-white border-solid rounded-full animate-spin"></div>
                    ) : (
                        <Image
                            src={"microphone.svg"}
                            alt={"Press To talk To Nova"}
                            width={60}
                            height={60}
                            className={`${isRecording ? "brightness-100" : "brightness-75"} transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
                        />

                    )}
                </div>

            </div>

        </div>
    );
});

export default Microphone;