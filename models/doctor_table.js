const bookshelf = require('../config/bookshelf');

const Doctor_table = bookshelf.Model.extend({
    tableName: 'doctor_table',
    hasTimestamps: true,
    autoIncrement: true
});
module.exports = bookshelf.model('doctor_table', Doctor_table);