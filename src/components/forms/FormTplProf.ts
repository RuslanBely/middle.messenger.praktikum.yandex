export const  FormPrTplProf =`
<div class="profile-form__ava-container">
  <input class="profile-form__ava-input" id="avatar" type="image" src="{{avatartImg}}" alt="Аватар" name="avatar">
</div>
<h1 class="profile-form__h1">{{inputsPers.[2].[value]}}</h1>
<div class="list profile-form__list list">

  {{#each inputsPers}}
  <div class="profile-form__input-container">
    <label class="profile-form__label" for="{{name}}">{{labelVal}}</label>
    <input class="profile-form__input" data-reported=false id="{{name}}" type="{{type}}" name="{{name}}" value="{{value}}">
  </div>
  {{/each}}

</div>

<div class="list profile-form__change-pass">
  {{#each inputsPass}}
  <div class="profile-form__input-container">
    <label class="profile-form__label" for="{{name}}">{{labelVal}}</label>
    <input class="profile-form__input" data-reported=false id="{{name}}" type="{{type}}" name="{{name}}" value="{{value}}">
  </div>
  {{/each}}
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
