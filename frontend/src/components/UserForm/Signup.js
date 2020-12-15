import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../store/actions/user';
import {
  Form,
  Title,
  TextInput,
  SubmitBtn,
  Bottom,
  SwitchButton,
  Error,
} from './components';

const Signup = ({ showUserForm }) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== passwordRepeat)
      return dispatch({ type: 'SET_ERROR', error: 'Password mismatch' });
    dispatch(signupUser({ username, email, password, passwordRepeat }));
    showUserForm();
  };

  return (
    <Form onSubmit={submitHandler}>
      <Title>Sign up</Title>
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email"
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
      <label>
        <TextInput
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
          type="password"
          placeholder="repeat password"
          required
        />
      </label>
      {error && <Error>{error}</Error>}
      <SubmitBtn>SIGN UP</SubmitBtn>
      <Bottom>
        Already have an account?{' '}
        <SwitchButton type="button" onClick={() => showUserForm('login')}>
          LOG IN
        </SwitchButton>
      </Bottom>
    </Form>
  );
};

export default Signup;
