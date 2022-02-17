<div
  id={`tabpanel-${controlledBy}-${panel}`}
  aria-labelledby={`${controlledBy}-${panel}`}
  role="tabpanel"
  class="{panelShown ? 'block' : 'hidden'} {$$props.class || ''}"
>
  <slot />
</div>

<script>
export let panel
export let currentPanel
export let controlledBy

$: panelShown = currentPanel == panel
</script>