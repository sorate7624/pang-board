import ReactDOM from 'react-dom/client';
import App from './App';
import Header from './layout/Header';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Header />
    <App />
  </BrowserRouter>
);
