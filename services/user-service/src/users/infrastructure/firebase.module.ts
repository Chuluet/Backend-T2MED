import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { resolve } from 'path';

@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        if (admin.apps.length === 0) {
          const path = resolve(
            process.cwd(),
            process.env.FIREBASE_SERVICE_ACCOUNT_PATH || 'resources/firebase-service-account.json',
          );
          const serviceAccount = JSON.parse(readFileSync(path, 'utf8'));
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
          });
        }
        return admin;
      },
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule {}