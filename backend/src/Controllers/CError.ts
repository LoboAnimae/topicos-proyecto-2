import IResponse, {RESPONSE_TYPES} from '../Interfaces/IResponse';
import {Response} from 'express';

export class CError implements IResponse {
    successful: boolean;
    private error: string;
    private status: RESPONSE_TYPES;
    private extended: any;
    private res: Response;

    constructor(res: Response) {
        this.res = res;
        this.successful = false;
        this.error = '';
        this.extended = undefined;
        this.status = RESPONSE_TYPES.OK;
    }

    setMainContent(params: any): IResponse {
        this.extended = params;
        return this;
    }

    setMessage(params: string): IResponse {
        this.error = params;
        return this;
    }

    setStatus(status: RESPONSE_TYPES): IResponse {
        this.status = status;
        return this;
    }

    send(): void {
        const error = this.error || 'Unexpected Error';
        const success = this.successful;
        const extended = this.extended;
        const obj: any = {error, success};
        if (extended) obj.extended = extended;
        this.res.status(this.status)
            .json(obj);
    }
}

export default CError;