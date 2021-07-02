
// exports.up = function (knex) {
//     return knex.schema.createTable('doctor_schedule_table', t => {
//         t.increments();
//         t.bigInteger('doctor_id').references('id').inTable('doctor_table').notNullable();
//         t.dateTime('doctor_schedule_date').notNullable();
//         t.enu('doctor_schedule_day', ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']).notNullable();
//         t.dateTime('doctor_schedule_start_time').notNullable();
//         t.dateTime('doctor_schedule_end_time').notNullable();
//         t.dateTime('average_consulting_time').notNullable();
//         t.enu('doctor_schedule_status', ['Active','Inactive']).notNullable();
//         t.timestamps();
//     });
// };

// exports.down = function (knex) {
//     return knex.schema.dropTable('doctor_schedule_table')
// };
