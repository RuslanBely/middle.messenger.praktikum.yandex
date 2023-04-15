export const chatsTpl =`<div class="wrapper">
<aside class="chats">
    <div class="chats__search-frofile">
        {{{profileLink}}}
        <div class="chats__search">
            <input class="chats__search-input" type="text" placeholder="Поиск">
        </div>
    </div>    
    {{{chatItem}}} 
</aside>
<div class="chat">
    <div class="chat__header">
    <img class="chat__chat-logo">
    <p class="chats__chat-name-p">Вадим</p>
    <a href="/set" class="chat__chat-settings"></a>
    {{{logoutlink}}}
    </div>
    <div class="chat__messages">
    </div>
   {{{formChat}}}
</div>
`;
