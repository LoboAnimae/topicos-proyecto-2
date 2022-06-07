import moment from 'moment';
import {v4 as uuid} from 'uuid';

export type TOperationType = 'GET' | 'POST' | 'DELETE' | 'PUT'
export type TType = 'string' | 'number' | 'jwt' | 'boolean' | 'object'

export interface IGenericNameDescriptionRequestParams {
    required?: boolean;
}

export interface IGenericNameDescriptionResponseParams {
    willAlwaysCome?: boolean;
    properties?: { [key: string]: IGenericNameDescriptionResponseObject };
}

export interface IGenericNameDescriptionResponseObject {
    type: TType;
    description: string;
    willAlwaysCome: boolean;
    properties: { [key: string]: any };
}

export interface IGenerateDebugOptions {
    request: { [key: string]: any };
    response: { [key: string]: any };
}

export interface ResponseWrapperPayload {
    properties: { [key: string]: IGenericNameDescriptionResponseObject; };
    type?: string;
    willAlwaysCome?: boolean;
}

export interface ResponseWrapperError extends IGenericNameDescriptionResponseObject {
    properties: {
        errorType: IGenericNameDescriptionResponseObject;
        errorDescription: IGenericNameDescriptionResponseObject;
        isFatal: boolean
    };
}


export class CDebug {
    static GenerateDebug(type: TOperationType, route: string, params: IGenerateDebugOptions) {
        return {
            route,
            type,
            gen: moment(),
            requestId: uuid(),
            ...params,
        };
    }

    static GenericNameDescriptionRequest(type: TType, description: string, options?: IGenericNameDescriptionRequestParams) {
        const required = !options?.required; // Defaults to True
        return {type, description, required};
    }

    static GenericNameDescriptionResponse(type: TType, description: string, options?: IGenericNameDescriptionResponseParams): IGenericNameDescriptionResponseObject {
        const willAlwaysCome = !options?.willAlwaysCome; // Defaults to True
        const properties = options?.properties ?? {};
        return {type, description, willAlwaysCome, properties};
    }


    static ResponseWrapper(payload: ResponseWrapperPayload, error: ResponseWrapperError) {
        const typePayload = payload.type ?? 'object';
        const willAlwaysComePayload = payload.willAlwaysCome ?? false;

        const typeError = payload.type ?? 'object';
        const willAlwaysComeError = payload.willAlwaysCome ?? false;
        return {
            success: CDebug.GenericNameDescriptionResponse('boolean', 'Success on the operation'),
            payload: {description: 'This will come in case su'},
            error
        };
    }
}

export default CDebug;