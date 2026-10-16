This <a href="/directives" v-link>directive</a> will help you prevent the <code>&lt;body /&gt;</code> from scrolling when you 
have a modal opened. Our <a href="/ui/dialog-box" v-link>dialog-box</a> component is using the directive internally. The <code>overflow: hidden</code> is applied to the <code>&lt;body /&gt;</code> element when the target 
HTMLElement or Vue component is <code>mounted</code> and removed on the <code>beforeUnmount</code> hook.
