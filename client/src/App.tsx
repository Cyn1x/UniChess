import React from 'react';
import { HomeRoutesManager } from './components/home/router/HomeRoutesManager';
import { UniChessTheme } from './theme';
import { GlobalStyle } from './default.styled';

const App: React.FC = () => {
  return (
    <React.Fragment>
          <GlobalStyle theme={UniChessTheme}/>
        <HomeRoutesManager />
    </React.Fragment>
  );
}

export default App;
