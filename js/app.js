if ( 'serviceWorker' in navigator ) {
    navigator.serviceWorker.register('/sw.js')
    .then( reg=>console.log('sw Registered', reg))
    .catch( err=>console.log('sw Register Error', err))
}