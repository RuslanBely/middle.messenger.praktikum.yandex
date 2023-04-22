export const ChatItemTpl = `

<div class="chats__chats-item{{#if isSelected}} chats__chats-item--selected-chat{{/if}}">
{{#if avatar}}
    <img class="chats__chat-logo" src={{avatar}}>
{{else}}
    <div class="chats__chat-logo"></div>
{{/if}}
    <div class="chats__chat-name-prev">
        <p class="chats__chat-name-p">{{title}}</p>
        <p class="chats__chat-prev-p">{{last_message.content}}</p>
    </div>
    <div class="chats__chat-time-count">
        <p class="chats__chat-time-p">{{time}}</p>
        {{#if unread_count}} <p class="chats__chat-count-p">{{unread_count}}</p>{{/if}}
    </div>
</div>

`;
