import {Switch, Route, Redirect} from 'react-router-dom'
import NotFound from './components/NotFound'
import LoginRoute from './components/LoginRoute'
import Home from './components/Home'
import BookShelves from './components/BookShelves'
import ProtectedRoute from './components/ProtectedRoute'
import BookItemDetails from './components/BookItemDetails'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/shelf" component={BookShelves} />
    <ProtectedRoute exact path="/books/:id" component={BookItemDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
