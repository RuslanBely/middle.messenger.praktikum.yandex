export const ModalChatsUsersTpl = `<div class='chat-list__modal {{#if isOpen}}chat-list__modal--active{{/if}}'>
  <div class='chat-list__dialog'>
    <div class='chat-list__content'>
      <h3 class='chat-list__title'>Список пользователей</h3>
      <div class="chat-list__list">
        {{{users}}}
      </div>
    </div>
  </div>
</div>`;
