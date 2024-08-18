import { Box } from "@mui/material";
import CardArea from "./Components/CardArea/page";

export default async function Home() {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            padding: '10px',
        }}>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    borderRadius: '10px',
                    padding: '10px',
                    bgcolor: 'primary.main',
                    boxShadow: 3,
                    justifyContent: 'space-between',
                    gap: '5px'
                }}
            >
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '10px',
                    padding: '10px',
                    bgcolor: 'yellow',
                    boxShadow: 3,
                    flex: '4 1 30%',
                    overflow: 'auto'
                }}>
                    {/* Cards Area*/}
                    <CardArea></CardArea>
                </Box>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '10px',
                    padding: '10px',
                    bgcolor: 'green',
                    boxShadow: 3,
                    flex: '1 1 30%',
                }}>
                    {/* Chat Area*/}
                </Box>
            </Box>
        </Box>
    );
}