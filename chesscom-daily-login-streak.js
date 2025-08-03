// ==UserScript==
// @name         Chess.com Daily Login Streak
// @namespace    http://tampermonkey.net/
// @version      2025-08-02
// @description  Records daily chess.com login streak
// @author       Im_chess_noob
// @match        https://www.chess.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chess.com
// @grant        none
// ==/UserScript==

(function() {
    const now = new Date().toISOString().slice(0, 10);
    const previous = localStorage.getItem('lastLoginDate');
    if (!previous) {
        localStorage.setItem('currentLoginStreak', '1');
    } else if (previous !== now) {
        const datePrevious = parseLocalDate(previous);
        const dateNow = parseLocalDate(now);
        const msPerDay = 24 * 60 * 60 * 1000;

        if (dateNow - datePrevious === msPerDay) {
            const currentStreak = parseInt(localStorage.getItem('currentLoginStreak'), 10) || 0;
            localStorage.setItem('currentLoginStreak', (currentStreak + 1).toString());
        } else {
            localStorage.setItem('currentLoginStreak', '1');
        }
    }

    const currentStreak = localStorage.getItem('currentLoginStreak');

    if (previous !== now) {
        localStorage.setItem('lastLoginDate', now);
        alert('New Login Streak: ' + currentStreak);
    }

    if (window.location.href === 'https://www.chess.com/home') {
        window.addEventListener('load', function() {
            displayStreak();
        });
    }

    function parseLocalDate(localDateString) {
        const [year, month, day] = localDateString.split('-').map(Number);
        return new Date(Date.UTC(year, month - 1, day));
    }

    function displayStreak() {
        const div = document.createElement('div');

        const icon = document.createElement('p');
        icon.textContent = 'Current Login Streak: ' + currentStreak;

        icon.style.color = '#FF8C00';
        icon.style.fontSize = '16px';
        icon.style.fontFamily = 'Poppins, sans-serif';
        icon.style.fondWeight = 'bold';

        div.appendChild(icon);

        const header = document.getElementById('tb');
        const nextElement = header.querySelector('div.toolbar-menu-area.toolbar-menu-area-right');
        header.insertBefore(div, nextElement);
    }
})();