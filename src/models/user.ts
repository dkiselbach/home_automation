import { Model } from 'objection';
import Home from './home.js';

class User extends Model {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;

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
      required: ['firstName', 'lastName', 'email'],

      properties: {
        id: { type: 'integer' },
        firstName: { type: 'string', minLength: 1, maxLength: 100 },
        lastName: { type: 'string', minLength: 1, maxLength: 100 },
        email: { type: 'string', minLength: 1, maxLength: 100 },
        password: { type: 'string', minLength: 1, maxLength: 256 },
      },
    };
  }

  static get relationMappings() {
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
}

export default User;
