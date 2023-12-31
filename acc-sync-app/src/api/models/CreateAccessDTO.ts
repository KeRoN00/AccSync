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
 * @interface CreateAccessDTO
 */
export interface CreateAccessDTO {
    /**
     * 
     * @type {number}
     * @memberof CreateAccessDTO
     */
    userId?: number;
    /**
     * 
     * @type {number}
     * @memberof CreateAccessDTO
     */
    roleId?: number;
    /**
     * 
     * @type {number}
     * @memberof CreateAccessDTO
     */
    appId?: number;
}

/**
 * Check if a given object implements the CreateAccessDTO interface.
 */
export function instanceOfCreateAccessDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CreateAccessDTOFromJSON(json: any): CreateAccessDTO {
    return CreateAccessDTOFromJSONTyped(json, false);
}

export function CreateAccessDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateAccessDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'userId': !exists(json, 'userId') ? undefined : json['userId'],
        'roleId': !exists(json, 'roleId') ? undefined : json['roleId'],
        'appId': !exists(json, 'appId') ? undefined : json['appId'],
    };
}

export function CreateAccessDTOToJSON(value?: CreateAccessDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'userId': value.userId,
        'roleId': value.roleId,
        'appId': value.appId,
    };
}

