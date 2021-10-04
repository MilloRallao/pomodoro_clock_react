import React from "react";
import { Button, Box } from "@mui/material";

function Timer({strTimer, timerPaused, handleCountdown, handleReset, minutes, seconds}) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { sm: 'column', m: 'row' },
            flexWrap: 'wrap',
            p: 1,
            m: 1,
        }}>
            <Box sx={{
                display: 'grid',
                gap: 2,
                gridTemplateColumns: 'auto',
                gridTemplateRows: 'auto',
                gridTemplateAreas: `". title ."
                                  "buttonL time buttonR"`,
                justifyContent: 'center'
            }}>
                <Box sx={{ gridArea: 'title', textAlign: 'center', gridColumn: '2/2' }} id="timer-label">{strTimer}</Box>
                <Button sx={{ gridArea: 'buttonL', gridColumn: '1/2', width: '12vh' }} id="start_stop" variant="contained" color={timerPaused ? 'primary' : 'error'} onClick={handleCountdown}>{timerPaused ? 'Start' : 'Stop'}</Button>
                <Box sx={{ gridArea: 'time', textAlign: 'center', gridColumn: '2/2' }} id="time-left">
                    {minutes}:{seconds === 60 ? "00" : seconds}
                </Box>
                <Button sx={{ gridArea: 'buttonR', gridColumn: '3/3', width: '12vh' }} id="reset" variant="contained" onClick={handleReset}>Reset</Button>
            </Box>
        </Box>
    )
}

export default Timer;