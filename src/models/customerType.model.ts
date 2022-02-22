import { Column, Table, HasMany, Model } from "sequelize-typescript";
import Customer from "./customer.model";


@Table({
    tableName: 'customerType',
    underscored: true
})
class CustomerType extends Model {
    @Column
    name: String

    @HasMany(() => Customer)
    customer: Customer[]

}

export default CustomerType