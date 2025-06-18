import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User, { ROLES } from '../models/user.model';
import MongoDBClient from '../databases/mongo.database';
import logger from '../utils/common/logger.util';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(process.cwd(), 'mdfld-server/.env') });

const mockSellers = [
  { first_name: 'Liam', last_name: 'Carter', email: 'liam.carter+seller@mdfld.com' },
  { first_name: 'Jane', last_name: 'Smith', email: 'jane.smith+seller@mdfld.com' },
  { first_name: 'Noah', last_name: 'Johnson', email: 'noah.johnson+seller@mdfld.com' },
  { first_name: 'Olivia', last_name: 'Williams', email: 'olivia.williams+seller@mdfld.com' },
  { first_name: 'Elijah', last_name: 'Brown', email: 'elijah.brown+seller@mdfld.com' },
  { first_name: 'Emma', last_name: 'Jones', email: 'emma.jones+seller@mdfld.com' },
  { first_name: 'James', last_name: 'Garcia', email: 'james.garcia+seller@mdfld.com' },
  { first_name: 'Ava', last_name: 'Martinez', email: 'ava.martinez+seller@mdfld.com' },
  { first_name: 'Lucas', last_name: 'Davis', email: 'lucas.davis+seller@mdfld.com' },
  { first_name: 'Sophia', last_name: 'Lopez', email: 'sophia.lopez+seller@mdfld.com' },
  { first_name: 'THE BOOT', last_name: 'CHAMBER', email: 'thebootchamber@mdfld.com', image: '/images/thebootchamber-avatar.png' },
];

const PASSWORD = 'Password123!';
const PLACEHOLDER_IMAGE = 'https://ui-avatars.com/api/?name=Seller&background=random';

async function createMockSellers() {
  try {
    await MongoDBClient.init();
    logger.info(`Loaded DB_URI: ${process.env.DB_URI}`);
    const hash = await bcrypt.hash(PASSWORD, 10);
    for (const seller of mockSellers) {
      const existing = await User.findOne({ email: seller.email });
      if (existing) {
        logger.info(`Seller already exists: ${seller.email}`);
        continue;
      }
      await User.create({
        ...seller,
        password: hash,
        role: ROLES.SELLER,
        verified: true,
        login_method: 'normal',
        participants: [],
        image: PLACEHOLDER_IMAGE,
      });
      logger.info(`Created seller: ${seller.email}`);
    }
    logger.info('Mock sellers creation complete.');
    process.exit(0);
  } catch (err) {
    logger.error(`Error creating mock sellers: ${err}`);
    process.exit(1);
  }
}

createMockSellers(); 