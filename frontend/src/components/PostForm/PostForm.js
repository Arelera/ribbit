import { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form``;

const InputText = styled.input``;

const Textarea = styled.textarea``;

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <Form>
      <label>
        <InputText
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></Textarea>
      </label>
    </Form>
  );
};

export default PostForm;
