import { IsString } from 'class-validator';

export class InviteMemberDto {
  @IsString({ each: true })
  userIds: string[];
}
