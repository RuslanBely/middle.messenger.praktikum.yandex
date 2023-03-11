export const signinTpl = `
    <div class="signin">
      <h1 class="signin-h1">Регистрация</h1>
      <form class="signin-form" action="">

      {{#each inputs}}
      <label class="signin-form__label" for="{{name}}">{{labelVal}}</label><br>
      <input class="signin-form__input" id="{{name}}" type={{type}} name={{name}}"><br>
      {{/each}}
            
        <div class="signin-form__buttons">
         
          <button class="signin-form__submit-button button" type="submit" name="Registration">
            <span class="signin-form__submit">Зарегистрироваться</span>
          </button>
          <a href="/login" class="button__altrenative  signin-form__sign-a" name="Enter">
          Войти
          </a>
        </div>
      </form>
    </div>
`;