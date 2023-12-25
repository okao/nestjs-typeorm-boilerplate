import { Module } from '@nestjs/common';
import { PermissionService } from './application.service';
import { PermissionController } from './application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [],
})
export class PermissionModule {}
