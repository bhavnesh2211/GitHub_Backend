
exports.up = async (knex) => {
    await knex.schema.createTable ("users", table => {
        table.increments("id")
        table.string("name").notNullable()
        table.string("email_id").notNullable().unique()
        table.string("phone_number").notNullable()
        table.string("password").notNullable()
    })
};

exports.down = async (knex) => {
    await knex.schema.dropTable("users")
};
