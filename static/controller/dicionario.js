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

var close = false

function showExample(video_button){
    const sinal_nome = sinais_deXpara[video_button.id]
    const modal = document.getElementById("sinal_modal")
    const containerModal = document.getElementById("container_example")
    const bar = document.getElementById("bar")
    let listaImagens = []
    containerModal.style.display = "flex"

    for(let imageIndex = 0; imageIndex < 30 && !close; imageIndex++){
        let image = new Image()
        image.src = `./static/exemplos/${sinal_nome}/${imageIndex}.png`

        listaImagens.push(image.src)
    }

    atualizar_frame(modal,bar,listaImagens,0,containerModal)
}

function closeModal(){
    close = true
}

function atualizar_frame(modal,bar,listaImagens,image,containerModal){
    setTimeout(() => {
        modal.src = listaImagens[image]

        bar.style.width = `calc(100% * ${image/30})`

        if(image != 29 && !close){
            atualizar_frame(modal,bar,listaImagens,image + 1,containerModal)
        }else{
            containerModal.style.display = "none"
            close = false
        }
    },100)
}