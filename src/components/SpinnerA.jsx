import React, { Component } from 'react'
import loading from './loading.gif'
export class SpinnerA extends Component {
  render() {
    return (
      <div  >
        <img src={loading} style={{marginLeft:'490px',height:'436.5px'}} alt="loading" />
      </div>
    )
  }
}

export default SpinnerA