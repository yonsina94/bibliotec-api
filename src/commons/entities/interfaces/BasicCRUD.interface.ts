import { Repository } from 'typeorm';
import { AbstractEntity } from '../abstract.entity';

export interface BasicCRUD<Tmodel extends AbstractEntity> {
  repo: Repository<Tmodel>;

  // To create a Entity (C)
  create(entity: Tmodel): Promise<Tmodel>;
  createMany(entities: Tmodel[]): Promise<Tmodel[]>;

  // To replace (R)
  replace(id: string, entity: Tmodel): Promise<Tmodel>;

  // To update (U)
  updateByID(id: string, entity: Tmodel): Promise<Tmodel>;
  updateByEntity(entity: Tmodel): Promise<Tmodel>;
  updateMany(entities: Tmodel[]): Promise<Tmodel[]>;

  // To delete (D)
  deleteByID(id: string): Promise<boolean>;
  deleteByEntity(entity: Tmodel): Promise<boolean>;
  deleteMany(ids: Array<string>): Promise<boolean>;
}
