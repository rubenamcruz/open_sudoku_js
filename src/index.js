import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';

class Page extends React.Component {
    
    render() {
      return (
        <div className="page-class" >
        </div>
      );
    }
  }




ReactDOM.render(
    <Page />,
    document.getElementById('root')
  );
  