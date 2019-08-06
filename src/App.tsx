import React from 'react';
import Auth from './utilities/auth/Auth';

// import static ui elements
import { GlobalStyle } from './default.styled';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
        <Auth />
    </React.Fragment>
  );
}

export default App;
