import Header from './shared/components/header/Header';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './shared/routes/routes';
import Providers from './context/Providers';

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Header text="PhotoShare" />
        <AppRoutes />
      </BrowserRouter>
    </Providers>
  );
}

export default App;
