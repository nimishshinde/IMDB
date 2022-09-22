import "./App.css";
import NavBar from "./components/NavBar";
import Banner from "./components/Banner";
import Trending from "./components/Trending";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favourites from "./components/Favourites";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Trending />
            </>
          }
        />

        <Route
          path="/favourites"
          element={
            <>
              <Favourites />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
