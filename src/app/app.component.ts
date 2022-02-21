import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assinatura-teste';
  assinatura: string = 'Daniel da Silva Oliveira';
  resultado: string = '';
  fontSelecionada: string = '';
  resultadoFonte: string = '';
  error: string = '';
  imagem: any = '';

  radios = [
    {
      value: 'font-tangerine'
    },
    {
      value: 'font-dancing-script',
    },
    {
      value: 'font-shadows-into-light'
    },
    {
      value: 'font-caveat',
    },
    {
      value: 'font-homemade-apple'
    },
    {
      value: 'font-qwitcher-grypen',
    },
    {
      value: 'font-herr-von-muellerhoff'
    },
    {
      value: 'font-mrs-saint-delafield',
    },
    {
      value: 'font-mr-de-haviland'
    }
  ];

  constructor(private sanitizer: DomSanitizer) {}

  generateImage(assinaturaSelecionada: string): void {
    let node:any = document.getElementById(assinaturaSelecionada);
    console.log(node);
    htmlToImage.toPng(node).then((dataUrl) => {
        this.imagem = this.sanitizer.bypassSecurityTrustUrl(dataUrl);
        console.log(dataUrl);
        // var img = new Image();
        // img.src = dataUrl;
        // document.body.appendChild(img);
      }).catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }

  public onSubmit(): void {
    if (this.assinatura.trim() === '') {
      this.error = "Adicione seu nome na assinatura"
    }
    this.generateImage(this.fontSelecionada);
    this.resultado = this.assinatura;
    this.resultadoFonte = this.fontSelecionada;
  }
}
