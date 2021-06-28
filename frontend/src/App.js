import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Container} from "@material-ui/core"

import Book from './pages/Book';
import Auth from "./pages/Auth";

function App() {
  return (
    <Container>
      <Router>
        <Route path='/' exact component={Auth} />
        <Route path='/books' exact component={Book} />
      </Router>
      </Container>
  );
}

export default App;
