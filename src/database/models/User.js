module.exports = (sequelize, dataTypes) => {
    const alias = 'User';
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        apellido: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        tel: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        terminos: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        privacidad: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        imagenPerfil: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        rol: {
            type: dataTypes.STRING(45),
            allowNull: false
        }
        
    };
    const config = {
        tableName: 'users',
        timestamps: false,//cambiar a true
    }

    const User = sequelize.define(alias, cols, config);

    /* User.associate = function(modelos) {
        User.belongsToMany(modelos.Product,{
            as: 'products',
            through: 'orders',
            foreignKey: 'users_id',
            otherKey: 'products_id',
            timestamps: false
        })
    } */

    return User;
}
