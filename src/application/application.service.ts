import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Permission } from './entities/permission.entity';
import { CreateManyDto, CrudRequest, CrudService } from '@nestjsx/crud';
import { response } from 'express';

@Injectable()
export class PermissionService extends TypeOrmCrudService<Permission> {
  constructor(
    @InjectRepository(Permission) repo,
    @InjectRepository(Permission) private readonly permissionRepository,
  ) {
    super(repo);

    this.repo = repo;
  }

  async createOne(req, dto: Permission) {
    console.log('createOne');
    const permission = await this.repo.create(dto);
    await this.repo.save(permission);
    return permission;
  }

  async createMany(req, dto: CreateManyDto<Permission>) {
    console.log('createMany');
    const permissions = await this.repo.create(dto.bulk);
    await this.repo.save(permissions);
    return permissions;
  }

  async updateOne(req, dto): Promise<any> {
    // Cannot read properties of null (reading 'parsed') ????
    console.log(dto);
    // console.log(req.id);

    const id = dto?.id as number;
    const parsed = delete dto.id && dto;

    //manually update
    // const permission = await this.permissionRepository.findOne({
    //   where: { id },
    // });

    // console.log('permission', permission);
    const updatedOne = await this.permissionRepository.save({
      id: id,
      name: dto.name,
      description: dto.description,
    });

    console.log('updatedOne', updatedOne);

    return response.status(203).json(updatedOne).end();
  }
}
