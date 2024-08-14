import { Inject } from "@nestjs/common";
import { KafkaService } from "@repo/kafka";
import { ISendEmail } from "@repo/shared-types";
import { RecordMetadata } from "kafkajs";
import { topic } from "./kafka.topic";

export class KafkaProducer {
  constructor(
    @Inject('kafka_service') private client: KafkaService
  ) {}

  async sendEmailVerificationCode(emailData: ISendEmail): Promise<RecordMetadata[]> {
    const emailDataString = JSON.stringify(emailData);
    const result = await this.client.send({
      topic: topic.user_verification_email_send,
      messages: [
        {
          key: '1',
          value: emailDataString
        }
      ]
    });
    return result;
  }

  async sendEmailResetPassword(emailData: ISendEmail): Promise<RecordMetadata[]> {
    const emailDataString = JSON.stringify(emailData);
    const result = await this.client.send({
      topic: topic.user_password_reset_email_send,
      messages: [
        {
          key: '1',
          value: emailDataString
        }
      ]
    });
    return result;
  }

}
