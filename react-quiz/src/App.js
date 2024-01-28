import { useQuiz } from './contexts/QuizContext';
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
import './App.css';

function App() {
  const { status, answer } = useQuiz();

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'ready' && <Description />}
        {status === 'active' && (
          <Quiz>
            <ProgressBar />
            <Questions />
            <Footer>
              <Timer />
              {answer !== null && <Button />}
            </Footer>
          </Quiz>
        )}
        {status === 'finished' && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
