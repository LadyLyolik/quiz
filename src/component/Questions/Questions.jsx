import { useState } from "react";
import './Questions.css'
import Timer from "../timer/Timer";

function Question({ dataAPI }) {
  const [qurrentQuestions, setQurrentQuestions] = useState(0); //индекс элемента массива
  const [gameEnd, setGameEnd] = useState(false); 
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);



  const handleAnswersClick = (answer) => {

    console.log(answer, dataAPI[qurrentQuestions].correct_answer)
    if (answer===dataAPI[qurrentQuestions].correct_answer){
        setScore(score+1)
    }

    const nextQuestion = qurrentQuestions + 1;  
    if (nextQuestion < dataAPI.length) {
      setQurrentQuestions(nextQuestion);
    } else {
      setGameEnd(true);
    }
  };

  if (!dataAPI || dataAPI.length === 0) {
    return <div>No questions available</div>;
  }

  const updateGameTime = (time) => {
    setGameTime(time);
  };

  return (
    <div className="game">
      {gameEnd ? (
        <div className="results">
          <h1>Игра окончена</h1>
          <p>Ваш счёт: {score}/{dataAPI.length}</p>
          <p>Время прохождения: {gameTime} секунд</p>
        </div>
      ) : 
        <>
          <div className="question">
            <p id="text_ti">{dataAPI[qurrentQuestions].question}</p>
          </div>
          <div className="answers-list">
            {[
              ...dataAPI[qurrentQuestions].incorrect_answers,
              dataAPI[qurrentQuestions].correct_answer,
            ].map((answer) => (
              <button
                className="handleAnswersClick"
                key={answer}
                onClick={() => handleAnswersClick(answer)}
              >
                {answer}
              </button>
            ))}
          </div>
          <Timer initialTime={30} timerStop={setGameEnd} updateGameTime={updateGameTime}/>
        </>
      }
    </div>
  );
}
export default Question;
