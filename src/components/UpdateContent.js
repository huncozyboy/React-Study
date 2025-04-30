import React, { Component } from 'react';

class UpdateContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.data.title,
      desc: this.props.data.desc
    };
    this.inputFormHandler = this.inputFormHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  inputFormHandler(e) {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.title, this.state.desc);
  }

  render() {
    console.log(this.props.data);
    console.log('UpdateContent render');

    return (
      <article>
        <h2>Update</h2>
        <form onSubmit={this.handleSubmit}>
          <p>
            <input
              type="text"
              name="title"
              placeholder="title"
              value={this.state.title}
              onChange={this.inputFormHandler}
            />
          </p>
          <p>
            <textarea
              name="desc"
              placeholder="description"
              value={this.state.desc}
              onChange={this.inputFormHandler}
            ></textarea>
          </p>
          <p>
            <input type="submit" value="Update" />
          </p>
        </form>
      </article>
    );
  }
}

export default UpdateContent;