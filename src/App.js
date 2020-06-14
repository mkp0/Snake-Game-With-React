import React,{useState,useEffect} from 'react';
import './App.css'
import Snake from './snake.js'
import Food from './Food.js'




let getRandomCordinates = () => {
  let min = 1;
  let max = 14; 

  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
	let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
	return [x, y];
}

function App() {

  const [direction, setDirection] = useState('RIGHT');
  const [speed, setSpeed] = useState(70);
  let [foodDot , setFoodDot] = useState(getRandomCordinates())
  let [snakeDots,setSnakeDots] = useState([[0,0],[0.5,0]])
  let [score , setScore] = useState(0)
  

  useEffect(() => {
		document.onkeydown = onKeyDown;
		checkIfOutOfBorders();
        checkIfEat();
		checkIfCollapsed();
    

		const run = setInterval(() => {
			moveSnake();
		}, speed);
		return () => clearInterval(run);
  },[snakeDots,setSnakeDots,foodDot,setFoodDot]);

  function onKeyDown(e) {
		console.log(e.keyCode);
		switch (e.keyCode) {
			case 38:
        setDirection('UP');
				break;
			case 40:
        setDirection('DOWN');
				break;
			case 37:
				setDirection('LEFT');
				break;
			case 39:
				setDirection('RIGHT');
				break;
			default:
				break;
		}
  }
  

  function moveSnake() {
		 
			let dots = [...snakeDots];
			let head = dots[dots.length - 1];

			switch (direction) {
				case 'DOWN':
          head = [head[0], head[1] + 0.5];
					break;
				case 'UP':
          head = [head[0], head[1] - 0.5];
					break;
				case 'RIGHT':
          head = [head[0] + 0.5, head[1]];
					break;
				case 'LEFT':
          head = [head[0] - 0.5, head[1]];
					break;
				default:
					break;
			}
			dots.push(head);
			dots.shift();
			setSnakeDots(dots);
	}
  

  function checkIfEat() {
		let head = snakeDots[snakeDots.length - 1];
		let food = foodDot;
		if (head[0] === food[0] && head[1] === food[1]) {
			setFoodDot(getRandomCordinates());
			enlargeSnake();
		}
  }
  

  function onGameOver() {
	setSnakeDots([[0, 0], [0.5,0]]);
	setScore(0)
    setFoodDot(getRandomCordinates())
		setDirection('RIGHT');
	}

	function checkIfOutOfBorders() {
		let head = snakeDots[snakeDots.length - 1];
		if (head[0] === 15 || head[1] === 15 || head[0] < 0 || head[1] < 0) {
			onGameOver();
		}
  }
  
  function checkIfCollapsed() {
		let snake = [...snakeDots];
		const head = snake[snake.length - 1];
		snake.pop();
		snake.forEach((dot, index) => {
        if(index>0)
        if (head[0] === dot[0] && head[1] === dot[1]) {
          onGameOver();
      }
		});
	}

	function enlargeSnake() {
		let newSnake = [snakeDots[snakeDots.length - 1], ...snakeDots];
		setScore(score+10)
		setSnakeDots(newSnake);
	}

	
  return (
    <div className='container'>
		<h1>Score : {score}</h1>
      <div className='gameArea'>     
      <Snake snakeDots={snakeDots} />
      <Food Dot={foodDot} />
      </div>
    </div>
    
  )
}

export default App;

