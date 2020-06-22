import React, {useState} from 'react';
import Board from './Board';
function Main (){
    const [speed, setSpeed] = useState(300);
    const [rows, setRow] = useState(30);
    const [cols, setCols] = useState(50);
    const [state, setState] = useState({
        generation: 0,
        gridFull: Array(rows).fill(false).map(()=>Array(cols).fill(false))
    })

    function selectBox (row, col){
        let gridCopy = arrayClone(state.gridFull )
        gridCopy[row][col] = !gridCopy[row][col];
        setState({
            gridFull: gridCopy
        })
    }
    return(
        <div>
            <h1>The Game of Life</h1>
            <Board 
                gridFull = {state.gridFull}
                rows = {rows}
                cols = {cols}
                selectBox = {selectBox}
            />

        </div>
    )

}

function arrayClone(arr){
    return JSON.parse(JSON.stringify(arr));
}

export default Main