document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        locale: 'pt-br',
        navLinks: true,
        selectable: true,
        selectMirror: true,
        editable: true,
        dayMaxEvents: true,
        dateClick: function (info) {
            abrirModal(info);
        },
        eventClick: function (info) {
            abrirModalEditar(info);
        },
        eventDrop: function (info) {
            moverEvento(info);
        },
        events: 'event-list.php',
    });
    calendar.render();

    const modal = document.querySelector('.modal-opened');

    const abrirModal = (info) => {
        if (modal.classList.contains('hidden')) {
            modal.classList.remove('hidden');

            modal.style.transition = 'opacity 300ms';

            setTimeout(() => modal.style.opacity = 1, 100);
        }
        document.querySelector('#start').value = info.dateStr + " 08:00";
        document.querySelector('#end').value = info.dateStr + " 18:00";
    }

    const abrirModalEditar = (info) => {
        if (modal.classList.contains('hidden')) {
            modal.classList.remove('hidden');

            modal.style.transition = 'opacity 300ms';

            setTimeout(() => modal.style.opacity = 1, 100);
        }

        let data_start = [
            info.event.start.toLocaleString().replace(',', '').split(' ')[0].split('/').reverse().join('-'),
            info.event.start.toLocaleString().replace(',', '').split(' ')[1]
        ].join(' ');

        let data_end = [
            info.event.end.toLocaleString().replace(',', '').split(' ')[0].split('/').reverse().join('-'),
            info.event.end.toLocaleString().replace(',', '').split(' ')[1]
        ].join(' ');

        document.querySelector('.modal-title h3').innerHTML = 'Editar Evento';
        document.querySelector('#id').value = info.event.id;
        document.querySelector('#title').value = info.event.title;
        document.querySelector('#color').value = info.event.backgroundColor;
        document.querySelector('#start').value = data_start;
        document.querySelector('#end').value = data_end;
        document.querySelector('.btn-delete').classList.remove('hidden');
    }

    const moverEvento = (info) => {
        let id = info.event.id;
        let title = info.event.title;
        let color = info.event.backgroundColor;
        let start = info.event.startStr.substring(0, 19);
        let end = info.event.endStr.substring(0, 19);

        let data = { id, title, color, start, end };

        let urlEncodedData = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');

        console.log(urlEncodedData);

        var ajax = new XMLHttpRequest();
        ajax.open('POST', 'action-event.php', true);
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        ajax.send(urlEncodedData);

        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                var data = ajax.responseText;
                // console.log(data);
            }
        }
    }

    document.querySelector('.modal-close').addEventListener('click', () => fecharModal());

    modal.addEventListener('click', function (event) {
        if (event.target === this) {
            fecharModal();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            fecharModal();
        }
    });

    const fecharModal = () => {
        if (!modal.classList.contains('hidden')) {

            modal.style.transition = 'opacity 300ms';

            setTimeout(() => modal.style.opacity = 0, 100);
            setTimeout(() => modal.classList.add('hidden'), 300);
        }
    }

    let form_add_event = document.querySelector('#form-add-event');

    form_add_event.addEventListener('submit', function (event) {
        event.preventDefault();
        let title = document.querySelector('#title');
        let start = document.querySelector('#start');

        if (title.value == '') {
            title.style.borderColor = 'red';
            title.focus();
            return false;
        }
        if (start.value == '') {
            start.style.borderColor = 'red';
            start.focus();
            return false;
        }
        this.submit();
    });

    document.querySelector('.btn-delete').addEventListener('click', function () {
        if (confirm('Você confirma a exclusão do evento? Esta ação não pode ser desfeita.')) {
            document.querySelector('#action').value = 'delete';
            form_add_event.submit();
            return true;
        }
        return false;
    });
});