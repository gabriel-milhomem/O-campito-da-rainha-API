const rookCleanTable = [
    {row: 2, col:3},
    {row: 1, col:3},
    {row: 0, col:3},
    {row: 3, col:4},
    {row: 3, col:5},
    {row: 3, col:6},
    {row: 3, col:7},
    {row: 4, col:3},
    {row: 5, col:3},
    {row: 6, col:3},
    {row: 7, col:3},
    {row: 3, col:2},
    {row: 3, col:1},
    {row: 3, col:0}
];

const bishopCleanTable = [
    {row: 2, col:4},
    {row: 1, col:5},
    {row: 0, col:6},
    {row: 4, col:4},
    {row: 5, col:5},
    {row: 6, col:6},
    {row: 7, col:7},
    {row: 4, col:2},
    {row: 5, col:1},
    {row: 6, col:0},
    {row: 2, col:2},
    {row: 1, col:1},
    {row: 0, col:0}
];

const queenCleanTable = [
    {row: 2, col:3},
    {row: 1, col:3},
    {row: 0, col:3},
    {row: 3, col:4},
    {row: 3, col:5},
    {row: 3, col:6},
    {row: 3, col:7},
    {row: 4, col:3},
    {row: 5, col:3},
    {row: 6, col:3},
    {row: 7, col:3},
    {row: 3, col:2},
    {row: 3, col:1},
    {row: 3, col:0},
    {row: 2, col:4},
    {row: 1, col:5},
    {row: 0, col:6},
    {row: 4, col:4},
    {row: 5, col:5},
    {row: 6, col:6},
    {row: 7, col:7},
    {row: 4, col:2},
    {row: 5, col:1},
    {row: 6, col:0},
    {row: 2, col:2},
    {row: 1, col:1},
    {row: 0, col:0}
];

const rookAllyPieces = [
    {row:2, col:3},
    {row:1, col:3},
    {row:3, col:4},
    {row:3, col:5},
    {row:4, col:3},
    {row:5, col:3},
    {row:3, col:2},
    {row:3, col:1}
];

const rookEnemyPieces = [
    {row:2, col:3},
    {row:1, col:3},
    {row:0, col:3},
    {row:3, col:4},
    {row:3, col:5},
    {row:3, col:6},
    {row:4, col:3},
    {row:5, col:3},
    {row:6, col:3},
    {row:3, col:2},
    {row:3, col:1},
    {row:3, col:0}
];

const bishopAllyPieces = [
    {row:2, col:4},
    {row:1, col:5},
    {row:4, col:4},
    {row:5, col:5},
    {row:4, col:2},
    {row:5, col:1},
    {row:2, col:2},
    {row:1, col:1}
];

const bishopEnemyPieces = [
    {row:2, col:4},
    {row:1, col:5},
    {row:0, col:6},
    {row:4, col:4},
    {row:5, col:5},
    {row:6, col:6}, 
    {row:4, col:2},
    {row:5, col:1},
    {row:6, col:0}, 
    {row:2, col:2},
    {row:1, col:1},
    {row:0, col:0}
];

const queenAllyPieces = [...rookAllyPieces, ...bishopAllyPieces];
const queenEnemyPieces = [...rookEnemyPieces, ...bishopEnemyPieces];

module.exports = {
    rookCleanTable,
    bishopCleanTable,
    queenCleanTable,

    rookAllyPieces,
    bishopAllyPieces,
    queenAllyPieces,

    rookEnemyPieces,
    bishopEnemyPieces,
    queenEnemyPieces,
}