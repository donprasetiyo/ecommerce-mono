import { Inject } from "@nestjs/common";
import { type IHeaders, SubscribeTo,KafkaService } from "@repo/kafka";

export class KafkaConsumer {
  constructor(
    @Inject('HERO_SERVICE') private client: KafkaService
  ) {}

  onModuleInit(): void {
    this.client.subscribeToResponseOf('ecommerce-mono.email.send', this)
  }

  @SubscribeTo('ecommerce-mono.email.send')
  async sendEmail(data: any, key: any, offset: number, timestamp: number, partition: number, headers: IHeaders): Promise<void> {
    debugger
    console.log('data', data);
    console.log('key',key);
    console.log('offset', offset);
    console.log('timestamp', timestamp)
    console.log('partition', partition)
    console.log('headers', headers)
  }

}