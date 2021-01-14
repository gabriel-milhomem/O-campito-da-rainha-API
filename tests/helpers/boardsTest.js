const rookAllyPieces = [
    {
        color: 'white',
        row: 0,
        col: 3,
    }, 
    {
        color: 'white',
        row: 3,
        col: 6,
    },
    {
        color: 'white',
        row: 6,
        col: 3,
    },
    {
        color: 'white',
        row: 3,
        col: 0,
    }
];

const rookEnemyPieces = [
    {
        color: 'black',
        row: 0,
        col: 3,
    }, 
    {
        color: 'black',
        row: 3,
        col: 6,
    },
    {
        color: 'black',
        row: 6,
        col: 3,
    },
    {
        color: 'black',
        row: 3,
        col: 0,
    }
];

const bishopAllyPieces = [
    {
        color: 'white',
        row: 0,
        col: 0,
    }, 
    {
        color: 'white',
        row: 0,
        col: 6,
    },
    {
        color: 'white',
        row: 6,
        col: 6,
    },
    {
        color: 'white',
        row: 6,
        col: 0,
    }
];

const bishopEnemyPieces = [
    {
        color: 'black',
        row: 0,
        col: 0,
    }, 
    {
        color: 'black',
        row: 0,
        col: 6,
    },
    {
        color: 'black',
        row: 6,
        col: 6,
    },
    {
        color: 'black',
        row: 6,
        col: 0,
    }
];

const queenAllyPieces = [...rookAllyPieces, ...bishopAllyPieces];
const queenEnemyPieces = [...rookEnemyPieces, ...bishopEnemyPieces];

module.exports = {
    rookAllyPieces,
    bishopAllyPieces,
    queenAllyPieces,

    rookEnemyPieces,
    bishopEnemyPieces,
    queenEnemyPieces,
}