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
 * @interface AppDTO
 */
export interface AppDTO {
    /**
     * 
     * @type {number}
     * @memberof AppDTO
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof AppDTO
     */
    name?: string | null;
}

/**
 * Check if a given object implements the AppDTO interface.
 */
export function instanceOfAppDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AppDTOFromJSON(json: any): AppDTO {
    return AppDTOFromJSONTyped(json, false);
}

export function AppDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
    };
}

export function AppDTOToJSON(value?: AppDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
    };
}
