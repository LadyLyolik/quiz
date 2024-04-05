import {useEffect, useState } from "react";
import "./Form.css";
import Question from "../Questions/Questions";

function QuizForm() {
  const [settings, setSettings] = useState(null);
  const [categoryValue, setCategoryValue] = useState("");
  const [levelValue, setLevelValue] = useState("");
  const [dataAPI, setDataAPI] = useState(null);
  const [questionBlock, setQuestionBlock] = useState(false);

  const amountValue = 30

  useEffect(()=>{

    fetch("https://opentdb.com/api_category.php")
      .then((response) => response.json())
      .then((response) => {
        setSettings(response.trivia_categories);
      });
    }, []);

  const levelData = ["easy", "medium", "hard"];

  const handleStart = () => {
    fetch(
      `https://opentdb.com/api.php?amount=${amountValue}&category=${categoryValue}&difficulty=${levelValue}&type=multiple`
    )
      .then((response) => response.json())
      .then((data) => {
        setDataAPI(data.results);
        setQuestionBlock(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className="quizz-body">
      {questionBlock ? (
        <Question dataAPI={dataAPI} amountValue={amountValue}/>
      ) : (
        <div className="options-choose">
          <div className="category-choose">
            <label htmlFor="category-select">Category:</label>
            {/* categoryValue - будет содержать значение выбранной категории вопросов, так как при нажатии срабатывает событие setCategoryValue и в categoryValue передаётся значение выбранной категории */}
            <select
              id="category-select"
              value={categoryValue}
              onChange={(e) => setCategoryValue(e.target.value)}
            >
              {/* <option className="selected">Choose category</option> */}
              {settings &&
                settings.map((setting) => (
                  <option value={setting.id} key={setting.id}>
                    {setting.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="level-choose">
            <label htmlFor="level-select">Level:</label>
            <select
              id="level-select"
              value={levelValue}
              onChange={(t) => setLevelValue(t.target.value)}
            >
              {/* <option className="selected">Choose level</option> */}
              
              {levelData.map((level) => (
                <option value={level.id} key={level.id}>
                  {level}
                </option>
              ))}
            </select>
            <h2>{levelValue}</h2>
          </div>
          <button onClick={handleStart}>Начать игру</button>
        </div>
      )}
    </div>
  );
}

export default QuizForm;
