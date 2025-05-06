import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { User } from "./user.model"
import { Discount } from "../../discounts/models/discount.model"



interface IFavouriteCreationAttr{
    userId: number
    discountId: number
}


@Table({tableName: "favourites"})
export class Favourites extends Model<Favourites, IFavouriteCreationAttr>{
    @ForeignKey(()=> User)
    @Column({
        type: DataType.INTEGER
    })
    declare userId: number

    @ForeignKey(()=>     Discount)
    @Column({
        type: DataType.INTEGER
    })
    declare discountId: number
}