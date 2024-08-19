'use server';

import {db} from "@/config/config"; // Adjust the import path as needed
import {addDoc, collection, deleteDoc, doc, getDocs, writeBatch} from 'firebase/firestore';


export async function fetchCards(userId) {
    const CARDS_COLLECTION = `cards/${userId}/cards`;

    const cardsCollection = collection(db, CARDS_COLLECTION);
    const cardSnapshot = await getDocs(cardsCollection);
    return cardSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

export async function addCard(cardData, userId) {
    const CARDS_COLLECTION = `cards/${userId}/cards`;

    const cardsCollection = collection(db, CARDS_COLLECTION);
    const docRef = await addDoc(cardsCollection, cardData);
    return {
        id: docRef.id,
        ...cardData
    };
}

export async function deleteCard(cardId, userId) {
    const CARDS_COLLECTION = `cards/${userId}/cards`;

    const cardDoc = doc(db, CARDS_COLLECTION, cardId);
    await deleteDoc(cardDoc);
}

export async function addCards(cards, userId) {
    const CARDS_COLLECTION = `cards/${userId}/cards`;

    const batch = writeBatch(db);
    const cardsCollection = collection(db, CARDS_COLLECTION);

    cards.forEach(card => {
        const newDocRef = doc(cardsCollection); // Create a new document reference
        batch.set(newDocRef, {
            ...card,
            color: Math.floor(Math.random() * 16777215).toString(16)

        });
    });

    console.log("Adding cards to database...");
    await batch.commit();
    console.log("Adding cards to database complete!");
}