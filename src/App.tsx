import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { Navigation } from './components/Navigation.tsx';
import { GlobalLoader } from './components/GlobalLoader.tsx';
import { Home } from './pages/Home.tsx';
import { Users } from './pages/Users.tsx';
import { About } from './pages/About.tsx';
import { Contact } from './pages/Contact.tsx';
import { Fabrics } from './pages/Fabrics.tsx';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Navigation />
          <GlobalLoader />
          <div className="max-w-4xl mx-auto py-8 px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/fabrics" element={<Fabrics />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
