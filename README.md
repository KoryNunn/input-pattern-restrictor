# input-pattern-restrictor
Restrict event propagation into input-like elements by validating the inputted value via regex.

## Usage
```javascript
var inputPatternRestrictor = require('input-pattern-restrictor');

window.onload = function() {

    function restrictInput(event){
        inputPatternRestrictor(event, /^\d{0,2}\s?\d{0,3}\s?\d{0,3}\s?\d{0,3}$/);
    }

    element.addEventListener('keypress', restrictInput);
    element.addEventListener('paste', restrictInput);
};
```

## Example
npm run example
