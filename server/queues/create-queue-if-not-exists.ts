import { queueService } from "./queue-service";

export async function createQueueIfNotExists(queueName: string) {
    return new Promise((resolve, reject) => {
        queueService.createQueueIfNotExists(queueName, (error) => {
            if (error) {
                reject(error);
            }

            resolve();
        });
    });
}
