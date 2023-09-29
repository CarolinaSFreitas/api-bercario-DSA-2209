import { DataTypes } from "sequelize";
import { sequelize } from '../database/conecta.js'

export const Medico = sequelize.define('medico', { // nome da tabela
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    crm: {
        type: DataTypes.STRING(12),
        allowNull: false
    },
    fone: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    especialidade: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
}, {
    timestamps: false
});
