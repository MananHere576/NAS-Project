// src/components/Folder4/Index.js
import React, { useState, useEffect } from 'react';
import './style.css'; // Import the corresponding CSS
import questions from './questions'; // Assuming you have a questions.js file for quiz questions

const Folder4 = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [isQuizActive, setIsQuizActive] = useState(true); // Start the quiz immediately
    const [score, setScore] = useState(0);
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);
    const [isAnswerSelected, setIsAnswerSelected] = useState(false); // New state for answer selection

    useEffect(() => {
        let timer;
        if (isQuizActive && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        } else if (timeLeft === 0) {
            handleNextQuestion();
        }
        return () => clearInterval(timer);
    }, [isQuizActive, timeLeft]);

    useEffect(() => {
        handleStartQuiz(); // Reset everything to start the quiz when the component mounts
    }, []);

    const handleStartQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setTimeLeft(15);
        setIsQuizActive(true);
        setIsQuizCompleted(false);
        setIsAnswerSelected(false); // Reset answer selection state
    };

    const handleOptionClick = (isCorrect) => {
        if (isAnswerSelected) return; // Prevent multiple selections
        setIsAnswerSelected(true);
        if (isCorrect) {
            setScore((prev) => prev + 1);
        }
        setTimeout(handleNextQuestion, 1000); // Delay before the next question
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setTimeLeft(15); // Reset timer for the next question
            setIsAnswerSelected(false); // Reset answer selection state for the next question
        } else {
            setIsQuizActive(false);
            setIsQuizCompleted(true);
        }
    };

    const handleReplayQuiz = () => {
        handleStartQuiz(); // Restart quiz using the same function
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div>
            {isQuizActive && (
                <div className="quiz_box activeQuiz">
                    <header>
                        <div className="title">Awesome Quiz Application</div>
                        <div className="timer">
                            <div className="time_left_txt">Time Left:</div>
                            <div className="timer_sec">{timeLeft}</div>
                        </div>
                        <div className="time_line"></div>
                    </header>
                    <section>
                        <div className="que_text">
                            <span>{currentQuestion.question}</span>
                        </div>
                        <div className="option_list">
                            {currentQuestion.options.map((option, index) => (
                                <div
                                    key={index}
                                    className={`option ${isAnswerSelected ? (option.isCorrect ? 'correct' : 'incorrect') : ''}`}
                                    onClick={() => handleOptionClick(option.isCorrect)}
                                >
                                    {option.answer}
                                </div>
                            ))}
                        </div>
                    </section>
                    <footer>
                        <div className="total_que">
                            {`Question ${currentQuestionIndex + 1} of ${questions.length}`}
                        </div>
                        <button className="next_btn" onClick={handleNextQuestion} disabled={!isAnswerSelected}>
                            Next Question
                        </button>
                    </footer>
                </div>
            )}

            {isQuizCompleted && (
                <div className="result_box activeResult">
                    <div className="icon">
                        <i className="fas fa-crown"></i>
                    </div>
                    <div className="complete_text">You've completed the Quiz!</div>
                    <div className="score_text">
                        {`Your Score: ${score} out of ${questions.length}`}
                    </div>
                    <div className="buttons">
                        <button className="restart" onClick={handleReplayQuiz}>Replay Quiz</button>
                        <button className="quit" onClick={() => setIsQuizCompleted(false)}>Quit Quiz</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Folder4;
