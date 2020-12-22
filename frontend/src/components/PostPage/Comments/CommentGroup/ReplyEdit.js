import { useState } from 'react';
import styled, { css } from 'styled-components';
import Button from '../../../reusable/Button';
import Button2 from '../../../reusable/Button2';

const Box = styled.div`
  width: 100%;
  min-height: 20px;
  margin: 8px 0 16px 0;
  padding-left: 22px;
  border-left: 1px solid ${({ theme }) => theme.postBorder};
`;

const Replyarea = styled.textarea`
  width: 100%;
  background: red;
  padding: 8px 16px;
  resize: vertical;
  min-height: 100px;
  border-radius: 4px 4px 0 0;
  color: inherit;
  ${({ theme }) =>
    css`
      ${theme.box()}
      font-size: ${theme.fontMed};
    `}

  border-bottom: none;
  display: block;
`;

const ReplyBar = styled.div`
  width: 100%;
  border-radius: 0 0 4px 4px;
  padding: 4px 8px;
  ${({ theme }) =>
    css`
      ${theme.box()}
      background: ${theme.gray3};
    `}
  border-top: none;
`;

const ReplyBtn = styled(Button)`
  padding: 3px 10px;
  width: 96px;
  margin-right: 10px;
`;

const CancelBtn = styled(Button2)`
  padding: 3px 10px;
  width: 96px;
  border: none;
`;

const ReplyEdit = ({ replyEditHandler, collapseReply, isReply, content }) => {
  const [replyContent, setReplyContent] = useState(isReply ? '' : content);
  return (
    <Box>
      <Replyarea
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        placeholder="What are your thoughts?"
      ></Replyarea>
      <ReplyBar>
        <ReplyBtn onClick={() => replyEditHandler(replyContent)}>
          {isReply ? 'REPLY' : 'SAVE EDITS'}
        </ReplyBtn>
        <CancelBtn onClick={collapseReply}>CANCEL</CancelBtn>
      </ReplyBar>
    </Box>
  );
};

export default ReplyEdit;
