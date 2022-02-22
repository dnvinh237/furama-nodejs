import { Column, Table, HasMany, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import ContractDetail from "./contractDetail.model";

@Table({
    tableName: 'accompaniedService',
    underscored: true
})
class AccompaniedService extends Model {
    @Column
    name: String

    @Column
    price: Number

    @Column
    unit: Number

    @Column
    status: String

    @HasMany(() => ContractDetail)
    contractDetail: ContractDetail[]
}

export default AccompaniedService