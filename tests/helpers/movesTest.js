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

const rookAllyPieces = [
    {row:2, col:3},
    {row:3, col:4},
    {row:4, col:3},
    {row:3, col:2},
];

const rookEnemyPieces = [
    {row:2, col:3},
    {row:1, col:3},
    {row:3, col:4},
    {row:3, col:5},
    {row:4, col:3},
    {row:5, col:3},
    {row:3, col:2},
    {row:3, col:1},
];

const bishopAllyPieces = [
    {row:2, col:4},
    {row:4, col:4},
    {row:4, col:2},
    {row:2, col:2},
];

const bishopEnemyPieces = [
    {row:2, col:4},
    {row:1, col:5},
    {row:4, col:4},
    {row:5, col:5},
    {row:4, col:2},
    {row:5, col:1},
    {row:2, col:2},
    {row:1, col:1},
];

const knightCorner = [
    {row: 1, col: 2},
    {row: 2, col: 1}
]

const knightCleanTable = [
    {row: 1, col: 4},
    {row: 2, col: 5},
    {row: 4, col: 5},
    {row: 5, col: 4},
    {row: 5, col: 2},
    {row: 4, col: 1},
    {row: 2, col: 1},
    {row: 1, col: 2}
]

const kingCorner = [
    {row: 0, col: 1},
    {row: 1, col: 1},
    {row: 1, col: 0},
]

const kingCleanTable = [
    {row: 2, col: 3},
    {row: 2, col: 4},
    {row: 3, col: 4},
    {row: 4, col: 4},
    {row: 4, col: 3},
    {row: 4, col: 2},
    {row: 3, col: 2},
    {row: 2, col: 2},
]

const queenCleanTable = [...rookCleanTable, ...bishopCleanTable];
const queenAllyPieces = [...rookAllyPieces, ...bishopAllyPieces];
const queenEnemyPieces = [...rookEnemyPieces, ...bishopEnemyPieces];

const knightEnemyPieces = knightCleanTable;

const kingEnemyPieces = kingCleanTable;

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

    knightCorner,
    knightCleanTable,
    knightEnemyPieces,

    kingCorner,
    kingCleanTable,
    kingEnemyPieces
}