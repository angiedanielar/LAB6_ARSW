apiclient = (function () {


    function getFunctionsByCinema(cinema_name, callback) {
        //http://localhost:8080/cinema/{name}
        $.getJSON("http://localhost:8080/cinema/" + cinema_name, function (data) {
            callback(data);
        });
    }

    function getFunctionsByCinemaAndDate(cinema_name, fdate, callback) {
        //http://localhost:8080/cinema/{name}/{date}
        $.getJSON("http://localhost:8080/cinema/" + cinema_name +"/"+ fdate, function (data) {
            callback(data);
        });
    }

    function getFunctionByFunctionNameAndDate(cinema_name, fdate, movie_name, callback) {
        //http://localhost:8080/cinema//{name}/{date}/{movieName}
        $.getJSON("http://localhost:8080/cinema/"+cinema_name+"/"+ fdate+"/"+movie_name, function (data) {
            callback(data);
        });
    }



    return {
        getFunctionsByCinema: getFunctionsByCinema,
        getFunctionsByCinemaAndDate: getFunctionsByCinemaAndDate,
        getFunctionByFunctionNameAndDate: getFunctionByFunctionNameAndDate
    }

})();