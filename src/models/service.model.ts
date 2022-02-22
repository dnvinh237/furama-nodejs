import { Column, Table, HasMany, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import Contract from "./contract.model";
import RentType from "./rentType.model";


@Table({
    tableName: 'Service',
    underscored: true
})
class Service extends Model {
    @Column
    code: String

    @Column
    name: String

    @Column
    area: Number

    @Column
    numberOfFloor: Number

    @Column
    cost: Number

    @Column
    maxPeople: Number

    @Column
    status: Number

    @ForeignKey(() => RentType)
    @Column
    positionId: number

    @BelongsTo(() => RentType)
    rentType: RentType

    @HasMany(() => Contract)
    contract: Contract[]

}

export default Service