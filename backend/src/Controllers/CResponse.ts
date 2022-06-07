import IResponse, {RESPONSE_TYPES} from '../Interfaces/IResponse';
import {Response} from 'express';


export class CResponse implements IResponse {
    successful: boolean;
    private status: RESPONSE_TYPES;
    private payload: { [key: string]: any };
    private res: Response;

    constructor(res: Response) {
        this.successful = true;
        this.status = RESPONSE_TYPES.OK;
        this.payload = {};
        this.res = res;
    }

    setMainContent(params: { [key: string]: any }): IResponse {
        this.payload = params;
        return this;
    }

    setMessage(params: string): IResponse {
        return this;
    }

    setStatus(status: RESPONSE_TYPES): IResponse {
        this.status = status;
        return this;
    }

    send(): void {
        const success = this.successful;
        const payload = this.payload;
        this.res.status(this.status)
            .json({success, payload});
    }

}

export default CResponse;