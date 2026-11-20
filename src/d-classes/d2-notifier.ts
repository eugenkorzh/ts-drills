export interface HasChannel {
  readonly channel: "email" | "sms";
}

export abstract class Notifier {
  constructor(protected readonly sender: string) { }

  abstract format(message: string): string

  notify(message: string): string {
    return `${this.sender}: ${this.format(message)}`;
  }
}

export class EmailNotifier extends Notifier implements HasChannel {
  readonly channel = "email";

  override format(message: string): string {
    return '<p>' + message + '</p>';
  }

}

export class SmsNotifier extends Notifier implements HasChannel {
  readonly channel = "sms";

  override format(message: string): string {
    return message.slice(0, 20);
  }
}