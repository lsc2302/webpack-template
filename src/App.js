import React, { Component } from 'react';
import AddButton from './components/js/addButton';
import MinusButton from './components/js/minusButton';
import grunt from './components/imgs/grunt.png'
import gulp from './components/imgs/gulp.png'
import webpack from './components/imgs/webpack.png'
import yeoman from './components/imgs/yeoman.png'
import browserify from './components/imgs/browserify.png'
import box from './components/imgs/box.svg'
import toolclasses from '$css/tool.module.less'
import packageclasses from '$css/package.module.scss'


class App extends Component {

  handleBundle = ()=>{
    alert('bundling!')
  }


  render() {
    return (
            <div>
                <AddButton />
                <MinusButton />
                <img src={grunt} className={toolclasses.tool} alt='grunt' />
                <img src={gulp} className={toolclasses.tool} alt='gulp' />
                <img src={webpack} className={toolclasses.tool} alt='webpack' />
                <img src={yeoman} className={toolclasses.tool} alt='yeoman' />
                <img src={browserify} className={toolclasses.tool} alt='browserify' />
                <img src={box} className={packageclasses.box} onClick={this.handleBundle} alt='box' />
            </div>
    );
  }
}

export default App;
