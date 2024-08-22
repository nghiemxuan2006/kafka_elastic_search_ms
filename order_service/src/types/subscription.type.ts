import { IHeaders } from "kafkajs";

export enum OrderEvent {
    CREATE_ORDER = 'create_order',
    CANCEL_ORDER = 'cancel_order',
}

export type TOPIC_TYPE = "OrderEvents" | "CatalogEvents"

export interface MessageType {
    headers?: Record<string, string> | IHeaders;
    event: OrderEvent;
    data: Record<string, any>;
}