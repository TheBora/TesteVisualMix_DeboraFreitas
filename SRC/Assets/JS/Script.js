var animais = [];
var gFirst = 1;
var gLast = 2;

function loadRegister(first, last) {
    //laço para gerar as divs de acordo com a quantidade de animais no JSON (pra deixar o código menor tb)
    if (last > animais.length) {
        last = animais.length;
    }
    for (var i = first - 1; i < last; i++) {
        //console.log(i);
        var animal = animais[i];
        //console.log(animal.bioma);

        var card = document.createElement("div");
        card.className = "card";

        var row = document.createElement("div");
        row.className = "row";

        var colsm4 = document.createElement("div");
        colsm4.className = "col-sm-4";

        var img = document.createElement("img");
        img.src = animal.imagem;
        //verificação da imagem
        //atributo customizado ou não - nesse caso é
        img.setAttribute("nomeAnimal", animal.nome);
        img.setAttribute("biomaAnimal", animal.bioma);

        //decisão para que preencha com as cores de acordo com o bioma caso não tenha a imagem carregada
        img.onerror = function(e) {
            var nomeAnimal = this.getAttribute("nomeAnimal");
            var biomaAnimal = this.getAttribute("biomaAnimal");

            var divImg = this.parentNode;
            divImg.removeChild(this);

            var h1NoImg = document.createElement("h1");
            h1NoImg.innerHTML = nomeAnimal.substring(0, 2);
            h1NoImg.className = "NoImageText";

            var biomaClass = "";

            if (biomaAnimal == "Amazônia") {
                biomaClass = "PaletaAmazonia-ImgOnError";
            } else if (biomaAnimal == "Aquático") {
                biomaClass = "PaletaAquatico-ImgOnError";
            } else if (biomaAnimal == "Caatinga") {
                biomaClass = "PaletaCaatinga-ImgOnError";
            } else {
                biomaClass = "PaletaPantanal-ImgOnError";
            }

            divImg.className = "col-sm-4 NoImageArea " + biomaClass;
            divImg.appendChild(h1NoImg);
        };

        //criação dos elementos da página
        var colsm7 = document.createElement("div");
        colsm7.className = "col-sm-7 Padding-Card";

        var h1nome = document.createElement("h1");
        h1nome.innerHTML = animal.nome;

        var h2nomecient = document.createElement("h2");
        h2nomecient.innerHTML = animal.nomeCientifico;

        var linkespecie = document.createElement("a");
        linkespecie.innerHTML = animal.especie;
        linkespecie.href = "#";

        var brakeRule = document.createElement("br");

        //decisão dos botões com as cores dos biomas
        var buttonBioma = document.createElement("button");
        buttonBioma.innerHTML = animal.bioma;

        if (animal.bioma == "Amazônia") {
            buttonBioma.className = "btn btnAmazonia";
        } else if (animal.bioma == "Aquático") {
            buttonBioma.className = "btn btnAquatico";
        } else if (animal.bioma == "Caatinga") {
            buttonBioma.className = "btn btnCaatinga";
        } else {
            buttonBioma.className = "btn btnPantanal";
        }

        //criação da bolinha do status
        var colsm1 = document.createElement("div");
        colsm1.className = "col-sm-1";

        //decisão da cor de acordo com risco
        var riscoAnimal = animal.risco;
        var h1NoImg = document.createElement("h1");

        var riscoClass = "";

        if (riscoAnimal == "Vulnerável") {
            riscoClass = "StatusVulnerável";
        } else if (riscoAnimal == "Em perigo") {
            riscoClass = "StatusPerigo";
        } else {
            riscoClass = "StatusCritico";
        }

        var littleBall = document.createElement("div");
        littleBall.className = "StatusSign " + riscoClass;

        //estruturação dos elementos da página
        card.appendChild(row);
        row.appendChild(colsm4);
        colsm4.appendChild(img);
        row.appendChild(colsm7);
        colsm7.appendChild(h1nome);
        colsm7.appendChild(h2nomecient);
        colsm7.appendChild(linkespecie);
        colsm7.appendChild(brakeRule);
        colsm7.appendChild(buttonBioma);
        row.appendChild(colsm1);
        colsm1.appendChild(littleBall);

        //exibição dos elementos estruturados dentro da div do index
        document.getElementById("animalsCard").appendChild(card);
    }
}

//função para ordem alfabética crescente
function compare(a, b) {
    if (a.nome < b.nome) {
        return -1;
    }
    if (a.nome > b.nome) {
        return 1;
    }
    return 0;
}

//requisição dos dados do JSON online
$.ajax({
    url: 'http://www.mocky.io/v2/5c2f6da1320000b52859082f',
    dataType: "jsonp", //contorno do erro retornado no console por conta da politica de mesma origem do link do json
    success: function(retorno) {
        retorno.animais.sort(compare);
        animais = retorno.animais;
        console.log("two return")
        loadRegister(1, 2);
    }
})

//jquery para o botão ver mais
$(document).ready(function() {
    $('#verMais').click(function(e) {
        e.preventDefault();
        gFirst += 2;
        gLast += 2;
        loadRegister(gFirst, gLast);
        //logica para que quando acabarem os itens do json, o "ver mais" é ocultado
        if (gLast >= animais.length) {
            $(this).hide();
        }
    });
})
