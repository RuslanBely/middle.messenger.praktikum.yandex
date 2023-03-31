export const  FormPrTplProf =`
<div class="profile-form__ava-container">
  <input class="profile-form__ava-input" id="avatar" type="image" src="{{avatartImg}}" alt="Аватар" name="avatar">
</div>
<h1 class="profile-form__h1">{{inputs.[2].[value]}}</h1>

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



<div class="list profile-form__change-pass">
  
  <div class="profile-form__input-container">
    <label class="profile-form__label" for="oldPassword">Старый пароль</label>
    {{{oldPassword}}}
  </div>
    <div class="profile-form__input-container">
    <label class="profile-form__label" for="newPassword">Старый пароль</label>
    {{{newPassword}}}
    </div>
    <div class="profile-form__input-container">
    <label class="profile-form__label" for="oldPassword">Повторите новый пароль</label>
    {{{newPassword2}}}
  </div>
</div>

<div class="list profile-form__link">
  <div class="profile-form__input-container">
    <a class="profile-form__link-change href=" href="#">Изменить данные</a>
  </div>
  <div class="profile-form__input-container">
    <a class="profile-form__link-change href=" href="#">Изменить пароль</a>
  </div>
  <div class="profile-form__input-container">
    <a class="profile-form__link-quit href=" href="#">Выйти</a>
  </div>
</div>
{{{submButton}}}
`;
