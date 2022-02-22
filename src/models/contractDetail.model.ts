import { Column, Table, HasMany, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import AccompaniedService from "./accompaniedService.model";
import Contract from "./contract.model";



@Table({
    tableName: 'contractDetail',
    underscored: true
})
class ContractDetail extends Model {
    @Column
    quantity: number

    @ForeignKey(() => Contract)
    @Column
    ContractId: number

    @BelongsTo(() => Contract)
    contract: Contract

    @ForeignKey(() => AccompaniedService)
    @Column
    accompaniedServiceId: number

    @BelongsTo(() => AccompaniedService)
    accompaniedService: AccompaniedService
}

export default ContractDetail