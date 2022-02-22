import { Column, DefaultScope, Table, HasMany, BelongsTo, Model } from "sequelize-typescript";
import Employee from "./employee.model";

@Table({
    tableName: 'division',
    underscored: true
})
class Division extends Model {
    @Column
    name: String

    @HasMany(() => Employee)
    employee: Employee[]

}

export default Division