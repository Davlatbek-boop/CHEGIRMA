import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IAddressCreation {
  user_id: number
  last_state: string
}

@Table({ tableName: 'addres' })
export class Address extends Model<Address, IAddressCreation> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
  })
  declare address: string;

  @Column({
    type: DataType.BIGINT,
  })
  declare user_id: number;

  @Column({
    type: DataType.STRING,
  })
  declare location: string;

  @Column({
    type: DataType.STRING,
  })
  declare last_state: string;
}
