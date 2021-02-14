import React from 'react';
import '../css/song.scss';

export default class Song extends React.Component{
  render() {
    return <div className='song'>
      <audio controls></audio>
    </div>
  }
}