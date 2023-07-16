import './App.css';
import { Switch, Route } from 'react-router-dom'
import Home from './Home';
import Signin from './Signin';
import Signup from './Signup';
import HomeTwo from './HomeTwo';
import HomeThr from './HomeThr';
import About from './About';
import Borrow from './Borrow';
import Author from './Author';
import AutBook from './AutBook';
import MyBook from './MyBook';
import Gen from './Gen';
import Romance from './Romance';
import Search from './Search';
import Fake from './Fake';
import Post from './Post';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/home/page/2" component={HomeTwo} />
        <Route path="/home/page/3" component={HomeThr} />
        <Route path="/about/:id" component={About} />
        <Route path="/borrow/:id" component={Borrow} />
        <Route path="/author" component={Author} />
        <Route path="/autbook/:id" component={AutBook} />
        <Route path="/mybook" component={MyBook} />
        <Route path="/gen/fiction" component={Gen} />
        <Route path="/gen/romance" component={Romance} />
        <Route path="/search/:name" component={Search} />
        <Route path="/home/fake" component={Fake} />
        <Route path="/post" component={Post} />
      </Switch>
    </div>
  );
}

export default App;
