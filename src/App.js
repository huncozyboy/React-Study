import React, { Component } from 'react';
import TOC from "./components/TOC";
import Subject from "./components/Subject";
import Content from "./components/Content";
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode: 'welcome',
      selected_content_id: 1,
      subject: { title: 'WEB', sub: 'World Wide Web' },
      welcome: { title: 'Welcome', desc: 'Hello, React!' },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is for information' },
        { id: 2, title: 'CSS', desc: 'CSS is for design' },
        { id: 3, title: 'JavaScript', desc: 'JavaScript is for interactive' }
      ]
    };
  }

  handleSelectContent = (id) => {
    this.setState({
      mode: 'read',
      selected_content_id: id
    });
  };

  render() {
    const { mode, welcome, contents, selected_content_id } = this.state;

    let _title, _desc;

    if (mode === 'welcome') {
      _title = welcome.title;
      _desc = welcome.desc;
    } else if (mode === 'read') {
      const content = contents.find(c => c.id === selected_content_id);
      _title = content.title;
      _desc = content.desc;
    }

    return (
      <div className="App">
        <header>
          <h1>
            <a href="/" onClick={(e) => {
              e.preventDefault();
              this.setState({ mode: 'welcome' });
            }}>
              {this.state.subject.title}
            </a>
          </h1>
          {this.state.subject.sub}
        </header>

        <TOC onChangePage={function(id) {
          this.setState({
            mode: 'read',
            selected_content_id: Number(id)
          });
        }.bind(this)}
        data={this.state.contents}
        />
        <ul>
          <li><a href="/create">create</a></li>
          <li><a href="/update">update</a></li>
          <li><input type="button" value="delete" /></li>
        </ul>
        <Content title={_title} desc={_desc} />
      </div>
    );
  }
}

export default App;