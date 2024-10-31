<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla CLIENTE.
*/
class ClienteHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $telefono = null;
    protected $correo = null;
    protected $clave = null;
    protected $fechaClave = null;
    protected $codigo = null;
    protected $estado = null;
    protected $imagen = null;

    public function __construct()
    {
        // Generar un código aleatorio de 6 dígitos y asignarlo a $codigo
        $this->codigo = rand(100000, 999999);
        $this->fechaClave = date('Y-m-d'); // Formato año-mes-día
    }

    // Método para obtener el código (opcional)
    public function getCodigo()
    {
        return $this->codigo;
    }

    public function getFechaClave()
    {
        return $this->fechaClave;
    }

    /*
    *   Métodos para gestionar la cuenta del cliente.
    */
    public function checkUser($mail, $password)
    {
        $sql = 'SELECT * from tb_clientes c 
                WHERE correo_cliente = ?';
        $params = array($mail);
        if (!($data = Database::getRow($sql, $params))) {
            return false;
        } elseif (password_verify($password, $data['clave_cliente'])) {
            $this->id = $data['id_cliente'];
            $this->correo = $data['correo_cliente'];
            $this->estado = $data['estado_cliente'];
            return true;
        } else {
            return false;
        }
    }

    public function checkStatus()
    {
        if ($this->estado) {
            $_SESSION['idCliente'] = $this->id;
            $_SESSION['correoCliente'] = $this->correo;
            return true;
        } else {
            return false;
        }
    }

    public function changePassword()
    {
        $sql = 'UPDATE tb_clientes
                SET clave_cliente = ?, fecha_clave_cliente = ?, codigo_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->clave, $this->fechaClave, $this->codigo, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function changeStatus()
    {
        $sql = 'UPDATE tb_clientes
                SET estado_cliente = !estado_cliente
                WHERE id_cliente = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT * FROM tb_clientes
                WHERE nombre_cliente LIKE ? OR apellido_cliente LIKE ? OR correo_cliente LIKE ? OR telefono_cliente LIKE ?
                ORDER BY apellido_cliente';
        $params = array($value, $value, $value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_clientes(nombre_cliente, apellido_cliente, telefono_cliente, correo_cliente, clave_cliente, fecha_clave_cliente, codigo_cliente)
	            VALUES(?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellido, $this->telefono, $this->correo, $this->clave, $this->fechaClave, $this->codigo);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT * FROM tb_clientes
                ORDER BY nombre_cliente';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT * FROM tb_clientes
                WHERE id_cliente = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_clientes
                SET nombre_cliente = ?, apellido_cliente = ?, telefono_cliente = ?, correo_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->nombre, $this->apellido, $this->telefono, $this->correo, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_clientes
                WHERE id_cliente = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
