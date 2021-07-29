const display = document.querySelector('.feature-pod')
const recommendations = document.querySelector('.recs')

let fixBtn;
let pageId;


async function getDetails(){
    let genreIds;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const id = urlParams.get('id')

    pageId = id


    await axios.get(`/api/get-details/${id}`)
    .then((res)=> {

        let featurePod =res.data
        genreIds = featurePod.genreIds
        let featurePage =document.createElement('div')
        featurePage.classList.add('feature-page')
        featurePage.innerHTML =
        `<div class="wrapper">
            <div class="small-deets">
                <p class="title">${featurePod.title}</p>
                <p> Rating: ${featurePod.rating}</p>
                <p> Genre: ${featurePod.genreName}</p>
                <p> Cast: ${featurePod.cast}</p>
                <button id="fix-btn">Add to FixList</button>
             </div>
    
                 <img alt='feature-pod-image' src=${featurePod.imageURL} class='feature-image'/>
             </div>
             
        </div>
        <div class="deets">
            <h4>About: </h4>
            <p>${featurePod.description}</p>
        </div>
        `
        
        display.appendChild(featurePage)
        //can't listen to button until button is appended to page
        fixBtn = document.querySelector('#fix-btn')
        fixBtn.addEventListener('click', () => addToFixList(pageId))
    })

    
    axios
    .post(`/api/get-recommendations`, { genreIds, id })
    .then((res)=> {
        let recInfo = res.data

        let recCards =recInfo.map(rec => {
            let recCard =document.createElement('a')
            recCard.classList.add('rec-card')
            recCard.setAttribute('href', `./detail.html?id=${rec.id}`)

            recCard.innerHTML =
            `<img alt='rec-image' src='${rec.imageURL}' class='rec-image'/>`
            
            recommendations.appendChild(recCard)

            return recCard
        })


    })
}

function addToFixList(pageId){
   axios
   .post('/api/add-fix-list', {id: pageId}) 
   .then((res) => {
       let added =res.data
  
   })
}




getDetails()
