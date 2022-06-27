module.exports = (sequelize, dataTypes) => {
    const alias = 'Users';
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        apellido: {
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
        fecha: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        genero: {
            type: dataTypes.STRING(45),
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
        tableName: 'usuarios',
        timestamps: true,
        createdAt: 'created_at',
        updateAt: 'update_at',
        deleteAt: 'deleted_at'
    }

    const User = sequelize.define(alias, cols, config);

    return User;
}
