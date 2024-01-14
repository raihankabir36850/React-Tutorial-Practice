import './App.css';
import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Quiz from './components/Quiz';
import Description from './components/Description';
import ProgressBar from './components/ProgressBar';
import Footer from './components/Footer';
import Timer from './components/Timer';
import Questions from './components/Questions';
import Loader from './components/Loader';
import Button from './components/Button';
import FinishScreen from './components/FinishScreen';

const initialState = {
  questionsSet: [],
  index: 0,
  points: 0,
  status: 'ready',
  answer: null,
  highestScore: 0,
  remainingSeconds: null,
};

function reducer(state, action) {
  console.log(state);
  switch (action.type) {
    case 'overview':
      return { ...state, questionsSet: action.payLoad.questionsSet };
    case 'quizStart':
      return { ...state, status: action.payLoad.status, remainingSeconds: 30 };
    case 'optionClick':
      return { ...state, answer: action.payLoad.answer, points: state.points + action.payLoad.points };
    case 'nextButtonClick':
      return { ...state, answer: null, index: state.index++ };
    case 'finished':
      return { ...state, status: 'finished', highestScore: state.points > state.highestScore ? state.points : state.highestScore };
    case 'restartQuiz':
      return { ...state, status: 'ready', index: 0, points: 0, answer: null };
    case 'timer':
      console.log('timer');
      return { ...state, remainingSeconds: state.remainingSeconds === 0 ? null : state.remainingSeconds - 1, status: state.remainingSeconds === 0 ? 'finished' : state.status };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questionsSet, index, points, status, answer, highestScore, remainingSeconds } = state;

  const totalPoints = [...questionsSet].reduce((accumulater, currentValue) => accumulater + currentValue.points, 0);

  function quizStartHandler() {
    dispatch({ type: 'quizStart', payLoad: { index: index, status: 'active' } });
  }

  async function getQuestions() {
    const res = await fetch('http://localhost:9000/questions');
    const data = await res.json();
    dispatch({ type: 'overview', payLoad: { totalQuestions: data.length, questionsSet: [...data] } });
  }

  useEffect(function () {
    getQuestions();
  }, []);

  return (
    <div className='app'>
      <Header />
      <Main>
        {!questionsSet.length && <Loader />}
        {questionsSet.length > 0 && status === 'ready' && <Description quizStartHandler={quizStartHandler} totalQuestions={questionsSet.length} />}
        {status === 'active' && (
          <Quiz>
            <ProgressBar questionsSet={questionsSet} index={index} points={points} answer={answer} totalPoints={totalPoints} />
            {questionsSet.length && <Questions selectedQuestion={questionsSet[index]} dispatch={dispatch} actualPoints={points} answer={answer} />}
            <Footer>
              <Timer remainingSeconds={remainingSeconds} dispatch={dispatch} />
              {answer !== null && <Button index={index} totalQuestions={questionsSet.length} dispatch={dispatch} />}
            </Footer>
          </Quiz>
        )}
        {status === 'finished' && <FinishScreen points={points} totalPoints={totalPoints} highestScore={highestScore} dispatch={dispatch} />}
      </Main>
    </div>
  );
}

export default App;
