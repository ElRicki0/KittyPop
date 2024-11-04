<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla CLIENTE.
*/
class AdminHandler
{
    // declaración de variables para manejo de datos
    protected $id = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $telefono = null;
    protected $correo = null;
    protected $usuario = null;
    protected $clave = null;
    protected $fechaClave = null;
    protected $codigo = null;
    protected $imagen = null;

    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/admin/';

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

    public function getFechaContrasenia()
    {
        return $this->fechaClave;
    }

    /*
     *  Métodos para gestionar la cuenta del administrador.
     */
    public function checkUser($username, $password)
    {
        $sql = 'SELECT id_admin, nombre_admin, telefono_admin, correo_admin, usuario_admin, clave_admin
                FROM tb_admins
                WHERE correo_admin = ?';
        $params = array($username);
        if (!($data = Database::getRow($sql, $params))) {
            return false;
        } elseif (password_verify($password, $data['clave_admin'])) {
            $_SESSION['idAdmin'] = $data['id_admin'];
            $_SESSION['correoAdmin'] = $data['correo_admin'];
            return true;
        } else {
            return false;
        }
    }

    // validación para comprobar si la contraseña es correcta
    public function checkPassword($password)
    {
        $sql = 'SELECT clave_admin
                FROM tb_admins
                WHERE id_admins = ?';
        $params = array($_SESSION['idAdmin']);
        if (!($data = Database::getRow($sql, $params))) {
            return false;
        } elseif (password_verify($password, $data['clave_admin'])) {
            return true;
        } else {
            return false;
        }
    }

    public function changePassword()
    {
        $sql = 'UPDATE tb_admins
                SET clave_admin = ?
                WHERE id_admin = ?';
        $params = array($this->clave, $_SESSION['idAdmin']);
        return Database::executeRow($sql, $params);
    }

    public function readProfile()
    {
        $sql = 'SELECT 
        id_admin, nombre_admin, apellido_admin, telefono_admin, correo_admin, usuario_admin
        WHERE id_admin=?';
        $params = array($_SESSION['idAdmin']);
        return Database::getRow($sql, $params);
    }

    public function editprofile()
    {
        $sql = 'UPDATE tb_admins 
        SET nombre_admin = ?, apellido_admin = ?, telefono_admin = ?, correo_admin= ?, imagen_admin = ?
        WHERE id_admin = ?;
        ';
        $params = array($this->nombre, $this->apellido, $this->telefono, $this->correo, $this->imagen, $_SESSION['idAdmin']);
        return Database::executeRow($sql, $params);
    }

    // próximamente funciones scrud
    public function createRow()
    {
        $sql = 'INSERT INTO tb_admins(nombre_Admin, apellido_admin, telefono_admin, correo_admin, clave_admin, fecha_clave, codigo_clave, imagen_admin)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellido, $this->telefono, $this->correo, $this->clave, $this->fechaClave, $this->codigo, $this->imagen);
        return Database::executeRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT imagen_admin
                FROM tb_admins
                WHERE id_admin = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }
}
