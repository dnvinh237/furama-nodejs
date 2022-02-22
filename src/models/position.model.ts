import { Column, DefaultScope, Table, HasMany, BelongsTo, Model } from "sequelize-typescript";
import Employee from "./employee.model";
@DefaultScope(() => ({
    attributes: ['id', 'name'],

}))
@Table({
    tableName: 'position',
    underscored: true
})
class Position extends Model {
    @Column
    name: String

    @HasMany(() => Employee)
    employee: Employee[]

}

export default Position