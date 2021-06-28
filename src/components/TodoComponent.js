import React, { Component } from 'react';
import { Container, Badge, Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAlert, fetchTodo, deleteTodo } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    todo: state.todo,
    redirect: state.redirect
  };
};

const mapDispatchToProps = {
  clearAlert: () => clearAlert(),
  fetchTodo: (todoId) => fetchTodo(todoId),
  deleteTodo: (todoId) => deleteTodo(todoId)
};

class TodoComponent extends Component {
  componentDidMount() {
    this.props.clearAlert();

    const todoId = this.props.match.params.todoId;

    if (todoId) {
      this.props.fetchTodo(todoId);
    }
  }

  handleClick = () => {
    this.props.deleteTodo(this.props.todo.todo.id);
  }

  render() {
    if (this.props.redirect.url) {
      return <Redirect to={this.props.redirect.url} />;
    }
    else {
      return (
        <Container>
          <Link to='/' className='btn btn-secondary'>Go Back</Link>
          <h1>{this.props.todo.todo.text}</h1>
          <Badge color="danger" className="ml-3">{this.props.todo.todo.due}</Badge>
          <hr />
          <p>{this.props.todo.todo.body}</p>
          <div className="d-flex justify-content-between">
            <Link to={`/edit/${this.props.todo.todo.id}`} className='btn btn-secondary'>Edit</Link>
            <Button color="danger" onClick={() => this.handleClick()}>Delete</Button>
          </div>
        </Container>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoComponent);