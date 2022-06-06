const { Model } = require('objection');

class Home extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'homes';
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'address_line1',
        'city',
        'state',
        'postal_code',
        'country',
        'name',
      ],

      properties: {
        id: { type: 'integer' },
        address_line1: { type: 'string', minLength: 1, maxLength: 100 },
        address_line2: { type: 'string', minLength: 1, maxLength: 100 },
        city: { type: 'string', minLength: 1, maxLength: 100 },
        state: { type: 'string', minLength: 1, maxLength: 100 },
        postal_code: { type: 'string', minLength: 1, maxLength: 100 },
        country: { type: 'string', minLength: 1, maxLength: 100 },
        name: { type: 'string', minLength: 1, maxLength: 100 },
      },
    };
  }

  static get relationMappings() {
    const User = require('./user');

    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User, // imported Objection class of "Project"
        join: {
          from: 'homes.id',
          through: {
            from: 'homeusers.home_id',
            to: 'homeusers.user_id',
          },
          to: 'users.id',
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

module.exports = Home;
