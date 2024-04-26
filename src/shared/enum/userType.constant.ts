import { EnumType } from './enumType.constant';

export class UserType extends EnumType<UserType> {
  public static readonly MAKER = new UserType('MAKER', 'Maker');
  public static readonly VENDOR = new UserType('VENDOR', 'Vendor');

  constructor(
    public readonly name: string,
    public readonly displayname: string
  ) {
    super(name);
    this.displayname = displayname;
  }

  public static getValues(): UserType[] {
    return [this.MAKER, this.VENDOR];
  }

  public static getByName(name: string): unknown {
    const results = this.getValues().filter((item) => item.name === name);
    if (results.length > 0) {
      return results[0];
    }
    return null;
  }
}
