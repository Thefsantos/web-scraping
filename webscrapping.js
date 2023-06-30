const puppeteer = require('puppeteer')

const agostinhoLeiloes = 'https://agostinholeiloes.com.br/item/2194/detalhes?page=1';

(async () => {

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(agostinhoLeiloes, { waitUntil: 'networkidle2' })

    await page.screenshot({ path: './print.jpeg', fullPage: true })

    const avaliacao = '//*[@id="lote_2194"]/div[4]/div[1]/div[2]/div[2]/text()[13]';
    const valorAvaliacao = await page.$x(avaliacao);
    
    const avalicaoImovel = await page.evaluate(node => node.textContent, valorAvaliacao[0]);

    let data = await page.evaluate(() => {
        
        let titulo = document.querySelector("#lote_2194 > div.px-1.text-center > h4:nth-child(2)").textContent.trim()
        let encerramento = document.querySelector("#lote_2194 > div.col-12.col-lg-4.float-right.p-1 > div:nth-child(4) > h6:nth-child(5)").textContent.trim()
        let lanceInicial = document.querySelector("#lance_inicial").textContent.trim()
        let endereco = document.querySelector("#lote_2194 > div:nth-child(4) > div:nth-child(2) > div > p").textContent.trim()
        endereco = endereco.replace(/\s+/g, ' ');
        endereco = endereco.replace(/(\S+)\s+\1/g, '$1');
        endereco = endereco.replace(/[-–]+/g, '');
        let docMatricula = document.querySelector("#lote_2194 > div.col-12.col-lg-4.float-right.p-1 > div.arquivos-lote.border.rounded.mb-2.p-2 > p:nth-child(2) > a").href
        let imgImovel = document.querySelector("#carouselImgsLoteGrande > div > div > a").href
        
        return {
            titulo,
            encerramento,
            lanceInicial,
            endereco,
            docMatricula,
            imgImovel
        }
    })
    console.log(`Título: ${data.titulo}`)
    console.log(avalicaoImovel);
    console.log(`${data.encerramento}`)
    console.log(`Lance Inicial: ${data.lanceInicial}`)
    console.log(`${data.endereco}`)
    console.log(`Link do documento da matricula: ${data.docMatricula}`)
    console.log(`Link da imagem do imóvel: ${data.imgImovel}`)
    await browser.close()
})()