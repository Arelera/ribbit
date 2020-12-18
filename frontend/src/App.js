import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainContent from './components/MainContent/MainContent';
import Navbar from './components/Navbar/Navbar';
import PostForm from './components/PostForm/PostForm';
import PostPage from './components/PostPage/PostPage';
import SubribbitForm from './components/SubribbitForm/SubribbitForm';
import SubribbitPage from './components/SubribbitPage/SubribbitPage';
import UserForm from './components/UserForm/UserForm';
import useVisible from './hooks/useVisible';
import { initUser } from './store/actions/user';

const App = () => {
  const dispatch = useDispatch();
  const [userFormVisible, setUserFormVisible, userFormRef] = useVisible();
  const [userFormType, setUserFormType] = useState('login');

  const showUserForm = (type) => {
    if (!type) return setUserFormVisible(false);
    setUserFormType(type);
    setUserFormVisible(true);
  };

  useEffect(() => {
    dispatch(initUser());
  }, [dispatch]);

  return (
    <Router>
      <Navbar showUserForm={showUserForm} />
      <Switch>
        <Route path="/" exact component={MainContent} />
        <Route path="/r/:subribbit" exact component={SubribbitPage} />
        <Route path="/r/:subribbit/submit" exact component={PostForm} />
        <Route path="/r/:subribbit/:id" exact>
          <PostPage showUserForm={showUserForm} />
        </Route>
        <Route path="/subribbits/create" exact component={SubribbitForm} />
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
