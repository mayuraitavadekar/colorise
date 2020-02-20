'use strict';

const fs = require('fs');
var colorFile;

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
        console.log(b);

        // check if b is equals to codes
        Object.entries(codes).forEach(([key, value]) => {
            if(b === key) {
                b = value;
                console.log("value");
            }
        });

        dec += b * Math.pow(16,((smallHexCode.length-i)-1));
    }

    return dec;

}

function HexToRgb(hexCode) {

    if(hexCode[0]!='#') {
        console.log("this is not hex code.");
        exit(0);
    }

    hexCode = hexCode.substring(1);

    if(hexCode.length > 6) {
        console.log("length is too much.");
        exit(0);
    }

    let r = HexadecimalToDecimal(hexCode.substring(0,2));
    let g = HexadecimalToDecimal(hexCode.substring(2,4));
    let b = HexadecimalToDecimal(hexCode.substring(4,6)); 

    return [r,g,b];
}
