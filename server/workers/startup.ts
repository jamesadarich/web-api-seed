import { EmailWorker } from "./email-worker";

export function workerStartup() {
    setInterval(() => new EmailWorker(), 1000);
}
