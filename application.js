import React from 'react';
import ReactDOM from 'react-dom';
import api from './api';


class LowerLevel extends React.Component {

  onClick() {
    api.update_x(this.props.x_id, Math.ceil(Math.random()*100));
  }

  render() {
    return(
      <div>
        <p
          style={{background:'#fafafa', padding:'10px', margin:'2px'}}
          onMouseDown={this.onClick.bind(this)}>
            value={this.props.x} (id={this.props.x_id})
        </p>
      </div>
    );
  }
}

class MidLevel extends React.Component {

  render() {
    const lower_levels = this.props.x_list.map(function(x){
      return (<LowerLevel x_id={x['id']} x={x['x']} key={x['id']}/>)
    });
    return(
      <div>
        {lower_levels}
      </div>
    );
  }
}

class TopLevel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mid1: [],
      mid2: [],
    };
    api.on_update(this.on_x_updated.bind(this));
  }

  run_queries() {
    api.search_range(0, 50, (results) => {this.setState({mid1: results})});
    api.search_range(50, 100, (results) => {this.setState({mid2: results})});
  }

  componentWillMount() { this.run_queries(); }

  on_x_updated() { this.run_queries(); }

  render() {
    return(
      <div>
        <MidLevel x_list={this.state.mid1}/>
        <hr/>
        <MidLevel x_list={this.state.mid2}/>
      </div>
    );
  }
}


ReactDOM.render(<TopLevel/>, document.getElementById('content'));
