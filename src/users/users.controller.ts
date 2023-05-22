import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.usersService.findByUserId(id);

    return user.toObject();
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const user = await this.usersService.update(id, dto);

    return user.toObject();
  }
}
