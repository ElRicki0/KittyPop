-- creamos borramos la base de datos si no existe
DROP DATABASE if EXISTS db_kitty_pop;

-- creamos una base de datos
CREATE DATABASE db_kitty_pop;

-- seleccionamos  la base de datos para poder trabajar con ella
USE db_kitty_pop;

-- creación de tabla para los clientes 
CREATE TABLE
    tb_clientes (
        id_cliente INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        nombre_cliente VARCHAR(50) NOT NULL,
        apellido_cliente VARCHAR(50) NOT NULL,
        telefono_cliente VARCHAR(10) NOT NULL,
        correo_cliente VARCHAR(50) NOT NULL,
        clave_cliente VARCHAR(500) NOT NULL,
        fecha_clave_cliente DATE NOT NULL,
        codigo_cliente VARCHAR(6) NOT NULL,
        estado_cliente tinyint (1) NOT NULL DEFAULT 1,
        imagen_cliente VARCHAR(500)
    );

-- creación de tabla de administradores
CREATE TABLE
    tb_admins (
        id_admin INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        nombre_admin VARCHAR(50) NOT NULL,
        apellido_admin VARCHAR(50) NOT NULL,
        telefono_admin VARCHAR(50) NOT NULL,
        correo_admin VARCHAR(50) NOT NULL,
        clave_admin VARCHAR(500) NOT NULL,
        fecha_clave DATE NOT NULL,
        codigo_clave VARCHAR(6) NOT NULL,
        imagen_admin VARCHAR(150)
    );

-- creacion de tabla de galeria imagenes
CREATE TABLE
    tb_galerias (
        id_galeria INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        nombre_galeria VARCHAR(20) NOT NULL,
        imagen_1 VARCHAR(150),
        imagen_2 VARCHAR(150),
        imagen_3 VARCHAR(150)
    );

-- creacion de tabla categorias
CREATE TABLE
    tb_categorias (
        id_categoria INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        nombre_categoria VARCHAR(50) NOT NULL,
        descripcion_categoria VARCHAR(150) NOT NULL,
        imagen_categoria VARCHAR(150)
    );

-- creacion de tabla de productos
CREATE TABLE tb_productos (
    id_producto INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre_producto VARCHAR(150) NOT NULL,
    descripcion_producto VARCHAR(200) NOT NULL,
    precio_producto DECIMAL(10, 2) NOT NULL,
    id_galeria INT,
    FOREIGN KEY (id_galeria) REFERENCES tb_galerias (id_galeria),
    estado_producto TINYINT(1) NOT NULL DEFAULT 1,
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES tb_categorias(id_categoria)
);
