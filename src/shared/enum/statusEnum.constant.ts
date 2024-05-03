import { EnumType } from './enumType.constant';

export class StatusEnum extends EnumType<StatusEnum> {
  public static readonly PENDING = new StatusEnum('PENDING', 'Pending');
  public static readonly ACTIVE = new StatusEnum('ACTIVE', 'Active');
  public static readonly DEACTIVATE = new StatusEnum('DEACTIVATE', 'Deactivate');

  constructor(public readonly name: string, public readonly displayName: string) {
    super(name);
    this.displayName = displayName;
  }

  public static getValues(): StatusEnum[] {
    return [this.PENDING, this.ACTIVE, this.DEACTIVATE];
  }

  public static getByName(name: string): { name: string; displayName: string } {
    const result = this.getValues().filter((item) => item.name === name);
    if (result.length > 0) {
      return result[0];
    }
    return { name: '', displayName: '' };
  }
}
