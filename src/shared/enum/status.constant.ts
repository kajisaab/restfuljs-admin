import { EnumType } from './enumType.constant';

export class Status extends EnumType<Status> {
  public static readonly PENDING = new Status('PENDING', 'Pending');
  public static readonly ACTIVE = new Status('ACTIVE', 'Active');
  public static readonly DEACTIVATE = new Status('DEACTIVATE', 'Deactivate');

  constructor(public readonly name: string, public readonly displayName: string) {
    super(name);
    this.displayName = displayName;
  }

  public static getValues(): Status[] {
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
