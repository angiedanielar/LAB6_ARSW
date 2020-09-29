var app = (function () {

    var _cinema;
    var _date;
    var _module = "js/apiclient.js";
    var _hour;
    var _funcion;
    var _seats = [[true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true]];
    var fun = null;

    function _setCinemaName(cinema) {
        _cinema = $("cinema");
    }
    ;

    function _setDate(date) {
        _date = $("date");
    }
    ;


    function _map(functions) {
        return mapList = functions.map(function (cinemaFunction) {
            return {
                nombre: cinemaFunction.movie.name,
                genero: cinemaFunction.movie.genre,
                hora: cinemaFunction.date.split(" ")[1]
            }
        })

    }

    function _mapOneByOne(cinemaFunctions) {
        //functions = _map(cinemaFunctions);
        $("#cines > tbody").empty();
        var tab = $("<table></table>")        

        cinemaFunctions.forEach((f) => {
            console.log(f);
            var column = $("<tr>");
            column.append($("<td>" +f.movie.name + "</td>"));
            column.append($("<td>" + f.movie.genre + "</td>"));
            column.append($("<td>" + f.date.split(" ")[1] + "</td>"));
            var but = $("<button class='btn btn-outline-primary'>Open Seats</button>");            
            var td = $("<td></tr>");
            td.append(but);
            column.append(td);
            but.click(() => {
                fun = f;
                openSeats(f.movie.name,f.date.split(" ")[0]);
            });
            $("#cines > tbody").append(column);            
        });
        $("#cines").append(tab);
        /* functions.map(function (f) {            
         var botonSillas = "<button class='btn btn-outline-primary' value='Open Seats' onclick = 'app.openSeats(\"" + f.nombre + '" , "' +
         f.hora + "\")'>Open Seats</button>";
         var fila = '<tr><td>' + f.nombre + '</td><td>' + f.genero + '</td><td>' + f.hora + '</td><td>' + botonSillas + '</tr>';
         $("#cines > tbody").append(fila) 
         }) */
    }

    function getFunctions() {
        _cinema = $("#cinema").val();
        _date = $("#date").val();
        $("#cinemaSelected").text("Cinema Selected: " + _cinema);
        apiclient.getFunctionsByCinemaAndDate(_cinema, _date, _mapOneByOne);
    }

    function openSeats(functionName, hour) {
        _funcion = functionName;
        _hour = hour;
        _cinema = $("#cinema").val();
        $("#availabilityOf").text("Availabilty of: " + functionName);
        document.getElementById('availabilityInfo').style.visibility = "visible";
        $.getScript(_module, function () {
            apiclient.getFunctionByFunctionNameAndDate(_cinema, _date + " " + _hour, _funcion, _updateCanvas);
        });
    }

    function _updateCanvas(f) {
        if (f != null) {
            clearCanvas();
            console.log(fun);
            var seats = fun.seats;
            console.log(seats);
            var c = document.getElementById("availabilityCanvas");
            var ctx = c.getContext("2d");
            ctx.fillStyle = "#4287f5";
            ctx.fillRect(c.width * 0.2, c.height * 0.05, c.width * 0.6, c.height * 0.075);
            var x = c.width * 0.1;
            var y = c.height * 0.20;
            var w = (c.width) * 0.8;
            var h = (c.height) * 0.75;
            var l;
            if (w < h) {
                l = w * 0.8 / seats[0].length;
            } else {
                l = h * 0.8 / seats.length;
            }
            var dx = (w - (l * seats[0].length)) / seats[0].length;
            var dy = (h - (l * seats.length)) / seats.length;

            seats.map(function (row) {
                x = c.width * 0.1;
                row.map(function (seat) {
                    ctx.fillStyle = "#000000";
                    if (!seat) {
                        ctx.fillStyle = "#4287f5";
                    }
                    ctx.fillRect(x, y, l, l);
                    x = x + l + dx;
                })
                y = y + l + dy;
            });

        }
    }

    function clearCanvas() {
        var canvas = document.getElementById("availabilityCanvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
    }

    function saveUpdate() {
        $.getScript(_module, function () {
            apiclient.getFunctionByFunctionNameAndDate(_cinema, _date + " " + _hour, fun, update);
        });
    }

    function update() {
        fun.date = _date + " " + $("#hour").val();
        _hour = $("#hour").val();
        _date = $("#date").val();
        console.log(fun);
        $.getScript(_module, function () {
            apiclient.saveUpdateFunction(_cinema, fun, _actualizar);
        });
    }

    function _actualizar() {
        $.getScript(_module, function () {
            apiclient.getFunctionsByCinemaAndDate(_cinema, _date, _mapOneByOne);
        });
    }

    return {
        getFunctions: getFunctions,
        openSeats: openSeats,
        saveUpdate: saveUpdate,
        update: update,
        clearCanvas: clearCanvas
    };

})();
        