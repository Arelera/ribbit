import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/actions/user';
import {
  Form,
  Title,
  TextInput,
  SubmitBtn,
  Bottom,
  SwitchButton,
  Error,
} from './components';

const Login = ({ showUserForm }) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password })).then((res) => {
      if (!res?.error) {
        showUserForm();
      }
    });
  };

  return (
    <Form onSubmit={submitHandler}>
      <Title>Login</Title>
      <label>
        <TextInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
          required
        />
      </label>
      <label>
        <TextInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          required
        />
      </label>
      {error && <Error>{error}</Error>}
      <SubmitBtn type="submit">LOG IN</SubmitBtn>
      <Bottom>
        New to Ribbit?{' '}
        <SwitchButton type="button" onClick={() => showUserForm('signup')}>
          SIGN UP
        </SwitchButton>
      </Bottom>
    </Form>
  );
};

export default Login;
