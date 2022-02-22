import { Column, Table, HasMany, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import ContractDetail from "./contractDetail.model";
import Customer from "./customer.model";
import CustomerType from "./customerType.model";
import Employee from "./employee.model";
import Service from "./service.model";


@Table({
    tableName: 'contract',
    underscored: true
})
class Contract extends Model {
    @Column
    startDate: String

    @Column
    endDate: String

    @Column
    deposit: String

    @Column
    totalMoney: String

    @HasMany(() => ContractDetail)
    contractDetail: ContractDetail[]

    @ForeignKey(() => Employee)
    @Column
    employeeId: number

    @BelongsTo(() => Employee)
    employee: Employee

    @ForeignKey(() => Customer)
    @Column
    customerId: number

    @BelongsTo(() => Customer)
    customer: Customer

    @ForeignKey(() => Service)
    @Column
    serviceId: number

    @BelongsTo(() => Service)
    service: Service
}

export default Contract