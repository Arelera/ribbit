import { BrowserRouter as Router } from 'react-router-dom';
import MainContent from './components/MainContent/MainContent';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <MainContent />
    </Router>
  );
};

export default App;
