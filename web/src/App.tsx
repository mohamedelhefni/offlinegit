import './App.css'
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Home from './pages/Home';
import Layout from './pages/Layout';
import Repo from "./components/Repo"
import { NoMatch } from './components/NoMatch';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/repo/:repoId' element={<Repo />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
