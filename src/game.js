import React from 'react';
import './game.css'

export default class Game extends React.Component{
  constructor(props){
    super(props)
    this.state={
      size: {
        x: 20,
        y: 15
      },
      list:['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m','Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'],
      showList: []
    }
  }
  begin = (e)=> {
    if(e){
      this.timer = setInterval(() => {
        const value = Math.floor(Math.random() * this.state.list.length)
        const index = Math.floor(Math.random() * this.state.size.x * this.state.size.y)
        const newOne = {
          value: value,
          index: index
        }
        let showList = this.state.showList
        showList.push(newOne)
        // this.setState({
        //   showList: showList
        // })
      }, 1000);
    }else {
      clearInterval(this.timer)
    }
  }
  render() {
    return (<div>
     <Board size={this.state.size} showList={this.state.showList}></Board>
     <Settings begin={this.begin.bind(this)}></Settings>
    </div>)
  }
}

// 棋盘
class Board extends React.Component{
  constructor(props){
    super(props)
    this.state={
    }
  }
  list = ()=> {
    const x = this.props.size.x;
    const y = this.props.size.y;
    return Array(y).fill('').map((item, index)=> {
      let row = Array(x).fill('').map((ite, ind)=> {
        const now = ind + index * x + 1
        let value = ''
        value = this.props.showList.find(choose=> {
          if(choose.index === now){
            return choose
          }
          return {}
        })
        return <Square key={ind} value={value}></Square>
      })
      return(<div className="row" key={index}>{row}</div>)
    })
  }
  render() {
    return (<div className="board">
     {this.list()}
    </div>)
  }
}

// 每一个框框
class Square extends React.Component{
  constructor(props){
    super(props)
    this.state={
    }
  }
  render() {
    return (<div className="square">{this.props.value}</div>)
  }
}

class Settings extends React.Component{
  constructor(props){
    super(props)
    this.state={
      start: false
    }
  }
  start = ()=> {
    this.setState({
      start: !this.state.start
    },()=> {
      this.props.begin(this.state.start)
    })
  }
  render() {
    return (<button className="btn" onClick={this.start}>{this.state.start ? '停止' : '开始'}</button>)
  }
}