import { useState, useEffect } from "react";
//import Question from "../Questions/Questions";

function Timer(props) {
    const [timeLeft, setTimeLeft] = useState(props.initialTime); //initialTime  - время, которое даётся игроку
    //const [timeOver, setTimeOver] = useState(false)

    var timer;
  
    useEffect(() => {
       timer = setInterval(() => {
        setTimeLeft((prevTime) => {
            if (prevTime === 0){
                clearInterval(timer);
                props.timerStop(true)
                return 0;
            } else{
                return prevTime-1;
            }
        });  //будет вызываться каждую секунду //каждые 1000мс, то биш каждую секунду, timeLeft уменьшается на одну
      }, 1000);


      return () => clearInterval(timer); //Очищаем интервал, чтобы когда компонента не будет, счёётчик не шёл дальше
    }, []);
  
  
    return (
        <div>
            <div>
             <p>Time Left: {timeLeft}</p>
            </div>

        </div>
    );
  }

export default Timer;