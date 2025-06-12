import { z } from 'zod';

import { authSchema } from '../validators/schema/auth.schema.js';
import { Types } from 'mongoose';

export type TLOGIN = z.infer<typeof authSchema.login>;

export type TREGISTER = z.infer<typeof authSchema.register>;
