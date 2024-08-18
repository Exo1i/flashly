'use client';
import { doc, collection, addDoc, deleteDoc, getDocs, query } from 'firebase/firestore';
import { Box, Card, CardActionArea, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import { IconButton, TextField, DialogActions } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Masonry from '@mui/lab/Masonry';
import { useEffect, useState } from "react";
import { useUser } from '@clerk/nextjs';
import { db } from '@/config/config';

export default function CardArea() {

    const { user } = useUser()
    const [cards, setCards] = useState([])
    const [open, setOpen] = useState(false)
    const [answer, setAnswer] = useState('')
    const [question, setQuestion] = useState('')
    const [flipped, setFlipped] = useState([])

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleAddCard = async () => {
        try {
            const userDocRef = doc(db, 'users', user.id);
            const cardsCollectionRef = collection(userDocRef, 'cards');
            const cardData = {
                question: question,
                answer: answer,
                timestamp: new Date(),
            }
            const newCardRef = await addDoc(cardsCollectionRef, cardData);
            console.log(newCardRef.id)
            const cardId = newCardRef.id
            setCards([
                ...cards,
                {
                    ...cardData,
                    id: cardId
                }
            ])
            console.log('Card added with ID: ', newCardRef.id);
        } catch (error) {
            console.error('Error adding card: ', error);
        }
    }
    const handleDeleteCard = async (cardId) => {
        try {
            const cardDocRef = doc(db, 'users', user.id, 'cards', cardId);
            await deleteDoc(cardDocRef);
            setCards(prevCards => prevCards.filter(card => card.id != cardId));
            console.log('Card deleted with ID: ', cardId);
        } catch (error) {
            console.error('Error deleting card: ', error);
        }
    }

    useEffect(() => {
        async function fetchAllCards() {
            if (!user)
                return
            try {
                console.log(user.id)
                const cardsCollectionRef = collection(doc(db, 'users', user.id), 'cards');
                const q = query(cardsCollectionRef);
                const querySnapshot = await getDocs(q);
                console.log(querySnapshot.docs)
                const ret = querySnapshot.docs.map(doc => ({
                    id: doc.ref.id,
                    ...doc.data(),
                }));
                setCards(ret)
                console.log('Fetched cards: ', ret);
                return ret;
            } catch (error) {
                console.error('Error fetching cards: ', error);
            }
        }
        fetchAllCards()
    }, [user])

    return (
        <Box>
            <Button onClick={handleOpen} sx={{
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'blue',
                marginBottom: '10px',
                color: 'white',
            }}>
                Add New Card
            </Button>
            <Masonry columns={3} spacing={3}>
                {cards.map((flashcard, index) => (
                    <Box position="relative" key={index}>
                        <Box position="absolute" right="0" top="0" zIndex={2}>
                            <IconButton aria-label="delete" onClick={() => {
                                handleDeleteCard(flashcard.id)
                            }}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                        <Box zIndex={1}>
                            <Card>
                                <CardActionArea onClick={() => {
                                    handleCardClick(index)
                                }}>
                                    <CardContent>
                                        <Box sx={{
                                            perspective: '1000px',
                                            '&': {
                                                transition: 'transform 0.6s',
                                                transformStyle: 'preserve-3d',
                                                position: 'relative',
                                                transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                                padding: '5px',
                                            },
                                            '& > div': {
                                                backfaceVisibility: 'hidden',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                display: 'flex',
                                                padding: '2',
                                                boxSizing: 'border-box',
                                                wordBreak: 'break-word',
                                                overflowWrap: 'break-word',
                                            },
                                            '& > div:nth-of-type(2)': {
                                                transform: 'rotateY(180deg)'
                                            },
                                        }}>
                                            <div>
                                                <Typography variant="h7" component="div">
                                                    {flashcard.question}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography variant="h7" component="div" className='absolute'>
                                                    {flashcard.answer}
                                                </Typography>
                                            </div>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Box>
                    </Box>
                ))}
            </Masonry>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Add New Card
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter a question and the answer to that question.
                    </DialogContentText>
                    <TextField autoFocus margin="dense" label="Question" type="text" fullWidth value={question} onChange={(e) => setQuestion(e.target.value)} variant="outlined" />
                    <TextField autoFocus margin="dense" label="Answer" type="text" fullWidth value={answer} onChange={(e) => setAnswer(e.target.value)} variant="outlined" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        handleAddCard()
                        handleClose()
                    }}>Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}