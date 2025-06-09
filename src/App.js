import React, { Component } from 'react';
import TOC from "./components/TOC";
import Subject from "./components/Subject";
import Control from "./components/Control";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
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

  render() {
    console.log('App render');
    let _title, _desc, _article = null;

    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc} />;
    } else if (this.state.mode === 'read') {
      const data = this.state.contents.find(c => c.id === this.state.selected_content_id);
      _title = data.title;
      _desc = data.desc;
      _article = <ReadContent title={_title} desc={_desc} />;
    } else if (this.state.mode === 'create') {
      _article = (
        <CreateContent
          onSubmit={(title, desc) => {
            this.max_content_id += 1;
            const newContent = {
              id: this.max_content_id,
              title,
              desc
            };
            
            this.setState({
              contents: [...this.state.contents, newContent],
              mode: 'read',
              selected_content_id: this.max_content_id
            });
          }}
        />
      );
    } else if (this.state.mode === 'update') {
      const data = this.state.contents.find(c => c.id === this.state.selected_content_id);
      _article = (
        <UpdateContent
          data={data}
          onSubmit={(title, desc) => {
            const newContents = this.state.contents.map(content =>
              content.id === this.state.selected_content_id
                ? { ...content, title, desc }
                : content
            );

            this.setState({
              contents: newContents,
              mode: 'read'
            });
          }}
        />
      );
    }

    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={() => {
            this.setState({ mode: 'welcome' });
          }}
        />
        <TOC
          onChangePage={(id) => {
            this.setState({
              mode: 'read',
              selected_content_id: Number(id)
            });
          }}
          data={this.state.contents}
        />
        <Control
          onChangeMode={(_mode) => {
            if (_mode === 'delete') {
              if (window.confirm()) {
                const _contents = Array.from(this.state.contents);
                let i = 0;
                while (i < _contents.length) {
                  if (_contents[i].id === this.state.selected_content_id) {
                    _contents.splice(i, 1);
                    break;
                  }
                  i++;
                }
                this.setState({
                  mode: 'welcome',
                  contents: _contents
                });
              }
            } else {
              this.setState({ mode: _mode });
            }
          }}
        />
        {_article}
      </div>
    );
  }
}

export default App;