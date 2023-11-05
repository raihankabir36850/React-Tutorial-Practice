import { useState } from "react";
import { tempMovieData, tempWatchedData } from "./Data";
import NavComponent from "./Component/NavComponent/NavComponent";
import SearchBar from "./Component/NavComponent/SearchBar";
import NumResults from "./Component/NavComponent/NumResults";
import Box from "./Component/Box/Box";
import MovieLists from "./Component/Box/MovieLists";
import WatchMovieLists from "./Component/Box/WatchMovieLists";
import "./App.css";

function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavComponent>
        <SearchBar />
        <NumResults movies={movies} />
      </NavComponent>
      <div className="main">
        <Box>
          <MovieLists movies={movies} />
        </Box>
        <Box>
          <WatchMovieLists watched={watched} />
        </Box>
      </div>
    </>
  );
}

export default App;
