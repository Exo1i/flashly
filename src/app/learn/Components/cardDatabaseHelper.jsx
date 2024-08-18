'use server';

import {db} from "@/config/config"; // Adjust the import path as needed
import {addDoc, collection, deleteDoc, doc, getDocs} from 'firebase/firestore';
import {auth} from "@clerk/nextjs/server";

const CARDS_COLLECTION = `cards/${auth().userId}/cards`;

export async function fetchCards() {
    const cardsCollection = collection(db, CARDS_COLLECTION);
    const cardSnapshot = await getDocs(cardsCollection);
    return cardSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

export async function addCard(cardData) {
    const cardsCollection = collection(db, CARDS_COLLECTION);
    const docRef = await addDoc(cardsCollection, cardData);
    return {
        id: docRef.id,
        ...cardData
    };
}

export async function deleteCard(cardId) {
    const cardDoc = doc(db, CARDS_COLLECTION, cardId);
    await deleteDoc(cardDoc);
}