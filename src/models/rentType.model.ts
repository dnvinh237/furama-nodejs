import { Column, Table, HasMany, Model } from "sequelize-typescript";
import Service from "./service.model";


@Table({
    tableName: 'rentType',
    underscored: true
})
class RentType extends Model {
    @Column
    name: String

    @Column
    price: Number

    @HasMany(() => Service)
    service: Service[]

}

export default RentType