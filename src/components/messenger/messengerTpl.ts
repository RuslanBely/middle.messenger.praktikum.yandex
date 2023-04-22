export const MessengerTpl = `<div class='chat-right'>
  {{#if selectedChatID}}
    <div class='chat-right__wrapper'>
      <div class='chat-right__user'>
        <div class='chat-right__about'>
          <div class='chat-right__avatar'></div>
          <span class='chat-right__name'>{{chat.title}}</span>
        </div>
        {{{settingChat}}}
        {{{modalSettingChat}}}
      </div>
    </div>
    <div class='chat-right__tape'>
      {{{messages}}}
    </div>
    <div class='chat-right__wrapper'>
      {{{chatForm}}}
    </div>
    {{{userListChatModal}}}
    {{{addToChatUsersModal}}}
  {{else}}
    <div class='chat-right__clear'>
      < Для вывода сообщений нужно выбрать чат
    </div>
  {{/if}}

</div>`;
