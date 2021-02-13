import React from 'react';
import '../css/game.scss'

export default class Game extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      size: {
        x: 20,
        y: 15
      },
      list:['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m','Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'],
      showList: [],
      start: false,
      score: 0,
      repeat: 0
    }
  }
  componentDidMount(){
    document.addEventListener("keydown", this.onKeyDown)
  }
  begin = (start)=> {
    this.setState({
      start: start
    })
    if(start){
      this.timer = setInterval(() => {
        const value = Math.floor(Math.random() * this.state.list.length)
        const index = Math.floor(Math.random() * this.state.size.x * this.state.size.y)
        const newOne = {
          value: this.state.list[value],
          index: index
        }
        let showList = this.state.showList
        showList.push(newOne)
        this.setState({
          showList: [...showList]
        })
      }, 1000);
    }else {
      clearInterval(this.timer)
    }
  }
  end = ()=> {
    clearInterval(this.timer)
    this.setState({
      start: false,
      showList: []
    })
  }
  onKeyDown = (e)=> {
    let index = null
    let showList = this.state.showList
    showList.forEach((item, i)=> {
      if(e.key === item.value) {
        index = i
        return
      }
    })
    if(index !== null){
      showList.splice(index, 1)
      this.setState({
        showList,
        score: this.state.score + 1
      })
    }
  }
  render() {
    return (<div>
     <Board size={this.state.size} showList={this.state.showList}></Board>
     <Settings score={this.state.score} begin={this.begin.bind(this)} end={this.end.bind(this)}></Settings>
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
        let location = ''
        this.props.showList.forEach(choose=> {
          if(choose.index === now){
            location = choose
            return
          }
        })
        return <Square key={ind} value={location.value}></Square>
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
  end = ()=> {
    this.props.end()
  }
  render() {
    return (<div>
      <div>得分：{this.props.score}</div>
      <button className="btn" onClick={this.start}>{this.state.start ? '暂停' : '开始'}</button>
      <button className="btn" onClick={this.end}>停止</button>
    </div>)
  }
}