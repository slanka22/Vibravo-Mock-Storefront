$(document).ready(function () {

    $.ajax({
        url: '/users',
        method: 'GET',
        success: function (data) {
            const usersList = $('#adopterList'); 

            data.forEach(user => {
                const listItem = `<li class="list-group-item" style="text-align: center;">${user.firstName} ${user.lastName}</li>`;
                usersList.append(listItem); 
            });
        },
        error: function (error) {
            console.error('Error fetching users:', error);
            $('#usersList').append('<li class="list-group-item text-danger">Error loading users.</li>');
        }
    });
});
