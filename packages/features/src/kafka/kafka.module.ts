import { Module } from "@nestjs/common";
import { KafkaModule as KafkaModuleBase } from '@repo/kafka'
import { KafkaConsumer } from "./kafka.consumer";
import { KafkaProducer } from "./kafka.producer";

@Module({
  imports: [],
  controllers: [],
  providers: [KafkaConsumer, KafkaProducer]
})
export class KafkaModule extends KafkaModuleBase{ }
