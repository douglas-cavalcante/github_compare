import React from 'react';
import { Container, Repository } from './styles';

const CompareList = () => (
  <Container>
    <Repository>
      <header>
        <img src="" alt="" />
        <strong>React</strong>
        <small>Facebook</small>
      </header>
      <ul>
        <li>
          95,343 <small>stars</small>
        </li>
        <li>
          95,343 <small>forks</small>
        </li>
        <li>
          95,343 <small>issues</small>
        </li>
        <li>
          95,343 <small>last commit</small>
        </li>
      </ul>
    </Repository>
  </Container>
);

export default CompareList;
