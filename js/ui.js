const contacts = document.querySelector('.contacts')

document.addEventListener('DOMContentLoaded', function () {

    var sidenav = document.querySelectorAll('.sidenav');
    var modals = document.querySelectorAll('.modal');
    var fab = document.querySelectorAll('.fixed-action-btn');
    var select = document.querySelectorAll('select');
    var autocomplete = document.querySelectorAll('.autocomplete');
    var datepicker = document.querySelectorAll('.datepicker');
    
    M.FloatingActionButton.init(fab);
    M.Sidenav.init(sidenav);
    M.Modal.init(modals);
    M.FormSelect.init(select);
    var autocompleteInstances = M.Autocomplete.init(autocomplete);
    M.Datepicker.init(datepicker);
           

});



const renderContacts = (data, id) => {
    const html = `
    <li class="contact collection-item avatar" data-id=${id}>
        <i class="material-icons circle blue">account_box</i>
        Name: <span class="name">${data.name}</span><br>
        Phone:<span class="phone">${data.phone}</span>
        <div class="secondary-content" data-id=${id}>
            <i class="material-icons modal-trigger" href="#update_contact_modal">edit</i>
            <i class="material-icons favorite-icon">${data.favorite ? 'star' : 'star_border'}</i>
            <i class="material-icons">delete_outline</i>
        </div>
    </li>
    `
    contacts.innerHTML += html
}

const removeContact = (id) => {
    const contact = document.querySelector(`.contact[data-id=${id}`)
    contact.remove();
}


const updateContact = (data, id) => {
    const contact = document.querySelector(`.contact[data-id=${id}`)
    contact.querySelector('.name').innerHTML = data.name
    contact.querySelector('.phone').innerHTML = data.phone
    console.log(contact.querySelector('.name').innerHTML)
    console.log(contact.querySelector('.phone').innerHTML)
    contact.querySelector('.favorite-icon').textContent = data.favorite ? 'star' : 'star_border';
}