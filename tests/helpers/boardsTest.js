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
        col: 5,
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
        color: 'white',
        row: 4,
        col: 2,
    },
    {
        color: 'white',
        row: 4,
        col: 4,
    }
];

const pawnBlackCleanTable = [
    {
        color: 'black',
        row: 4,
        col: 2,
    },
    {
        color: 'black',
        row: 4,
        col: 4,
    }
];

const pawnWhiteCleanTable = [
    {
        color: 'white',
        row: 2,
        col: 2,
    },
    {
        color: 'white',
        row: 2,
        col: 4,
    }
];

const kingWhiteEnemyAttack = [
    {
        color: 'black',
        row: 0,
        col: 2,
        type: 'bishop'
    },
    {
        color: 'black',
        row: 7,
        col: 2,
        type: 'rook'
    },
    {
        color: 'black',
        row: 7,
        col: 1,
        type: 'queen'
    },
    {
        color: 'black',
        row: 2,
        col: 6,
        type: 'knight'
    }
];

const kingWithOtherKing = [
    {
        color: 'black',
        row: 3,
        col: 5,
        type: 'king'
    },
];

const kingWhitePawnAttack = [
    {
        color: 'black',
        row: 2,
        col: 1,
        type: 'pawn'
    },
    {
        color: 'black',
        row: 1,
        col: 3,
        type: 'pawn'
    },
    {
        color: 'black',
        row: 2,
        col: 5,
        type: 'pawn'
    },
];

const kingBlackPawnAttack = [
    {
        color: 'white',
        row: 4,
        col: 1,
        type: 'pawn'
    },
    {
        color: 'white',
        row: 5,
        col: 3,
        type: 'pawn'
    },
    {
        color: 'white',
        row: 4,
        col: 5,
        type: 'pawn'
    },
];

const rookEnemyPieces = rookAllyPieces.map(piece => ({...piece, color: 'black'}));
const bishopEnemyPieces = bishopAllyPieces.map(piece => ({...piece, color: 'black'}));

const queenAllyPieces = [...rookAllyPieces, ...bishopAllyPieces];
const queenEnemyPieces = [...rookEnemyPieces, ...bishopEnemyPieces];

const knightEnemyPieces = knightAllyPieces.map(piece => ({...piece, color: 'black'}));

const kingAllyPieces = knightCleanTable.map(piece => ({...piece, color: 'white'}));
const kingEnemyPieces = knightCleanTable.map(piece => ({...piece, color: 'black', type: 'knight'}));

const pawnWhiteBlockedByEnemy = pawnWhiteAllyPieces.map(piece => ({...piece, color: 'black'}));
const pawnBlackBlockedByEnemy = pawnBlackAllyPieces.map(piece => ({...piece, color: 'white'}));


const kingBlackEnemyAttack = kingWhiteEnemyAttack.map(piece => ({...piece, color: 'white'}));
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
    pawnBlackAllyPieces,

    pawnBlackEnemyPieces,
    pawnWhiteEnemyPieces,

    pawnWhiteBlockedByEnemy,
    pawnBlackBlockedByEnemy,

    pawnBlackCleanTable,
    pawnWhiteCleanTable,

    kingWhiteEnemyAttack,
    kingBlackEnemyAttack,

    kingWithOtherKing,

    kingWhitePawnAttack,
    kingBlackPawnAttack
}