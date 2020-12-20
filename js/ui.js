const contacts = document.querySelector('.contacts')

document.addEventListener('DOMContentLoaded', function () {

    var sidenav = document.querySelectorAll('.sidenav');
    var modals = document.querySelectorAll('.modal');
    var fab = document.querySelectorAll('.fixed-action-btn');

    M.FloatingActionButton.init(fab);
    M.Sidenav.init(sidenav);
    M.Modal.init(modals);

});



const renderContacts = (data, id) => {
    const html = `
    <li class="collection-item avatar" data-id="${id}">
        <i class="material-icons circle blue">account_box</i>
        Name: <span class="name">${data.name}</span><br>
        Phone:<span class="phone">${data.phone}</span>
        <div class="secondary-content" data-id="${id}">
            <i class="material-icons modal-trigger" href="#update_conatct_modal">edit</i>
            <i class="material-icons">${data.favorite ? 'star' : 'star_border'}</i>
            <i class="material-icons">delete_outline</i>
        </div>
    </li>
    `
    contacts.innerHTML += html
}