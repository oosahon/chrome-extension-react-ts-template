export type ServiceWorkerMessageKey = 'send-message' | 'recieve-message' | 'print-job-info';

export type ServiceWorkerMessage = {
    action: ServiceWorkerMessageKey;
    payload: Record<string, any>;
}
