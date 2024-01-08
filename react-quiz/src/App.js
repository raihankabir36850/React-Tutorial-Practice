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

const initialState = {
  questionsSet: [],
  index: 0,
  points: 0,
  status: 'ready',
  answer: null,
};

function reducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case 'overview':
      return { ...state, questionsSet: action.payLoad.questionsSet };
    case 'quizStart':
      return { ...state, status: action.payLoad.status };
    case 'optionClick':
      return { ...state, answer: action.payLoad.answer, points: state.points + action.payLoad.points };
    case 'nextButtonClick':
      return { ...state, answer: null, index: state.index++ };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questionsSet, index, points, status, answer } = state;
  function quizStartHandler() {
    dispatch({ type: 'quizStart', payLoad: { index: index, status: 'active' } });
  }

  async function getQuestions() {
    //dispatch({ type: 'loader' });
    const res = await fetch('http://localhost:9000/questions');
    const data = await res.json();
    dispatch({ type: 'overview', payLoad: { totalQuestions: data.length, questionsSet: [...data] } });

    //dispatch({ type: 'questionBank', payload: { questionsSet: [...data], totalQuestions: data.length, totalMark } });
  }

  function nextButtonHandler() {
    dispatch({ type: 'nextButtonClick', payload: { index: index, answer: null } });
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
            <ProgressBar questionsSet={questionsSet} index={index} points={points} answer={answer} />
            {questionsSet.length && <Questions selectedQuestion={questionsSet[index]} dispatch={dispatch} actualPoints={points} answer={answer} />}
            <Footer>
              <Timer />
              {answer !== null && <Button nextButtonHandler={nextButtonHandler} />}
            </Footer>
          </Quiz>
        )}
      </Main>
    </div>
  );
}

export default App;
