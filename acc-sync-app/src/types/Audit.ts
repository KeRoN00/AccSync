export type ResponseAuditDTO = {
    id?: number,
    dateTime?: Date,
    tableName?: string,
    keyValues?: string,
    oldValues?: string,
    newValues?: string,
    userId?: string,
    type?: string
}