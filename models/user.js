const { Model } = require('objection');

class User extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'users';
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['first_name', 'last_name', 'email'],

      properties: {
        id: { type: 'integer' },
        first_name: { type: 'string', minLength: 1, maxLength: 100 },
        last_name: { type: 'string', minLength: 1, maxLength: 100 },
        email: { type: 'string', minLength: 1, maxLength: 100 },
      },
    };
  }

  static get relationMappings() {
    const Home = require('./home');

    return {
      homes: {
        relation: Model.ManyToManyRelation,
        modelClass: Home,
        join: {
          from: 'users.id',
          through: {
            from: 'home_users.user_id',
            to: 'home_users.home_id',
          },
          to: 'homes.id',
        },
      },
    };
  }

  // This object defines the relations to other models.
  // static get relationMappings() {
  //   // One way to prevent circular references
  //   // is to require the model classes here.
  //   const Person = require('./Person');
  //
  //   return {
  //     owner: {
  //       relation: Model.BelongsToOneRelation,
  //
  //       // The related model. This can be either a Model subclass constructor or an
  //       // absolute file path to a module that exports one.
  //       modelClass: Person,
  //
  //       join: {
  //         from: 'animals.ownerId',
  //         to: 'persons.id',
  //       },
  //     },
  //   };
  // }
}

module.exports = User;
