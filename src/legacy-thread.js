// LEFT OVER FROM BEFORE SEPARATION OF COMMENT AND THREAD


// dependencies / things imported
import { LitElement, html, css } from 'lit';
import '@lrnwebcomponents/simple-icon/lib/simple-icons.js';
import '@lrnwebcomponents/simple-icon/lib/simple-icon-lite.js';
import '@lrnwebcomponents/simple-colors';

// EXPORT (so make available to other documents that reference this file) a class, that extends LitElement

// which has the magic life-cycles and developer experience below added
export class OldThread extends LitElement {
  // a convention I enjoy so you can change the tag name in 1 place
  static get tag() {
    return 'old-thread';
  }

  // CSS - specific to Lit
  static get styles() {
    return css`
      :host {
        display: block;
        width: 320px;
        height: 265px;
      }

      img {
        display: flex;
        margin: 25px auto auto;
        height: 200px;
        width: 275px;
        border: 5px solid white;
        border-radius: 19px;
        box-shadow: 0 0 10px black;
      }

      .backgroundbox {
        display: flex;
        background-color: var(--simple-colors-default-theme-accent-4);
        border-radius: 19px 19px 0 0;
        height: 265px;
        width: 320px;
      }

      .overlay {
        position: relative;
      }

      .overlay::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        border: 1px;
        border-radius: 19px 19px 0px 0px;
      }

      simple-icon-lite {
        --simple-icon-height: 100px;
        --simple-icon-width: 100px;
        color: white;
        transform: translate(-50%, -190%);
        top: 50%;
        left: 50%;
        z-index: 100;
      }

      :host([status='pending']) .overlay::before {
        display: flex;
        background: transparent;
      }

      :host([status='correct']) .overlay::before {
        display: flex;
        background: green;
        filter: opacity(0.65);
      }

      :host([status='incorrect']) .overlay::before {
        display: flex;
        background: red;
        filter: opacity(0.65);
      }
    `;
  }

  // overlay on div tag - wrap image in div & style div
  // HTMLElement life-cycle, built in; use this for setting defaults
  constructor() {
    super();
    this.imgSrc = '';
    this.imgKeyword = 'grey box';
    this.status = 'pending';
    this.answerIcon = false;
    this.icon = '';
  }

  // properties that you wish to use as data in HTML, CSS, and the updated life-cycle
  static get properties() {
    return {
      ...super.properties,
      imgSrc: { type: String, reflect: true, attribute: 'img-src' },
      imgKeyword: { type: String, attribute: 'img-keyword' },
      status: { type: String, reflect: true }, // Correct, incorrect, pending
      answerIcon: { type: Boolean, reflect: true },
      icon: { type: String }
    };
  }

  // updated fires every time a property defined above changes
  // this allows you to react to variables changing and use javascript to perform logic
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'status' && this[propName] === 'correct') {
        this.answerIcon = true;
        this.icon = 'check';
      }
      if (propName === 'status' && this[propName] === 'incorrect') {
        this.answerIcon = true;
        this.icon = 'cancel';
      }
      if (propName === 'status' && this[propName] === 'pending') {
        this.answerIcon = false;
      }
    });
  }

  // Lit life-cycle; this fires the 1st time the element is rendered on the screen
  // this is a sign it is safe to make calls to this.shadowRoot
  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
  }

  // HTMLElement life-cycle, element has been connected to the page / added or moved
  // this fires EVERY time the element is moved
  connectedCallback() {
    super.connectedCallback();
  }

  // HTMLElement life-cycle, element has been removed from the page OR moved
  // this fires every time the element moves
  disconnectedCallback() {
    super.disconnectedCallback();
  }

  // HTML - specific to Lit
  render() {
    return html`
      <div id="Nest">
        <div class="overlay">
          <div class="backgroundbox">
            ${this.imgSrc !== ''
              ? html`<img src="${this.imgSrc}" alt="" />`
              : html`<img
                  src="https://loremflickr.com/320/240/${this
                    .imgKeyword}?lock=1"
                  alt=""
                />`}
          </div>
        </div>
        ${this.answerIcon
          ? html`<simple-icon-lite icon="${this.icon}"></simple-icon-lite>`
          : ``}
      </div>
    `;
  }

  // HAX specific callback
  // This teaches HAX how to edit and work with your web component
  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`../lib/FlashCard.haxProperties.json`, import.meta.url).href;
  }
}
customElements.define(OldThread.tag, OldThread);
