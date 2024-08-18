'use client';

import { Box, Card, CardActionArea, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import { IconButton, TextField, DialogActions } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Masonry from '@mui/lab/Masonry';
import { useState } from "react";

export default function CardArea() {
    const customObjects = [ //testing...
        { id: 1, front: "Custom Custom Custom Custom Custom Custom Custom Custom Object 1 Custom Custom Custom Custom Custom Custom Custom Custom Object 1 Custom Custom Custom Custom Custom Custom Custom Custom Object 1 Custom Custom Custom Custom Custom Custom Custom Custom Object 1 end end end end end end end end end end end end end end end end", back: "bg-blue-100" },
        { id: 2, front: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", back: "bg-green-100" },
        { id: 3, front: "Custom  Custom Custom Custom Custom Object 1 Custom Custom Custom Custom Object 3", back: "bg-red-100" },
        { id: 4, front: "Custom Object 4", back: "bg-yellow-100" },
        { id: 5, front: "Custom Object 5", back: "bg-purple-100" },
        { id: 6, front: "Custom Object 6", back: "bg-pink-100" },
        { id: 7, front: "Custom Object 7", back: "bg-indigo-100" },
        { id: 8, front: "Custom Object 8", back: "bg-teal-100" },
        { id: 9, front: "Custom Object 9", back: "bg-orange-100" },
        { id: 9, front: "Custom Custom Custom Custom Custom Object 1 Custom Custom Custom Custom Object 9", back: "bg-orange-100" },
        { id: 9, front: "Custom Object 9", back: "bg-orange-100" },
        { id: 9, front: "Custom Object 9", back: "bg-orange-100" },
        { id: 9, front: "Custom Object 9", back: "bg-orange-100" },
        { id: 9, front: "Custom Object 9", back: "bg-orange-100" },
        { id: 9, front: "Custom Object 9", back: "bg-orange-100" },

    ];
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
    const handleAddCard = () => {

    }
    const handleDeleteCard = () => {

    }
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
                {customObjects.map((flashcard, index) => (
                    <Box position="relative">
                        <Box position="absolute" right="0" top="0" zIndex={2}>
                            <IconButton aria-label="delete" onClick={handleDeleteCard}>
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
                                                    {flashcard.front}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography variant="h7" component="div">
                                                    {flashcard.back}
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
                    <Button onClick={handleAddCard}>Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}