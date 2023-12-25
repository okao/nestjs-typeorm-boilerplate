import {
  Body,
  Controller,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import {
  CreateManyDto,
  Crud,
  CrudController,
  CrudRequest,
  CrudService,
  GetManyDefaultResponse,
} from '@nestjsx/crud';
import { PermissionService } from './application.service';
import { Permission } from './entities/permission.entity';
import {
  CreatePermissionDto,
  UpdatePermissionDto,
} from './dto/application.dto';
import { Logger } from '@nestjs/common';
import { Request } from 'express';
@Crud({
  model: {
    type: Permission,
  },
  dto: {
    create: CreatePermissionDto,
    // update: UpdatePermissionDto,
  },
  // params: {
  //   _id: {
  //     field: '_id',
  //     type: 'number',
  //     primary: true,
  //   },
  // },
})
@Controller('permissions')
export class PermissionController implements CrudController<Permission> {
  constructor(public service: PermissionService) {}

  get base(): CrudController<Permission> {
    return this;
  }

  @Patch('/:id')
  async updateOne(
    @Param('id') id: number,
    @Body() dto: Permission,
    @Req() req: Request,
  ): Promise<any> {
    console.log('updateOne');
    console.log(dto);
    console.log(id);

    const idWithDto = { ...dto, id };
    // req.id = id;

    return await this.service.updateOne(req, idWithDto);
  }
}

// //declare id in Request interface
// declare global {
//   namespace Express {
//     interface Request {
//       id: number;
//     }
//   }
// }
