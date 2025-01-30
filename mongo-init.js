// mongo-init.js
db.getSiblingDB('admin').auth(
  process.env.MONGO_INITDB_ROOT_USERNAME,
  process.env.MONGO_INITDB_ROOT_PASSWORD
);

db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);

db.createUser({
  user: process.env.MONGO_INITDB_ROOT_USERNAME,
  pwd: process.env.MONGO_INITDB_ROOT_PASSWORD,
  roles: [
    { role: "dbOwner", db: process.env.MONGO_INITDB_DATABASE },
    { role: "clusterAdmin", db: "admin" },
    { role: "readWrite", db: "config" }
  ]
});
