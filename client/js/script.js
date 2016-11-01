$(document).ready(function() {
    console.log("DOM loaded");
    // Ajax
    $.ajax({
        method: 'GET',
        url: '/allUsers'
    }).done(function(res) {
        for (var i = 0; i < res.length; i++) {
            var rowTemplate = "<tr><td id='rowid'>" + res[i]._id + "</td><td id='rowName'>" + res[i].name + "</td><td id='rowAge'>" + res[i].age + "</td><td><button class='btn btn-default'>Edit</button><button class='btn btn-danger' style='margin-left:3px;'>Delete</button></td></tr>";
            $('#userTable').append(rowTemplate);
        }
    });

    // Get User values from modal 
    $('#createUser').click(function() {
        console.log("save modal clicked");
        var set = {};
        set.name = $('#newName').val();
        set.age = $('#newAge').val();
        // Ajax post creating new user 
        $.ajax({
            method: 'POST',
            url: '/newUser',
            data: set
        }).done(function(newDoc) {
            var rowTemplate = "<tr><td>" + newDoc._id + "</td><td id='rowName'>" + newDoc.name + "</td><td id='rowAge'>" + newDoc.age + "</td></tr>";
            $('#userTable').append(rowTemplate);
            $('#myModal').modal('toggle')
        })
    });

    //  delete Row 
    $('#userTable').on('click', '.btn-danger', function() {
        var row = $(this).parent().parent();
        var rowId = $(this).closest('tr').find('#rowid').text();
        $.ajax({
            method: 'DELETE',
            url: '/delUser/' + rowId
        }).done(function(result) {
            console.log(result);
            row.remove();
        });
    });
    // edit or update Row
    $('#userTable').on('click', '.btn-default', function() {
        var row = $(this).parent().parent();
        var rowId = $(this).closest('tr').find('#rowid').text();
        var rowName = $(this).closest('tr').find('#rowName').text();
        var rowAge = $(this).closest('tr').find('#rowAge').text();
        $('#editModal').modal('show');
        $('#editModal').on('shown.bs.modal', function() {
            $('#updateName').val(rowName);
            $('#updateAge').val(rowAge);
        });
        $('#updateUser').click(function() {
            var set = {};
            set.name = $('#updateName').val();
            set.age = $('#updateAge').val();
            $.ajax({
                method: 'PUT',
                url: '/updateUser/' + rowId,
                data: set
            }).done(function(res) {
                console.log(res);
                row.remove();
                var rowTemplate = "<tr><td>" + res._id + "</td><td id='rowName'>" + res.name + "</td><td id='rowAge'>" + res.age + "</td><td><button class='btn btn-default'>Edit</button><button class='btn btn-danger' style='margin-left:3px;'>Delete</button></td></tr>";
                $('#userTable').append(rowTemplate);
                $('#editModal').modal('toggle');
            });
        });
    });

});