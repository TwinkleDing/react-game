import React from 'react';
import '../css/song.scss';
import songList from '../songList/list';
export default class Song extends React.Component{
  render() {
    return <div className='song'>
      <div>{songList[0].name}</div>
      <Control></Control>
    </div>
  }
}

class Control extends React.Component{
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  start = ()=> {
    this.myRef.current.play()
  }
  render() {
    return <div>
      <audio ref={this.myRef} src={songList[0].url} controls></audio>
      <div onClick={this.start}>开始</div>
    </div>
  }
}