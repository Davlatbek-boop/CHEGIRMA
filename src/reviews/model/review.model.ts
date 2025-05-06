import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Discount } from "../../discounts/models/discount.model"
import { User } from "../../users/models/user.model"


interface IReviewCreationAttr{
    discountId: number
    userId: number
    comment: string
    raiting: number
}

@Table({tableName: "reviews"})
export class Review extends Model<Review, IReviewCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      })
      declare id: number;

    @Column({
        type: DataType.STRING
    })
    declare comment: string
    @Column({
        type: DataType.INTEGER
    })
    declare raiting: number


    @ForeignKey(()=>Discount)
    @Column({
        type: DataType.INTEGER
    })
    declare discountId: number

    @ForeignKey(()=> User)
    @Column({
        type: DataType.INTEGER
    })
    declare userId: number

    @BelongsTo(()=> Discount)
    discount: Discount

    @BelongsTo(()=> User)
    user: User
}
