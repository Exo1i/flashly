import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import Image from "next/image";
import talkToNova from "@/app/learn/Components/talkToNova";
import speechUtteranceChunker from "@/app/learn/Components/speechUtteranceChunker";

const Microphone = forwardRef(function Microphone({}, ref) {
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [voice, setVoice] = useState([])
    const recognitionRef = useRef()
    const utteranceRef = useRef()
    // Expose isLoading to the parent component
    useImperativeHandle(ref, () => ({
        get isLoading() {
            return isLoading;
        }
    }));

    useEffect(() => {
        const voices = window.speechSynthesis.getVoices();
        if (Array.isArray(voices) && voices.length > 0) {
            let englishVoice = voices.filter(({lang}) => lang.indexOf('en-') !== -1)[1];
            setVoice(englishVoice)
        }
        if ('onvoiceschanged' in window.speechSynthesis) {
            window.speechSynthesis.onvoiceschanged = () => {
                let englishVoice = window.speechSynthesis.getVoices().filter(({lang}) => lang.indexOf('en-') !== -1)[1];
                setVoice(englishVoice)
            }

        }
    }, [])


    const toggleMicrophone = () => {
        if (isActive) {
            recognitionRef.current.stop()
            setIsActive(false)
        } else {
            handleSpeech()
            setIsActive(true)
        }
    };

    function handleSpeech() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();

        recognitionRef.current.start()

        recognitionRef.current.onstart = function () {
            window.speechSynthesis.cancel();
            console.log('Voice activated')
        }

        recognitionRef.current.onend = function () {
            recognitionRef.current.stop()
            setIsActive(false)
            setIsLoading(true)
            console.log('Voice deactivated')
        }

        recognitionRef.current.onresult = async function (event) {
            setHistory(prevHistory => [...prevHistory, {role: "user", content: event.results[0][0].transcript}])

            await talkToNova([...history, {
                role: "user", content: event.results[0][0].transcript
            }]).then(response => {

                utteranceRef.current = new SpeechSynthesisUtterance(response)
                setHistory(prevHistory => [...prevHistory, {role: "assistant", content: response}])
                // console.log(response)
                utteranceRef.current.voice = voice
                speechUtteranceChunker(utteranceRef.current, {
                    chunkLength: 150
                }, function () {
                    //some code to execute when done
                    {
                        setIsLoading(false)
                        console.log('Finished speaking')
                    }

                });


            })

        }
    }


    return (<div className="relative w-screen h-screen bg-[#222032] flex justify-end items-center">
        <div className="absolute bottom-[5em] left-1/2 transform -translate-x-1/2">
            <div
                className="relative flex justify-center items-center"
                onClick={!isLoading ? toggleMicrophone : null}  // Disable onClick when isLoading is true
            >
                {/* Outline with pulse animation only when active */}
                <div
                    className={`w-[60px] h-[60px] absolute rounded-full border-8 ${isActive ? "border-[#FF91A4] animate-pulse" : "border-[#B5A4A4]"}`}
                ></div>
                <div
                    className={`w-[60px] h-[60px] absolute rounded-full border-8 ${isActive ? "border-[#FF91A4] animate-pulse delay-1500" : "border-[#B5A4A4]"}`}
                ></div>

                {/* Microphone button with dimmed effect or loading animation */}
                <div
                    className={`w-[120px] h-[120px] absolute rounded-full ${isActive ? "bg-[#FFAACD] shadow-[0px_0px_80px_#FFAACD]" : "bg-[#4A4A4A] shadow-[0px_0px_20px_#2A2A2A]"}`}
                ></div>
                <div
                    className={`w-[100px] h-[100px] absolute rounded-full flex justify-center items-center ${isLoading ? "animate-pulse bg-[#FFAACD]" : isActive ? "bg-[#FFAACD] shadow-[0px_-2px_15px_#FFAACD]" : "bg-[#6B6B6B] shadow-[0px_-2px_10px_#3A3A3A]"}`}
                >
                    {isLoading ? (<div
                        className="w-[40px] h-[40px] border-t-4 border-white border-solid rounded-full animate-spin"></div>) : (
                        <Image
                            src={"microphone.svg"}
                            alt={"Press To talk To Nova"}
                            width={60}
                            height={60}
                            className={`${isActive ? "brightness-100" : "brightness-75"} transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
                        />)}
                </div>
            </div>
        </div>
    </div>);
})
export default Microphone;