import {IPERMISSIONS} from '../Interfaces/IPermissions';


export class CPermissions {
    static checkPermission = (savedPermission: IPERMISSIONS, userPermission: number): boolean => {
        return !!(savedPermission & userPermission);
    };
}

export default CPermissions;