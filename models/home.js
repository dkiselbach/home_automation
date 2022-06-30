import { Model } from 'objection';
import User from './user';

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
      required: ['addressLine1', 'city', 'state', 'postalCode', 'country', 'name'],

      properties: {
        id: { type: 'integer' },
        addressLine1: { type: 'string', minLength: 1, maxLength: 100 },
        addressLine2: { type: 'string', minLength: 1, maxLength: 100 },
        city: { type: 'string', minLength: 1, maxLength: 100 },
        state: { type: 'string', minLength: 1, maxLength: 100 },
        postalCode: { type: 'string', minLength: 1, maxLength: 100 },
        country: { type: 'string', minLength: 1, maxLength: 100 },
        name: { type: 'string', minLength: 1, maxLength: 100 },
      },
    };
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'homes.id',
          through: {
            from: 'home_users.home_id',
            to: 'home_users.user_id',
          },
          to: 'users.id',
        },
      },
    };
  }
}

export default Home;
