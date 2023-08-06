import ReactDOM from 'react-dom/client';
import App from './App';
import Header from './layout/Header';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <App />
    </BrowserRouter>
  </Provider>
);
