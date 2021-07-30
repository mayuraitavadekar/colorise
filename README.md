# colorise.js [<img src="https://github.com/mayuraitavadekar/colorise/blob/master/colorise-icon.png" alt="color-bee Logo" align="left">](https://github.com/mayuraitavadekar/colorise.js)
<img src="https://img.shields.io/badge/github-active-green"/> <img src="https://img.shields.io/badge/downloads-60%2B-brightgreen"/> <img src="https://img.shields.io/badge/version-1.0.5-green"/>

A small JavaScript library for color manipulation.<br>
Inspired by [color.js](https://github.com/brehaut/color-js) but I'm aiming to write simplified and robust source code with some different functionalities. 
<br/>
<br/>

## Installation in npm

```npm
npm i colorise --save
```

## Usage

```javascript
const colorise = require('colorise');

// create instance of class
let c = new colorise();

// use different functions 
let result = c.getColorName('#7cb9e8'); 
console.log(result); // 'Aero'
```

-------------------------------------

|Function Name|Description|Parameters|returns|
|---|---|---|---|
| getColorName(colorCode)  |function to get name of color from hex-color-code.   |hex-color-code : string   |color : string   | 
|getColorCode(colorName)   |function to get hexadecimal color code from color name   |color : string   |hex-color-code : string   | 
|rgbPercentage(r,g,b)   |function to calculate r,g,b percentage in color   |r : number,g : number,b : number   |returns array   | 
| hexToRgb(hexCode)  |function to get r,g,b values from hexCode   |r : number,g : number,b : number    |  returns array |
|rgbToCMYK(r,g,b)   | function to get cyan, magneta, yellow, black values from r,g,b values  |r : number,g : number,b : number   |return array   | 
| rgbToHsl(r,g,b)  | function to get hue, saturation and lightness from r,g,b values   |r : number,g : number, b : number   |returns object   | 
| rgbToHwb(r,g,b)  |function to get hue, whiteness and blackness values from r,g,b   |r : number, g : number, b : number   | returns object| 
| whitenColor(r,g,b,ratio),darkenColor(r,g,b,ratio), lightenColor(r,g,b,ratio),blackenColor(r,g,b,ratio)   |these functions perform whitening, darkening, lightning and blackening r,g,b color as per given ratio   |r : number, g : number, b : number, ratio : number < 0   | returns array/object   | 
|negateColor(r,g,b) |function takes negation of color   |r : number,g : number,b : number|returns array   | 
|hslToRgb(h,s,l)   |function to get r,g,b color from h,s,l values   |0<=hue<=360,0<=s<=100, 0<=l<=100|returns array   | 
|rgbToHex(r,g,b)   |function to get hex-color-code from rgb|r : number,g : number,b : number   |returns string   | 


## Disclaimer
Library is licensed under MIT License Copyright (C) 2020. 

The color-data used in code is provided by [Jonathan Neal](https://github.com/jonathantneal) on his github which is obvious, how can anyone know all these color codes and their names XD.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. If anyone finds that something in code need to changed/improved/modified please drop mail.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Recent Updates

- I am no longer maintainer though current version is stable.

## Dependancies

- No external dependancies till date.

