// Use admin database for initial authentication
db.getSiblingDB('admin').auth(
  process.env.MONGO_INITDB_ROOT_USERNAME,
  process.env.MONGO_INITDB_ROOT_PASSWORD
);

// Create or switch to application database
db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);

// Create application user with proper privileges
db.createUser({
  user: process.env.MONGO_INITDB_ROOT_USERNAME,
  pwd: process.env.MONGO_INITDB_ROOT_PASSWORD,
  roles: [
    { role: "dbOwner", db: process.env.MONGO_INITDB_DATABASE },
    { role: "clusterAdmin", db: "admin" }
  ]
});
