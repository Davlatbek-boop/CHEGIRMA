import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript"
import { Region } from "../../region/models/region.model"
import { Store } from "../../store/models/store.model"
import { Discount } from "../../discounts/models/discount.model"
import { Favourites } from "./favourites.model"
import { StoreSupscribes } from "./store-supscribes.model"
import { Review } from "../../reviews/model/review.model"


interface IUsersCreationAttr{
    name: string
    phone: string
    email: string
    hashed_password: string
    location: string
    regionId: number
}

@Table({tableName: "users"})
export class User extends Model<User, IUsersCreationAttr>{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id: number

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    declare name: string

    @Column({
        type: DataType.STRING(15),
        allowNull: false    
    })
    declare phone: string

    @Column({
        type: DataType.STRING(50)
    })
    declare email: string

    @Column({
        type: DataType.STRING
    })
    declare hashed_password: string

    @Column({
        type: DataType.STRING
    })
    declare hashed_refresh_token: string

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    declare is_active: boolean

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    declare is_owner: boolean

    @Column({
        type: DataType.STRING
    })
    declare location: string

    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare activation_link: string


    @ForeignKey(()=> Region)
    @Column({
        type: DataType.INTEGER,
    })
    declare regionId: number

    @BelongsTo(()=>Region)
    region: Region

    @HasMany(()=> Store)
    store: Store[]

    @BelongsToMany(()=> Discount, ()=> Favourites)
    discount: Discount[]

    @BelongsToMany(()=> Store, ()=> StoreSupscribes)
    manystore: Store[]

    @HasMany(()=> Review)
    review: Review
}
