export const chatsTpl = `
<div class="wrapper">
    <aside class="chats">
        <div class="chats__search-frofile">       
            {{{profileLink}}}
            {{{createChatlink}}}
            <div class="chats__search">
                <input class="chats__search-input" type="text" placeholder="Поиск">
            </div>
        </div>
        {{{chats}}}
    </aside>
    <div class="chat">
        {{{messenger}}} 
        {{{modalSettingChat}}}
    </div>
</div>
{{{addChatModal}}}
{{{userListChatModal}}}
`;
