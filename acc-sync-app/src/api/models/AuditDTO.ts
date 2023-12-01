/* tslint:disable */
/* eslint-disable */
/**
 * kartografia-backend
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface AuditDTO
 */
export interface AuditDTO {
    /**
     * 
     * @type {number}
     * @memberof AuditDTO
     */
    id?: number;
    /**
     * 
     * @type {Date}
     * @memberof AuditDTO
     */
    dateTime?: Date;
    /**
     * 
     * @type {string}
     * @memberof AuditDTO
     */
    tableName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AuditDTO
     */
    keyValues?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AuditDTO
     */
    oldValues?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AuditDTO
     */
    newValues?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AuditDTO
     */
    userId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AuditDTO
     */
    type?: string | null;
}

/**
 * Check if a given object implements the AuditDTO interface.
 */
export function instanceOfAuditDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AuditDTOFromJSON(json: any): AuditDTO {
    return AuditDTOFromJSONTyped(json, false);
}

export function AuditDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuditDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'dateTime': !exists(json, 'dateTime') ? undefined : (new Date(json['dateTime'])),
        'tableName': !exists(json, 'tableName') ? undefined : json['tableName'],
        'keyValues': !exists(json, 'keyValues') ? undefined : json['keyValues'],
        'oldValues': !exists(json, 'oldValues') ? undefined : json['oldValues'],
        'newValues': !exists(json, 'newValues') ? undefined : json['newValues'],
        'userId': !exists(json, 'userId') ? undefined : json['userId'],
        'type': !exists(json, 'type') ? undefined : json['type'],
    };
}

export function AuditDTOToJSON(value?: AuditDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'dateTime': value.dateTime === undefined ? undefined : (value.dateTime.toISOString()),
        'tableName': value.tableName,
        'keyValues': value.keyValues,
        'oldValues': value.oldValues,
        'newValues': value.newValues,
        'userId': value.userId,
        'type': value.type,
    };
}
