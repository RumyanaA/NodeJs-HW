import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnect.js';
const Group = sequelize.define('Groups', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    }
}, {
    timestamps: false
});
export default Group;
//# sourceMappingURL=groupModel.js.map