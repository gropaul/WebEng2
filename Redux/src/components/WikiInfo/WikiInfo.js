import React, { Component } from 'react';
import { incrementCounter } from '../../actions/index';
import { connect } from 'react-redux';

class WikiInfo extends Component {
     constructor(props){
         super(props);
     }   

     render(){
         return (
             <div>
                <Card title="Card Title" content="Card Content" footer="Card Footer"></Card>
             </div>
         )
     }
}

let mapStateToProps = function(state) {
    return {
      value: state.counter
    }
}
let mapDispatchToProps = {
    onIncrement: incrementCounter
}

let WikiInfoContainer = connect(mapStateToProps, mapDispatchToProps)(WikiInfo);
  export default WikiInfoContainer;