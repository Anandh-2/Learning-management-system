const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'../.env'});

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const db = mongoose.connection.db;

    try {
      await db.collection('users').dropIndex('rollNo_1');
      console.log("Existing rollNo index dropped");
    } catch (err) {
      console.log("Index might not exist yet, skipping drop.");
    }

await db.collection('users').createIndex(
  { rollNo: 1 },
  {
    unique: true,
    partialFilterExpression: {
      rollNo: { $exists: true, $type: "string" }
    }
  }
);

    console.log("✅ Partial index on rollNo created successfully");
  } catch (err) {
    console.error("❌ Error creating index:", err);
  } finally {
    mongoose.connection.close();
    process.exit();
  }
};

run();
