import { useHistory, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

const Div = styled.div`
  ${({ theme }) => theme.box()}
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 4px;
`;

const InputText = styled.input`
  border-radius: 4px;
  line-height: 21px;
  padding: 0 16px;
  height: 38px;
  width: 100%;
  ${({ theme }) =>
    css`
      font-size: ${theme.fontMed};
      color: ${theme.gray0};
      border: 1px solid ${theme.postBorder};
      background: ${theme.gray3};
    `}
`;

const PostFormRedirect = () => {
  const history = useHistory();
  const { subribbit } = useParams();

  return (
    <Div>
      <InputText
        onFocus={() =>
          history.push(subribbit ? `/r/${subribbit}/submit` : '/submit')
        }
        type="text"
        value=""
        placeholder="Create Post"
      />
    </Div>
  );
};

export default PostFormRedirect;
