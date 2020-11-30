import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql';
import { QueryBody } from './query.body';

@Injectable()
export class AppService {
  async getConnectionMysql(body: QueryBody) {
    const connection = mysql.createConnection({
      host: body.host,
      user: body.user,
      password: body.pwd,
      database: body.db,
    });

    connection.connect(function (err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
      console.log('connected as id ' + connection.threadId);
    });

    const displayDB = async () => {
      return new Promise((resolve, reject) => {
        connection.query(body.query, (err, results, fields) => {
          if (err) {
            return reject(err);
          }
          resolve([results]);
        });
      });
    };

    return await displayDB();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
