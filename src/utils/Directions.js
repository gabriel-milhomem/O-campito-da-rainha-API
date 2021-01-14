class Directions {
    north(row, col, moves, table) {
        if(row < 0) {
            return;
        } else {
            moves.push({row, col});
            this.north(row - 1, col, moves, table);
        }
    }

    northeast(row, col, moves, table) {
        if(row < 0 || col > 7) {
            return;
        } else {
            moves.push({row, col});
            this.south(row - 1, col + 1, moves, table);
        }
    }

    east(row, col, moves, table) {
        if(col > 7) {
            return;
        } else {
            moves.push({row, col});
            this.east(row, col + 1, moves, table);
        }
    }

    southeast(row, col, moves, table) {
        if(row > 7 || col > 7) {
            return;
        } else {
            moves.push({row, col});
            this.south(row + 1, col + 1, moves, table);
        }
    }

    south(row, col, moves, table) {
        if(row > 7) {
            return;
        } else {
            moves.push({row, col});
            this.south(row + 1, col, moves, table);
        }
    }

    southwest(row, col, moves, table) {
        if(row > 7 || col < 0) {
            return;
        } else {
            moves.push({row, col});
            this.south(row + 1, col - 1, moves, table);
        }
    }

    west(row, col, moves, table) {
        if(col < 0) {
            return;
        } else {
            moves.push({row, col});
            this.west(row, col - 1, moves, table);
        }
    }

    northwest(row, col, moves, table) {
        if(row < 0 || col < 0) {
            return;
        } else {
            moves.push({row, col});
            this.south(row - 1, col - 1, moves, table);
        }
    }
}


module.exports = new Directions();