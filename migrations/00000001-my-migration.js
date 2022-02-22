"use strict";
const { Op } = require("sequelize");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("accompaniedService", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: Sequelize.STRING },
      price: { type: Sequelize.INTEGER },
      unit: { type: Sequelize.INTEGER },
      status: { type: Sequelize.STRING },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.createTable("contract", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      start_date: { type: Sequelize.STRING },
      end_date: { type: Sequelize.STRING },
      deposit: { type: Sequelize.STRING },
      total_money: { type: Sequelize.STRING },
      employee_id: { type: Sequelize.INTEGER, allowNull: true },
      customer_id: { type: Sequelize.INTEGER, allowNull: true },
      service_id: { type: Sequelize.INTEGER, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.createTable("contractDetail", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: Sequelize.STRING },
      contract_id: { type: Sequelize.INTEGER, allowNull: true },
      accompanied_service_id: { type: Sequelize.INTEGER, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.createTable("customer", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      code: { type: Sequelize.STRING },
      name: { type: Sequelize.STRING },
      day_of_birth: { type: Sequelize.STRING },
      id_card: { type: Sequelize.STRING },
      phone: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      address: { type: Sequelize.STRING },
      customer_type_id: { type: Sequelize.INTEGER, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.createTable("customerType", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: Sequelize.STRING },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.createTable("division", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: Sequelize.STRING },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.createTable("educationDegree", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: Sequelize.STRING },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.createTable("employee", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: Sequelize.STRING },
      position_id: { type: Sequelize.INTEGER, allowNull: true },
      divistion_id: { type: Sequelize.INTEGER, allowNull: true },
      education_degree_id: { type: Sequelize.INTEGER, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.createTable("position", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: Sequelize.STRING },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.createTable("rentType", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: Sequelize.STRING },
      price: { type: Sequelize.INTEGER },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.createTable("Service", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      code: { type: Sequelize.STRING },
      name: { type: Sequelize.STRING },
      area: { type: Sequelize.INTEGER },
      number_of_floor: { type: Sequelize.INTEGER },
      cost: { type: Sequelize.INTEGER },
      max_people: { type: Sequelize.INTEGER },
      status: { type: Sequelize.INTEGER },
      position_id: { type: Sequelize.INTEGER, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.addConstraint("contract", {
      references: { table: "employee", field: "id" },
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
      fields: ["employee_id"],
      type: "foreign key",
      name: "fk_contract_employee_id_employee",
    });
    await queryInterface.addConstraint("contract", {
      references: { table: "customer", field: "id" },
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
      fields: ["customer_id"],
      type: "foreign key",
      name: "fk_contract_customer_id_customer",
    });
    await queryInterface.addConstraint("contract", {
      references: { table: "Service", field: "id" },
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
      fields: ["service_id"],
      type: "foreign key",
      name: "fk_contract_service_id_Service",
    });
    await queryInterface.addConstraint("contractDetail", {
      references: { table: "contract", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      fields: ["contract_id"],
      type: "foreign key",
      name: "fk_contractDetail_contract_id_contract",
    });
    await queryInterface.addConstraint("contractDetail", {
      references: { table: "accompaniedService", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      fields: ["accompanied_service_id"],
      type: "foreign key",
      name: "fk_contractDetail_accompanied_service_id_accompaniedService",
    });
    await queryInterface.addConstraint("customer", {
      references: { table: "customerType", field: "id" },
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
      fields: ["customer_type_id"],
      type: "foreign key",
      name: "fk_customer_customer_type_id_customerType",
    });
    await queryInterface.addConstraint("employee", {
      references: { table: "position", field: "id" },
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
      fields: ["position_id"],
      type: "foreign key",
      name: "fk_employee_position_id_position",
    });
    await queryInterface.addConstraint("employee", {
      references: { table: "division", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      fields: ["division_id"],
      type: "foreign key",
      name: "fk_employee_division_id_division",
    });
    await queryInterface.addConstraint("employee", {
      references: { table: "educationDegree", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      fields: ["education_degree_id"],
      type: "foreign key",
      name: "fk_employee_education_degree_id_educationDegree",
    });
    await queryInterface.addConstraint("Service", {
      references: { table: "rentType", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      fields: ["position_id"],
      type: "foreign key",
      name: "fk_Service_position_id_rentType",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "contract",
      "fk_contract_employee_id_employee"
    );
    await queryInterface.removeConstraint(
      "contract",
      "fk_contract_customer_id_customer"
    );
    await queryInterface.removeConstraint(
      "contract",
      "fk_contract_service_id_Service"
    );
    await queryInterface.removeConstraint(
      "contractDetail",
      "fk_contractDetail_contract_id_contract"
    );
    await queryInterface.removeConstraint(
      "contractDetail",
      "fk_contractDetail_accompanied_service_id_accompaniedService"
    );
    await queryInterface.removeConstraint(
      "customer",
      "fk_customer_customer_type_id_customerType"
    );
    await queryInterface.removeConstraint(
      "employee",
      "fk_employee_position_id_position"
    );
    await queryInterface.removeConstraint(
      "employee",
      "fk_employee_division_id_division"
    );
    await queryInterface.removeConstraint(
      "employee",
      "fk_employee_education_degree_id_educationDegree"
    );
    await queryInterface.removeConstraint(
      "Service",
      "fk_Service_position_id_rentType"
    );
    await queryInterface.dropTable("accompaniedService");
    await queryInterface.dropTable("contract");
    await queryInterface.dropTable("contractDetail");
    await queryInterface.dropTable("customer");
    await queryInterface.dropTable("customerType");
    await queryInterface.dropTable("division");
    await queryInterface.dropTable("educationDegree");
    await queryInterface.dropTable("employee");
    await queryInterface.dropTable("position");
    await queryInterface.dropTable("rentType");
    await queryInterface.dropTable("Service");
  },
};
