const trending = document.querySelector('#trending-btn')
const comedy = document.querySelector('#comedy-btn')
const news = document.querySelector('#news-btn')
const sports = document.querySelector('#sports-btn')
const trueCrime = document.querySelector('#true-crime-btn')
const society = document.querySelector('#society-btn')

const categoryDisplay = document.querySelector('.category-display')


const getCategory = (id) => {
    let nested = document.querySelectorAll('.pod-card')
    if (nested.length){
        for (let i =0; i< nested.length;i++){
            categoryDisplay.removeChild(nested[i])
        }
    }
    axios
    .get(`/api/category/${id}`)
    .then((res)=> {
        let podInfo = res.data

        let podCards = podInfo.map(pod => {
            let podCard = document.createElement('a')
            podCard.classList.add('pod-card')
            podCard.setAttribute('href', `./detail.html?id=${pod.id}`)
            podCard.innerHTML = `<img alt='podcast-image' src='${pod.imageURL}'         
                                class='podcast-image'/>`
                            categoryDisplay.appendChild(podCard)

            return podCard

        })
    })

};

trending.addEventListener('click', ()=> getCategory(1))
comedy.addEventListener('click', ()=> getCategory(3))
trueCrime.addEventListener('click', () => getCategory(2))
news.addEventListener('click', () => getCategory(6))
sports.addEventListener('click', () => getCategory(5))
society.addEventListener('click', () => getCategory(4))


