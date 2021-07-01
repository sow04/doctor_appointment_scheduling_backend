
exports.up = function (knex) {
    return knex.schema.createTable('admin_table', t => {
        t.increments();
        t.string('name').notNullable();
        t.string('email').unique().notNullable();
        t.string('password').notNullable();
        t.string('phone').notNullable();
        t.string('hospital_name').notNullable();
        t.string('hospital_address').notNullable();
        t.string('hospital_phone').notNullable();
        t.string('hospital_logo')
        t.timestamps();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('admin_table')
};
