'use strict';

const fs = require('fs');

function getColorName(colorCode) {
    var file = fs.readFileSync('list.json','utf-8');
    const parser = JSON.parse(file);
    return parser[colorCode];
}

function getColorCode(colorName) {

    let colorCode;
    let flag = 0;
    var file = fs.readFileSync('list.json','utf-8');
    const parser = JSON.parse(file);
    Object.entries(parser).forEach(([key, value]) => {
        if(value === colorName) {
            colorCode = key;
            flag = 1;
        }
    });

    if(flag!=0) {
        return colorCode;
    }
    else {
        console.log("color code not found.");
    }
}

function rgbPercentage(hexCode) {

    let result = HexToRgb(hexCode);
    let arr = new Array();
    let r,g,b;
    for(let i=0;i<result.length;i++) {
        arr.push(Math.abs(((result[i]/255) * 100).toFixed(4)));
    }
    
    return arr;

}

function HexadecimalToDecimal(smallHexCode) {

    let dec = 0;

    let codes = {
        'A' : 10,
        'a' : 10,
        'B' : 11,
        'b' : 11,
        'C' : 12,
        'c' : 12,
        'D' : 13,
        'd' : 13,
        'E' : 14,
        'e' : 14,
        'F' : 15,
        'f' : 15
    };

    for(let i=0;i<smallHexCode.length;i++) {

        let b = smallHexCode[i];

        // check if b is equals to codes
        Object.entries(codes).forEach(([key, value]) => {
            if(b === key) b = value;
        });

        dec += b * Math.pow(16,((smallHexCode.length-i)-1));
    }

    return dec;

}

function HexToRgb(hexCode) {

    if(hexCode[0] === '#') hexCode = hexCode.substring(1);

    else if(hexCode[0]!='#' && hexCode.length!=6) return [0,0,0];

    let r = HexadecimalToDecimal(hexCode.substring(0,2));
    let g = HexadecimalToDecimal(hexCode.substring(2,4));
    let b = HexadecimalToDecimal(hexCode.substring(4,6)); 

    return [r,g,b];
}


function rgbToCMYK(r,g,b) {

    r = r/255;
    g = g/255;
    b = b/255;

    // calculating k
    let k = Math.abs((1 - Math.max(r,g,b)).toFixed(4));
    let c = Math.abs(((1-r-k) / (1-k)).toFixed(4));
    let m = Math.abs(((1-g-k) / (1-k)).toFixed(4));
    let y = Math.abs(((1-b-k) / (1-k)).toFixed(4));

    return [c,m,y,k];

}
