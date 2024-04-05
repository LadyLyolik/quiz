import { useState } from "react";
import "./Questions.css";
import Timer from "../timer/Timer";
import {decode} from 'html-entities';
// import { Html5Entities } from 'html-entities';

function Question({ dataAPI, amountValue }) {
  const [qurrentQuestions, setQurrentQuestions] = useState(0); //индекс элемента массива
  const [gameEnd, setGameEnd] = useState(false);
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);

  const handleAnswersClick = (answer) => {
    console.log(answer, dataAPI[qurrentQuestions].correct_answer);
    if (answer === dataAPI[qurrentQuestions].correct_answer) {
      setScore(score + 1);
    }

    const nextQuestion = qurrentQuestions + 1;
    if (nextQuestion < dataAPI.length) {
      setQurrentQuestions(nextQuestion);
    } else {
      setGameEnd(true);
    }
  };

  if (!dataAPI || dataAPI.length === 0) {
    return <div className="no-questions">No questions available</div>;
  } 

  const decodeText = (text) => {
    return decode(text);
  };

  const updateGameTime = (time) => {
    setGameTime(time);
  };

  return (
    <div className="game">
      {gameEnd ? (
        <div className="results">
          <h1>Игра окончена</h1>
          <p>
            Ваш счёт: {score}/{dataAPI.length}
          </p>
          <p>Время прохождения: {gameTime} секунд</p>
        </div>
      ) : (
        <div className="game-conteiner">
          <Timer initialTime={60} timerStop={setGameEnd} updateGameTime={updateGameTime} />
          <div className="game-block">
            <div className="question-section">
              <div className="question-count">
                <h2>Question {qurrentQuestions+1}/{amountValue}</h2>
              </div>
              <p id="text_ti">{decodeText(dataAPI[qurrentQuestions].question)}</p>
            </div>
            <div className="answers-list">
              {[
                ...dataAPI[qurrentQuestions].incorrect_answers,
                dataAPI[qurrentQuestions].correct_answer,
              ].map((answer) => (
                <button
                  className="answer-but"
                  key={answer}
                  onClick={() => handleAnswersClick(answer)}
                >
                  {decodeText(answer)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Question;
