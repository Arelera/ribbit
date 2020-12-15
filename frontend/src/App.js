import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainContent from './components/MainContent/MainContent';
import Navbar from './components/Navbar/Navbar';
import PostPage from './components/PostPage/PostPage';
import UserForm from './components/UserForm/UserForm';
import useVisible from './hooks/useVisible';

const App = () => {
  const [userFormVisible, setUserFormVisible, userFormRef] = useVisible();
  const [userFormType, setUserFormType] = useState('login');

  const showUserForm = (type) => {
    if (!type) return setUserFormVisible(false);

    setUserFormType(type);
    setUserFormVisible(true);
  };

  return (
    <Router>
      <Navbar showUserForm={showUserForm} />
      <Switch>
        <Route path="/" exact component={MainContent} />
        <Route path="/r/:subreddit/:id" exact component={PostPage} />
      </Switch>
      {userFormVisible && (
        <UserForm
          showUserForm={showUserForm}
          userFormRef={userFormRef}
          userFormType={userFormType}
          login={true}
        />
      )}
    </Router>
  );
};

export default App;
