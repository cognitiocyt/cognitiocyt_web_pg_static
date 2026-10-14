/*
 * Static-hosting replacements for what the Django backend used to handle.
 * GitHub Pages can't receive form posts, so the contact, project and
 * newsletter forms open a pre-filled email to CognitioCyT instead.
 */
(function () {
    'use strict';

    var TO = 'info@cognitiocyt.tech';
    var es = (document.documentElement.lang || '').slice(0, 2) === 'es';
    var T = es ? {
        contactSubject: 'Contacto desde cognitiocyt.tech',
        newsletterSubject: 'Suscripción al boletín',
        newsletterBody: 'Por favor suscriban este correo al boletín informativo: ',
        name: 'Nombre', phone: 'Teléfono', email: 'Correo electrónico', message: 'Mensaje',
        invalidEmail: 'Ingresa un correo electrónico válido.',
        mailOpened: 'Se abrió tu aplicación de correo con el mensaje listo. Solo presiona enviar.'
    } : {
        contactSubject: 'Contact from cognitiocyt.tech',
        newsletterSubject: 'Newsletter subscription',
        newsletterBody: 'Please subscribe this email to the newsletter: ',
        name: 'Name', phone: 'Phone', email: 'Email', message: 'Message',
        invalidEmail: 'Please enter a valid email address.',
        mailOpened: 'Your email app has opened with your message ready. Just press send.'
    };

    function mailtoUrl(subject, lines) {
        return 'mailto:' + TO +
            '?subject=' + encodeURIComponent(subject) +
            '&body=' + encodeURIComponent(lines.join('\r\n'));
    }

    // exposed so the target can be swapped (e.g. for a form service) without touching the handlers
    window.cognitioSendMail = function (url) { window.location.href = url; };

    function openMail(subject, lines) {
        window.cognitioSendMail(mailtoUrl(subject, lines));
    }

    function line(label, field) {
        return field && field.value.trim() ? label + ': ' + field.value.trim() : null;
    }

    function ready(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    ready(function () {
        // Contact page form: Name, Phone, Email, Message (in that order, no name attributes)
        var contact = document.querySelector('.contact-form form');
        if (contact) {
            var f = contact.querySelectorAll('input, textarea');
            var name = f[0], phone = f[1], email = f[2], message = f[3];
            [name, email, message].forEach(function (el) { if (el) el.required = true; });
            contact.addEventListener('submit', function (e) {
                e.preventDefault();
                var body = [line(T.name, name), line(T.phone, phone), line(T.email, email), '', message.value.trim()];
                openMail(T.contactSubject, body.filter(function (l) { return l !== null; }));
            });
        }

        // Project page form (name / email / subject / message)
        var project = document.querySelector('form.php-email-form');
        if (project) {
            ['name', 'email', 'subject'].forEach(function (n) {
                var el = project.querySelector('[name="' + n + '"]');
                if (el) el.required = true;
            });
            project.addEventListener('submit', function (e) {
                e.preventDefault();
                var get = function (n) { return project.querySelector('[name="' + n + '"]'); };
                openMail(get('subject').value.trim() || T.contactSubject, [
                    line(T.name, get('name')), line(T.email, get('email')), '', get('message').value.trim()
                ].filter(function (l) { return l !== null; }));
                var sent = project.querySelector('.sent-message');
                if (sent) {
                    sent.textContent = T.mailOpened;
                    sent.classList.add('d-block');
                }
            });
        }

        // Footer newsletter: email input + "Send" link
        var widget = document.querySelector('.footer .widget input.form-control');
        if (widget) {
            var button = widget.parentNode.querySelector('a.cs-btn-one');
            // stays type="text": the theme only styles input[type=text]
            widget.addEventListener('input', function () { widget.setCustomValidity(''); });
            if (button) button.addEventListener('click', function (e) {
                e.preventDefault();
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(widget.value.trim())) {
                    widget.setCustomValidity(T.invalidEmail);
                    widget.reportValidity();
                    return;
                }
                openMail(T.newsletterSubject, [T.newsletterBody + widget.value.trim()]);
            });
        }
    });
})();
