import { EnumType } from './enumType.constant';

export class UserRole extends EnumType<UserRole> {
  public static readonly SUPERADMIN = new UserRole('SUPERADMIN', 'Super Admin');
  public static readonly ADMIN = new UserRole('ADMIN', 'Admin');

  constructor(
    public readonly name: string,
    public readonly displayname: string
  ) {
    super(name);
    this.displayname = displayname;
  }

  public static getValues(): UserRole[] {
    return [this.SUPERADMIN, this.ADMIN];
  }

  public static getByName(name: string): unknown {
    const results = this.getValues().filter((item) => item.name === name);
    if (results.length > 0) {
      return results[0];
    }
    return null;
  }
}
