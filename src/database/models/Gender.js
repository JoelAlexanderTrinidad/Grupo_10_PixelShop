module.exports = (sequelize, dataTypes) => {

let alias = "Gender";
let cols={
    id : {
        type : dataTypes.INTEGER.UNSIGNED,
        autoIncrement : true,
        allowNull : false,
        primaryKey: true
    },
    name:{
        type : dataTypes.STRING(100),
        allowNull: false,
    }
};
let config ={
    tableName : "genders",
    timestamps: true,
        createdAt: 'created_at',
        updateAt: 'update_at',
        deleteAt: 'deleted_at'
};

const Gender = sequelize.define(alias, cols, config);
    return Gender 
}
