DROP DATABASE IF EXISTS pruebatecnica;

CREATE DATABASE pruebatecnica;

USE pruebatecnica;

-- -----------------------------------------------------
-- Tabla categorias
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS categorias (
    id_categoria INT NOT NULL AUTO_INCREMENT,
    nombre_categoria VARCHAR(45) NULL,
    PRIMARY KEY (id_categoria)
);

-- -----------------------------------------------------
-- Tabla productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS productos (
    id_producto INT NOT NULL AUTO_INCREMENT,
    nombre_prodcuto VARCHAR(45) NULL,
    stok INT NULL,
    categorias_id_categoria INT NOT NULL,
    PRIMARY KEY (id_producto),
    CONSTRAINT fk_productos_categorias FOREIGN KEY (categorias_id_categoria) REFERENCES categorias (id_categoria) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Tabla personas
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS personas (
    id_persona INT NOT NULL,
    nombre_completo VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_persona)
);

-- -----------------------------------------------------
-- Tabla ventas
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ventas (
    id_venta INT NOT NULL AUTO_INCREMENT,
    fecha DATETIME NULL,
    personas_id_persona INT NOT NULL,
    PRIMARY KEY (id_venta),
    CONSTRAINT fk_ventas_personas1 FOREIGN KEY (personas_id_persona) REFERENCES personas (id_persona) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Tabla productos_has_ventas
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS productos_has_ventas (
    productos_id_producto INT NOT NULL,
    ventas_id_venta INT NOT NULL,
    PRIMARY KEY (productos_id_producto, ventas_id_venta),
    CONSTRAINT fk_productos_has_ventas_productos1 FOREIGN KEY (productos_id_producto) REFERENCES productos (id_producto) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT fk_productos_has_ventas_ventas1 FOREIGN KEY (ventas_id_venta) REFERENCES ventas (id_venta) ON DELETE NO ACTION ON UPDATE NO ACTION
);

ALTER TABLE
    productos_has_ventas
ADD
    cantidad INT NOT NULL
AFTER
    ventas_id_venta;