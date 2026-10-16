A renderless <a href="/ui" v-link>component</a> that leverages the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine" target="_blank" rel="noopener">navigator.onLine</a>
property and browser <code>online</code>/<code>offline</code> events to track network connectivity status. 
It exposes reactive state and callbacks without rendering any UI, allowing consumers to handle connectivity changes 
however they choose. This makes it ideal for displaying custom indicators, <a href="/ui/notification" v-link>notifications</a> 
or retry logic.

