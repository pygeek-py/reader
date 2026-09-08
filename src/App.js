import './App.css';
import { Switch, Route } from 'react-router-dom'
import Home from './Home';
import Signin from './Signin';
import Signup from './Signup';
import About from './About';
import Borrow from './Borrow';
import Author from './Author';
import AutBook from './AutBook';
import MyBook from './MyBook';
import Genre from './Genre';
import Search from './Search';
import Post from './Post';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <ProtectedRoute path="/home/page/:page" component={Home} />
        <Route path="/about/:id" component={About} />
        <ProtectedRoute path="/borrow/:id" component={Borrow} />
        <Route path="/author" component={Author} />
        <Route path="/autbook/:id" component={AutBook} />
        <ProtectedRoute path="/mybook" component={MyBook} />
        <Route path="/gen/:genre" component={Genre} />
        <Route path="/search/:name" component={Search} />
        <ProtectedRoute path="/post" component={Post} />
      </Switch>
    </div>
  );
}

export default App;
