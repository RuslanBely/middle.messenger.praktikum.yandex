export const FormPrTplProf = `
<h1 class="profile-form__h1">{{user.first_name}}</h1>

<div class="list profile-form__list list">
  <div class="profile-form__input-container">
    <label class="profile-form__label" for="email">Почта</label>
    {{{email}}}
  </div>
  <div class="profile-form__input-container">
    <label class="profile-form__label" for="login">Логин</label>
    {{{login}}}
  </div>
  <div class="profile-form__input-container">
    <label class="profile-form__label" for="first_name">Имя</label>
    {{{first_name}}}
  </div>
  <div class="profile-form__input-container">
    <label class="profile-form__label" for="second_name">Фамилия</label>
    {{{second_name}}}
  </div>
  <div class="profile-form__input-container">
    <label class="profile-form__label" for="display_name">Имя в Чате</label>
    {{{display_name}}}
  </div>
  <div class="profile-form__input-container">
    <label class="profile-form__label" for="phone">Телефон</label>
    {{{phone}}}
  </div>
</div>

<div class="list profile-form__link">
  <div class="profile-form__input-container">
    {{{linkChange}}}
  </div>
  <div class="profile-form__input-container">
    {{{linkChangePass}}}
  </div>
  <div class="profile-form__input-container">
  {{{linkExit}}}
  </div>
</div>
{{{submButton}}}
`;
