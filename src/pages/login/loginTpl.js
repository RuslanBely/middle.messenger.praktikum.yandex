export const loginTpl = `
<div class="login">
  <h1 class="login-h1">Вход</h1>
  <form class="login-form" action="">
    {{#each inputs}}
    <label class="login-form__label" for="{{name}}">{{labelVal}}</label><br>
    <input class="login-form__input" id="{{name}}" type="{{type}}" name="{{name}}"><br>
    {{/each}}
    
    <div class="login-form__buttons">
      <button class="login-form__submit-button button" type="submit" name="Enter">
        <span class="button__submit_orange login-form__submit">Авторизоваться</span>
      </button>
      <a href="/signin" class="button__altrenative  login-form__sign-a" name="Registration">
        Нет аккаунта?
      </a>
    </div>
  </form>
</div>
`;