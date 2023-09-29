import { DataTypes } from "sequelize";
import { sequelize } from '../database/conecta.js'

export const Mae = sequelize.define('mae', { // nome da tabela
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
    endereco: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    fone: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    data_nasc: {
        type: DataTypes.DATE(),
        allowNull: false
    },
    peso:{      // cria uma nova coluna na tabela
        type: DataTypes.DECIMAL(7, 3),
        allowNull: false,
          // defaultValue: 60
    }
}, {
    timestamps: false
});
