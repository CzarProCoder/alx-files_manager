const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const dbhost = process.env.DB_HOST || 'localhost';
    const dbport = process.env.DB_PORT || 27017;
    const dbname = process.env.DB_DATABASE || 'files_manager';

    const url = `mongodb://${dbhost}:${dbport}/${dbname}}`;
    this.client = new MongoClient(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const users = this.client.db().collection('users');
    return await users.countDocuments();
  }

  async nbFiles() {
    const files = this.client.db().collection('files');
    return await files.countDocuments();
  }
}

const dbClient = new DBClient();

export default dbClient;
