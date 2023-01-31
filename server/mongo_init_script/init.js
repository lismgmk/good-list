db = db.getSiblingDB('admin');
db.createUser({
  user: 'root',
  pwd: 'example',
  roles: [
    { role: 'userAdminAnyDatabase', db: 'admin' },
    'readWriteAnyDatabase',
  ],
});

db.auth('root', 'example');
// log as root admin if you decided to authenticate in your docker-compose file...

db = db.getSiblingDB('good_deals');
// create and move to your new database

db.createUser({
  user: 'root',
  pwd: 'example',
  roles: [
    {
      role: 'readWrite',
      db: 'good_deals',
    },
  ],
});
// user created
db.createCollection('deals');
db.createCollection('users');
