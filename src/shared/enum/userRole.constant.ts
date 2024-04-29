/* eslint-disable @typescript-eslint/member-delimiter-style */
import { EnumType } from './enumType.constant';

export class UserRole extends EnumType<UserRole> {
  public static readonly SUPERADMIN = new UserRole('SUPERADMIN', 'Super Admin');
  public static readonly ADMIN = new UserRole('ADMIN', 'Admin');

  constructor(public readonly name: string, public readonly displayName: string) {
    super(name);
    this.displayName = displayName;
  }

  public static getValues(): UserRole[] {
    return [this.SUPERADMIN, this.ADMIN];
  }

  public static getByName(name: string): { name: string; displayName: string } {
    const results = this.getValues().filter((item) => item.name === name);
    if (results.length > 0) {
      return results[0];
    }
    return { name: '', displayName: '' };
  }
}
