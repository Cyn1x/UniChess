import React from 'react';
import HomeRoutesManager from './components/routes/managers/HomeRoutesManager';
import { UniChessTheme } from './theme';

// import static ui elements
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
