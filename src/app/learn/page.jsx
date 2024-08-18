'use client';

import React, {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {ChevronDown, ChevronUp, Plus, Search, Trash2, X} from 'lucide-react';
import Microphone from "@/app/learn/Components/Microphone";
import {addCard, deleteCard, fetchCards} from './Components/cardDatabaseHelper';
import TextDialog from "@/app/learn/Components/TextDialog";
import TalkingFace from "@/app/learn/Components/TalkingFace";

const CARD_COLORS = ['bg-[#ffa719]', 'bg-[#e56660]', 'bg-[#b94a53]', 'bg-[#4b345e]', 'bg-[#724e94]',];

export default function Home() {
    const [cards, setCards] = useState([]);
    const [cardIndex, setCardIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCards, setFilteredCards] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCard, setNewCard] = useState({question: '', answer: '', color: CARD_COLORS[0]});
    const [avatarText, setAvatarText] = useState("Hello! I'm your AI assistant. How can I help you today?");
    const [userText, setUserText] = useState("");
    const [isAvatarTextExpanded, setIsAvatarTextExpanded] = useState(false);
    const [isUserTextExpanded, setIsUserTextExpanded] = useState(false);
    const cardRef = useRef(null);
    const [avatarStatus, setAvatarStatus] = useState("neutral");

    useEffect(() => {
        const loadCards = async () => {
            const loadedCards = await fetchCards();
            setCards(loadedCards);
            setFilteredCards(loadedCards);
        };
        loadCards();
    }, []);

    const nextCard = () => {
        if (cardIndex < filteredCards.length - 1) {
            setDirection(1);
            setCardIndex(cardIndex + 1);
        }
    };

    const prevCard = () => {
        if (cardIndex > 0) {
            setDirection(-1);
            setCardIndex(cardIndex - 1);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp') prevCard();
        if (e.key === 'ArrowDown') nextCard();
    };

    const handleWheel = (e) => {
        e.preventDefault();
        if (e.deltaY < 0) prevCard();
        if (e.deltaY > 0) nextCard();
    };

    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
        e.preventDefault();
    };

    const handleTouchEnd = (e) => {
        if (!touchStart) return;
        const touchEnd = e.changedTouches[0].clientY;
        const diff = touchStart - touchEnd;
        if (diff > 50) nextCard();
        if (diff < -50) prevCard();
        setTouchStart(null);
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = cards.filter(card => card.question.toLowerCase().includes(term) || card.answer.toLowerCase().includes(term));
        setFilteredCards(filtered);
        setCardIndex(0);
    };

    const handleAddCard = async () => {
        const addedCard = await addCard(newCard);
        setCards([...cards, addedCard]);
        setFilteredCards([...filteredCards, addedCard]);
        setIsModalOpen(false);
        setNewCard({question: '', answer: '', color: CARD_COLORS[0]});
    };

    const handleDeleteCard = async (id) => {
        await deleteCard(id);
        const updatedCards = cards.filter(card => card.id !== id);
        setCards(updatedCards);
        setFilteredCards(updatedCards);
        if (cardIndex >= updatedCards.length) {
            setCardIndex(Math.max(0, updatedCards.length - 1));
        }
    };

    const handleMicrophoneInput = (text) => {
        setUserText(text.user);
        // Here you would typically send the text to your AI service and get a response
        // For now, we'll just echo the user's input
        setAvatarText(`You said: ${text.assistant}`);
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        if (cardRef.current) {
            cardRef.current.addEventListener('wheel', handleWheel, {passive: false});
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (cardRef.current) {
                cardRef.current.removeEventListener('wheel', handleWheel);
            }
        };
    }, [cardIndex, filteredCards]);


    return (<main className="flex flex-col lg:flex-row h-screen overflow-hidden">
        {/* Avatar Section */}
        <div className="w-full lg:w-2/3 bg-gray-800 p-4 relative flex flex-col items-center">
            {/* Avatar icon (visible only on large screens) */}
            <div className="hidden lg:block w-40 h-40 bg-gray-600 rounded-full mb-4"><TalkingFace
                status={avatarStatus} /></div>

            {/* Chat Section (visible only on large screens) */}
            <div className="w-full max-w-md space-y-4 lg:space-y-8 hidden lg:block">
                <TextDialog
                    text={avatarText}
                    isExpanded={isAvatarTextExpanded}
                    setIsExpanded={setIsAvatarTextExpanded}
                    maxHeight="max-h-48"
                    role="assistant"
                />
                <TextDialog
                    text={userText}
                    isExpanded={isUserTextExpanded}
                    setIsExpanded={setIsUserTextExpanded}
                    maxHeight="max-h-48"
                    role="user"
                />
            </div>
        </div>

        {/* Microphone Section (visible only on small screens, positioned in the center of the bottom of the screen) */}
        <div
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 lg:bottom-10 lg:right-2/3 lg:translate-x-0 lg:visible z-50">
            <Microphone onTranscript={handleMicrophoneInput} setAvatarStatus={setAvatarStatus} />
        </div>


        {/* Card Section */}
        <div className="w-full lg:w-1/3 flex flex-col items-center justify-center p-4 relative">
            {/* Search Bar */}
            <div className="w-full max-w-md flex items-center bg-white rounded-full p-2 mb-4 z-10">
                <Search className="text-gray-500 mr-2" />
                <input
                    type="text"
                    placeholder="Search flashcards..."
                    className="w-full bg-transparent outline-none text-gray-700"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <div
                ref={cardRef}
                className="w-full max-w-md aspect-[3/4] relative"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <AnimatePresence initial={false} custom={direction}>
                    {filteredCards.length > 0 ? (<motion.div
                        key={cardIndex}
                        custom={direction}
                        variants={{
                            enter: (direction) => ({y: direction > 0 ? 300 : -300, opacity: 0}),
                            center: {y: 0, opacity: 1},
                            exit: (direction) => ({y: direction < 0 ? 300 : -300, opacity: 0}),
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{type: 'tween', duration: 0.3}}
                        className={`absolute w-full h-full ${filteredCards[cardIndex].color} rounded-lg shadow-lg flex flex-col justify-center items-center text-white text-2xl font-sans p-4`}
                    >
                        <h2 className="text-3xl font-bold mb-4">{filteredCards[cardIndex].question}</h2>
                        <p className="text-xl">{filteredCards[cardIndex].answer}</p>
                        <button
                            onClick={() => handleDeleteCard(filteredCards[cardIndex].id)}
                            className="absolute bottom-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
                        >
                            <Trash2 size={20} />
                        </button>
                    </motion.div>) : (<div
                        className="w-full h-full bg-gray-200 rounded-lg shadow-lg flex justify-center items-center text-gray-600 text-2xl font-sans">
                        No matching cards
                    </div>)}
                </AnimatePresence>
            </div>

            {/* Navigation Buttons and Card Count */}
            <div className="flex justify-between items-center w-full max-w-md mt-4 z-10">
                <button onClick={prevCard}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l">
                    <ChevronUp size={24} />
                </button>
                <span className="text-gray-600">
                        {filteredCards.length > 0 ? `${cardIndex + 1} / ${filteredCards.length}` : '0 / 0'}
                    </span>
                <button onClick={nextCard}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r">
                    <ChevronDown size={24} />
                </button>
            </div>

            {/* Add Card Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center z-10"
            >
                <Plus size={20} className="mr-2" /> Add Card
            </button>
        </div>

        {/* Add Card Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Add New Card</h2>
                        <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                            <X size={24} />
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Question"
                        className="w-full p-2 mb-4 border rounded"
                        value={newCard.question}
                        onChange={(e) => setNewCard({...newCard, question: e.target.value})}
                    />
                    <input
                        type="text"
                        placeholder="Answer"
                        className="w-full p-2 mb-4 border rounded"
                        value={newCard.answer}
                        onChange={(e) => setNewCard({...newCard, answer: e.target.value})}
                    />
                    <div className="mb-4">
                        <label className="block mb-2">Card Color:</label>
                        <div className="flex space-x-2">
                            {CARD_COLORS.map((color, index) => (<button
                                key={index}
                                className={`w-8 h-8 rounded-full ${color} ${newCard.color === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                                onClick={() => setNewCard({...newCard, color})}
                            />))}
                        </div>
                    </div>
                    <button
                        onClick={handleAddCard}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Card
                    </button>
                </div>
            </div>)}
    </main>);
}