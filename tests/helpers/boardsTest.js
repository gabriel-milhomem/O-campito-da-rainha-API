const rookAllyPieces = [
    {
        color: 'white',
        row: 1,
        col: 3,
    }, 
    {
        color: 'white',
        row: 3,
        col: 5,
    },
    {
        color: 'white',
        row: 5,
        col: 3,
    },
    {
        color: 'white',
        row: 3,
        col: 1,
    }
];

const bishopAllyPieces = [
    {
        color: 'white',
        row: 1,
        col: 1,
    }, 
    {
        color: 'white',
        row: 1,
        col: 6,
    },
    {
        color: 'white',
        row: 5,
        col: 5,
    },
    {
        color: 'white',
        row: 5,
        col: 1,
    }
];

const knightCleanTable = [
    {
        color: 'black',
        row: 2,
        col: 2,
    }, 
    {
        color: 'white',
        row: 2,
        col: 3,
    },
    {
        color: 'black',
        row: 2,
        col: 4,
    },
    {
        color: 'white',
        row: 3,
        col: 4,
    },
    {
        color: 'black',
        row: 4,
        col: 4,
    }, 
    {
        color: 'white',
        row: 4,
        col: 3,
    },
    {
        color: 'black',
        row: 4,
        col: 2,
    },
    {
        color: 'white',
        row: 3,
        col: 2,
    }
];

const knightAllyPieces = [
    {
        color: 'white',
        row: 1,
        col: 2,
    }, 
    {
        color: 'white',
        row: 1,
        col: 4,
    },
    {
        color: 'white',
        row: 2,
        col: 5,
    },
    {
        color: 'white',
        row: 4,
        col: 5,
    },
    {
        color: 'white',
        row: 5,
        col: 4,
    }, 
    {
        color: 'white',
        row: 5,
        col: 2,
    },
    {
        color: 'white',
        row: 4,
        col: 1,
    },
    {
        color: 'white',
        row: 2,
        col: 1,
    }
];

const pawnWhiteAllyPieces = [
    {
        color: 'white',
        row: 2,
        col: 3,
    }
];

const pawnBlackAllyPieces = [
    {
        color: 'black',
        row: 4,
        col: 3,
    }
];

const pawnWhiteEnemyPieces = [
    {
        color: 'black',
        row: 2,
        col: 2,
    },
    {
        color: 'black',
        row: 2,
        col: 4,
    }
];

const pawnBlackEnemyPieces = [
    {
        color: 'black',
        row: 2,
        col: 2,
    },
    {
        color: 'black',
        row: 2,
        col: 4,
    }
];



const rookEnemyPieces = rookAllyPieces.map(piece => ({...piece, color: 'black'}));
const bishopEnemyPieces = bishopAllyPieces.map(piece => ({...piece, color: 'black'}));

const queenAllyPieces = [...rookAllyPieces, ...bishopAllyPieces];
const queenEnemyPieces = [...rookEnemyPieces, ...bishopEnemyPieces];

const knightEnemyPieces = knightAllyPieces.map(piece => ({...piece, color: 'black'}));

const kingAllyPieces = knightCleanTable.map(piece => ({...piece, color: 'white'}));
const kingEnemyPieces = knightCleanTable.map(piece => ({...piece, color: 'black'}));

module.exports = {
    rookAllyPieces,
    rookEnemyPieces,

    bishopAllyPieces,
    bishopEnemyPieces,

    queenAllyPieces,
    queenEnemyPieces,

    knightCleanTable,
    knightAllyPieces,
    knightEnemyPieces,

    kingAllyPieces,
    kingEnemyPieces,

    pawnWhiteAllyPieces,
    pawnWhiteEnemyPieces,

    pawnBlackAllyPieces,
    pawnBlackEnemyPieces
}