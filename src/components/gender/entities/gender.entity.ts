import { AbstractEntity } from '../../../commons/entities/abstract.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Book } from 'src/components/book/entities/book.entity';

@Entity('genders')
export class Gender extends AbstractEntity {
  @Column('varchar', { name: 'name', length: 100, nullable: false })
  public name: string;

  @Column('varchar', { name: 'description', length: 260, nullable: false })
  public description: string;

  @ManyToMany(() => Book, (b) => b.gengers)
  public books: Array<Book>;
}
