import React from "react";
import "../css/game.scss";

const WordList = [
	"q",
	"w",
	"e",
	"r",
	"t",
	"y",
	"u",
	"i",
	"o",
	"p",
	"a",
	"s",
	"d",
	"f",
	"g",
	"h",
	"j",
	"k",
	"l",
	"z",
	"x",
	"c",
	"v",
	"b",
	"n",
	"m",
	"Q",
	"W",
	"E",
	"R",
	"T",
	"Y",
	"U",
	"I",
	"O",
	"P",
	"A",
	"S",
	"D",
	"F",
	"G",
	"H",
	"J",
	"K",
	"L",
	"Z",
	"X",
	"C",
	"V",
	"B",
	"N",
	"M",
];

export default class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			size: {
				x: 10,
				y: 10,
			},
			showList: [],
			start: false,
			speed: 1000,
			score: 0,
			error: 0,
		};
	}
	componentDidMount() {
		document.addEventListener("keydown", this.onKeyDown);
	}
	// 开始暂停游戏
	begin = (start) => {
		this.setState({
			start: start,
		});
		if (start) {
			this.creatNewOne();
			this.startTimer = setInterval(() => {
				this.creatNewOne();
			}, this.state.speed);
		} else {
			clearInterval(this.startTimer);
		}
	};
	// 新增一个
	creatNewOne = () => {
		const value = Math.floor(Math.random() * WordList.length);
		const index = Math.floor(Math.random() * this.state.size.x * this.state.size.y);
		const newOne = {
			value: WordList[value],
			index: index,
		};
		let showList = this.state.showList;
		let error = this.state.error;
		showList.forEach((item) => {
			if (item.index === newOne.index) {
				error += 1;
			}
		});
		showList.push(newOne);
		this.setState({
			showList,
			error,
		});
	};
	// 停止游戏
	end = () => {
		clearInterval(this.startTimer);
		this.setState({
			start: false,
			showList: [],
			score: 0,
			error: 0,
		});
	};
	// 监听键盘事件
	onKeyDown = (e) => {
		let index = null;
		let showList = this.state.showList;
		showList.forEach((item, i) => {
			if (e.key === item.value) {
				index = i;
				return;
			}
		});
		if (index !== null) {
			showList.splice(index, 1);
			this.setState({
				showList,
				score: this.state.score + 1,
			});
		}
	};
	render() {
		return (
			<div className="game">
				<Board size={this.state.size} showList={this.state.showList}></Board>
				<Settings
					speed={this.state.speed}
					size={this.state.size}
					score={this.state.score}
					error={this.state.error}
					begin={this.begin.bind(this)}
					end={this.end.bind(this)}
				></Settings>
			</div>
		);
	}
}

// 棋盘
class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	// 渲染棋盘列表
	list = () => {
		const x = this.props.size.x;
		const y = this.props.size.y;
		return Array(y)
			.fill("")
			.map((item, index) => {
				let row = Array(x)
					.fill("")
					.map((ite, ind) => {
						const now = ind + index * x + 1;
						let location = "";
						this.props.showList.forEach((choose) => {
							if (choose.index === now) {
								location = choose;
								return;
							}
						});
						return <Square key={ind} value={location.value}></Square>;
					});
				return (
					<div className="row" key={index}>
						{row}
					</div>
				);
			});
	};
	render() {
		return <div className="board">{this.list()}</div>;
	}
}

// 每一个框框
class Square extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return <div className="square">{this.props.value}</div>;
	}
}

// 操作面板
class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			start: false,
		};
	}
	start = () => {
		this.setState(
			{
				start: !this.state.start,
			},
			() => {
				this.props.begin(this.state.start);
			}
		);
	};
	end = () => {
		this.props.end();
		this.setState({ start: false });
	};
	render() {
		return (
			<div className="settings">
				<div>设置</div>
				<div>
					<span>行数：{this.props.size.x}</span>
					<span>列数：{this.props.size.y}</span>
				</div>
				<div>速度：1个/{this.props.speed}ms</div>
				<div>
					<span>得分：{this.props.score}</span>
					<span>错失：{this.props.error}</span>
				</div>
				<button className="btn" onClick={this.start}>
					{this.state.start ? "暂停" : "开始"}
				</button>
				<button className="btn" onClick={this.end}>
					停止
				</button>
			</div>
		);
	}
}
