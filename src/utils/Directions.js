class Directions {
    north(row, col, moves, board, color) {
        const stopBorderOrAlly = row < 0 || this.verifyColor(board, color, row, col);
        const stopEnemy = this.verifyColor(board, color, row, col);

        if(stopBorderOrAlly) {
            return;
        } else if (stopEnemy !== undefined) {
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
        } else if(stopEnemy !== undefined) {
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
        } else if(stopEnemy !== undefined) {
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
        } else if(stopEnemy !== undefined) {
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
        } else if(stopEnemy !== undefined) {
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
        } else if(stopEnemy !== undefined) {
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
        } else if(stopEnemy !== undefined) {
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
        } else if(stopEnemy !== undefined) {
            moves.push({row, col});
            return;
        }  else {
            moves.push({row, col});
            this.northwest(row - 1, col - 1, moves, board, color);
        }
    }

    verifyColor(board, color, row, col) {
        const piece = board.find(t => t.row === row && t.col === col);
        
        if(piece === undefined) {
            return undefined;
        } else if (piece.color === color) {
            return true;
        } else {
            return false;
        }
        
    }
}


module.exports = new Directions();