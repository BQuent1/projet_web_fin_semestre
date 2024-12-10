document.addEventListener('DOMContentLoaded', function () {
    var get_button = document.getElementById('btn_get');
    get_button.addEventListener("click", function () {
        getUsers(1);
    });
})

function getUsers(pageNumber) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://reqres.in/api/users?page=" + pageNumber, true);
    xhr.onload = function () {
        var html = "";
        if (xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);

            html += "<div class='user_container'>"
            response.data.forEach(function (user) {
                html += "<fieldset class='users'>"
                html += "<legend>" + user.first_name + " " + user.last_name + "</legend>";
                html += "<img width=100px; src='" + user.avatar + "' alt='Avatar'>";
                html += "<p>Email: " + user.email + "</p>";
                html += "</fieldset>"
            });
            html += "</div>"

        } else {
            document.getElementById("get_result").innerHTML = "Erreur lors de la récupération des utilisateurs.";
        }


        var current_page = parseInt(response.page);
        var next_page = current_page + 1;
        var previous_page = current_page - 1;

        if (current_page < response.total_pages) {
            html += "<p>Page " + current_page + "/" + response.total_pages + "</p>" + "<a href='#' onclick='getUsers(" + next_page + ")'>page suivante</a>";
        }
        else {
            html += "<p>Page " + current_page + "/" + response.total_pages + "</p>" + "<a href='#' onclick='getUsers(" + previous_page + ")'>page précédente</a>";
        }
        document.getElementById("get_result").innerHTML = html;

        console.log(current_page);
        console.log(html);
    };
    xhr.send();
}




document.getElementById("btn_post").onclick = function () {
    var data = { name: "Rosé", job: "Gonzalo", place: "par là" };
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://reqres.in/api/users", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        var html = '';
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 201) {
            var Response_data = JSON.parse(xhr.responseText);
            console.log(Response_data);
            html += 'Résultat de la requête : ' + '<br><br>';
            for (cle in Response_data){
                html+= cle + ' : ' + Response_data[cle] + '<br>';
            }
            html +="<br><button style='cursor:pointer' href='#' onclick='clearResult()'>Fermer</button>";
        }
        else {
            html = '<p>Echec de la requête</p>';
            html +="<br><button style='cursor:pointer' href='#' onclick='clearResult()'>Fermer</button>";
        }
        document.getElementById("post_result").innerHTML = html;
    };
    xhr.send(JSON.stringify(data));
};

function clearResult() {
    console.log('here');
    document.getElementById("post_result").innerHTML = '';
};
