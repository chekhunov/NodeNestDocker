import { SetMetadata } from '@nestjs/common'

// по этому ключу сможем получать метаданные внутри гварда
export const ROLES_KEY = 'roles'
//прокидываем роли
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles) 