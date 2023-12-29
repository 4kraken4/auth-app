import { Component, ElementRef, OnInit } from '@angular/core';
import Typewriter from 't-writer.js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  name = 'Angular';

  private twEle: ElementRef | any;
  private twriter1: any;
  private twriter2: any;

  ngOnInit(): void {
    this.twEle = document.querySelector('#tw');
    const tconfig = {
      loop: false,
      addCursor: true,
      blinkSpeed: 400,
      typeSpeed: 'random',
      deleteSpeed: 'random',
      typeSpeedMin: 80,
      typeSpeedMax: 130,
      deleteSpeedMin: 90,
      deleteSpeedMax: 130,
      cursorClass: 'cursor-span',
      cursorColor: '#FFA800',
      typeColor: getComputedStyle(this.twEle).color,
    };

    this.twriter1 = new Typewriter(this.twEle, tconfig)
    this.twriter2 = new Typewriter(this.twEle, tconfig)

    this.initTypeEffect();
  }

  initTypeEffect() {
    this.twriter1
      .rest(1500)
      .type('Authentication ')
      .rest(350)
      .type('is ')
      .rest(250)
      .removeCursor()
      .type('now ')
      .rest(300)
      .then(this.twriter2.start.bind(this.twriter2))
      .start();

    this.twriter2
      .changeTypeColor('#FFA800')
      .type(' easier.')
      .rest(500)
      .remove(' easier.'.length)
      .rest(500)
      .type(' secure.')
      .rest(500)
      .remove(' secure.'.length)
      .rest(500)
      .type(' faster.')
      .rest(1500)
      .clear()
      .removeCursor()
      .then(this.twriter1.start.bind(this.twriter1));
  }

  onFocus() {
    setTimeout(() => {
      let randomInteger = Math.floor(Math.random() * 3);
      var ele = document.querySelector('.blob-wrapper')?.getElementsByClassName('img-blob');
      if (ele) {
        ele[randomInteger].classList.add('blob-opacity-inc');
      }
    }, 100);
  }

  onBlur() {
    setTimeout(() => {
      var ele = document.querySelector('.blob-wrapper')?.getElementsByClassName('img-blob');
      if (ele) {
        for (let index = 0; index < ele.length; index++) {
          const element = ele[index];
          element.classList.remove('blob-opacity-inc');
        }
      }
    }, 100);
  }
}
