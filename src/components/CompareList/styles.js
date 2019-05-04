import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 30px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin: 10px 10px;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }
      &:nth-child(2n-1) {
        background-color: #f5f5f5;
      }
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 30px;

  button {
    padding: 10px;
    width: 60px;

    &:hover {
      background: #ccc;
    }
  }
`;
