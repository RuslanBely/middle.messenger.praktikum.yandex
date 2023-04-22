export const ChatUserTpl = `
  <div class='list-user__wrapper'>
    {{#if avatar}}
      <img src='{{avatar}}' alt='Аватарка' class='list-user__image' />
    {{else}}
      <div class='list-user__skeleton'></div>
    {{/if}}
    <div class='list-user__info'>
      <div class='list-user__data'>
        <span class='list-user__description'>Имя: </span>
        {{#if display_name}}
          {{display_name}}
        {{else}}
          {{first_name}}
          {{second_name}}
        {{/if}}
      </div>
      <div class='list-user__data'>
        <span class='list-user__description'>Логин: </span>
        {{login}}
      </div>
      <div class='list-user__data'>
        <span class='list-user__description'>Почта: </span>
        {{email}}
      </div>
    </div>
  </div>
  {{#if role}}
    {{#if isAdd}}
    {{{btnAddUser}}}
      {{else}}
      {{{admin}}}
    {{/if}}
  {{else}}
    {{{btnDeleteUser}}}
  {{/if}}
`;
