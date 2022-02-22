import { DefaultScope, Table, Model, Column, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript"
import Contract from "./contract.model"
import Division from "./division.model"
import EducationDegree from "./educationDegree.model"
import Position from "./position.model"

@DefaultScope(() => ({
    attributes: ['id', 'name'],
    include: [Position, Division, EducationDegree]
}))
@Table({
    tableName: 'employee',
    underscored: true
})
class Employee extends Model {
    @Column
    name: String

    @ForeignKey(() => Position)
    @Column
    positionId: number

    @BelongsTo(() => Position)
    position: Position


    @ForeignKey(() => Division)
    @Column
    divisionId: number

    @BelongsTo(() => Division)
    division: Division


    @ForeignKey(() => EducationDegree)
    @Column
    educationDegreeId: number

    @BelongsTo(() => EducationDegree)
    educationDegree: EducationDegree

    @HasMany(() => Contract)
    contract: Contract[]

}
export default Employee