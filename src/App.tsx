import React from 'react';
import { Provider } from "react-redux";
import { store } from "./components/utilities/store";
import { HomeRoutesManager } from './components/home/router/HomeRoutesManager';
import { UniChessTheme } from './theme';

// import static ui elements
import { GlobalStyle } from './default.styled';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Provider store={store}>
          <GlobalStyle theme={UniChessTheme}/>
        <HomeRoutesManager />
      </Provider>
    </React.Fragment>
  );
}

export default App;
