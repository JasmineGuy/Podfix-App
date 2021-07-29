// const { default: axios } = require("axios");

const podContainer = document.querySelector('#top-container')
const podContainer2 =document.querySelector('#middle-container')
const podContainer3 =document.querySelector('#bottom-container')
const searchBtn = document.querySelector('#search-button')
const searchRow = document.querySelector('#search-display')


const getTrending = () => {
    axios
    .get('/api/trending')
    .then((res)=> {
        let podInfo = res.data
        let podCards = podInfo.map(pod => {
            let podCard = document.createElement('a')
            podCard.classList.add('pod-card')
            podCard.setAttribute('href', `./detail.html?id=${pod.id}`)
            podCard.innerHTML = `<img alt='podcast-image' src='${pod.imageURL}'         
                            class='podcast-image'/>`
                            podContainer.appendChild(podCard)

            podCard.addEventListener("click",() => "window.location='./detail.html'")

    
            return podCard

        })
    })

};


const getTrueCrime = () => {
    axios
    .get('/api/true-crime')
    .then((res)=> {
        let podInfo = res.data
        let podCards = podInfo.map(pod => {
            let podCard = document.createElement('a')
            podCard.classList.add('pod-card')
            podCard.setAttribute('href', `./detail.html?id=${pod.id}`)
            podCard.innerHTML = `<img alt='podcast-image' src='${pod.imageURL}'         
                            class='podcast-image'/>`
                            podContainer2.appendChild(podCard)


            podCard.addEventListener("click",() => "window.location='./detail.html'")

            return podCard

        })
    })

};

const getComedy = () => {
    axios
    .get('/api/comedy')
    .then((res)=> {
        let podInfo = res.data
        let podCards = podInfo.map(pod => {
            let podCard = document.createElement('a')
            podCard.setAttribute('href', `./detail.html?id=${pod.id}`)
            
            podCard.classList.add('pod-card')
            podCard.innerHTML = `<img alt='podcast-image' src='${pod.imageURL}'         
                            class='podcast-image'/>`
                            podContainer3.appendChild(podCard)

            podCard.addEventListener("click",() => "window.location='./detail.html'")

            return podCard

        })

    })

};

function showResults(results){

    let displayCards =results.map(result => {
        let displayCard = document.createElement('a')
        displayCard.setAttribute('href', `./detail.html?id=${result.id}`)
        displayCard.classList.add('display')
        displayCard.innerHTML = `<img alt='podcast-image' src='${result.imageURL}' class='podcast-image'/>`
                                
            searchRow.appendChild(displayCard)

            return displayCard
    })
    
};


function clicked(e){
    e.preventDefault()

    let query = document.querySelector('input')
    if(!query.value){
        return
    }

    let hide = document.querySelector(".row-1");
    hide.className = 'row-1 visible';
    
    let nested = document.querySelectorAll('.display')
    if (nested.length){
        for (let i =0; i< nested.length;i++){
            searchRow.removeChild(nested[i])
        }
    }
    let searchAgain = document.querySelector('.no-match')
    if (searchAgain){
        searchRow.removeChild(searchAgain)
    }

    axios
    .post('/api/search', {search: query.value})
    .then((res)=> {
        let results = res.data
        if(results.length ===0){
            let noMatch = document.createElement('div')
            noMatch.textContent = 'No results match your search'
            noMatch.classList.add('no-match')
            searchRow.appendChild(noMatch)

        }
        showResults(results)
    })
};


function getDetails(id){
    "window.location.href='detail.html?id=666'"
    

}


searchBtn.addEventListener("click", clicked);

getTrending()
getTrueCrime()
getComedy()