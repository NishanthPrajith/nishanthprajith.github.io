import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 4rem;
  justify-content: center;
`;

export const UpgradePendingText = styled.p`
  font-size: 1rem;
  color: #fff;
  font-weight: 500;
`;
