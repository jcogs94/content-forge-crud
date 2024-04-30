const yesElement = document.querySelector('#imgYes')
const noElement = document.querySelector('#imgNo')

const showLinkBox = () => {
    const linkDivElement = document.createElement('div')
    linkDivElement.setAttribute('id', 'link-div')
    
    const linkLabelElement = document.createElement('label')
    linkLabelElement.setAttribute('for', 'imgLink')
    linkLabelElement.innerHTML = "Link: "
    linkDivElement.appendChild(linkLabelElement)
    
    const linkInputElement = document.createElement('input')
    linkInputElement.setAttribute('type', 'text')    
    linkInputElement.setAttribute('name', 'imgLink')
    linkDivElement.appendChild(linkInputElement)

    const submitElement = document.querySelector('#submit-button')
    submitElement.insertAdjacentElement('beforebegin', linkDivElement)
}

const hideLinkBox = () => {
    const linkDivElement = document.querySelector('#link-div')
    linkDivElement.remove()
}

yesElement.addEventListener('click', showLinkBox)

noElement.addEventListener('click', hideLinkBox)
