import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum AppResource {
  USER = 'USER',
  PRODUCT = 'PRODUCT',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(AppRoles.USER)
  .updateOwn([AppResource.USER])
  .deleteOwn([AppResource.USER])
  .createOwn([AppResource.PRODUCT])
  .updateOwn([AppResource.PRODUCT])
  .deleteOwn([AppResource.PRODUCT])
  .grant(AppRoles.ADMIN)
  .extend(AppRoles.USER)
  .createAny([AppResource.USER, AppResource.PRODUCT])
  .updateOwn([AppResource.USER, AppResource.PRODUCT])
  .deleteOwn([AppResource.USER, AppResource.PRODUCT]);
