// const { default: axios } = require("axios")

// const { default: axios } = require("axios")

const fixListView= document.querySelector('.list')



 async function getFixList(){
  await axios
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
                <img alt='list-card-image' src='${item.imageURL}'    class='list-image'/>
                <div class"info">
                    <p> Title: ${item.title}</p>
                    <p> Rating: ${item.rating}</p>
                </div>
                <div class="button-holder">
                <button class"delete">Delete</button>
                </div>
            </div>
            `
            
            let deleteBtn = document.querySelector('.delete')
            deleteBtn.addEventListener('click', () => deletePod(item.id))
            fixListView.appendChild(listCard)

            return listCard
        })
    })
};

function deletePod(id){
    axios
    .delete(`/api/delete/${id}`)
    .then((res =>{
        let newList = res.data
        getFixList()
    }))
}
getFixList()

