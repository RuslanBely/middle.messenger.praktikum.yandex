export const AvatarTpl = `<button class='profile-wrapper__avatar profile-avatar'>
  <span class='profile-avatar__text'>Поменять аватар</span>
  {{#if user.avatar}}
    <img src='https://ya-praktikum.tech/api/v2/resources/{{user.avatar}}' 
    alt='Аватар' class='profile-avatar__image' />
  {{/if}}
</button>
`;
