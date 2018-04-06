const pascalTriangle = (n) => {
    let a = [];
    for (let i = 0; i < n + 1; i++) {
        a[i] = [];
        for (let j = 0; j < i + 1; j++) {
            if (j == 0 || j == i) {
                a[i][j] = 1;
            } else {
                a[i][j] = a[i - 1][j - 1] + a[i - 1][j];
            }
        }
    }
    return a;
}


const reverse = (a) => {
    let newA = [];
    for (let i = a.length - 1; i >= 0; i--) {
        newA.push(a[i]);
    }
    return newA;
}

const rotate = (a) => {
    a = reverse(a);
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < i; j++) {
            if (a[i][j]) {
                let temp = a[i][j];
                a[i][j] = a[j][i];
                a[j][i] = temp;
            } else {
                continue;
            }
        }
    }
    return a;
};

module.exports = {
    pascalTriangle,
    rotate
}