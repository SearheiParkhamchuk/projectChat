(() => {
  'use strict';

  // import
  const formTemplate = window.formTemplate;

  class MessageForm {

    constructor({ el }) {
      this.el = el;
      this.initEvents();
    }

    /**
     * Init the message events.
     */
    initEvents() {
      this.el.addEventListener('submit', this.messageSubmit.bind(this));
      this.el.addEventListener('keydown', this.keyDown.bind(this));
    }

    /**
     * Set event handler.
     */
    on(event, handler) {
      this.el.addEventListener(event, handler);
    }

    /**
     * Get submitted message and then clear the element value.
     * @returns {string}
     */
    getMessage() {
      if (!this.inputEl) {
        this.inputEl = this.el.querySelector('[name="message"]');
      }
      const message = this.inputEl.value;
      this.inputEl.value = '';
      return message;
    }

    /**
     * KeyDown event handler
     * @param {Event} event
     */
    messageSubmit(event) {
      event.preventDefault();
      const message = this.getMessage();
      if (!message) {
        return;
      }
      const onSubmitEvent = new CustomEvent('messageSubmit', { detail: { message } });
      this.el.dispatchEvent(onSubmitEvent);
    }

    /**
     * Message submit handler
     * @param {Event} event
     */
    keyDown(event) {
      if (event.which !== 13 || event.altKey || event.ctrlKey || event.shiftKey || event.metaKey) {
        return;
      }
      event.preventDefault();
      this.messageSubmit(event);
    }

    /**
     * Render the message form block.
     */
    render() {
      this.el.innerHTML = formTemplate();
    }
  }

  // export
  window.MessageForm = MessageForm;
})();

