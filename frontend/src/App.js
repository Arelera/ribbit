import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainContent from './components/MainContent/MainContent';
import Navbar from './components/Navbar/Navbar';
import PostPage from './components/PostPage/PostPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={MainContent} />
        <Route path="/r/:subreddit/:id" exact component={PostPage} />
      </Switch>
    </Router>
  );
};

export default App;
