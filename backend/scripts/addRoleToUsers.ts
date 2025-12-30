import mongoose from 'mongoose';
import { User } from '../models/user.model.js';
import 'dotenv/config';

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const result = await User.updateMany(
      { role: { $exists: false } },
      { $set: { role: 'user' } }
    );

    console.log(`✅ Updated ${result.modifiedCount} users`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed', error);
    process.exit(1);
  }
})();

// To run this script, use the command: npx ts-node scripts/addRoleToUsers.ts
