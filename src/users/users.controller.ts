import { Body, Controller, Get, Param, Patch } from '@nestjs/common';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.usersService.findByUserId(id);

    return user.toObject();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const user = await this.usersService.update(id, dto);

    return user.toObject();
  }
}
