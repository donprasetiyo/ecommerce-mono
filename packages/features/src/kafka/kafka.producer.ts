import { Inject } from "@nestjs/common";
import { KafkaService } from "@repo/kafka";
import { RecordMetadata } from "kafkajs";

const TOPIC_NAME = 'ecommerce-mono.email.send';

export class KafkaProducer {
  constructor(
    @Inject('HERO_SERVICE') private client: KafkaService
  ) {}

  async sendEmail(message: string = 'Hello world'): Promise<RecordMetadata[]> {
    console.log('test')
    const result = await this.client.send({
      topic: TOPIC_NAME,
      messages: [
        {
          key: '1',
          value: message
        }
      ]
    });
    return result;
  }

}
