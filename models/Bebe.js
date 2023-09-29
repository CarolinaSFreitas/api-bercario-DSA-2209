import { DataTypes } from "sequelize";
import { sequelize } from '../database/conecta.js'
import { Mae } from "./Mae.js";
import { Medico } from "./Medico.js";

export const Bebe = sequelize.define('bebe', { // nome da tabela
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    data_nasc: {
        type: DataTypes.DATE(),
        allowNull: false
    },
    peso: {
        type: DataTypes.DECIMAL(6,3),
        allowNull: false
    },
    altura: {
        type: DataTypes.DECIMAL(4,2),
        allowNull: false
    },
}, {
    timestamps: false
});

// após construir a tabela do model, os relacionamentos são feitos fora, SOMENTE NO BEBE PQ É A TABELA QUE RECEBE AS FK:

//relacionamento bebe-mãe
Bebe.belongsTo(Mae, {
    foreignKey: {
        name: "mae_id",
        allowNull: false
    },
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
})

Mae.hasMany(Bebe, {
    foreignKey: "mae_id"
})

//relacionamento bebê e médico
Bebe.belongsTo(Medico, {
    foreignKey: {
        name: "medico_id",
        allowNull: false
    },
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
})

Medico.hasMany(Bebe, {
    foreignKey: "medico_id"
})
