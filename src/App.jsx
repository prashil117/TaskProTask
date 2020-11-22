import './App.css';
import { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import User from './Screens/UserList';
import Accounts from './Screens/applist';
class App extends Component {
  render() {
    return (
      <Router>
        <Redirect to="userList" />
        <Switch>
          <Route exact path="/userList" component={User}>
          </Route>
          <Route exact path="/Apps" component={Accounts}>
          </Route>
        </Switch>
      </Router>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
  }
}
function mapStateToDispatch(state) {
  return {
    user: state.user,
  }
}
export default connect(mapStateToProps, mapStateToDispatch)(App)