console.log('client side javascript file')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')




weatherform.addEventListener('submit', (e) => {   //e event object callback
    e.preventDefault()
    const location = search.value
    messageone.textContent = 'Loading...'
    messagetwo.textContent = ''
    fetch('/weather?address='+ location).then((response) => {
    response.json().then((address) => {
        if (address.error) { 
            messageone.textContent = address.error
        } else {
            messagetwo.textContent = address.location
            messageone.textContent = address.forecast
            // console.log(address.forecast)
            // console.log(address.location)
        }
    })
})

})
