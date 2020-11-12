import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { QuestionState, fetchQuizQuestions, Difficulty, Question } from './API';

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

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
    } catch (e) {
      console.log(e);
    }
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver) {
      // user answer
      const answer = e.currentTarget.value;
      // check answer agaomst correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if(correct) setScore(prev => prev + 1);
      // save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    
  }

  return (
    <div className="App">
      <h1>Typescript Quiz</h1>
      {/* Start Button */}
      {
        gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button
            className="start"
            onClick={startTrivia}>
            Start
          </button>
        ) : null
      }

      {/* Score and Loading */}
      {!gameOver ? <p className="score">Score:</p> : null}
      {loading && <p>Loading question...</p>}

      {/* Questions */}
      {!loading && !gameOver && (
        <QuestionCard
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}

      {/* Next Button */}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <button
          className="next"
          onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </div>
  );
}

export default App;
