import { Permission } from './permissionType';

export type Group = {
  id: string;
  name: string;
  permissions: Array<Permission>;
};
