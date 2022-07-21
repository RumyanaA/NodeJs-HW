import { Permission } from '../types/permissionType';
export interface GroupI {
    id: string;
    name: string;
    permissions: Array<Permission>;
}
