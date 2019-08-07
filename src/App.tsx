import React from 'react';
import HomeRoutes from './components/routes/managers/HomeRoutesManager';

// import static ui elements
import { GlobalStyle } from './default.styled';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
        <HomeRoutes />
    </React.Fragment>
  );
}

export default App;
