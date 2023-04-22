export const MessageTpl = `
    <div class="message {{#if isMine}}message--owner{{else}}message--guest{{/if}}">
      <p class="message__text">{{content}}</p>
      <span class="message__date{{#if isMine}} message__date--owner{{/if}}">{{time}}</span>
    </div>`;
