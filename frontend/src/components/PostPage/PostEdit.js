import { useState } from 'react';
import styled, { css } from 'styled-components';
import Button from '../reusable/Button';
import Button2 from '../reusable/Button2';

const Container = styled.div`
  padding-top: 8px;
`;

const Editarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 8px 16px;
  border-radius: 4px;
  resize: vertical;
  ${({ theme }) =>
    css`
      ${theme.box()}
      font-size: ${theme.fontMed};
      color: ${theme.gray0};
    `}
`;

const Bottom = styled.div`
  width: 100%;
  margin-top: 8px;
  display: flex;
  justify-content: flex-end;
`;

const SaveBtn = styled(Button)`
  padding: 4px 16px;
  width: 90px;
`;

const CancelBtn = styled(Button2)`
  padding: 4px 16px;
  border: none;
`;

const PostEdit = ({ content, editHandler, cancel }) => {
  const [editContent, setEditContent] = useState(content);

  return (
    <Container>
      <Editarea
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
      ></Editarea>
      <Bottom>
        <CancelBtn onClick={cancel}>CANCEL</CancelBtn>
        <SaveBtn onClick={() => editHandler(editContent)}>SAVE</SaveBtn>
      </Bottom>
    </Container>
  );
};

export default PostEdit;
