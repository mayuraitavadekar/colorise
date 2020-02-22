'use strict';

const fs = require('fs');
const err = 'error!';
const invalid = 'invalid code!'

function getColorName(colorCode) {
    let file = fs.readFileSync('list.json','utf-8');
    const parser = JSON.parse(file);
    return parser[colorCode];
}

/** remaining
 * function hexToRgb();
 */

function getColorCode(colorName) {

    let colorCode;
    let flag = 0;
    let file = fs.readFileSync('list.json','utf-8');
    const parser = JSON.parse(file);
    Object.entries(parser).forEach(([key, value]) => {
        if(value === colorName) {
            colorCode = key;
            flag = 1;
        }
    });

    if(flag!=0) return colorCode;
    
    else return invalid;
}

function rgbPercentage(hexCode) {

    let result = HexToRgb(hexCode);
    let arr = new Array();
    for(let i=0;i<result.length;i++) {
        arr.push(Math.abs(((result[i]/255) * 100).toFixed(4)));
    }
    
    return arr;
}

function rgbPercentage(r,g,b) {

    let arr = new Array();
    let percR = ((r/255)*100).toFixed(4);
    let percG = ((g/255)*100).toFixed(4);
    let percB = ((b/255)*100).toFixed(4);
    arr.push(percR);
    arr.push(percG);
    arr.push(percB);

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

    else if(hexCode[0]!='#' && hexCode.length!=6) return err;

    let r = HexadecimalToDecimal(hexCode.substring(0,2));
    let g = HexadecimalToDecimal(hexCode.substring(2,4));
    let b = HexadecimalToDecimal(hexCode.substring(4,6)); 

    return [r,g,b]; // returns array
}


function rgbToCMYK(r,g,b) {

    let arr = new Array();
    arr.push(r);
    arr.push(g);
    arr.push(b);

    for(let i=0;i<arr.length;i++) {
        if(arr[i]>255) arr[i] = 255;
        if(arr[i]<0) arr[i] = 0;
    }

    r = r/255;
    g = g/255;
    b = b/255;

    let k = Math.abs((1 - Math.max(r,g,b)).toFixed(4));
    let c = Math.abs(((1-r-k) / (1-k)).toFixed(4));
    let m = Math.abs(((1-g-k) / (1-k)).toFixed(4));
    let y = Math.abs(((1-b-k) / (1-k)).toFixed(4));

    return [c,m,y,k];
 
}
 
function rgbToHsl(r,g,b) {
    
    let res = {
        hue : null,
        saturation : null, 
        lightness : null,
    };
    
    let arr = new Array();
    arr.push(r);
    arr.push(g);
    arr.push(b);

    for(let i=0;i<arr.length;i++) {
        if(arr[i]<0) arr[i] = 0;
        if(arr[i]>255) arr[i] = 255;
    }


    r = arr[0]/255;
    g = arr[1]/255;
    b = arr[2]/255;

    let cmax = Math.max(r,g,b);
    let cmin = Math.min(r,g,b);
    let delta = cmax - cmin;


    if(delta === 0) res.hue = 0;
    else if(cmax === r) res.hue = (((g-b)/delta)%6)*60;
    else if(cmax === g) res.hue = (((b-r)/delta)+2)*60;
    else if(cmax === b) res.hue = (((r-g)/delta)+4)*60;

    res.lightness = (cmax + cmin)/2;

    if(delta === 0) res.saturation = 0;
    else res.saturation = (delta/(1-Math.abs(2*(res.lightness)-1)));

    return res;
}

function negateColor(r,g,b) {

    let arr = new Array();
    arr.push(r);
    arr.push(g);
    arr.push(b);

    for(let i=0;i<arr.length;i++) {
        if(arr[i]>255) arr[i] = 255;
        else if(arr[i]<0) arr[i] = 0;
    }

    for(let i=0;i<arr.length;i++) {
        arr[i] = 255 - arr[i];
    }

    return arr;

}

function lightenColor(r,g,b,ratio) {

    if(r !== undefined && g !== undefined && b !== undefined && ratio !== undefined) {
        // rgb case
        let res = rgbToHsl(r,g,b);
        res.lightness += res.lightness * ratio;
        return res;
    }

    if(r !== undefined && g !== undefined && b === undefined && ratio === undefined) {
        // hexcode case
        let hexcode = r;
        ratio = g;
        let arr = HexToRgb(hexcode);
        let res = rgbToHsl(arr[0],arr[1],arr[2]);
        res.lightness += res.lightness * ratio;
        return res;
    }

    else return err;

}

function rgbToHwb(r,g,b) {

    // calculating hue
    let res = {
        hue : null,
        whiteness : null,
        blackness : null
    }

    let res = rgbToHsl(r,g,b);
    res.hue = res.hue;

    // calculating whiteness
    res.whiteness = 1/255*Math.min(r,Math.min(g,b));
    res.blackness = 1 - 1/255*Math.max(r,Math.max(g,b));

    return res;

}

function whitenColor(r,g,b,ratio) {

    if(r !== undefined && g !== undefined && b !== undefined && ratio !== undefined) {
        // rgb case
        let res = rgbToHwb(r,g,b);
        res.lightness -= res.lightness * ratio;
        // now again convert the colors into rgb;
        return res;
    }

    if(r !== undefined && g !== undefined && b === undefined && ratio === undefined) {
        // hexcode case
        let hexcode = r;
        ratio = g;
        let arr = HexToRgb(hexcode);
        let res = rgbToHsl(arr[0],arr[1],arr[2]);
        res.lightness -= res.lightness * ratio;
        // again convert the colors into rgb;
        return res;
    }

    else return err;


}

function darkenColor(r,g,b,ratio) {

    if(r !== undefined && g !== undefined && b !== undefined && ratio !== undefined) {
        // rgb case
        let res = rgbToHsl(r,g,b);
        res.lightness -= res.lightness * ratio;
        // again convert the colors into rgb
        return res;
    }

    if(r !== undefined && g !== undefined && b === undefined && ratio === undefined) {
        // hexcode case
        let hexcode = r;
        ratio = g;
        let arr = HexToRgb(hexcode);
        let res = rgbToHsl(arr[0],arr[1],arr[2]);
        res.lightness -= res.lightness * ratio;
        // again convert the colors into rgb
        return res;
    }

    else return err;
}

