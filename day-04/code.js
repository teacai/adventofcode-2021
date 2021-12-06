
var lines = document.querySelector('body').innerText.split(/\n/);
var numbers = lines[0].split(/\s*,\s*/);
var boards = [];
var cBoard = [];
for (var i = 2; i < lines.length; i++) {
    if (/\S+/.test(lines[i])) {
        var l = lines[i].split(/\s+/).filter(s => s.length > 0);
        cBoard.push(l);
    } else {
        //console.log('boards: ', boards)
        boards.push(cBoard);
        cBoard = [];
    }
}


var winBoard = boards.reduce( (min, board) => {
    console.log('Board: ', board, min);
    var minBoard = 100;
    for (var i = 0; i < 5; i++) {
        var minRow = 0, minCol = 0;
        for (var j = 0; j < 5; j++) {
            minCol = Math.max(minCol, numbers.indexOf(board[j][i]));
            minRow = Math.max(minRow, numbers.indexOf(board[i][j]));
        }
        if (minBoard > minCol) {minBoard = minCol;}
        if (minBoard > minRow) {minBoard = minRow;}
    }
    if (min.value > minBoard) {
        min.value = minBoard;
        min.board = board;
    }
    console.log('Min ', min);
    return min;
}, {value: 100, board: null})

for (var i = 0, n = winBoard.value; i <= n; i++) {
    for (var j = 0; j < 5; j++) {
        var found = winBoard.board[j].indexOf(numbers[i]);
        if (found >= 0) {
            winBoard.board[j][found] = '0';
        }
    }
}

var sum = 0;
for(var i = 0; i < 5; i++) {
    for(var j = 0; j < 5; j++) {
        sum += parseInt(winBoard.board[i][j]);
    }
}

console.log('Mult: ', sum * parseInt(numbers[winBoard.value]));



// ====



var lines = document.querySelector('body').innerText.split(/\n/);
var numbers = lines[0].split(/\s*,\s*/);
var boards = [];
var cBoard = [];
for (var i = 2; i < lines.length; i++) {
    if (/\S+/.test(lines[i])) {
        var l = lines[i].split(/\s+/).filter(s => s.length > 0);
        cBoard.push(l);
    } else {
        //console.log('boards: ', boards)
        boards.push(cBoard);
        cBoard = [];
    }
}


var winBoard = boards.reduce( (min, board) => {
    console.log('Board: ', board, min);
    var minBoard = 100;
    for (var i = 0; i < 5; i++) {
        var minRow = 0, minCol = 0;
        for (var j = 0; j < 5; j++) {
            minCol = Math.max(minCol, numbers.indexOf(board[j][i]));
            minRow = Math.max(minRow, numbers.indexOf(board[i][j]));
        }
        if (minBoard > minCol) {minBoard = minCol;}
        if (minBoard > minRow) {minBoard = minRow;}
    }
    if (min.value < minBoard) {
        min.value = minBoard;
        min.board = board;
    }
    console.log('Min ', min);
    return min;
}, {value: 0, board: null})

for (var i = 0, n = winBoard.value; i <= n; i++) {
    for (var j = 0; j < 5; j++) {
        var found = winBoard.board[j].indexOf(numbers[i]);
        if (found >= 0) {
            winBoard.board[j][found] = '0';
        }
    }
}

var sum = 0;
for(var i = 0; i < 5; i++) {
    for(var j = 0; j < 5; j++) {
        sum += parseInt(winBoard.board[i][j]);
    }
}

console.log('Mult: ', sum * parseInt(numbers[winBoard.value]));