const puzzle = '2001\n0..0\n1000\n0..0'
const words = ['aaab', 'aaac', 'aaad', 'aaae']
let rows = [];
let finalWords = new Set();
let RowsResult;
let CopyOfWords = [];


function check(puzzle, words) {
    if (!Array.isArray(words)) {
        return false;
    }
    if (CopyOfWords.length === 0) {
        CopyOfWords = [...words];
    }
    if (typeof puzzle !== 'string') {
        return false;
    }
    rows = puzzle.split('\n'); 
    const rowLength = rows[0].length;
    let sumNumbersOfRows = 0;
    let arrOfNums = [];
    for (const row of rows) {
        if (row.length !== rowLength) {
            return false;
        }
        if (!/^[0-2.]+$/.test(row)) {
            return false;
        }
        for (const index of row) {
            if (index === '1' || index === '2') {
                let num = parseInt(index, 10);
                arrOfNums.push(num);
                sumNumbersOfRows += num;
            }
        }
    }
    if (arrOfNums.length == 1 && words.length > 1) {
        return false;
    }
    for (const word of words) {
       
        if (finalWords.has(word)) {
            return false;
        }
       
        finalWords.add(word);
    }
    if (sumNumbersOfRows !== words.length) {
        return false;
    }
    RowsResult = rows.map(row => row.split('')); 
    rows = rows.map(row => row.split(''));

    return true;
}

function solve(puzzle, words) {
    if (!check(puzzle, words)) {
        return 'Error';
    }
    for (let i = 0; i < rows.length; i++) {
        let line = rows[i];
        for (let j = 0; j < line.length; j++) {
            let char = line[j];
            let zerosRow = 0;
            let zerosCol = 0;

            if (((j === 0) && (char === '1' || char === '2')) || ((j > 0) && (line[j - 1] === '.') && (char === '1' || char === '2') ) || ((i === 0) && (char === '1' || char === '2')) || ((i > 0) && (char === '1' || char === '2') && (rows[i-1][j] === '.'))) {
                for (let r = j + 1; r < line.length; r++) {
                    if (j>0 && j<line.length-1) {
                        if (line[j-1] !== '.' && line[j+1] !== '.') {
                            break
                        }
                    }
                    let char2 = line[r];
                    
                    if (char2 === '0' || char2 === '1' || char2 === '2' || /[a-z]/.test(char2)) {
                        zerosRow++;
                    } else {
                        break;
                    }
                }
                for (let c = i + 1; c < rows.length; c++) {
                    let nextRow = rows[c];
                    let charNextRow = nextRow[j];
    
                    if (charNextRow === '0' || charNextRow === '1' || charNextRow === '2' || /[a-z]/.test(charNextRow)) {
                        zerosCol++;
                    } else {
                        break;
                    }
                }
            }
            if (char === '1') {
               
                if (zerosRow > 0) {
                    let lenOfWord = zerosRow + 1;
                    let foundWord = '';
                    for (const word of words) {
                        if (word.length == lenOfWord && (RowsResult[i][j] === '1' || RowsResult[i][j] === word[0])) {
                            foundWord = word;
                            let index = words.indexOf(word);
                            words.splice(index, 1);
                            break;
                        }
                    }
                    for (let rep = 0; rep < foundWord.length; rep++) {
                        RowsResult[i][j + rep] = foundWord[rep];
                        if (rows[i][j + rep] === '0') {
                            rows[i][j + rep] = foundWord[rep]
                        }
                    }
                    rows[i][j] = foundWord[0]
                   

                }
                if (zerosCol > 0 && zerosRow == 0) {
                    let lenOfWord = zerosCol + 1;
                    let foundWord = '';
                    for (const word of words) {
                        if (word.length == lenOfWord && (RowsResult[i][j] === '1' || RowsResult[i][j] === word[0])) {
                            foundWord = word;
                            let index = words.indexOf(word);
                            words.splice(index, 1);
                            break;
                        }
                    }
                    for (let rep = 0; rep < foundWord.length; rep++) {
                        RowsResult[i + rep][j] = foundWord[rep];
                        if (rows[i + rep][j] === '0') {
                            rows[i + rep][j] = foundWord[rep]
                        }
                    }
                    
                }
            
            }
            if (char === '2') {
                let foundchar = ''
                if (zerosRow > 0) {
                    let lenOfWord = zerosRow + 1;
                    let foundWord = '';
                    for (const word of words) {
                        if (word.length == lenOfWord) {
                            foundWord = word;
                            foundchar = word[0]
                            let index = words.indexOf(word);
                            words.splice(index, 1);
                            break;
                        }
                    }
                    for (let rep = 0; rep < foundWord.length; rep++) {
                        RowsResult[i][j + rep] = foundWord[rep];
                        if (rows[i][j + rep] === '0') {
                            rows[i][j + rep] = foundWord[rep]
                        }
                    }
                   
                }
                if (zerosCol > 0 ) {
                    let lenOfWord = zerosCol + 1;
                    let foundWord = '';
                    for (const word of words) {
                        if (word.length == lenOfWord && foundchar === word[0]) {
                            foundWord = word;
                            let index = words.indexOf(word);
                            words.splice(index, 1);
                            break;
                        }
                    }
                    for (let rep = 0; rep < foundWord.length; rep++) {
                        RowsResult[i + rep][j] = foundWord[rep];
                        if (rows[i + rep][j] === '0') {
                            rows[i + rep][j] = foundWord[rep]
                        }
                    }
                }
            }
        }
       
    }
    return RowsResult.map(row => row.join('')).join('\n');
}

let finalResult = solve(puzzle, words)
let index = finalResult.indexOf('0')
if (index !== -1) {
    rows = [];
    finalWords.clear(); 
    RowsResult = [];
    finalResult = solve(puzzle, CopyOfWords.reverse());

    let ind = finalResult.indexOf('0');
    if (ind !== -1) {
        console.log('Error');
    } else {
        console.log(finalResult);
    }
} else {
    console.log(finalResult);
}

 