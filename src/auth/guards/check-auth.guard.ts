import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../../config/config.type';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CheckAuthGuard extends AuthGuard('jwt') implements CanActivate {
  private logger = new Logger('CheckAuthGuard');
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
    private readonly configService: ConfigService<AllConfigType>,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('auth.secret', {
        infer: true,
      }),
    });

    this.jwtService = jwtService;
    this.configService = configService;
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request) as string;
      //verify the token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('auth.secret', { infer: true }),
      });

      const user = await this.userService.findOne({
        id: payload.id,
        status: {
          name: 'Active',
        },
        role: true,
      });

      if (!user) {
        return false;
      }

      const newUser = user;
      newUser.role = undefined;
      newUser.status = undefined;
      newUser.password = '';

      request.user = newUser;

      return true;
    } catch (e) {
      console.log('CheckAuthGuard', e);

      throw new HttpException('Unauthorized access', 401);
    }
  }
}
