import React from 'react';
import {AnswerObject} from '../App';

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject;
    questionNumber: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({ answers, question, callback, userAnswer, questionNumber, totalQuestions }) => (
    <div>
        <p className="number">
            Question: {questionNumber} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question }} />
        <div>
            {answers.map((answer,index) => (
                <div key={index}>
                    <button
                        value={answer} 
                        disabled={userAnswer ? true : false} 
                        onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer}} />
                    </button>
                </div>
            ))}
        </div>
    </div>
)

export default QuestionCard