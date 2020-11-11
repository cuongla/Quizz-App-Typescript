import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import {fetchQuizQuestions, Difficulty} from './API';

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers,setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));

  const startTrvia = async () => {

  }

  const checkAnswer = (e: React.MouseEvent<HTMLBRElement>) => {

  }

  const nextQuestion = () => {

  }

  return (
    <div className="App">
      <h1>Typescript Quiz</h1>
      <button
        className="start"
        onClick={startTrvia}
      >Start
      </button>
      <p className="score">Score: </p>
      <p>Loading Qurstion...</p>
      {/* <QuestionCard 
        questionNumber={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer = {userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      /> */}
      <button className="next" onClick={nextQuestion}>Next Question</button>
    </div>
  );
}

export default App;
