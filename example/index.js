var crel = require('crel'),
    doc = require('doc-js'),
    inputPatternRestrictor = require('../');

var abn = crel('div', {
        class: 'example'
    },
    crel('input', {
        'data-validate': 'abn'
    }),
    crel('label', 'abn only')
);

doc.ready(function() {

    crel(document.body,
        abn
    );

    doc.on('keypress paste', abn, event => inputPatternRestrictor(event, /^\d{0,2}\s?\d{0,3}\s?\d{0,3}\s?\d{0,3}$/));
});
