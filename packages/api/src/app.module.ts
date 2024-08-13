import { Module } from "@nestjs/common";
import { AppContextFactory } from "app.context";
import fs from 'fs';
import path from 'path';
import { CurrencyModule, GreetingModule, KafkaModule, KafkaProducer, PostModule } from "@repo/features";

import { AppRouterFactory } from "./app.router";

const sslSecretsDir = path.join("../../", process.env.KAFKA_SSL_SECRETS_DIR!);

@Module({
  imports: [GreetingModule, PostModule, CurrencyModule, KafkaModule.register([
    {
      name: 'HERO_SERVICE',
      options: {
        client: {
          clientId: `kafka-client`,
          brokers: [
            'localhost:19092',
            'localhost:29092',
            'localhost:39092' 
          ],
          ssl: {
            rejectUnauthorized: false,
            ca: [fs.readFileSync(path.join(sslSecretsDir, 'kafka.producer.CARoot.pem'), 'utf-8')],
            key: fs.readFileSync(path.join(sslSecretsDir, `kafka.producer.RSAkey.pem`), 'utf-8'),
            cert: fs.readFileSync(path.join(sslSecretsDir, `kafka.producer.certificate.pem`), 'utf-8'),
            passphrase: process.env.KAFKA_PASSPHRASE //todo: remake SSL
          }
        },
        consumer: {
          groupId: 'ecommerce-mono-consumer'
        }
      }
    },
  ])],
  controllers: [],
  providers: [AppRouterFactory, AppContextFactory],
  exports: [AppRouterFactory, AppContextFactory],
})
export class AppModule { }
