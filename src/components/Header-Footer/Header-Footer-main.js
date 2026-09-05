/**
 * header-footer.js
 * Inyección automatizada de componentes Header, Footer y sus estilos CSS.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. INYECCIÓN AUTOMÁTICA DEL DISEÑO CSS (Etiqueta <style>)
    // ==========================================================================
    const styleHTML = `
    <style>
        /* ESTILOS DEL COMPONENTE HEADER */
        .site-header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background-color: rgba(43, 42, 43, 0.85);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            z-index: 1000; /* Prioridad por encima de la rueda de fondo */
        }

        .header-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1400px;
            margin: 0 auto;
            padding: 1rem 2rem;
        }

        .site-logo {
            font-size: 1.3rem;
            font-weight: 700;
            color: white;
            text-decoration: none;
            letter-spacing: 0.5px;
            font-family: 'Poppins', sans-serif;
        }

       

        .main-nav ul {
            display: flex;
            gap: 2rem;
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .nav-link {
            color: #aaa;
            text-decoration: none;
            font-size: 0.95rem;
            font-weight: 500;
            font-family: 'Poppins', sans-serif;
            transition: color 0.2s ease;
        }

        .nav-link:hover, 
        .nav-link.active {
            color: white;
        }

        /* MENÚ RESPONSIVO (MÓVILES) */
        .menu-toggle {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
        }

        @media (max-width: 768px) {
            .menu-toggle {
                display: block;
                z-index: 1001;
            }
            
            .hamburger {
                display: block;
                width: 24px;
                height: 2px;
                background-color: white;
                position: relative;
                transition: background 0.2s ease;
            }
            
            .hamburger::before,
            .hamburger::after {
                content: '';
                position: absolute;
                width: 24px;
                height: 2px;
                background-color: white;
                left: 0;
                transition: transform 0.2s ease;
            }
            
            .hamburger::before { top: -6px; }
            .hamburger::after { bottom: -6px; }

            .menu-toggle.toggle-active .hamburger { background: transparent; }
            .menu-toggle.toggle-active .hamburger::before { transform: rotate(45deg); top: 0; }
            .menu-toggle.toggle-active .hamburger::after { transform: rotate(-45deg); bottom: 0; }

            .main-nav {
                position: fixed;
                top: 0;
                right: -100%;
                width: 70%;
                height: 100vh;
                background-color: #2b2a2b;
                padding: 6rem 2rem;
                transition: right 0.3s ease-in-out;
            }
            
            .main-nav.nav-open {
                right: 0;
            }
            
            .main-nav ul {
                flex-direction: column;
                gap: 1.5rem;
            }
        }

        /* ESTILOS DEL COMPONENTE FOOTER */
           /* ESTILOS DEL COMPONENTE FOOTER PREMIUM EDITORIAL */
        .site-footer {
            position: relative;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: rgba(20, 20, 20, 0.75); /* Fondo premium ultra oscuro */
            backdrop-filter: blur(20px); /* Efecto esmerilado translúcido profundo */
            -webkit-backdrop-filter: blur(20px);
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            z-index: 1000;
            padding: 3rem 0 1.5rem 0;
        }

        .footer-container {
            display: grid;
            grid-template-columns: 2fr 1fr 1.5fr; /* Distribución asimétrica premium */
            gap: 4rem;
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem 2.5rem 2rem;
        }

        .footer-col {
            display: flex;
            flex-direction: column;
        }

        /* Columna 1: Acerca de */
        .footer-logo {
            font-size: 1.4rem;
            font-weight: 700;
            color: white;
            text-decoration: none;
            letter-spacing: 0.5px;
            font-family: 'Poppins', sans-serif;
            margin-bottom: 1rem;
        }

        .footer-tagline {
            font-size: 0.85rem;
            line-height: 1.6;
            color: #888;
            margin: 0 0 1.5rem 0;
            max-width: 320px;
            font-family: 'Karla', sans-serif;
        }

        .footer-socials {
            display: flex;
            gap: 1.2rem;
        }

        .footer-socials a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: all 0.25s ease;
        }

        .footer-socials svg {
            width: 16px;
            height: 16px;
            fill: #777;
            transition: fill 0.25s ease;
        }

        .footer-socials a:hover {
            background-color: rgba(255, 255, 255, 0.08);
            border-color: steelblue;
            transform: translateY(-2px);
        }

        .footer-socials a:hover svg {
            fill: white;
        }

        /* Encabezados de Columnas */
        .footer-col h3 {
            color: white;
            font-size: 0.9rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 0 0 1.5rem 0;
            font-family: 'Poppins', sans-serif;
        }

        /* Columna 2: Enlaces Rápidos */
        .footer-links ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .footer-links a {
            color: #888;
            text-decoration: none;
            font-size: 0.9o0rem;
            font-size: 0.85rem;
            font-family: 'Karla', sans-serif;
            transition: color 0.2s ease, padding-left 0.2s ease;
        }

        .footer-links a:hover {
            color: white;
            padding-left: 4px; /* Pequeño desplazamiento elegante al pasar el mouse */
        }

        /* Columna 3: Newsletter Form */
        .footer-newsletter p {
            font-size: 0.85rem;
            color: #888;
            line-height: 1.5;
            margin: 0 0 1.2rem 0;
            font-family: 'Karla', sans-serif;
        }

        .newsletter-form {
            display: flex;
            position: relative;
            width: 100%;
            max-width: 300px;
        }

        .newsletter-form input {
            width: 100%;
            padding: 0.8rem 3.5rem 0.8rem 1rem;
            background-color: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 6px;
            color: white;
            font-size: 0.85rem;
            font-family: 'Karla', sans-serif;
            transition: border-color 0.25s ease;
        }

        .newsletter-form input:focus {
            outline: none;
            border-color: rgba(70, 130, 180, 0.5); /* Destacado acero translúcido */
        }

        .newsletter-form button {
            position: absolute;
            right: 4px;
            top: 4px;
            bottom: 4px;
            padding: 0 1rem;
            background-color: #2b2a2b;
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 4px;
            color: white;
            font-size: 0.8rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .newsletter-form button:hover {
            background-color: steelblue;
            border-color: steelblue;
        }

        /* Barra Inferior del Pie */
.footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.03);
    padding-top: 1.5rem;
}

.footer-bottom-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    font-size: 0.75rem;
    color: #555;
    font-family: 'Karla', sans-serif;
}

.footer-bottom .copyright,
.footer-bottom .credits {
    margin: 0;
}

.footer-bottom .credits a {
    color: #777;
    text-decoration: none;
    transition: color 0.2s ease;
}

.footer-bottom .credits a:hover {
    color: #aaa;
}

/* ESTILOS EXTRA: Menú de Políticas Legales */
.footer-legal-links {
    display: flex;
    gap: 1.5rem;
}

.footer-legal-links a {
    color: #555;
    text-decoration: none;
    transition: color 0.2s ease;
}

.footer-legal-links a:hover {
    color: steelblue; /* Resalta con el color de acento de tu proyecto */
}

/* RESPONSIVO PREMIUM */
@media (max-width: 900px) {
    .footer-container {
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
    }
    .footer-newsletter {
        grid-column: span 2;
    }
}

@media (max-width: 768px) {
    .footer-bottom-container {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
    .footer-legal-links {
        justify-content: center;
        gap: 1.2rem;
    }
}

@media (max-width: 600px) {
    .site-footer {
        position: relative;
        padding: 2.5rem 0 1.5rem 0;
    }
    .footer-container {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
    }
    .footer-tagline, .footer-newsletter p, .newsletter-form {
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
    }
    .footer-socials {
        justify-content: center;
    }
}


    </style>
    `;

    // Inyectamos los estilos directamente en el <head> de la página
    document.head.insertAdjacentHTML('beforeend', styleHTML);


    // ==========================================================================
    // 2. INYECCIÓN DEL CONTENIDO HTML DEL HEADER
    // ==========================================================================
    const headerHTML = `
        <header class="site-header">
            <div class="header-container">
                <a href="#" class="site-logo">Humdivunivcele</a>
                
                <button class="menu-toggle" aria-label="Abrir menú de navegación" aria-expanded="false">
                    <span class="hamburger"></span>
                </button>

                <nav class="main-nav">
                    <ul>
                        <li><a href="https://humdivunivcele.gieovannyfrias.com" class="nav-link active">Inicio</a></li>
                        <li><a href="/Galeria" class="nav-link">Galería</a></li>
                        <li><a href="/Videos" class="nav-link">Videos</a></li>
                        <li><a href="/Historia" class="nav-link">Historia</a></li>
                        <li><a href="/Contacto" class="nav-link">Contacto</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    `;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);


    // ==========================================================================
    // 3. LÓGICA DE CONTROL DEL MENÚ HAMBURGUESA
    // ==========================================================================
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isOpened = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isOpened);
            mainNav.classList.toggle('nav-open');
            menuToggle.classList.toggle('toggle-active');
        });
    }


    // ==========================================================================
    // 4. INYECCIÓN DEL CONTENIDO HTML DEL FOOTER
    // ==========================================================================
    const currentYear = new Date().getFullYear();

    const footerHTML = `
     <footer class="site-footer">
    <div class="footer-container">
        
        <!-- Columna 1: Branding e Introducción -->
        <div class="footer-col footer-about">
            <a href="#" class="footer-logo">Humdivunivcele</a>
            <p class="footer-tagline">Explorando la historia, el arte y los hitos del mundo a través del mundo fisico y espiritual.</p>
            <div class="footer-socials">
                <a href="https://x.com/humdivunivcele" aria-label="X (Twitter)"><svg viewBox="0 0 24 24"><path d="M18.2 2.4h3.3L14.3 11l8.4 11h-6.6l-5.2-6.8-5.9 6.8H1.7l7.6-8.7L1.2 2.4h6.8l4.7 6.2 5.5-6.2zm-1.2 16.6h1.8L7.1 4.3H5.1l11.9 14.7z"/></svg></a>
                <a href="https://www.instagram.com/humdivunivcele" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 2.1c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.5.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .5 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.5 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.5-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.5-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.3-1.8.5-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.5 1.3-.1 1.7-.1 4.9-.1M12 0C8.7 0 8.3 0 7 .1 5.7.2 4.8.4 4.1.7c-.8.3-1.4.7-2 1.4-.7.6-1.1 1.2-1.4 2-.3.7-.5 1.6-.6 2.9C0 8.3 0 8.7 0 12s0 3.7.1 5c.1 1.3.3 2.2.6 2.9.3.8.7 1.4 1.4 2 .6.7 1.2 1.1 2 1.4.7.3 1.6.5 2.9.6 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3-.1 2.2-.3 2.9-.6.8-.3 1.4-.7 2-1.4.7-.6 1.1-1.2 1.4-2 .3-.7.5-1.6.6-2.9.1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.3-2.2-.6-2.9-.3-.8-.7-1.4-.1-1.4-2-.6-.7-1.2-1.1-2-1.4-.7-.3-1.6-.5-2.9-.6C15.7 0 15.3 0 12 0zm0 5.8c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zm0 10.2c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6.4-11.2c-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4 1.4-.6 1.4-1.4-.6-1.4-1.4-1.4z"/></svg></a>
                <a href="https://www.linkedin.com/company/humdivunivcele" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
            </div>
        </div>

        <!-- Columna 2: Enlaces Rápidos Organizados -->
        <div class="footer-col footer-links">
            <h3>Explorar</h3>
            <ul>
                <li><a href="/Acerca_de">Acerca de</a></li>
                <li><a href="/Linea_tiempo">Línea de Tiempo</a></li>
                <li><a href="/Proyectos_especiales">Proyectos Especiales</a></li>
                <li><a href="/Documentales">Documentales</a></li>
                <li><a href="/Preguntas_generales">Preguntas Frecuentes</a></li>
            </ul>
        </div>

        <!-- Columna 3: Formulario Premium de Newsletter -->
        <div class="footer-col footer-newsletter">
            <h3>Suscríbete</h3>
            <p>Recibe actualizaciones de nuevas eras históricas añadidas.</p>
            <form class="newsletter-form" onsubmit="event.preventDefault();">
                <input type="email" placeholder="Tu correo electrónico" aria-label="Correo electrónico" required>
                <button type="submit">Ir</button>
            </form>
        </div>

    </div>

    <!-- Barra Inferior de Créditos y Enlaces Legales Extra -->
    <div class="footer-bottom">
        <div class="footer-bottom-container">
            <p class="copyright">&copy; ${currentYear} Humdivunivcele. Diseñado por dios divino.</p>
            
            <!-- MENÚ LEGAL EXTRA -->
            <div class="footer-legal-links">
                <a href="/Politicas_privacidad">Privacidad</a>
                <a href="/Politicas_cookies">Cookies</a>
                <a href="/Politicas_seguridad">Seguridad</a>
            </div>

            <p class="credits">Inspirado por <a href="https://www.gieovannyfrias.com" target="_blank" rel="noopener">Gieovanny Frías</a></p>
        </div>
    </div>
</footer>

    `;

    document.body.insertAdjacentHTML('beforeend', footerHTML);
});
