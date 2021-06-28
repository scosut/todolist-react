import React from 'react';
import TodoComponent from './TodoComponent';
import TodosComponent from './TodosComponent';
import FormComponent from './FormComponent';
import NavbarComponent from './NavbarComponent';
import FooterComponent from './FooterComponent';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../App.css';

const MainComponent = (props) => {
  return (
    <TransitionGroup>
      <CSSTransition timeout={1000} classNames='fade' key={props.location.key}>
        <div className="App">
          <NavbarComponent />
          <Switch location={props.location}>
            <Route exact path='/' component={TodosComponent} />
            <Route exact path='/todo/:todoId' component={TodoComponent} />
            <Route exact path='/create'
              render={() => <FormComponent create title='Create Todo' />} />
            <Route exact path='/edit/:todoId'
              render={() => <FormComponent edit title='Edit Todo' />} />
            <Redirect to='/' />
          </Switch>
          <FooterComponent />
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default withRouter(MainComponent);