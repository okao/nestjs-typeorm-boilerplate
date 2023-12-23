import { Role } from 'src/roles/entities/role.entity';
import { User } from '../../users/entities/user.entity';

export type AuthUserType = Readonly<{
  user: User;
  roles?: Role[];
  status?: string;
}>;
