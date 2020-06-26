import React, {useState, useEffect, useCallback, useRef} from 'react';
import produce from 'immer'
import Board from './Board';

class Main extends React.Component {
	constructor() {
		super();
		this.speed = 100;
		this.rows = 50;
		this.cols = 70;

		this.state = {
			generation: 0,
			gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
		}
	}

	selectBox = (row, col) => {
		if (!(this.intervalId > 0)){
			let gridCopy = arrayClone(this.state.gridFull);
			gridCopy[row][col] = !gridCopy[row][col];
			this.setState({
				gridFull: gridCopy
			});
		}
		
	}

	seed = () => {
		let gridCopy = arrayClone(this.state.gridFull);
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				if (Math.floor(Math.random() * 4) === 1) {
					gridCopy[i][j] = true;
				}
			}
		}
		this.setState({
			gridFull: gridCopy
		});
	}

	playButton = () => {
		clearInterval(this.intervalId);
		this.intervalId = setInterval(this.play, this.speed);
	}

	pauseButton = () => {
		clearInterval(this.intervalId);
		this.intervalId = 0;
	}

	clear = () => {
		var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
		this.setState({
			gridFull: grid,
			generation: 0
		});
	}

	gridSize = (size) => {
		switch (size) {
			case "1":
				this.cols = 20;
				this.rows = 10;
			break;
			case "2":
				this.cols = 50;
				this.rows = 30;
			break;
			default:
				this.cols = 70;
				this.rows = 50;
		}
		this.clear();

	}

	play = () => {
		let g = this.state.gridFull;
		let g2 = arrayClone(this.state.gridFull);

		for (let i = 0; i < this.rows; i++) {
		  for (let j = 0; j < this.cols; j++) {
		    let count = 0;
		    if (i > 0) if (g[i - 1][j]) count++;
		    if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
		    if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
		    if (j < this.cols - 1) if (g[i][j + 1]) count++;
		    if (j > 0) if (g[i][j - 1]) count++;
		    if (i < this.rows - 1) if (g[i + 1][j]) count++;
		    if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
		    if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;
		    if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
		    if (!g[i][j] && count === 3) g2[i][j] = true;
		  }
		}
		this.setState({
		  gridFull: g2,
		  generation: this.state.generation + 1
		});

	}


	render() {
		return (
			<div>
				<h1>The Game of Life</h1>
                <vid class = 'buttonDiv'>
                    <button onClick = {this.playButton}>
                        Play
                    </button>
                    <button onClick = {this.pauseButton}>
                        Pause
                    </button>
					<button onClick = {this.play}>
                        Next
                    </button>
                    <button onClick = {this.clear}>
                        Clear
                    </button>
                    <button onClick = {this.seed}>
                        Seed
                    </button>
                </vid>
                <div class='body'>
					<div class = 'rules' >

					</div>
					<Board
						gridFull={this.state.gridFull}
						rows={this.rows}
						cols={this.cols}
						selectBox={this.selectBox}
					/>
					<div class = 'rules' >
						<h2>Rules: </h2>
						<h3>
						1. Any live cell with two or three live neighbours survives.
						</h3>
						<h3>
						2. Any dead cell with three live neighbours becomes a live cell.
						</h3>
						<h3>
						3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.
						</h3>
					</div>
				</div>
				<h2>Generations: {this.state.generation}</h2>
			</div>
		);
	}
}

function arrayClone(arr) {
	return JSON.parse(JSON.stringify(arr));
}


export default Main