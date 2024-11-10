/*
* Controlador de uso general en las páginas web del sitio privado.
* Sirve para manejar la plantilla del encabezado y pie del documento.
*/

// Constante para completar la ruta de la API.
const USER_API = 'services/admin/administrador.php';

// Constante para establecer el elemento del contenido principal.
const MAIN = document.querySelector('main');
MAIN.style.paddingTop = '75px';
MAIN.style.paddingBottom = '100px';
MAIN.classList.add('container');
// Se establece el título de la página web.
document.querySelector('title').textContent = 'Kitty POP - Admin';
// Constante para establecer el elemento del título principal.
const MAIN_TITLE = document.getElementById('mainTitle');
MAIN_TITLE.classList.add('text-center', 'py-3');

/* Función asíncrona para cargar el encabezado y pie del documento.
* Parámetros: ninguno.
* Retorno: ninguno.
*/

const loadTemplate = async () => {
    // Petición para obtener en nombre del usuario que ha iniciado sesión.
    const DATA = await fetchData(USER_API, 'getUser');
    // Se verifica si el usuario está autenticado, de lo contrario se envía a iniciar sesión.
    if (DATA.session) {
        // Se comprueba si existe un alias definido para el usuario, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se agrega el encabezado de la página web antes del contenido principal.
            MAIN.insertAdjacentHTML('beforebegin', `
<header>
    <nav class="navbar fixed-top navbar-expand-lg bg-body-tertiary">
        <div class="container">
            <a class="navbar-brand" href="dashboard.html">
                <img src="../../resources/img/logo.png" alt="CoffeeShop" width="50">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
                aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarContent">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="producto.html">Productos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="categoria.html">Categorías</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="administrador.html">Administradores</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"
                            aria-expanded="false">Cuenta: <b>${DATA.username}</b></a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="profile.html">Editar perfil</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#" onclick="logOut()">Cerrar sesión</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
`);
            // Se agrega el pie de la página web después del contenido principal.
            MAIN.insertAdjacentHTML('afterend', `
<footer>
    <nav class="navbar fixed-bottom bg-body-tertiary">
        <div class="container">
            <div>
                <p><a class="nav-link" href="https://github.com/dacasoft/coffeeshop" target="_blank"><i
                            class="bi bi-github"></i> CoffeeShop</a></p>
                <p><i class="bi bi-c-square-fill"></i> 2018-2024 Todos los derechos reservados</p>
            </div>
            <div>
                <p><a class="nav-link" href="../public/" target="_blank"><i class="bi bi-cart-fill"></i> Sitio
                        público</a></p>
                <p><i class="bi bi-envelope-fill"></i> dacasoft@outlook.com</p>
            </div>
        </div>
    </nav>
</footer>
`);
        } else {
            sweetAlert(3, DATA.error, false, 'index.html');
        }
    } else {
        // Se comprueba si la página web es la principal, de lo contrario se direcciona a iniciar sesión.
        if (location.pathname.endsWith('index.html') || location.pathname.endsWith('signup.html')) {
            // Se agrega el encabezado de la página web antes del contenido principal.
            MAIN.insertAdjacentHTML('beforebegin', `
<nav role="navigation">
    <div id="menuToggle">

        <input type="checkbox" id="menuCheckbox" />


        <span></span>
        <span></span>
        <span></span>


        <ul id="menu">

            <li>
                <a href="#">
                    <label for="menuCheckbox" onclick="this.parentNode.click();">Home</label>
                </a>
            </li>
            <li>
                <a href="#about">
                    <label for="menuCheckbox" onclick="this.parentNode.click();">About</label>
                </a>
            </li>

            <!-- These just close the menu -->
            <li><label for="menuCheckbox"><a>Info</a></label></li>
            <li><label for="menuCheckbox"><a>Contact</a></label></li>

            <!-- Or just use regular URLs -->
            <li>
                <a href="https://erikterwan.com/" target="_blank">Show me more</a>
            </li>
            <li><label for="menuCheckbox"><a></a></label></li>
            <li><label for="menuCheckbox"><a></a></label></li>
            <li><label for="menuCheckbox"><a></a></label></li>
            <li><label for="menuCheckbox"><a></a></label></li>
            <li><label for="menuCheckbox"><a></a></label></li>
            <li><label for="menuCheckbox"><a></a></label></li>  
        </ul>
    </div>
</nav>
`);
            // Se agrega el pie de la página web después del contenido principal.
            MAIN.insertAdjacentHTML('afterend', `
<!-- Site footer -->
<footer class="site-footer">
    <div class="container">
        <div class="row">
            <div class="col-sm-12 col-md-6">
                <h6>About</h6>
                <p class="text-justify">Scanfcode.com <i>CODE WANTS TO BE SIMPLE </i> is an initiative to help the
                    upcoming programmers with the code. Scanfcode focuses on providing the most efficient code or
                    snippets as the code wants to be simple. We will help programmers build up concepts in different
                    programming languages that include C, C++, Java, HTML, CSS, Bootstrap, JavaScript, PHP, Android, SQL
                    and Algorithm.</p>
            </div>

            <div class="col-xs-6 col-md-3">
                <h6>Categories</h6>
                <ul class="footer-links">
                    <li><a href="http://scanfcode.com/category/c-language/">C</a></li>
                    <li><a href="http://scanfcode.com/category/front-end-development/">UI Design</a></li>
                    <li><a href="http://scanfcode.com/category/back-end-development/">PHP</a></li>
                    <li><a href="http://scanfcode.com/category/java-programming-language/">Java</a></li>
                    <li><a href="http://scanfcode.com/category/android/">Android</a></li>
                    <li><a href="http://scanfcode.com/category/templates/">Templates</a></li>
                </ul>
            </div>

            <div class="col-xs-6 col-md-3">
                <h6>Quick Links</h6>
                <ul class="footer-links">
                    <li><a href="http://scanfcode.com/about/">About Us</a></li>
                    <li><a href="http://scanfcode.com/contact/">Contact Us</a></li>
                    <li><a href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</a></li>
                    <li><a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a></li>
                    <li><a href="http://scanfcode.com/sitemap/">Sitemap</a></li>
                </ul>
            </div>
        </div>
        <hr>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-sm-6 col-xs-12">
                <p class="copyright-text">Copyright &copy; 2017 All Rights Reserved by
                    <a href="#">Scanfcode</a>.
                </p>
            </div>

            <div class="col-md-4 col-sm-6 col-xs-12">
                <ul class="social-icons">
                    <li><a class="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
                    <li><a class="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
                    <li><a class="dribbble" href="#"><i class="fa fa-dribbble"></i></a></li>
                    <li><a class="linkedin" href="#"><i class="fa fa-linkedin"></i></a></li>
                </ul>
            </div>
        </div>
    </div>
</footer>
`);
        } else {
            // location.href = 'index.html';
            console.log('hola putas jajajaja');
        }
    }
}