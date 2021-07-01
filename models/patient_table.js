const bookshelf = require('../config/bookshelf');

const Patient_table = bookshelf.Model.extend({
    tableName: 'patient_table',
    hasTimestamps: true,
    autoIncrement: true
});
module.exports = bookshelf.model('patient_table', Patient_table);