const contacts = document.querySelector('.contacts')

document.addEventListener('DOMContentLoaded', function () {

    var sidenav = document.querySelectorAll('.sidenav');
    var modals = document.querySelectorAll('.modal');
    var fab = document.querySelectorAll('.fixed-action-btn');
    var select = document.querySelectorAll('select');
    
    M.FloatingActionButton.init(fab);
    M.Sidenav.init(sidenav);
    M.Modal.init(modals);

    M.FormSelect.init(select);

});


const autocompleteField = document.querySelector("#autocomplete");
const autocompleteInstance = M.Autocomplete.init(autocompleteField, {
    minLength: 1,
    limit: 5,
});
const fetchedResults = document.querySelector('#fetchedResults');
const insertLi = (text) => {
    fetchedResults.innerHTML = `${fetchedResults.innerHTML}<li class="collection-item">${text}</li>`;
};

autocompleteField.addEventListener('focus', () => {
    fetch('https://firestore.googleapis.com/v1/projects/contact-71b85/databases/(default)/documents/contacts/')
    .then(response => response.ok ? response.json() : new Error(response.statusText))
    .then(json => {

        const data = [];
        json.documents.forEach(item => {
            data[item.fields.name.stringValue] = null;
            insertLi(item.fields.name.stringValue);
        });
    
        autocompleteInstance.updateData(data);
        autocompleteInstance.open();

    }).catch(error => {
        autocompleteInstance.updateData({
            'Unable to connect': null
        });
    })
    
}, {
    once: true
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