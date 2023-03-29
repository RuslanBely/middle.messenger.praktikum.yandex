export const  FormTplLogSign =`{{#each inputs}}
<label class="{{../className}}__label" for="{{name}}">{{labelVal}}</label>
<input class="{{../className}}__input" data-reported=false id="{{name}}" type="{{type}}" name="{{name}}">

{{/each}}

{{{submButton}}}`;
