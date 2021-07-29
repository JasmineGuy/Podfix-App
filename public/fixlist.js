const fixListView= document.querySelector('.list')

async function getFixList(){
  axios
    .get('/api/get-fix-list')

    .then((res)=> {
        let list =res.data
        if(!list.length){
            let alert = document.createElement('div')
            alert.textContent = 'You have not added any podcasts to your fix list'
            alert.classList.add('alert')
            fixListView.appendChild(alert)
        }
        let listItems = list.map((item, index) => {
            let listCard = document.createElement('a')
            listCard.setAttribute('href', `./detail.html?id=${item.id}`)

            listCard.classList.add('list-card')
            listCard.setAttribute("id", `${item.id}`)
    
            listCard.innerHTML =
            `<div class="wrapper">
                <div class="left">
                    <img 
                        alt='list-card-image' 
                        src='${item.imageURL}'    class='list-image'
                    />
                    <div class="info">
                        <p> Title: ${item.title}</p>
                        <p> Rating: ${item.rating}</p>
                    </div>
                </div>
                <div class="button-holder">
                    <button class="delete" 
                    id="card-${item.id}"
                    >Delete</button>
                </div>
            </div>
            `
            
            fixListView.appendChild(listCard)
            let deleteBtn = document.getElementById(`card-${item.id}`)
            deleteBtn.addEventListener('click', e => deletePod(item.id, e))

            return listCard
        })
    })
};

function deletePod(id, e){
    e.preventDefault();
    e.stopPropagation();
    let deleteId = id.toString();
    let deleteMe = document.getElementById(deleteId)
    
    fixListView.removeChild(deleteMe)
    axios
    .delete(`/api/delete/${id}`)

    .then((res =>{
        let newList = res.data
    }))
}
getFixList()

