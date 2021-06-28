import React, { Component } from 'react';
import {
  Container,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Button
} from 'reactstrap';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAlert, clearInput, setInput, clearErrors, fetchTodo, postTodo, putTodo } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    input: state.input,
    errors: state.errors,
    todo: state.todo,
    redirect: state.redirect
  };
};

const mapDispatchToProps = {
  clearAlert: () => clearAlert(),
  clearInput: () => clearInput(),
  setInput: e => setInput(e),
  clearErrors: () => clearErrors(),
  fetchTodo: (todoId, inputFlag) => fetchTodo(todoId, inputFlag),
  postTodo: (text, body, due, refs) => postTodo(text, body, due, refs),
  putTodo: (todoId, text, body, due, refs) => putTodo(todoId, text, body, due, refs),
};

class FormComponent extends Component {
  componentDidMount = () => {
    this.props.clearAlert();
    this.props.clearInput();
    this.props.clearErrors();

    const todoId = this.props.match.params.todoId;

    if (todoId) {
      this.props.fetchTodo(todoId, true);
    }
  }

  handleInput = e => {
    this.props.setInput(e);
  }

  handleClick = () => {
    const refs = {
      text: this.textInput,
      body: this.bodyInput,
      due: this.dueInput
    };

    if (this.props.create) {
      this.props.postTodo(this.props.input.text, this.props.input.body, this.props.input.due, refs);
    }

    if (this.props.edit) {
      this.props.putTodo(this.props.todo.todo.id, this.props.input.text, this.props.input.body, this.props.input.due, refs);
    }
  }

  render() {
    if (this.props.redirect.url) {
      return <Redirect to={this.props.redirect.url} />;
    }
    else {
      return (
        <Container>
          <h1>{this.props.title}</h1>

          <Form>
            <FormGroup>
              <Label for="text">Text</Label>
              <Input type="text" name="text" id="text" placeholder="Enter text" ref={el => (this.textInput = el)} invalid={this.props.errors.errors.hasOwnProperty('text')} onChange={e => this.handleInput(e)} value={this.props.input.text} />
              <FormFeedback>
                {this.props.errors.errors.hasOwnProperty('text') ? this.props.errors.errors.text[0] : ''}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="body">Body</Label>
              <Input type="textarea" name="body" id="body" placeholder="Enter body" ref={el => (this.bodyInput = el)} invalid={this.props.errors.errors.hasOwnProperty('body')} onChange={e => this.handleInput(e)} value={this.props.input.body} />
              <FormFeedback>
                {this.props.errors.errors.hasOwnProperty('body') ? this.props.errors.errors.body[0] : ''}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="due">Due</Label>
              <Input type="text" name="due" id="due" placeholder="Enter due" ref={el => (this.dueInput = el)} invalid={this.props.errors.errors.hasOwnProperty('due')} onChange={e => this.handleInput(e)} value={this.props.input.due} />
              <FormFeedback>
                {this.props.errors.errors.hasOwnProperty('due') ? this.props.errors.errors.due[0] : ''}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Button color="primary" onClick={() => this.handleClick()}>SUBMIT</Button>
            </FormGroup>
          </Form>
        </Container>
      );
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormComponent));