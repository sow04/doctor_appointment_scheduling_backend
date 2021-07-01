const bookshelf = require('../config/bookshelf');

const Appointment_table = bookshelf.Model.extend({
    tableName: 'appointment_table',
    hasTimestamps: true,
    autoIncrement: true
});
module.exports = bookshelf.model('appointment_table', Appointment_table);