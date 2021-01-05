import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainContent from './components/MainContent/MainContent';
import Modal from './components/Modal/Modal';
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
  const user = useSelector((state) => state.user);
  const modal = useSelector((state) => state.modal);

  // shows login form if not logged in
  const isLoggedIn = (type = 'login') => {
    if (!type) {
      return setUserFormVisible(false);
    }
    if (!user) {
      setUserFormType(type);
      setUserFormVisible(true);
      return false;
    }
    setUserFormVisible(false);
    return true;
  };

  useEffect(() => {
    dispatch(initUser());
  }, [dispatch]);

  return (
    <Router>
      {modal && <Modal {...modal} />}
      <Navbar isLoggedIn={isLoggedIn} />
      <Switch>
        <Route path="/" exact>
          <MainContent isLoggedIn={isLoggedIn} />
        </Route>
        <Route path="/r/:subribbit" exact>
          <SubribbitPage isLoggedIn={isLoggedIn} />
        </Route>
        <Route
          path={['/submit', '/r/:subribbit/submit']}
          component={PostForm}
          exact
        />
        <Route path="/r/:subribbit/:id" exact>
          <PostPage isLoggedIn={isLoggedIn} />
        </Route>
        <Route path="/subribbits/create" exact component={SubribbitForm} />
      </Switch>
      {userFormVisible && (
        <UserForm
          isLoggedIn={isLoggedIn}
          userFormRef={userFormRef}
          userFormType={userFormType}
          login={true}
        />
      )}
    </Router>
  );
};

export default App;
