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
    underscored :true
};
const Gender = sequelize.difine(alias, cols, config)
    return Gender 
}
