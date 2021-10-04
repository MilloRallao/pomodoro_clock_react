import { React, useState, useEffect, useRef } from 'react'
import { Button, Container, Box } from '@mui/material'
import IncrementDecrement from './components/IncrementDecrement'
import Timer from './components/Timer'

function App() {
  const [strTimer, setStrTimer] = useState("Session")
  const [length, setLength] = useState({
    breakLength: 5,
    sessionLength: 25
  })
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(60)
  const [timerPaused, setTimerPaused] = useState(true)

  let count = useRef();

  useEffect(() => {
    if (!timerPaused) {
      count.current = setInterval(() => {
        if (minutes < 1 && seconds < 1) {
          setStrTimer(strTimer == "Session" ? "Break" : "Session")
          setMinutes(strTimer == "Break" ? length.sessionLength : length.breakLength)
          setSeconds(60)
          document.getElementById("beep").play()
        } else {
          setMinutes(prevState => {
            const formatMinutes = new Intl.NumberFormat('es-ES', {
              minimumIntegerDigits: 2,
              useGrouping: false
            }).format(parseInt(prevState) - 1)
            const result = seconds == 0 || seconds == 60 ?
              parseInt(prevState) <= 10 ?
                formatMinutes :
                prevState - 1 :
              prevState
            return result;
          })
          setSeconds(prevState => {
            const formatMinutes = new Intl.NumberFormat('es-ES', {
              minimumIntegerDigits: 2,
              useGrouping: false
            }).format(parseInt(prevState) - 1)
            return parseInt(prevState) == 0 ?
              59 :
              parseInt(prevState) <= 10 ?
                formatMinutes :
                prevState - 1
          })
        }
      }, 1000)
    }

    return () => {
      clearInterval(count.current)
    }
  }, [timerPaused, seconds, minutes, strTimer, length])

  const handleReset = () => {
    document.getElementById("beep").currentTime = 0
    setStrTimer("Session")
    setLength({
      breakLength: 5,
      sessionLength: 25
    })
    setMinutes(25)
    setSeconds(60)
    setTimerPaused(true)
  }

  const handleIncrementDecrement = (e) => {
    const { name, value } = e.target

    if (value == "increment" && length[name] < 60) {
      if (name == "sessionLength") {
        setMinutes(prevState => {
          const formatMinutes = new Intl.NumberFormat('es-ES', {
            minimumIntegerDigits: 2,
            useGrouping: false
          }).format(parseInt(prevState) + 1)
          return parseInt(prevState) + 1 < 10 ? formatMinutes : parseInt(prevState) + 1
        })
      }
      setLength(prevState => {
        return {
          ...prevState,
          [name]: prevState[name] + 1
        }
      })
    } else if (value == "decrement" && length[name] > 1) {
      if (name == "sessionLength") {
        setMinutes(prevState => {
          const formatMinutes = new Intl.NumberFormat('es-ES', {
            minimumIntegerDigits: 2,
            useGrouping: false
          }).format(parseInt(prevState) - 1)
          return parseInt(prevState) - 1 < 10 ? formatMinutes : prevState - 1
        })
      }
      setLength(prevState => {
        return {
          ...prevState,
          [name]: prevState[name] - 1
        }
      })
    }
  }

  const handleCountdown = (e) => {
    const { id } = e.target

    setTimerPaused(prevState => !prevState)

    if (id == "reset") {
      setStrTimer("Session")
      setLength({
        breakLength: 5,
        sessionLength: 25
      })
      setMinutes(25)
      setSeconds(60)
      setTimerPaused(true)
      clearInterval(count.current)
    }
  }

  return (
    <Container>
      <IncrementDecrement handleIncrementDecrement={handleIncrementDecrement} timerPaused={timerPaused} breakLength={length.breakLength} sessionLength={length.sessionLength}/>
      <Timer strTimer={strTimer}  timerPaused={timerPaused} handleCountdown={handleCountdown} handleReset={handleReset} minutes={minutes} seconds={seconds} />
      <audio id="beep" src="https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-skyclad-sound/skyclad_sound_emergency_alarm_siren_loop.mp3" />
    </Container>
  )
}

export default App;