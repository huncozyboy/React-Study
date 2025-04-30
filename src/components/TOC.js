import React, { Component } from 'react';

class TOC extends Component {
  render() {
    const lists = this.props.data.map(item => (
      <li key={item.id}>
        <a
          href={`/content/${item.id}`}
          onClick={(e) => {
            e.preventDefault();
            this.props.onChangePage(item.id); 
          }}
        >
          {item.title}
        </a>
      </li>
    ));

    return (
      <nav>
        <ul>{lists}</ul>
      </nav>
    );
  }
}

export default TOC;