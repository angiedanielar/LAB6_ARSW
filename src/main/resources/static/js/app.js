var app = (function () {

    var _cinema;
    var _date;
    var _hour;
    var _module = "js/apimock.js";
    var _funcionActual;

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
        functions = _map(cinemaFunctions);
        $("#cines > tbody").empty();
        functions.map(function (f) {
            var botonSillas = "<button class='btn btn-outline-primary' value='Open Seats' onclick = 'app.openSeats(\"" + f.nombre + '" , "' +
                    f.hora + "\")'>Open Seats</button>";
            var fila = '<tr><td>' + f.nombre + '</td><td>' + f.genero + '</td><td>' + f.hora + '</td><td>' + botonSillas + '</tr>';
            $("#cines > tbody").append(fila)
        })
    }

    function getFunctions() {
        _cinema = $("#cinema").val();
        _date = $("#date").val();
        $("#cinemaSelected").text("Cinema Selected: " + _cinema);
        apimock.getFunctionsByCinemaAndDate(_cinema, _date, _mapOneByOne)
    }

    function openSeats(functionName, hour) {
        _cinema = $("#cinema").val();
        var fullDate = _date.concat(" ", hour);
        var _funcionActual = functionName;
        $("#availabilityOf").text("Availabilty of: " + functionName);
        document.getElementById('availabilityInfo').style.visibility = "visible";
        //F
        $.getScript(_module, function () {
            apimock.getFunctionByFunctionNameAndDate(_cinema, fullDate, functionName, _updateCanvas);
        });
    }

    function _updateCanvas(f) {
        _clearCanvas();
        var seats = f.seats;
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

    function _clearCanvas() {
        var canvas = document.getElementById("availabilityCanvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
    }


    function saveUpdateFunction(_cinema, _funcionActual) {
        _hour = $("#hour").val();
        _date = _date[0]+_hour;
        var putPromise = $.ajax({
            url: "/cinema/"+cinema_name+"/"+_funcionActual,
            type: 'PUT',
            data: cinemas,
            contentType: "application/json"
        });

        putPromise.then(
            function () {
                console.info("funcionó");
            },

            function () {
                console.info("error");
            }
        );

        return putPromise;
    }


    return {
        getFunctions: getFunctions,
        openSeats: openSeats
    };

})();
        