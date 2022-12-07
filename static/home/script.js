const N = 4;
const M = 4;
let full = 0;
let scoreR = 0;
let scoreB = 0;

let turn = "R";
let selectedLines = [];
let fillcondis = [
	['v-0-0', 'h-0-0', 'v-0-1', 'h-1-0'],
	['h-1-1', 'v-0-1', 'h-0-1', 'v-0-2'],
	['h-1-2', 'v-0-2', 'h-0-2', 'v-0-3'],
	['h-2-0', 'v-1-0', 'h-1-0', 'v-1-1'],
	['h-2-1', 'v-1-1', 'h-1-1', 'v-1-2'],
	['h-2-2', 'v-1-2', 'h-1-2', 'v-1-3'],
	['h-3-0', 'v-2-0', 'h-2-0', 'v-2-1'],
	['v-2-2', 'v-2-1', 'h-2-1', 'h-3-1'],
	['v-2-2', 'h-2-2', 'v-2-3', 'h-3-2'],	
];
let wichbox =[
	['v-0-0', 'h-0-0', 'v-0-1', 'h-1-0'],
	['h-1-1', 'v-0-1', 'h-0-1', 'v-0-2'],
	['h-1-2', 'v-0-2', 'h-0-2', 'v-0-3'],
	['h-2-0', 'v-1-0', 'h-1-0', 'v-1-1'],
	['h-2-1', 'v-1-1', 'h-1-1', 'v-1-2'],
	['h-2-2', 'v-1-2', 'h-1-2', 'v-1-3'],
	['h-3-0', 'v-2-0', 'h-2-0', 'v-2-1'],
	['v-2-2', 'v-2-1', 'h-2-1', 'h-3-1'],
	['v-2-2', 'h-2-2', 'v-2-3', 'h-3-2'],
];

const hoverClasses = { R: "hover-red", B: "hover-blue" };
const bgClasses = { R: "bg-red", B: "bg-blue" };

const playersTurnText = (turn) =>
	`It's ${turn === "R" ? "Red" : "Blue"}'s turn`;

const isLineSelected = (line) =>
	line.classList.contains(bgClasses.R) || line.classList.contains(bgClasses.B);

const createGameGrid = () => {
	
	const gameGridContainer = document.getElementsByClassName(
		"game-grid-container"
	)[0];

	const rows = Array(N)
		.fill(0)
		.map((_, i) => i);
	const cols = Array(M)
		.fill(0)
		.map((_, i) => i);

	rows.forEach((row) => {
		cols.forEach((col) => {
			const dot = document.createElement("div");
			dot.setAttribute("class", "dot");

			const hLine = document.createElement("div");
			hLine.setAttribute("class", `line-horizontal ${hoverClasses[turn]}`);
			hLine.setAttribute("id", `h-${row}-${col}`);
			hLine.addEventListener("click", handleLineClick);

			gameGridContainer.appendChild(dot);
			if (col < M - 1) gameGridContainer.appendChild(hLine);
		});

		if (row < N - 1) {
			cols.forEach((col) => {
				const vLine = document.createElement("div");
				vLine.setAttribute("class", `line-vertical ${hoverClasses[turn]}`);
				vLine.setAttribute("id", `v-${row}-${col}`);
				vLine.addEventListener("click", handleLineClick);

				const box = document.createElement("div");
				box.setAttribute("class", "box");
				box.setAttribute("id", `box-${row}-${col}`);

				gameGridContainer.appendChild(vLine);
				if (col < M - 1) gameGridContainer.appendChild(box);
			});
		}
	});

	document.getElementById("game-status").innerHTML = playersTurnText(turn);
};

const changeTurn = () => {
	const nextTurn = turn === "R" ? "B" : "R";

	const lines = document.querySelectorAll(".line-vertical, .line-horizontal");

	lines.forEach((l) => {
		//if line was not already selected, change it's hover color according to the next turn
		if (!isLineSelected(l)) {
			l.classList.replace(hoverClasses[turn], hoverClasses[nextTurn]);
		}
	});
	turn = nextTurn;
};

const handleLineClick = (e) => {
	
	const lineId = e.target.id;

	const selectedLine = document.getElementById(lineId);

	if (isLineSelected(selectedLine)) {
		//if line was already selected, return
		return;
	}

	selectedLines = [...selectedLines, lineId];
	checkfill();
	colorLine(selectedLine);
	changeTurn();
	document.getElementById("game-status").innerHTML = playersTurnText(turn);
	checkend();
};

const colorLine = (selectedLine) => {
	selectedLine.classList.remove(hoverClasses[turn]);
	selectedLine.classList.add(bgClasses[turn]);
};





const checkfill = () => {
	let index = -1;
	let j = -1;
	
	//shomare gozari boxs
	document.querySelectorAll('.box').forEach((box)=>{
		j++
		box.id.remove;
		box.id = `box-${j}`
	})

	//srearch in fillcondis for squr
	let result = fillcondis.some((four)=>{
		index++
		let check2 = four.every(one => selectedLines.includes(one))
		if(!check2){
			return false
		}else{
			checksqure(four);	
			fillcondis.splice(index,1);
			checkfill()
			return true
		}
	})
	if(result){full++}
}	

function checksqure(four){
	let y = -1
	wichbox.some((array)=>{
		y++
	let	check3 = array.every(taki => four.includes(taki))
	if(check3){
		document.querySelector(`#box-${y}`).classList.add(bgClasses[turn]);
		if(turn === 'B'){
			scoreB++
			document.querySelector(`#scoreB`).innerHTML= `score Blue : ${scoreB}`
		}
		else{
			scoreR++
			document.querySelector(`#scoreR`).innerHTML= `score Red : ${scoreR}`
		}
		return y
	}
	})

}

function checkend(){
	debugger
	if(full === 9){
		if(scoreB>scoreR){
			document.querySelector(`#game-status`).innerHTML = '<h1>Blue is Winer!!!!!!</h1>'
		}
		else if(scoreB<scoreR){
			document.querySelector(`#game-status`).innerHTML = '<h1>Red is Winer!!!!!!</h1>'
		}
		else{
			document.querySelector(`#game-status`).innerHTML = '<h1>there is no Winer!!!!!!</h1>'
		}
	}

}


createGameGrid();
