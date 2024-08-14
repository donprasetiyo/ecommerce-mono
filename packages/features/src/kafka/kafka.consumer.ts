import { Inject } from "@nestjs/common";
import { type IHeaders, SubscribeTo, KafkaService } from "@repo/kafka";
import { sendEmailVerificationCode, sendResetPasswordEmail } from "@repo/email"
import { ISendEmail } from "@repo/shared-types";
import { topic } from "./kafka.topic";

export class KafkaConsumer {
  constructor(
    @Inject('kafka_service') private client: KafkaService
  ) { }

  onModuleInit(): void {
    this.client.subscribeToResponseOf(topic.user_password_reset_email_send, this);
    this.client.subscribeToResponseOf(topic.user_verification_email_send, this)
  }

  @SubscribeTo(topic.user_verification_email_send)
  async sendEmailVerificationCode(dataString: string, key: any, offset: number, timestamp: number, partition: number, headers: IHeaders): Promise<void> {
    console.log('data', dataString);
    console.log('key', key);
    console.log('offset', offset);
    console.log('timestamp', timestamp)
    console.log('partition', partition)
    console.log('headers', headers)

    const start = performance.now()
    const data = JSON.parse(dataString) as ISendEmail;
    await sendEmailVerificationCode(
      data.toAddress,
      data.code,
      data.username
    );
    const end = performance.now()

    console.log('email consumer send takes', (end - start) / 1000)
  }

  @SubscribeTo(topic.user_password_reset_email_send)
  async sendEmailResetPassword(dataString: string, key: any, offset: number, timestamp: number, partition: number, headers: IHeaders): Promise<void> {
    console.log('data', dataString);
    console.log('key', key);
    console.log('offset', offset);
    console.log('timestamp', timestamp)
    console.log('partition', partition)
    console.log('headers', headers)

    const start = performance.now()
    const data = JSON.parse(dataString) as ISendEmail;
    await sendResetPasswordEmail(
      data.toAddress,
      data.code,
      data.username
    );
    const end = performance.now()

    console.log('email consumer send takes', (end - start) / 1000)
  }
}