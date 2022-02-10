<div class={`relative w-min ${$$props.class || ''}`}>
  <div
    class="flex items-center justify-center absolute top-0 left-0 w-10 h-full pointer-events-none"
  >
    <SharpLanguage class="text-black/60" />
  </div>
  <select
    class="appearance-none outline-none ring-2 ring-black/10 bg-transparent focus:ring-black hover:ring-black h-9 cursor-pointer pl-10 pr-8"
  >
    <option value="en">English</option>
    <option value="pt">Português</option>
  </select>
  <div
    class="flex items-center justify-center absolute top-0 right-0 w-8 h-full pointer-events-none"
  >
    <SharpArrowDropDown class="w-[1.125rem] h-[1.125rem]" />
  </div>
</div>

<script context="module">
import SharpLanguage from '~icons/ic/sharp-language'
import SharpArrowDropDown from '~icons/ic/sharp-arrow-drop-down'
</script>