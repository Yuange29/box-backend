import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class RoleCreationRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsString({ each: true })
  permissionNames: string[];
}
