import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from '~/core/bootstrap';
import App from '~/components/App';
import Home from '~/routes/home';
import { wxConfig } from '~/core/wx';

function render() {
  ReactDOM.render(
    <App>
      <Home />
    </App>,
    document.getElementById('react-root'),
  );
}

bootstrap().then(render);

if (module.hot) {
  module.hot.accept(['~/components/App'], render);
  module.hot.accept(() => window.location.reload(true));
}
