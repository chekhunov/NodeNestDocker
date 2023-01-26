export class BanUserDto {
  readonly userId: number;
  //причина по которой был бан
  readonly banReason: string;
}