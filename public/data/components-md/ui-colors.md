Most of our components support predefined colors (<code>primary</code>, <code>secondary</code>, <code>danger</code>,
<code>info</code>, <code>discovery</code>, <code>success</code> and <code>caution</code> and each color has 4 variants - 
<code>solid</code>, <code>soft</code>, <code>outline</code> and <code>ghost</code>. In terms of CSS classes, they look
like this - <code>.bc-<span class="underline">color</span>-<span class="underline">variant</span></code>
and as component props - <code>color</code>, <code>variant</code>.

The <code>color</code> and the <code>variant</code> props are not value-checked, so you can define your own color nad variant names. 
If you wish to keep the names and only change values, you can do so by editing <a href="/content/css-variables" v-link>variables.css</a>.
