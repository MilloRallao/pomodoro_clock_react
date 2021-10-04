import React from "react";
import { Button, Box } from "@mui/material";

function IncrementDecrement({handleIncrementDecrement, timerPaused, breakLength, sessionLength}) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                p: 1,
                m: 1,
                justifyContent: 'space-between'
            }}
        >
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: 2,
                gridTemplateRows: 'auto',
                gridTemplateAreas: `". title ."
                              "buttonL time buttonR"`,
            }}>
                <Box sx={{ gridArea: 'title' }} id="break-label">Break Length</Box>
                <Button sx={{ gridArea: 'buttonL' }} id="break-decrement" name="breakLength" value="decrement" variant="contained" onClick={handleIncrementDecrement} disabled={timerPaused ? false : true}>-</Button>
                <Box sx={{ gridArea: 'time', textAlign: 'center', width: '10vh' }} id="break-length">{breakLength}</Box>
                <Button sx={{ gridArea: 'buttonR' }} id="break-increment" name="breakLength" value="increment" variant="contained" onClick={handleIncrementDecrement} disabled={timerPaused ? false : true}>+</Button>
            </Box>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: 2,
                gridTemplateRows: 'auto',
                gridTemplateAreas: `". title ."
                              "buttonL time buttonR"`,
            }}>
                <Box sx={{ gridArea: 'title' }} id="session-label">Session Length</Box>
                <Button sx={{ gridArea: 'buttonL' }} id="session-decrement" name="sessionLength" value="decrement" variant="contained" onClick={handleIncrementDecrement} disabled={timerPaused ? false : true}>-</Button>
                <Box sx={{ gridArea: 'time', textAlign: 'center', width: '10vh' }} id="session-length">{sessionLength}</Box>
                <Button sx={{ gridArea: 'buttonR' }} id="session-increment" name="sessionLength" value="increment" variant="contained" onClick={handleIncrementDecrement} disabled={timerPaused ? false : true}>+</Button>
            </Box>
        </Box>
    )
}

export default IncrementDecrement;