
exports.up = function (knex) {
    return knex.schema.createTable('appointment_table', t => {
        t.increments();
        t.bigInteger('doctor_id').references('id').inTable('doctor_table').notNullable();
        t.bigInteger('patient_id').references('id').inTable('patient_table').notNullable();
        t.bigInteger('doctor_schedule_id').references('id').inTable('patient_table').notNullable();
        t.bigInteger('appointment_number').notNullable();
        t.text('reason_for_appointment').notNullable();
        t.dateTime('appointment_time').notNullable();
        t.string('status').notNullable();
        t.enu('patient_come_into_hospital', ['No','Yes']).notNullable();
        t.text('doctor_comment').notNullable();
        t.timestamps();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('appointment_table')
};
