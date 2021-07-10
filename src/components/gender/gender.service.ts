import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasicCRUD } from 'src/commons/entities/interfaces/BasicCRUD.interface';
import { Repository } from 'typeorm';
import { Gender } from './entities/gender.entity';

@Injectable()
export class GenderService implements BasicCRUD<Gender> {
  constructor(@InjectRepository(Gender) public repo: Repository<Gender>) {}

  async create(entity: Gender): Promise<Gender> {
    const ent = this.repo.create(entity);
    return await this.repo.save(ent);
  }
  async createMany(entities: Gender[]): Promise<Gender[]> {
    const ent = this.repo.create(entities);
    return await this.repo.save(ent);
  }

  async replace(id: string, entity: Gender): Promise<Gender> {
    const result = await this.repo.findOne(id);
    if (result) {
      await this.repo.delete(result);
      const ent = this.repo.create(entity);
      return await this.repo.save(ent);
    } else {
      return undefined;
    }
  }

  async updateByID(id: string, entity: Gender): Promise<Gender> {
    await this.repo.update(id, entity);
    return await this.repo.findOne(id);
  }
  async updateByEntity(entity: Gender): Promise<Gender> {
    await this.repo.update(entity.id, entity);
    return await this.repo.findOne(entity.id);
  }
  async updateMany(entities: Gender[]): Promise<Gender[]> {
    const results: Gender[] = [];

    for (const entity of entities) {
      await this.repo.update(entity.id, entity);
      const data = await this.repo.findOne(entity.id);
      results.push(data);
    }

    return results;
  }

  async deleteByID(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);

    return result.affected > 0;
  }
  async deleteByEntity(entity: Gender): Promise<boolean> {
    const result = await this.repo.delete(entity.id);

    return result.affected > 0;
  }
  async deleteMany(ids: string[]): Promise<boolean> {
    let results = 0;

    for (const id of ids) {
      const result = await this.repo.delete(id);

      if (result.affected > 0) {
        results++;
      }
    }

    return results === ids.length;
  }
}
