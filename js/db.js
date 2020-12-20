const contactForm = document.querySelector('.add-contact form')

const addContactModal = document.querySelector('#add_contact_model')
const updateContactModal = document.querySelector('#update_contact_model')

contactForm.addEventListener('submit', event => {
    event.preventDefault();

    const contact = {
        name:contactForm.name.value,
        phone:contactForm.phone.value,
        favorite:false
    }
    db.collection('contacts').add(contact).then(()=>{
        contactForm.reset();
        var instance = M.Modal.getInstance(addContactModal);
        instance.close();
        contactForm.querySelector('.error').textContent = ''
    }).catch(err=>{
        contactForm.querySelector('.error').textContent = err.message
    })
})




db.collection('contacts').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            // console.log(`${change.doc.data().name} is added`)
            renderContacts(change.doc.data(), change.doc.id);
        }
        if (change.type === 'removed') {
            // console.log(`${change.doc.data().name} is removed`)
            renderContacts(change.doc.data(), change.doc.id);
        }
    })
})