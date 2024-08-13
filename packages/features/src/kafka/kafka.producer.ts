import { Inject } from "@nestjs/common";
import { KafkaService } from "@repo/kafka";
import { RecordMetadata } from "kafkajs";

export class KafkaProducer {
  constructor(
    @Inject('HERO_SERVICE') private client: KafkaService
  ) {}

  async sendEmail(message: string = 'Hello world'): Promise<RecordMetadata[]> {
    const result = await this.client.send({
      topic: 'ecommerce-mono.email.send',
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
