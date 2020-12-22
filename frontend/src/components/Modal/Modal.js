import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import XIcon from '../../icons/XIcon';
import Button from '../reusable/Button';
import Button2 from '../reusable/Button2';

const Container = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(28, 28, 28, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  max-width: 538px;
  min-width: 410px;
  border-radius: 4px;
  ${({ theme }) => theme.box()}
`;

const Top = styled.header`
  padding: 16px;
  ${({ theme }) =>
    css`
      border-bottom: 1px solid ${theme.postBorder};
    `};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-weight: 600;
  ${({ theme }) =>
    css`
      color: ${theme.gray0};
      font-size: ${theme.fontLarge};
    `};
`;

const Msg = styled.p`
  padding: 16px;
  ${({ theme }) =>
    css`
      color: ${theme.gray0};
      font-size: ${theme.fontMed};
    `};
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  height: 20px;
  width: 20px;
  color: ${({ theme }) => theme.gray2};
`;

const Buttons = styled.footer`
  padding: 16px;
  background: ${({ theme }) => theme.gray3};
  display: flex;
  justify-content: flex-end;
`;

const AcceptBtn = styled(Button)`
  margin-left: 8px;
  padding: 3px 16px;
`;

const CancelBtn = styled(Button2)`
  padding: 3px 16px;
`;

const Modal = ({
  modalRef,
  title,
  msg,
  acceptHandler,
  acceptBtn,
  cancelBtn,
}) => {
  const dispatch = useDispatch();
  const close = () => {
    dispatch({ type: 'CLEAR_MODAL' });
  };

  return createPortal(
    <Container onClick={close}>
      <ModalBox ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <Top>
          <Title>{title}</Title>
          <CloseBtn onClick={close}>
            <XIcon />
          </CloseBtn>
        </Top>
        <Msg>{msg}</Msg>
        <Buttons>
          <CancelBtn onClick={close}>{cancelBtn}</CancelBtn>
          <AcceptBtn onClick={acceptHandler}>{acceptBtn}</AcceptBtn>
        </Buttons>
      </ModalBox>
    </Container>,
    document.getElementById('modal')
  );
};

export default Modal;
