// mongo-init.js
db.getSiblingDB('admin').auth(
  Bun.env(MONGO_INITDB_ROOT_USERNAME),
  Bun.env(MONGO_INITDB_ROOT_PASSWOR)
);

db = db.getSiblingDB(Bun.env(MONGO_INITDB_DATABASE));

db.createUser({
  user: Bun.env(MONGO_INITDB_ROOT_USERNAME),
  pwd: Bun.env(MONGO_INITDB_ROOT_PASSWORD),
  roles: [
    { role: "dbOwner", db: Bun.env(MONGO_INITDB_DATABASE)},
    { role: "clusterAdmin", db: "admin" },
    { role: "readWrite", db: "config" }
  ]
});
