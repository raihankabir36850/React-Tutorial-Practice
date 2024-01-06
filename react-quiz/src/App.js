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

const initialState = {
  questionsSet: [],
  index: null,
  points: 0,
  status: 'ready',
};

function reducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case 'overview':
      return { ...state, questionsSet: action.payLoad.questionsSet };
    case 'quizStart':
      return { ...state, status: action.payLoad.status, index: action.payLoad.index };
    case 'loader':
      return { ...state, isLoading: !state.isLoading };
    case 'questionBank':
      return { ...state, totalQuestions: action.payload.totalQuestions, questionsSet: action.payload.questionsSet, isLoading: !state.isLoading };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questionsSet, index, points, status } = state;
  function quizStartHandler() {
    dispatch({ type: 'quizStart', payLoad: { index: 0, status: 'active' } });
  }

  async function getQuestions() {
    //dispatch({ type: 'loader' });
    const res = await fetch('http://localhost:9000/questions');
    const data = await res.json();
    dispatch({ type: 'overview', payLoad: { totalQuestions: data.length, questionsSet: [...data] } });

    //dispatch({ type: 'questionBank', payload: { questionsSet: [...data], totalQuestions: data.length, totalMark } });
  }

  useEffect(function () {
    getQuestions();
  }, []);

  console.log(initialState);

  return (
    <div className='app'>
      <Header />
      <Main>
        {!questionsSet.length && status === 'ready' && <Loader />}
        {questionsSet.length > 0 && status === 'ready' && <Description quizStartHandler={quizStartHandler} totalQuestions={questionsSet.length} />}
        {status === 'active' && (
          <Quiz>
            <ProgressBar questionsSet={questionsSet} index={index} points={points} />
            {questionsSet.length && <Questions selectedQuestion={questionsSet[index]} />}
            <Footer>
              <Timer />
            </Footer>
          </Quiz>
        )}
      </Main>
    </div>
  );
}

export default App;
