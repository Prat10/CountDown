import { useState, useRef } from "react";
import "./styles.css";

function padTime(time) {
  return time.toString().padStart(2, "0");
}
export default function App() {
  const intervalRef = useRef(null);
  const [title, setTitle] = useState("Let Start CountDown Timer!");
  const [timeleft, setTimeleft] = useState(10);
  const [isRunning, setIsRunning] = useState(false);

  function startTimer() {
    if (intervalRef.current != null) return;
    setTitle("CountDown begins!");
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeleft((timeleft) => {
        if (timeleft >= 1) return timeleft - 1;
        resetTimer();
        return 0;
      });
    }, 1000);
    console.log(intervalRef.current);
  }

  function stopTimer() {
    //This function stops the timer using UseRef hook and setInterval
    //function and ClearInterval
    if (intervalRef.current === null) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null; //to begin countdown again
    setTitle("Press to continue");
    setIsRunning(false);
    console.log(intervalRef.current);
  }

  function resetTimer() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle("Ready to GO again?");
    setIsRunning(false);
    setTimeleft(25 * 60);
  }
  const minutes = padTime(Math.floor(timeleft / 60));
  const seconds = padTime(timeleft - minutes * 60);
  //padStart used to add number which contain string only after any number
  return (
    <div className="App">
      <div className="time">
        <img
          className="image"
          src={require("./assets/Antu_org.kde.plasma.timer.svg.png")}
        />
      </div>
      <h1>{title}</h1>
      <div className="timer">
        <span>{minutes}</span>
        <span className="dots">:</span>
        <span>{seconds}</span>
      </div>
      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>start</button>}
        {isRunning && <button onClick={stopTimer}>stop</button>}
        <button onClick={resetTimer}>reset</button>
      </div>
    </div>
  );
}
