const fixListView= document.querySelector('.list')

async function getFixList(){
  axios
    .get('/api/get-fix-list')
    .then((res)=> {
        let list =res.data
        console.log('LIST:',list)
        if(!list.length){
            let alert = document.createElement('div')
            alert.textContent = 'You have not added any podcasts to your fix list'
            alert.classList.add('alert')
            fixListView.appendChild(alert)
        }
        let listItems = list.map(item => {
            let listCard = document.createElement('a')
            listCard.classList.add('list-card')
            listCard.setAttribute('href', `./detail.html?id=${item.id}`)
            listCard.innerHTML =
            `<div class="wrapper">
                <div class="left">
                    <img alt='list-card-image' src='${item.imageURL}'    class='list-image'/>
                    <div class"info">
                        <p> Title: ${item.title}</p>
                        <p> Rating: ${item.rating}</p>
                    </div>
                </div>
                <div class="button-holder">
                    <button class="delete">Delete</button>
                </div>
            </div>
            `
            
            
            fixListView.appendChild(listCard)
            let deleteBtn = document.querySelector('.delete')
            deleteBtn.addEventListener('click', () => deletePod(item.id))

            return listCard
        })
    })
};

function deletePod(id, event){
    console.log('clicked')
    event.preventDefault()
    event.stopPropagation()
    axios
    .delete(`/api/delete/${id}`)
    .then((res =>{
        let newList = res.data
        getFixList()
    }))
}
getFixList()

