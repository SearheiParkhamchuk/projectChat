(() => {
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
      const el = notice;
      const anchorBox = this.el.getBoundingClientRect();
      const elBox = el.getBoundingClientRect();
      const left = anchorBox.left +
        (((anchorBox.right - anchorBox.left) / 2) - ((elBox.right - elBox.left) / 2));
      let top;

      switch (this.position) {
        case 'top':
          el.classList.add('notice_top');
          top = (anchorBox.top + this.el.clientTop) - el.offsetHeight - 2;
          break;
        case 'bottom':
        default:
          el.classList.add('notice_bottom');
          top = (anchorBox.bottom -
            (this.el.offsetHeight - this.el.clientHeight - this.el.clientTop)) + 2;
          break;
      }
      el.style.left = `${left + pageXOffset}px`;
      el.style.top = `${top + pageYOffset}px`;
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
        setTimeout(() => {
          if (document.body.contains(notice)) {
            document.body.removeChild(notice);
          }
        }, 1000);
      }, 5000);
    }
  }

  // export
  window.Notice = Notice;
})();
