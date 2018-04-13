var doc = require('doc-js'),
    setify = require('setify'),
    naturalSelection = require('natural-selection'),
    fireEvent = require('fire-html-event'),
    allowedKeys = [0, 8, 13, 9];

function constructInsertString(element, insertValue){
    var result = '',
        value = element.value;

    if(naturalSelection(element)) {
        var start = element.selectionStart,
            end = element.selectionEnd;

        result = value.slice(0, start) + insertValue + value.slice(end);
    } else {
        result = value + insertValue;
    }

    return result;
}

function validateInput(testString, regex) {
    var newRegex = new RegExp(regex);

    return !!testString.match(newRegex);
}

function validateKey(event, regex) {
    if(event.metaKey || ~allowedKeys.indexOf(event.which)) {
        return;
    }

    var newChar = String.fromCharCode(event.which),
        testString = constructInsertString(event.target, newChar);

    if(!validateInput(testString, regex)){
        event.preventDefault();
    }
}

function validatePaste(event, regex){
    event.preventDefault();

    var element = event.target,
        pastedData = event.clipboardData.getData('Text');

    pastedData = constructInsertString(element, pastedData);
    pastedData = pastedData.split('')
        .reduce(function(result, charater) {
            if(validateInput(result + charater, regex)){
                return result + charater;
            }

            return result;
        }, '');

    setify(element, pastedData);

    fireEvent(event.target, 'change');
}

var eventValidators = {
    'paste': validatePaste,
    'keypress': validateKey
};

module.exports = function(event, regex) {
    if(!event) {
        throw('event is required');
    }

    if(!regex) {
        throw('regex is required');
    }

    var validator = eventValidators[event.type];

    validator(event, regex);
};
