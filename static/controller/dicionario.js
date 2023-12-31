const sinais_deXpara = {
    "aprender":"aprender",
    "boa noite":"boa noite",
    "ele":"ele",
    "eu":"eu",
    "inteligência artificial":"inteligencia artificial",
    "Libras":"Libras",
    "mundo":"mundo",
    "nome":"nome",
    "nós":"nos",
    "oi":"oi",
    "olá":"ola",
    "projeto":"projeto",
    "TALIA":"TALIA"
}

var imageIndex = 0
var close = false

function showExample(video_button){
    const sinal_nome = sinais_deXpara[video_button.id]
    const modal = document.getElementById("sinal_modal")
    const containerModal = document.getElementById("container_example")
    const bar = document.getElementById("bar")
    containerModal.style.display = "flex"

    
    if(imageIndex < 30 && !close){
        modal.src = `./static/exemplos/${sinal_nome}/${imageIndex}.png`
        imageIndex++;
        bar.style.width = `calc(100% * ${imageIndex/30})` 

        requestAnimationFrame(() => {
            setTimeout(() => {
                showExample(video_button)
            },100)
        })
    }else{
        imageIndex = 0
        containerModal.style.display = "none"
        close = false
    }
}

function closeModal(){
    close = true
}