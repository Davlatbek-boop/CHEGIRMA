import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IAvtomobilCreationAttr {
  user_id: number
  last_state: string
}

@Table({ tableName: 'avtomobil' })
export class Avto extends Model<Avto, IAvtomobilCreationAttr> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  declare model: string;
 @Column({
    type: DataType.STRING,
  })
  declare marka: string;
   @Column({
    type: DataType.STRING,
  })
  declare rang: string;
  @Column({
    type: DataType.STRING,
  })
  declare raqam: string;
  @Column({
    type: DataType.DATE,
  })
  declare yil: Date;

  @Column({
    type: DataType.BIGINT,
  })
  declare user_id: number;

  @Column({
    type: DataType.STRING,
  })
  declare last_state: string;
}
