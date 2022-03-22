import { Column, Model, Table } from "sequelize-typescript"


@Table({
    tableName: 'User',
    underscored: true
})
class User extends Model {
    @Column
    username: String

    @Column
    password: String

    @Column
    refreshToken: String

}
export default User