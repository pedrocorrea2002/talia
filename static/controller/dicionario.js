sinais_deXpara = {
    "aprender":"aprender",
    "boa noite":"boa noite",
    "ele":"ele",
    "eu":"eu",
    "inteligência artificial":"inteligencia artificial",
    "Libras":"Libras",
    "meu nome":"meu nome",
    "mundo":"mundo",
    "nome":"nome",
    "nós":"nos",
    "oi":"oi",
    "olá":"ola",
    "projeto":"projeto",
    "TALIA":"TALIA"
}

function showExample(video_button){
    sinal_name = sinais_deXpara[video_button.id]
    modal = document.getElementById("sinal_modal")
    modal.style.display = "flex"

    for(let index = 0;index < 30;index++){
        setTimeout(() => {
            //modal.style.backgroundImage = `url('/static/exemplos/${sinal_name}/${index}.png')`

            //* draw in canvas
        },50)
    }
}