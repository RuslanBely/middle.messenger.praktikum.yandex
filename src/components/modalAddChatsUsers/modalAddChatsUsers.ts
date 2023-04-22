export const ModalAddChatsUsers = `<div class='chat-add__modal {{#if isOpen}}chat-add__modal--active{{/if}}'>
  <div class='chat-add__dialog'>
    <div class='chat-add__content'>
      <h3 class='chat-add__title'>Добавить пользователя</h3>
      <div class="chat-add__form">
        {{{input}}}
        {{{btnSearch}}}
      </div>
      <div class="chat-add__list">
        {{#if users}}
          {{{users}}}
        {{else}}
          Пользователь не найден
        {{/if}}
      </div>
    </div>
  </div>
</div>`;
