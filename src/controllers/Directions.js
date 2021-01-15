class Directions {
    north(row, col, moves, board, color) {
        const stopBorderOrAlly = row < 0 || this.verifyColor(board, color, row, col);
        const stopEnemy = this.verifyColor(board, color, row, col);

        if(stopBorderOrAlly) {
            return;
        } else if (stopEnemy !== null) {
            moves.push({row, col});
            return;
        } else {
            moves.push({row, col});
            this.north(row - 1, col, moves, board, color);
        }
    }

    northeast(row, col, moves, board, color) {
        const stopBorderOrAlly = row < 0 || col > 7 || this.verifyColor(board, color, row, col)
        const stopEnemy = this.verifyColor(board, color, row, col);

        if(stopBorderOrAlly) {
            return;
        } else if(stopEnemy !== null) {
            moves.push({row, col});
            return;
        }  else {
            moves.push({row, col});
            this.northeast(row - 1, col + 1, moves, board, color);
        }
    }

    east(row, col, moves, board, color) {
        const stopBorderOrAlly = col > 7 || this.verifyColor(board, color, row, col);
        const stopEnemy = this.verifyColor(board, color, row, col);

        if(stopBorderOrAlly) {
            return;
        } else if(stopEnemy !== null) {
            moves.push({row, col});
            return;
        }  else {
            moves.push({row, col});
            this.east(row, col + 1, moves, board, color);
        }
    }

    southeast(row, col, moves, board, color) {
        const stopBorderOrAlly = row > 7 || col > 7 || this.verifyColor(board, color, row, col)
        const stopEnemy = this.verifyColor(board, color, row, col);

        if(stopBorderOrAlly) {
            return;
        } else if(stopEnemy !== null) {
            moves.push({row, col});
            return;
        }  else {
            moves.push({row, col});
            this.southeast(row + 1, col + 1, moves, board, color);
        }
    }

    south(row, col, moves, board, color) {
        const stopBorderOrAlly = row > 7 || this.verifyColor(board, color, row, col);
        const stopEnemy = this.verifyColor(board, color, row, col);

        if(stopBorderOrAlly) {
            return;
        } else if(stopEnemy !== null) {
            moves.push({row, col});
            return;
        }  else {
            moves.push({row, col});
            this.south(row + 1, col, moves, board, color);
        }
    }

    southwest(row, col, moves, board, color) {
        const stopBorderOrAlly = row > 7 || col < 0 || this.verifyColor(board, color, row, col);
        const stopEnemy = this.verifyColor(board, color, row, col);

        if(stopBorderOrAlly) {
            return;
        } else if(stopEnemy !== null) {
            moves.push({row, col});
            return;
        }  else {
            moves.push({row, col});
            this.southwest(row + 1, col - 1, moves, board, color);
        }
    }

    west(row, col, moves, board, color) {
        const stopBorderOrAlly = col < 0 || this.verifyColor(board, color, row, col);
        const stopEnemy = this.verifyColor(board, color, row, col);

        if(stopBorderOrAlly) {
            return;
        } else if(stopEnemy !== null) {
            moves.push({row, col});
            return;
        }  else {
            moves.push({row, col});
            this.west(row, col - 1, moves, board, color);
        }
    }

    northwest(row, col, moves, board, color) {
        const stopBorderOrAlly = row < 0 || col < 0 || this.verifyColor(board, color, row, col);
        const stopEnemy = this.verifyColor(board, color, row, col);

        if(stopBorderOrAlly) {
            return;
        } else if(stopEnemy !== null) {
            moves.push({row, col});
            return;
        }  else {
            moves.push({row, col});
            this.northwest(row - 1, col - 1, moves, board, color);
        }
    }

    allKnightSpots(row, col) {
        const spots = [
            {row: row - 2, col: col + 1},
            {row: row - 1, col: col + 2},
            {row: row + 1, col: col + 2},
            {row: row + 2, col: col + 1},
            {row: row + 2, col: col - 1},
            {row: row + 1, col: col - 2},
            {row: row - 1, col: col - 2},
            {row: row - 2, col: col - 1}
        ];

        return spots;
    }

    allPawnSpots(row, col, color) {
        const spots = (color === 'white') ?
        [
            {row: row - 1, col: col - 1, pos: 'left'},
            {row: row - 1, col, pos: 'middle'},
            {row: row - 1, col: col + 1, pos: 'right'}
        ]
            :
        [
            {row: row + 1, col: col - 1, pos: 'left'},
            {row: row + 1, col, pos: 'middle'},
            {row: row + 1, col: col + 1, pos: 'right'}
        ]

        if(color === 'white' && row === 6) {
            spots.push({row: row - 2, col, pos: 'middle'});
        }

        if(color === 'black' && row === 1) {
            spots.push({row: row + 2, col, pos: 'middle'});
        }

        return spots;
    }

    allKingSpots(row, col) {
        const spots = [
            {row: row - 1, col},
            {row: row - 1, col: col + 1},
            {row, col: col + + 1},
            {row: row + 1, col: col + 1},
            {row: row + 1, col},
            {row: row + 1, col: col - 1},
            {row, col: col - 1},
            {row: row - 1, col: col - 1}
        ];

        return spots;
    }

    onTheBoard(row, col) {
        return col >= 0 && col <= 7 && row >= 0 && row <= 7;
    }

    verifyColor(board, color, row, col) {
        const piece = board.find(spot => spot.row === row && spot.col === col);

        if(piece === undefined) {
            return null;
        } else if (piece.color === color) {
            return true;
        } else {
            return false;
        }
        
    }
}


module.exports = new Directions();