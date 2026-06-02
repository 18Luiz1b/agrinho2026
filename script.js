// Valores iniciais (Equilíbrio inicial no meio termo)
let produtividade = 50;
let ambiente = 50;

// Objeto para controlar quais botões estão ativos
const estadosAtivos = {
    tecnologia: false,
    solo: false,
    agua: false,
    biologico: false
};

function alternarPratica(idPratica, modProd, modAmb) {
    // Inverte o estado do botão (se estava falso vira verdadeiro, e vice-versa)
    estadosAtivos[idPratica] = !estadosAtivos[idPratica];
    
    // Captura o botão que foi clicado usando o evento do navegador
    const botao = event.target;
    
    if (estadosAtivos[idPratica]) {
        // Se ativou, soma os modificadores
        produtividade += modProd;
        ambiente += modAmb;
        botao.classList.add('ativo');
    } else {
        // Se desativou, subtrai os modificadores
        produtividade -= modProd;
        ambiente -= modAmb;
        botao.classList.remove('ativo');
    }

    // Garante que os valores fiquem entre 0% e 100%
    produtividade = Math.max(0, Math.min(100, produtividade));
    ambiente = Math.max(0, Math.min(100, ambiente));

    // Atualiza a tela (HTML) com os novos valores
    atualizarInterface();
}

function atualizarInterface() {
    // Atualiza os textos numéricos
    document.getElementById('val-prod').innerText = produtividade;
    document.getElementById('val-amb').innerText = ambiente;

    // Atualiza a largura das barras de progresso
    document.getElementById('barra-prod').style.width = produtividade + '%';
    document.getElementById('barra-amb').style.width = ambiente + '%';

    // Lógica de textos de feedback baseada no equilíbrio
    const textoFeedback = document.getElementById('feedback');
    
    if (produtividade >= 70 && ambiente >= 70) {
        textoFeedback.innerText = "Parabéns! Você alcançou o Agro Forte e Sustentável. Alta produção com total respeito ao meio ambiente!";
        textoFeedback.style.color = "#1b5e20";
    } else if (produtividade > 70 && ambiente < 40) {
        textoFeedback.innerText = "Cuidado! Sua produção está alta, mas o esgotamento dos recursos naturais vai prejudicar o futuro da fazenda.";
        textoFeedback.style.color = "#b71c1c";
    } else if (produtividade < 40 && ambiente > 70) {
        textoFeedback.innerText = "A natureza está protegida, mas a produção está baixa. Precisamos de tecnologia e boas práticas para alimentar o mundo!";
        textoFeedback.style.color = "#e65100";
    } else {
        textoFeedback.innerText = "Continue ajustando as práticas para encontrar o equilíbrio perfeito entre produzir e preservar.";
        textoFeedback.style.color = "#424242";
    }
}