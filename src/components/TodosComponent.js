import React, { Component } from 'react';
import { Alert, Container, Card, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearRedirect, fetchTodos } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    alert: state.alert,
    todos: state.todos
  };
};

const mapDispatchToProps = {
  clearRedirect: () => clearRedirect(),
  fetchTodos: () => fetchTodos()
};

class TodosComponent extends Component {
  componentDidMount() {
    this.props.fetchTodos();
    this.props.clearRedirect();
  }

  render() {
    return (
      <Container>
        {this.props.alert.message.length > 0 &&
          <Alert color={this.props.alert.status}>
            {this.props.alert.message}
          </Alert>
        }

        <h1>Todos</h1>

        {this.props.todos.errMess.length > 0 &&
          <p>{this.props.todos.errMess}</p>
        }

        {this.props.todos.todos.length === 0 &&
          <p>No Todos have been submitted.</p>
        }

        {this.props.todos.todos.length > 0 &&
          this.props.todos.todos.map(todo => {
            return (
              <Card className="sidebar" key={todo.id}>
                <CardBody>
                  <CardTitle tag="h3">
                    <Link to={`/todo/${todo.id}`}>{todo.text}</Link>
                    <span className="badge badge-danger ml-3">{todo.due}</span>
                  </CardTitle>
                </CardBody>
              </Card>
            )
          })
        }
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodosComponent);