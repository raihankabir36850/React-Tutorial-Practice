import { createContext, useContext, useReducer, useEffect } from 'react';

const QuizContext = createContext();

const initialState = {
  questionsSet: [],
  index: 0,
  points: 0,
  status: 'ready',
  answer: null,
  highestScore: 0,
  remainingSeconds: null,
};

const BASE_URL = 'http://localhost:9000';

function reducer(state, action) {
  switch (action.type) {
    case 'overview':
      return { ...state, questionsSet: action.payLoad.questionsSet };
    case 'quizStart':
      return { ...state, status: action.payLoad.status, remainingSeconds: state.questionsSet.length * 30 };
    case 'optionClick':
      return { ...state, answer: action.payLoad.answer, points: state.points + action.payLoad.points };
    case 'nextButtonClick':
      return { ...state, answer: null, index: state.index++ };
    case 'finished':
      return { ...state, status: 'finished', highestScore: state.points > state.highestScore ? state.points : state.highestScore, remainingSeconds: null };
    case 'restartQuiz':
      return { ...state, status: 'ready', index: 0, points: 0, answer: null };
    case 'timer':
      console.log('timer');
      return { ...state, remainingSeconds: state.remainingSeconds === 0 ? null : state.remainingSeconds - 1, status: state.remainingSeconds === 0 ? 'finished' : state.status };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function QuizProvider({ children }) {
  const [{ questionsSet, index, points, status, answer, highestScore, remainingSeconds }, dispatch] = useReducer(reducer, initialState);

  function quizStartHandler() {
    dispatch({ type: 'quizStart', payLoad: { index: index, status: 'active' } });
  }

  async function getQuestions(URL) {
    const res = await fetch(`${BASE_URL}/${URL}`);
    const data = await res.json();
    dispatch({ type: 'overview', payLoad: { totalQuestions: data.length, questionsSet: [...data] } });
  }

  useEffect(function () {
    getQuestions('questions');
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questionsSet,
        index,
        points,
        status,
        answer,
        highestScore,
        remainingSeconds,
        dispatch,
        quizStartHandler,
        getQuestions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);

  if (context === undefined) {
    throw new Error("It's not wrapped with QuizProvider context.");
  }

  return context;
}

export { QuizProvider, useQuiz };
