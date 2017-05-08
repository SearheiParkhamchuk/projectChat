(function () {
  'use strict';

  class Notice {

    constructor({ el, message, position, className }) {
      this.el = el;
      this.message = message;
      this.position = position;
      this.className = className;
      this.render();
    }

    /**
     * Set the notice element position
     * @param {HtmlElement} notice
     */
    setPosition(notice) {
      const elBox = this.el.getBoundingClientRect();
      const noticeBox = notice.getBoundingClientRect();
      const left = elBox.left +
        (((elBox.right - elBox.left) / 2) - ((noticeBox.right - noticeBox.left) / 2));
      let top;

      switch (this.position) {
        case 'top':
          notice.classList.add('notice_top');
          top = (elBox.top + this.el.clientTop) - notice.offsetHeight - 2;
          break;
        case 'bottom':
        default:
          notice.classList.add('notice_bottom');
          top = (elBox.bottom - (this.el.offsetHeight - this.el.clientHeight - this.el.clientTop)) + 2;
          break;
      }
      notice.style.left = `${left + pageXOffset}px`;
      notice.style.top = `${top + pageYOffset}px`;
    }

    /**
     * Clear all notices earlier placed.
     */
    static clearNotices() {
      const notices = document.body.querySelectorAll('.notice');
      notices.forEach((notice) => { document.body.removeChild(notice); });
    }

    /**
     * Render the notice element.
     */
    render() {
      const notice = document.createElement('div');
      notice.className = 'notice';
      if (this.className) {
        notice.classList.add(this.className);
      }
      notice.innerHTML = this.message;
      document.body.appendChild(notice);
      this.setPosition(notice);

      setTimeout(() => {
        notice.style.opacity = 0;
        setTimeout(() => { document.body.removeChild(notice); }, 1000);
      }, 5000);
    }
  }

  //export
  window.Notice = Notice;
})();
