export const  ModalAvatarTpl =`<div class='modal {{#if isOpen}}modal--active{{/if}}'>
<div class='modal-dialog'>
  <div class='modal-content'>
    <h3 class='modal-title'>{{title}}</h3>
    {{{form}}}
  </div>
</div>
</div>
`;
