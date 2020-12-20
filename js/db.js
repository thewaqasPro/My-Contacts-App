db.enablePersistence().catch(()=>{
    if (err.code == 'failed-precondition') {
        console.log('Multiple tabs opened')
    } else if (err.code == 'unimplemented') {
        console.log('Browser Not Support')
    }
})

const addContactForm = document.querySelector('.add-contact form')
const updateContactForm = document.querySelector('.update-contact form')

const addContactModal = document.querySelector('#add_contact_model')
const updateContactModal = document.querySelector('#update_contact_model')

let updateId = null

addContactForm.addEventListener('submit', event => {
    event.preventDefault();

    const contact = {
        name:addContactForm.name.value,
        phone:addContactForm.phone.value,
        favorite:false
    }
    db.collection('contacts').add(contact).then(()=>{
        addContactForm.reset();
        var instance = M.Modal.getInstance(addContactModal);
        instance.close();
        addContactForm.querySelector('.error').textContent = ''
    }).catch(err=>{
        addContactForm.querySelector('.error').textContent = err.message
    })
})

updateContactForm.addEventListener('submit', event => {
    event.preventDefault();

    const contact = {
        name:updateContactForm.name.value,
        phone:updateContactForm.phone.value,
    }
    db.collection('contacts').doc(updateId).update(contact).then(()=>{
        updateContactForm.reset();
        var instance = M.Modal.getInstance(updateContactModal);
        instance.close();
        updateContactForm.querySelector('.error').textContent = ''
    }).catch(err=>{
        updateContactForm.querySelector('.error').textContent = err.message
    })
})




db.collection('contacts').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        
        if (change.type === 'added') {
            if ( window.location.pathname == '/' || window.location.pathname == '/index.html' ) {
                renderContacts(change.doc.data(), change.doc.id);
            }
            if ( window.location.pathname == '/pages/favorites.html' ) {
                if (change.doc.data().favorite) {
                    renderContacts(change.doc.data(), change.doc.id);
                }
            }
        }
        if (change.type === 'removed') {
            removeContact(change.doc.id);
        }
        if (change.type === 'modified') {
            updateContact(change.doc.data(), change.doc.id);
        }
    })
})



const contactContainer = document.querySelector('.contacts')   

contactContainer.addEventListener('click', e => {

    // console.log('e.target.textContent', e.target.textContent)

    if (e.target.textContent === 'delete_outline') {
        const id =  e.target.parentElement.getAttribute('data-id')
        db.collection('contacts').doc(id).delete()
    }

    if (e.target.textContent === 'edit') {
        updateId =  e.target.parentElement.getAttribute('data-id')
        const contact = document.querySelector(`.contact[data-id=${updateId}`)
        const name = contact.querySelector('.name').innerHTML 
        const phone = contact.querySelector('.phone').innerHTML 
        updateContactForm.name.value = name;
        updateContactForm.phone.value = phone;
        console.log(name, phone)
    }

    if (e.target.textContent === 'star_border') {
        const id =  e.target.parentElement.getAttribute('data-id')
        contact = {favorite: true }
        db.collection('contacts').doc(id).update(contact)
    }
    if (e.target.textContent === 'star') {
        const id =  e.target.parentElement.getAttribute('data-id')
        contact = {favorite: false }
        db.collection('contacts').doc(id).update(contact)
    }
})