import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { QuestionsState, fetchQuizQuestions, Difficulty } from './API';
//style
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);
  const [warningText, setWarningText] = useState("");

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
      try {
        setQuestions(newQuestions);
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);
      } catch(e) {
        console.error(e);
      }
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) {
        setScore((prev) => prev + 1);
        setIsCorrect(true);
        setWarningText("You are correct")
      } else {
        setIsCorrect(false);
        setWarningText("You are wrong")
      }
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
      setWarningText("")
    }
  };


  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT TS QUIZ</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button 
            className='start' 
            onClick={startTrivia}>
            {!gameOver ? "ReStart" : "Start"}
          </button>
        ) : null}
        {!gameOver ? <p className='score'>Score: {score}</p> : null}
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers && userAnswers[number]}
            callback={checkAnswer}
          />
        )}
        <p style={{ 
            color: !isCorrect ? "red" : "green", 
            fontWeight: "bold"
          }}>{warningText}</p>
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button 
            className='next' 
            onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
}

export default App;
