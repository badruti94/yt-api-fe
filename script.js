const url = 'https://yt-api-virid.vercel.app'

const getDataFromAPI = async (endPoint = '') => {
    const response = await fetch(`${url}/${endPoint}`)
    const data = (await response.json()).data
    return data
}

const channelListOnclick = async (e) => {
    const videosWrapperElement = document.querySelector('#videos-wrapper')
    videosWrapperElement.innerHTML = 'Loading....'

    const id = e.target.getAttribute('id')
    const videos = await getDataFromAPI('channels/' + id)

    let elementHtml = ''
    videos.forEach(video => {
        elementHtml += `<div class="videos">
        <div class="img-wrapper">
            <img src="${video.thumbnail}" alt="">
        </div>
        <div class="title-wrapper">
            <p><a href="https://youtu.be/${video.video_id}" target="_blank">${video.title}</a></p>
        </div>
    </div>`
    })

    videosWrapperElement.innerHTML = elementHtml

}

const init = async () => {
    const channelsElement = document.querySelector('.channels')
    channelsElement.innerHTML = 'Loading...'
    
    const channels = await getDataFromAPI('channels')
    
    let elementHtml = ''
    channels.forEach(channel => {
        elementHtml += `<li id="${channel.id}">${channel.name}</li>`
    })
    channelsElement.innerHTML = elementHtml

    const channelListElement = document.querySelectorAll('.channels li')
    channelListElement.forEach(list => {
        list.addEventListener('click', channelListOnclick)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    init()
})