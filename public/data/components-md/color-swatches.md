Our colors with modifiers differ from those with variants in a sense that each color supports <code>lightness</code> swatch, 
expressed by a number, ranging from <code>50</code> being the lightest swatch to <code>1000</code> being the darkest. In 
terms of CSS classes, they look like this - <code>.bg-<span class="underline">color</span>-<span class="underline">lightness</span></code>
for background and <code>.text-<span class="underline">color</span>-<span class="underline">lightness</span></code> for text. Unlike the
previous versions of BCQ, in version 3 we do not support them as props.

These default color with modifiers are defined as a prop of the <a href="/content/app" v-link>app</a> component, so you can easily replace them with
colors of your own.
