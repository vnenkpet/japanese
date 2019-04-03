import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export class DictionaryEntryEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('text')
  japanese: string;

  @Column('text')
  english: string;
}
