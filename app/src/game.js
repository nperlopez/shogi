import React from 'react';
import Board from './board.js';
import CapturedList from './captured.js';

let firstLineWhites = ['Lv', 'Nv', 'Sv', 'Gv', 'Kv', 'Gv', 'Sv', 'Nv', 'Lv'];
let secondLineWhites = [null, 'Rv', null, null, null, null, null, 'Bv', null];
let secondLineBlacks = [null, 'B^', null, null, null, null, null, 'R^', null];
let firstLineBlacks = ['L^', 'N^', 'S^', 'G^', 'K^', 'G^', 'S^', 'N^', 'L^'];

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            squares: firstLineWhites
                    .concat(secondLineWhites)
                    .concat(Array(9).fill('Pv'))
                    .concat(Array(27).fill(null))
                    .concat(Array(9).fill('P^'))
                    .concat(secondLineBlacks)
                    .concat(firstLineBlacks),
            pieceSelected: null,
            whiteIsNext: true,
            capturedByWhite: [],
            capturedByBlack: []
        }
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        // Primer click: selección de pieza
        if (this.state.pieceSelected === null) {

            // Compruebo si la pieza seleccionada pertenece al jugador del turno
            if ((squares[i].includes('^') && this.state.whiteIsNext) ||
                (squares[i].includes('v') && !this.state.whiteIsNext)) { 
                    alert(`It's ${this.state.whiteIsNext ? 'white' : 'black'}'s turn`);
                    return;
            }

            this.setState({
                pieceSelected: squares[i]
            });

            squares[i] = null;
            this.setState({
                squares: squares
            });
        // Segundo click: colocación
        } else {
            if (squares[i] !== null) {

                if ((this.state.pieceSelected.includes('v') && squares[i].includes('v')) ||
                    (this.state.pieceSelected.includes('^') && squares[i].includes('^'))) {
                        alert('not valid');
                        // To do: devolver la pieza seleccionada a su punto de partida
                        return ;
                    }
                
                let captured = null;

                if (this.state.whiteIsNext) {
                    captured = this.state.capturedByWhite.slice();
                    
                    captured.push(squares[i]);
                    this.setState({
                        capturedByWhite: captured
                    });
                } else {
                    captured = this.state.capturedByBlack.slice();

                    captured.push(squares[i]);
                    this.setState({
                        capturedByBlack: captured
                    });
                }
            }
            squares[i] = this.state.pieceSelected;

            this.setState({
                squares: squares,
                whiteIsNext: !this.state.whiteIsNext,
                pieceSelected: null
            });
        }
    }

    render() {
        const status = `Next player: ${this.state.whiteIsNext ? 'White' : 'Black'}`;

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={this.state.squares}
                        onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    <CapturedList player="white" captured={this.state.capturedByWhite}/>
                    <CapturedList player="black" captured={this.state.capturedByBlack}/>
                </div>
            </div>
        );
    }
}

export default Game;