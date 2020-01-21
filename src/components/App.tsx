import React from 'react';
import './App.css';

interface IAppProps {}

const App: React.SFC<IAppProps> = ({ children }) => {
  return <>{children}</>;
};

App.defaultProps = {};

export default App;
