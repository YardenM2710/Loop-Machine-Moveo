import './styles/main.scss';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { AudioPage } from './pages/AudioPage';
function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Switch>
            <Route path="/audio" component={AudioPage} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
