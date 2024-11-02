const mongoose = require('mongoose');
const Internal = require('../models/internal_form');
const External = require('../models/external_form');
const Guide= require('../models/add_guide');
const InTitle=require ('../models/add_title');
async function sign_increment(modelName) {
    let model;
    
    switch (modelName) {
        case 'internal_form':
            model = Internal;
            break;
        case 'external_form':
            model = External;
            break;
        case 'add_guide':
            model = Guide;
            break;
        case 'add_title':
                model = InTitle;
                break;
        default:
            throw new Error('Invalid model name');
    }

    const result = await model.findOne().sort({ S_no: -1 }).exec();
    const nextSno = result ? result.S_no + 1 : 1;
    return nextSno;
}

module.exports = sign_increment;
