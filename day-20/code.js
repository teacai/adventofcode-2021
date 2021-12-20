
function parseLine(line) {
    return line.split("").map(p => p == '#' ? 1 : 0);
}

var input = document.querySelector('body').innerText.split(/\n\n/)
        .filter(l => l.length > 0);
var algo = parseLine(input[0]);
var image = input[1].split(/\n/).filter(l => l.length > 0).map(line => parseLine(line));

function expand2d(arr, di, dj) {
    var nr = Array(arr.length + di * 2).fill().map(() => Array(arr[0].length + dj * 2).fill(0));

    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
            nr[i+di][j+dj] = arr[i][j];
        }
    }
    return nr;
}

function gridInt(image, i, j) {
    //console.log("Grid at ", i, j);
    var li = i < 1 ? i : i - 1;
    var lj = j < 1 ? j : j - 1;
    var hi = i > image.length - 2 ? image.length - 1 : i + 1;
    var hj = j > image[i].length - 2 ? image[i].length - 1 : j + 1;

    var ix = parseInt("" +
        image[li][lj] + image[li][j] + image[li][hj] +
        image[i][lj] + image[i][j] + image[i][hj] +
        image[hi][lj] + image[hi][j] + image[hi][hj], 2);

    //console.log("Grid [" + ix + "]: ", li,i,hi,lj,j,hj);
    return ix;
}

function computePixel(image, algorithm, i, j) {
    var ix = gridInt(image, i, j);
    var v = algorithm[ix];
    //console.log("Value at ", ix, v);
    return v;
}

function enhance(image, algo) {
    var img = expand2d(image, 0, 0); // copy
    for(var i = 0; i < image.length; i++) {
        for (var j = 0; j < image[0].length; j++) {
            img[i][j] = computePixel(image, algo, i, j);
        }
    }
    return img;
}

function countLight(image) {
    var count = 0;
    for(var i=0; i<image.length; i++) {
        for(var j=0; j<image[0].length; j++) {
            count += image[i][j];
        }
    }
    return count;
}

var img9 = expand2d(image, 9, 9);
img9 = enhance(img9, algo);
img9 = enhance(img9, algo);

console.log('Part 1: ', countLight(img9));
// ----

var img50 = expand2d(image, 50*3, 50*3);

for(var i = 0; i < 50; i++) {
    img50 = enhance(img50, algo);
}

console.log('Part 2: ', countLight(img50));