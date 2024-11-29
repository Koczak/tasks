import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  template: `
    <div class="loader">
      <div class="pokeball">
        <div class="pokeball-top"></div>
        <div class="pokeball-middle"></div>
        <div class="pokeball-bottom"></div>
      </div>
    </div>
  `,
  styles: [
    `
      .loader {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 200px;
      }

      .pokeball {
        width: 60px;
        height: 60px;
        position: relative;
        animation: shake 1.25s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
      }

      .pokeball-top {
        background: #ee1515;
        height: 50%;
        width: 100%;
        border-radius: 30px 30px 0 0;
      }

      .pokeball-middle {
        background: #222224;
        height: 10%;
        width: 100%;
      }

      .pokeball-bottom {
        background: white;
        height: 40%;
        width: 100%;
        border-radius: 0 0 30px 30px;
      }

      @keyframes shake {
        0% {
          transform: translate(0, 0) rotate(0);
        }
        20% {
          transform: translate(-10px, 0) rotate(-20deg);
        }
        30% {
          transform: translate(10px, 0) rotate(20deg);
        }
        50% {
          transform: translate(-10px, 0) rotate(-10deg);
        }
        60% {
          transform: translate(10px, 0) rotate(10deg);
        }
        100% {
          transform: translate(0, 0) rotate(0);
        }
      }
    `,
  ],
})
export class LoaderComponent {}
