'use strict';

const fs = require('fs');
const err = 'error!';
const invalid = 'invalid code!';
const notFound = 'not found!';

const codes = {
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

class colorise {

    checkValidity = () => {
        if(typeof(r)!='number' || typeof(g)!='number' || typeof(b)!='number') {
            return true;
        }

    }

    getColorName = (colorCode) => {
        let file = fs.readFileSync('list.json','utf-8');
        const parser = JSON.parse(file);
        if(typeof(parser)!="string") return notFound;
        else return parser[colorCode];
    }

    getColorCode = (colorName) => {
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
    
        if(flag!=0) return colorCode,this;
        else return notFound;
    }

    rgbPercentage = (r,g,b) => {

        let arr = new Array();
        let percR = ((r/255)*100).toFixed(4);
        let percG = ((g/255)*100).toFixed(4);
        let percB = ((b/255)*100).toFixed(4);
        arr.push(percR);
        arr.push(percG);
        arr.push(percB);
    
        return arr;
    }
    
    HexadecimalToDecimal = (smallHexCode) => {
    
        let dec = 0;
        
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
    
    HexToRgb = (hexCode) => {
    
        if(hexCode[0] === '#') hexCode = hexCode.substring(1);
    
        else if(hexCode[0]!='#' && hexCode.length!=6) return err;
    
        let r = this.HexadecimalToDecimal(hexCode.substring(0,2));
        let g = this.HexadecimalToDecimal(hexCode.substring(2,4));
        let b = this.HexadecimalToDecimal(hexCode.substring(4,6)); 
    
        return [r,g,b];
    }
    
    rgbToCMYK = (r,g,b) => {
    
        if(this.checkValidity(r,g,b) === true) {
            return err;
        }
    
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
    
    rgbToHsl = (r,g,b) => {
    
        if(this.checkValidity(r,g,b) === true) {
            return err;
        }
        
        let res = {
            h : null,
            s : null, 
            l : null,
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
    
        if(delta === 0) res.h = 0;
        else if(cmax === r) res.h = (((g-b)/delta)%6)*60;
        else if(cmax === g) res.h = (((b-r)/delta)+2)*60;
        else if(cmax === b) res.h = (((r-g)/delta)+4)*60;
    
        res.l = (cmax + cmin)/2;
    
        if(delta === 0) res.s = 0;
        else res.s = (delta/(1-Math.abs(2*(res.l)-1)));
    
        return res; // return object
    }
    
    rgbToHwb = (r,g,b) => {
    
        if(this.checkValidity(r,g,b) === true) {
            return err;
        }
    
        // initialising object
        let res  = {
            h : null,
            w : null,
            b : null
        };
    
        // getting hue from hsl function
        let temp = rgbToHsl(r,g,b);
        res.h = temp.h;
    
        // calculating whiteness
        res.w = 1/255*Math.min(r,Math.min(g,b));
        res.b = 1 - 1/255*Math.max(r,Math.max(g,b));
        return res;
    }
        
    whitenColor = (r,g,b,ratio) => {
    
        if(this.checkValidity(r,g,b) === true || typeof(ratio)!='number') {
            return err;
        }
    
        let res = {
            h : null,
            w : null,
            b : null,
        };
    
        let temp = this.rgbToHwb(r,g,b);

        if(ratio < 0) ratio = 0;

        else if(ratio > 1) return 'ratio must be less than 1.';

        else {
            res.h = temp.h;
            res.b = temp.b*ratio;
            res.w = 1 - res.b;
            //res.w = temp.w*ratio;
            //res.b = 1 - res.w;
            return res;
        }
    }
    
    blackenColor = (r,g,b,ratio) => {
    
        if(this.checkValidity(r,g,b) === true || typeof(ratio)!='number') {
            return err;
        }
    
        let res = {
            h : null,
            w : null,
            b : null
        };
    
        let temp = this.rgbToHwb(r,g,b);

        if(ratio < 0) ratio = 0;

        else if(ratio>1) return 'ratio must be less than 1.';

        else {
            res.h = temp.h;
            res.w = temp.w*ratio;
            res.b = 1 - res.w;
            //res.b = temp.b*ratio;
            //res.w = 1 - res.b;
            return res;
        }

        
    }
        
    lightenColor = (r,g,b,ratio) => {
    
        if(this.checkValidity(r,g,b) === true || typeof(ratio)!='number') {
            return err;
        }

        if(ratio < 0) ratio = 0;

        let res = this.rgbToHsl(r,g,b);
        res.l += res.l * ratio;
        return res;
    
    }
        
    darkenColor = (r,g,b,ratio) => {
    
        if(this.checkValidity(r,g,b) === true || typeof(ratio)!='number') {
            return err;
        }
    
        let res = this.rgbToHsl(r,g,b);
        res.l -= res.l * ratio;
        return res;
    }
        
    negateColor = (r,g,b) => {
    
        if(this.checkValidity(r,g,b) === true) {
            return err;
        }
    
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
        
    rgbToHex = (r,g,b) => {
    
        if(this.checkValidity(r,g,b) === true) {
            return err;
        }
    
        let hexcode = new String();
        let arr = new Array();
        let flag,k;
        arr.push(r);
        arr.push(g);
        arr.push(b);
    
    
        for(let i=0;i<arr.length;i++) {
            let number = arr[i];
            number = (number/16).toFixed(2);
            let std_token = number.toString().split(".");
            
            // searching left part
            flag = 0;
            let left_number = parseInt(std_token[0]);
            Object.entries(codes).forEach(([key, value]) => {
                if(parseInt(left_number) === value) {
                    k = key.toUpperCase();
                    flag = 1;
                }
            });
    
            if(flag!=0) hexcode += k;
            else hexcode += std_token[0];
    
            // searching right part
            flag = 0;
            let right_number = new String();
            right_number += "."+std_token[1];
            right_number = (parseFloat(right_number))*16;
            Object.entries(codes).forEach(([key, value]) => {
                if(parseInt(right_number) === value) {
                    k = key.toUpperCase();
                    flag = 1;
                }
            });
    
            if(flag!=0) hexcode += k;
            else hexcode += right_number;
        }
    
        hexcode = "#" + hexcode;
        return hexcode;
    }
}

module.exports = colorise;
