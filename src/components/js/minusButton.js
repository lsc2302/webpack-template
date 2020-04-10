import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import {minus} from './minus.js';
import classes from '$css/input.module.css'


class MinusButton extends Component {
    state={
      result: 0,
      a:0,
      b:0,
    }

    clickHandler = () => {
      // for webpack code split and lazy loading
      // prefetch: when browser is free, load files

      import (/*webpackChunkName:'test', webpackPrefetch:true*/'./test.js').then(({test})=>{
        console.log(test)
        console.log(test())
      })
      this.setState({result:minus(this.state.a, this.state.b)});
    }

    onChangeA = (event)=>{
      this.setState({a:parseInt(event.target.value)})
    }

    onChangeB = (event)=>{
      this.setState({b:parseInt(event.target.value)})
    }

    render() {
      return (
            <div className={classes.Input}>
                <TextField id="standard-basic" label="A" variant="outlined"
                onChange={(event)=>this.onChangeA(event)}/>
                <span>-</span>
                <TextField id="standard-basic" label="B" variant="outlined"
                onChange={(event)=>this.onChangeB(event)}/>
                <span>=</span>
                <span>{this.state.result}</span>
                <Button color="primary" onClick={this.clickHandler}>Minus</Button>
            </div>
      );
    }
}

export default MinusButton;
