import { authSchema } from './schema/auth.schema.js';
import { squirrelSchema } from './schema/squirrel.schema.js';

export default {
  authValidator: authSchema,
  squirrelValidator: squirrelSchema,
};
