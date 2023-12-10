<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FullCalendar</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="modal-opened hidden">
        <div class="modal">
            <div class="modal-header">
                <div class="modal-title">
                    <h3>Cadastrar Evento</h3>
                </div>
                <div class="modal-close">x</div>
            </div>
            <form action="action-event.php" method="post" id="form-add-event">
                <div class="modal-body">
                    <input type="hidden" name="id" id="id">
                    <input type="hidden" name="action" id="action" value="">

                    <label for="title">Nome do Evento</label>
                    <input type="text" name="title" id="title">

                    <label for="color">Selecione uma cor</label>
                    <input type="color" name="color" id="color">

                    <label for="start">Início do Evento</label>
                    <input type="datetime-local" name="start" id="start">

                    <label for="end">Término do Evento</label>
                    <input type="datetime-local" name="end" id="end">

                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn-save">Salvar</button>
                    <button type="button" class="btn-delete hidden">Excluir</button>
                </div>
            </form>
        </div>
    </div>

    <div class="calendar-area">
        <div class="calendar-area-header">
            <h3>Agenda com FULL CALENDAR</h3>
            <div class="msg">
                <?php
                if (!empty($_SESSION['msg'])) {
                    echo $_SESSION['msg'];
                    unset($_SESSION['msg']);
                }
                ?>
            </div>
        </div>
        <div id='calendar'></div>
    </div>

    <script src="dist/index.global.min.js"></script>
    <script src="core/locales/pt-br.global.min.js"></script>
    <script src="script.js"></script>
</body>

</html>