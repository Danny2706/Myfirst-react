import React, { useRef, useState } from "react";
import "./Quiz/Quiz.css";
import { questions } from "../assets/questions";
function Quiz() {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(questions[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  let choice1 = useRef(null);
  let choice2 = useRef(null);
  let choice3 = useRef(null);
  let choice4 = useRef(null);
  let choice_array = [choice1, choice2, choice3, choice4];
  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("Correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("Wrong");
        setLock(true);
        choice_array[question.ans - 1].current.classList.add("Correct");
      }
    }
  };
  const Next = () => {
    if (lock === true) {
      if (index === questions.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(questions[index]);
      setLock(false);
      choice_array.map((choice) => {
        choice.current.classList.remove("Correct");
        choice.current.classList.remove("Wrong");
        return null;
      });
    }
  };
  const reset = () => {
    setIndex(0);
    setQuestion(questions[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };
  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <>
          {" "}
          <h2>
            You Scored {score} Out of {questions.length}
          </h2>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li
              ref={choice1}
              onClick={(e) => {
                checkAns(e, 1);
              }}
            >
              {" "}
              {question.choice1}{" "}
            </li>
            <li
              ref={choice2}
              onClick={(e) => {
                checkAns(e, 2);
              }}
            >
              {" "}
              {question.choice2}
            </li>
            <li
              ref={choice3}
              onClick={(e) => {
                checkAns(e, 3);
              }}
            >
              {" "}
              {question.choice3}
            </li>
            <li
              ref={choice4}
              onClick={(e) => {
                checkAns(e, 4);
              }}
            >
              {" "}
              {question.choice4}
            </li>
          </ul>
          <button onClick={Next}>Next</button>
          <div className="index">
            {index + 1} of {questions.length} questions
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
