import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Store } from '../../store/models/store.model';
import { User } from './user.model';

interface IStoreSupscribesCreationAttr {
  userId: number;
  storeId: number;
}

@Table({ tableName: 'store-supscribes' })
export class StoreSupscribes extends Model<
  StoreSupscribes,
  IStoreSupscribesCreationAttr
> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  declare userId: number;

  @ForeignKey(() => Store)
  @Column({
    type: DataType.INTEGER,
  })
  declare storeId: number;
}
