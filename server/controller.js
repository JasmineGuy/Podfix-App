const podcasts = require('./podcastdata.json')

let fixList = [];

module.exports = {
    getTrending: (req, res) => {
        const trending = podcasts.filter(podcast => podcast.genreIds.includes(1) )
        res.status(200).send(trending)
    },
    getTrueCrime: (req, res) => {
        const trueCrime = podcasts.filter(podcast => podcast.genreIds.includes(2) )
        res.status(200).send(trueCrime)
    },
    getComedy: (req, res) => {
        const comedy = podcasts.filter(podcast => podcast.genreIds.includes(3) )
        res.status(200).send(comedy)
    },
    searchPods: (req, res) => {
        const { search} = req.body;
        let editSearch = search.toLowerCase()
        let holder = []
        for (let i =0; i< podcasts.length; i++){
            console.log('BEFORE: ', podcasts[i].cast)
            let cast = podcasts[i].cast.map(x => x.toLowerCase());
            let genres = podcasts[i].genreName.map(x => x.toLowerCase());
            let titleMatch = podcasts[i].title.toLowerCase().includes(editSearch)
            if(titleMatch === true ){
                holder.push(podcasts[i])
            }
            let castMatch = cast.findIndex(host => host.includes(editSearch))
            if (castMatch > -1){
                holder.push(podcasts[i])
            }
            let genreMatch = genres.findIndex(genre => genre.includes(editSearch))
            if(genreMatch > -1){
                holder.push(podcasts[i])
            }

        }
        res.status(200).send(holder)
    },
    getCategory: (req, res) => {
        let { id } = req.params
        let catDisplay = podcasts.filter(podcast => podcast.genreIds.includes(Number(id)))
        res.status(200).send(catDisplay)
    },
    getDetails: (req, res) => {
        let { id } = req.params
        let featurePod = podcasts.filter(podcast => podcast.id===(Number(id)))
        res.status(200).send(featurePod[0])
    },
    addToFixList: (req, res) =>{
        let { id } = req.body
        fixList.push(Number(id))
        res.status(200).send(fixList)
    },
    getFixList: (req, res) => {
        let userFix = []
        
        for (let i = 0; i< fixList.length; i++){
            let match = podcasts.find(pod => pod.id === fixList[i])
            userFix.push(match)
        }
        res.status(200).send(userFix)
    },
    getRecs: (req, res)=> {
        let userRecs =[]
        let { id, genreIds } =req.body
        console.log(req.body) 
        console.log('get recs:', id)
        console.log('get genres:', genreIds)
        for (let i=0; i< genreIds.length; i++){
            let recs = podcasts.filter(pod => pod.genreIds.includes(genreIds[i]) && pod.id !== Number(id)) 
            userRecs.push(recs)

            
        }
        let combined = [].concat(...userRecs);
        let final = combined.filter(function(item, pos) {
            return combined.indexOf(item) == pos;
        })
        console.log(final)
        res.status(200).send(final)
        
    }
}
