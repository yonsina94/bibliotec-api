import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Book } from 'src/components/book/entities/book.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../commons/entities/abstract.entity';

@Entity('authors')
export class Author extends AbstractEntity {
  @Column('varchar', { name: 'name', length: 80, nullable: false })
  public name: string;

  @Column('varchar', { name: 'lastname', length: 80, nullable: false })
  public lastName: string;

  @Column('date', { name: 'birthdate', nullable: false })
  public birthDate: Date;

  @Column('varchar', { name: 'nationality', length: 100, nullable: false })
  public nationality: string;

  @Column('varchar', { name: 'gender', length: 15, nullable: false })
  public genger: string;

  @Column('varchar', { name: 'marital_status', length: 60, nullable: true })
  public maritalStatus?: string;

  @Column('varchar', { name: 'biography_url', length: 260, nullable: true })
  public biographyUrl?: string;

  @Column('varchar', { name: 'email', length: 100, nullable: true })
  public email?: string;

  @Column('varchar', { name: 'phoneNumber', length: 20, nullable: true })
  public phoneNumber?: string;

  @Transform((photo) => Buffer.from(photo.value).toString('base64'), { toPlainOnly: true })
  @Column('bytea', { name: 'photo', nullable: true })
  public photo?: Buffer;

  @OneToMany(() => Book, (b) => b.author)
  public books: Array<Book>;
}
