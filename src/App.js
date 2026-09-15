import './App.css';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import PublicOnlyRoute from './components/PublicOnlyRoute';
import AdminRoute from './components/AdminRoute';

import LandingPage from './pages/LandingPage';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import CheckEmail from './pages/CheckEmail';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import Library from './pages/Library';
import BookDetail from './pages/BookDetail';
import Borrow from './pages/Borrow';
import AuthorDirectory from './pages/AuthorDirectory';
import AuthorDetail from './pages/AuthorDetail';
import MyLibrary from './pages/MyLibrary';
import Search from './pages/Search';
import GenreDirectory from './pages/GenreDirectory';
import GenreListing from './pages/GenreListing';
import AddBook from './pages/AddBook';

import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Help from './pages/Help';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <Switch>
        {/* Signed-out only: a signed-in visitor is sent straight into the app instead */}
        <PublicOnlyRoute exact path="/" component={LandingPage} />
        <PublicOnlyRoute path="/signin" component={Signin} />
        <PublicOnlyRoute path="/signup" component={Signup} />

        {/* Public */}
        <Route path="/check-email" component={CheckEmail} />
        <Route path="/verify-email/:token" component={VerifyEmail} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password/:uid/:token" component={ResetPassword} />
        <Route exact path="/about" component={About} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/help" component={Help} />

        {/* Library browsing is public, so a signed-out visitor can look around before
            creating an account; borrowing and account-specific pages stay gated. */}
        <Route exact path={['/library', '/library/page/:page']} component={Library} />
        <Route exact path="/library/authors" component={AuthorDirectory} />
        <Route exact path="/library/authors/:id" component={AuthorDetail} />
        <Route exact path="/library/genres" component={GenreDirectory} />
        <Route exact path="/library/genres/:slug" component={GenreListing} />
        <Route exact path="/library/search/:query" component={Search} />
        <Route exact path="/library/books/:num" component={BookDetail} />

        {/* Authenticated app */}
        <ProtectedRoute exact path="/library/mine" component={MyLibrary} />
        <ProtectedRoute exact path="/library/books/:num/borrow" component={Borrow} />

        {/* Admin only: adding to the catalog isn't something any signed-in user should do */}
        <AdminRoute exact path="/library/add-book" component={AddBook} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
