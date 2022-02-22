import { Column, Table, HasMany, Model } from "sequelize-typescript";
import Employee from "./employee.model";
@Table({
    tableName: 'educationDegree',
    underscored: true
})
class EducationDegree extends Model {
    @Column
    name: String

    @HasMany(() => Employee)
    employee: Employee[]

}

export default EducationDegree