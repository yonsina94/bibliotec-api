import { AbstractEntity } from '../../../commons/entities/abstract.entity';
import { Gender } from '../../../components/gender/entities/gender.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Author } from 'src/components/author/entities/author.entity';

@Entity('Books')
export class Book extends AbstractEntity {
  @Column('varchar', { name: 'title', length: 80, nullable: true })
  public title: string;

  @Column('varchar', { name: 'description', length: 500, nullable: false })
  public description: string;

  @Column('int', { name: 'year', nullable: false })
  public year: number;

  @Column('uuid', { name: 'author_id', nullable: false })
  public authorId: string;

  @Column('bytea', { name: 'cover_page_image', nullable: true })
  public coverPageImage?: Buffer;

  @JoinColumn({ name: 'author_id' })
  @ManyToOne(() => Author, (a) => a.books)
  public author: Author;

  @JoinColumn()
  @ManyToMany(() => Gender, (g) => g.books)
  public gengers: Array<Gender>;
}
