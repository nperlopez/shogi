import React from 'react';
import Square from './square.js';

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square key={i}
                    value={this.props.squares[i]}
                    onClick={()=> this.props.onClick(i)} />
        );
    }

    renderBoard(row, col) {
        const board = []
        // cellCounter es el índice de cada casilla
        let cellCounter = 0;

        // Creo las filas
        for (let i = 0; i < row; i++) {
            const columns = [];
            // Creo las celdas, que se incluirán en las columnas
            
            for (let j = 0; j < col; j++) {
                columns.push(this.renderSquare(cellCounter++));
            }

            board.push(<div key={i} className="board-row">{columns}</div>)
        }

        return board;
    }

    render() {
      return (
        <div>
          {this.renderBoard(9, 9)}
        </div>
      );
    }
}

export default Board;