import { Column, Table, HasMany, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import Contract from "./contract.model";
import CustomerType from "./customerType.model";


@Table({
    tableName: 'customer',
    underscored: true
})
class Customer extends Model {
    @Column
    code: String

    @Column
    name: String

    @Column
    dayOfBirth: String

    @Column
    idCard: String

    @Column
    phone: String

    @Column
    email: String

    @Column
    address: String

    @ForeignKey(() => CustomerType)
    @Column
    customerTypeId: number

    @BelongsTo(() => CustomerType)
    customerType: CustomerType

    @HasMany(() => Contract)
    contract: Contract[]
}

export default Customer