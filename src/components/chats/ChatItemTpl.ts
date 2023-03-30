export const  ChatItemTpl =`
{{#each chats}}
<div class="chats__chats-item">
    <img class="chats__chat-logo">
    <div class="chats__chat-name-prev">
        <p class="chats__chat-name-p">{{name}}</p>
        <p class="chats__chat-prev-p">{{prev}}</p>
    </div>
    <div class="chats__chat-time-count">
        <p class="chats__chat-time-p">{{time}}</p>
        <p class="chats__chat-count-p">{{messageCount}}</p>
    </div>
</div>
{{/each}}
`;
