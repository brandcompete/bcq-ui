/*!
 * Becquerel UI for Vue3 v3.1.1
 * @martin.ivanov.brandcompete/bcq-ui
 * (c) 2026 brandcompete GmbH - https://brandcompete.com/
 * Docs: https://bcq-ui.brandcompete.com/
 * Released under the MIT License
 */
import { resolveComponent, openBlock, createBlock, normalizeClass, withCtx, renderSlot, createVNode, createTextVNode, toDisplayString, createElementBlock, Fragment, renderList, createCommentVNode, resolveDirective, withDirectives, normalizeStyle, createElementVNode, withModifiers, resolveDynamicComponent, Transition, h } from "vue";
import "mitt";
const AspectRatio = {
  mounted(el, binding) {
    if (binding && binding.value) {
      el.style.aspectRatio = binding.value;
    }
  }
};
const Blur = {
  mounted(element, binding) {
    Blur.blur(element, binding.value);
  },
  updated(element, binding) {
    Blur.blur(element, binding.value);
  },
  blur(element, value) {
    if (!value) {
      value = {
        blurred: true
      };
    }
    const style = {
      filter: value.blurred ? `blur(${value.blur || 5}px)` : "none",
      opacity: value.blurred ? value.opacity || 0.5 : 1,
      userSelect: value.blurred ? "none" : "unset",
      pointerEvents: value.blurred ? "none" : "unset"
    };
    Object.keys(style).forEach((item) => {
      element.style[item] = style[item];
    });
  }
};
const cssClass$1 = "bc-default-btn";
const DefaultBtn = {
  mounted(element) {
    document.querySelectorAll(`.${cssClass$1}`).forEach((element2) => {
      element2.classList.remove(cssClass$1);
    });
    element.focus();
    element.classList.add(cssClass$1);
    DefaultBtn.bind(element);
  },
  bind(element) {
    const classList = element.classList;
    element.addEventListener("focus", () => {
      classList.add(cssClass$1);
    });
    element.addEventListener("blur", () => {
      classList.remove(cssClass$1);
    });
  }
};
const GradientText = {
  mounted(el, binding) {
    let props = binding.value;
    if (props) {
      el.style.backgroundImage = `linear-gradient(${(props.tilt || 45) + "deg"}, ${props.colors.join(",")})`;
      el.style["-webkit-background-clip"] = "text";
      el.style["-webkit-text-fill-color"] = "transparent";
      el.style["background-clip"] = "text";
      el.style["text-fill-color"] = "transparent";
    }
  }
};
const Intersect = {
  mounted(element, binding) {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }
    const options = {
      root: binding.root || null,
      rootMargin: binding.rootMargin || "0px",
      scrollMargin: binding.scrollMargin || "0px",
      threshold: binding.threshold || 1
    };
    let watcher = new IntersectionObserver((entries, observer) => {
      const isIntersecting = entries.some((entry) => entry.isIntersecting);
      if (binding.value && binding.value.onIntersect) {
        binding.value.onIntersect({
          entries,
          observer,
          isIntersecting,
          element
        });
      }
    }, options);
    watcher.observe(element);
  }
};
const LiquidGlass = {
  mounted(element, binding) {
    const baseCss = "bc-liquid-glass";
    const config = binding.value || {
      background: "rgba(255, 255, 255, .05)"
    };
    element.classList.add(baseCss);
    Object.keys(config).forEach((item) => {
      element.style[item] = config[item];
    });
  }
};
const body = document.querySelector("body");
const cssClass = "overflow-hidden";
const ScrollLock = {
  mounted() {
    body.classList.add(cssClass);
  },
  beforeUnmount() {
    body.classList.remove(cssClass);
  }
};
const Tooltip = {
  mounted(el, binding) {
    let props = binding.value;
    if (typeof binding.value === "string") {
      props = {
        text: binding.value,
        position: "top"
      };
    }
    if (props) {
      el.classList.add("bcq-tooltip", `bcq-tooltip-${props.position || "top"}`);
      el.setAttribute("data-tooltip", props.text);
    }
  }
};
const Resize = {
  mounted(el, binding) {
    const callback = binding.value;
    const options = binding.options || { passive: true };
    window.addEventListener("resize", callback, options);
    el._onResize = { callback, options };
    if (!binding.modifiers || !binding.modifiers.quiet) {
      callback();
    }
  },
  unbind(el, binding) {
    const { callback, options } = el._onResize;
    window.removeEventListener("resize", callback, options);
    delete el._onResize;
  }
};
const Ripple = {
  mounted(el, binding) {
    const props = {
      event: "mousedown",
      transition: 600
    };
    setProps(Object.keys(binding.modifiers), props);
    el.addEventListener(props.event, (event) => {
      rippler(event, el, binding.value);
    });
    const bg = binding.value || Ripple.color || "rgba(0, 0, 0, 0.2)";
    const zIndex = Ripple.zIndex || "9999";
    function rippler(event, el2) {
      const target = el2;
      const targetBorder = parseInt(getComputedStyle(target).borderWidth.replace("px", ""));
      const rect = target.getBoundingClientRect();
      const left = rect.left;
      const top = rect.top;
      const width = target.offsetWidth;
      const height = target.offsetHeight;
      const dx = event.clientX - left;
      const dy = event.clientY - top;
      const maxX = Math.max(dx, width - dx);
      const maxY = Math.max(dy, height - dy);
      const style = window.getComputedStyle(target);
      const radius = Math.sqrt(maxX * maxX + maxY * maxY);
      const border = targetBorder > 0 ? targetBorder : 0;
      const ripple = document.createElement("div");
      const rippleContainer = document.createElement("div");
      rippleContainer.className = "ripple-container";
      ripple.className = "ripple";
      ripple.style.marginTop = "0";
      ripple.style.marginLeft = "0";
      ripple.style.width = "1px";
      ripple.style.height = "1px";
      ripple.style.transition = "all " + props.transition + "ms cubic-bezier(0.4, 0, 0.2, 1)";
      ripple.style.borderRadius = "50%";
      ripple.style.pointerEvents = "none";
      ripple.style.position = "relative";
      ripple.style.zIndex = zIndex;
      ripple.style.backgroundColor = bg;
      rippleContainer.style.position = "absolute";
      rippleContainer.style.left = 0 - border + "px";
      rippleContainer.style.top = 0 - border + "px";
      rippleContainer.style.height = "0";
      rippleContainer.style.width = "0";
      rippleContainer.style.pointerEvents = "none";
      rippleContainer.style.overflow = "hidden";
      const storedTargetPosition = target.style.position.length > 0 ? target.style.position : getComputedStyle(target).position;
      if (storedTargetPosition !== "relative") {
        target.style.position = "relative";
      }
      rippleContainer.appendChild(ripple);
      target.appendChild(rippleContainer);
      ripple.style.marginLeft = dx + "px";
      ripple.style.marginTop = dy + "px";
      rippleContainer.style.width = width + "px";
      rippleContainer.style.height = height + "px";
      rippleContainer.style.borderTopLeftRadius = style.borderTopLeftRadius;
      rippleContainer.style.borderTopRightRadius = style.borderTopRightRadius;
      rippleContainer.style.borderBottomLeftRadius = style.borderBottomLeftRadius;
      rippleContainer.style.borderBottomRightRadius = style.borderBottomRightRadius;
      rippleContainer.style.direction = "ltr";
      setTimeout(() => {
        ripple.style.width = radius * 2 + "px";
        ripple.style.height = radius * 2 + "px";
        ripple.style.marginLeft = dx - radius + "px";
        ripple.style.marginTop = dy - radius + "px";
      }, 0);
      function clearRipple() {
        setTimeout(() => {
          ripple.style.backgroundColor = "rgba(0, 0, 0, 0)";
        }, 250);
        setTimeout(() => {
          rippleContainer.parentNode.removeChild(rippleContainer);
        }, 850);
        el2.removeEventListener("mouseup", clearRipple, false);
        setTimeout(() => {
          let clearPosition = true;
          for (let i = 0; i < target.childNodes.length; i++) {
            if (target.childNodes[i].className === "ripple-container") {
              clearPosition = false;
            }
          }
          if (clearPosition) {
            if (storedTargetPosition !== "static") {
              target.style.position = storedTargetPosition;
            } else {
              target.style.position = "";
            }
          }
        }, props.transition + 250);
      }
      if (event.type === "mousedown") {
        el2.addEventListener("mouseup", clearRipple, false);
      } else {
        clearRipple();
      }
    }
  }
};
function setProps(modifiers, props) {
  modifiers.forEach((item) => {
    if (isNaN(Number(item))) {
      props.event = item;
    } else {
      props.transition = item;
    }
  });
}
const BcUi = {
  install(Vue, opts = {}) {
    if (this.installed) {
      return;
    }
    Vue.directive("aspect-ratio", AspectRatio);
    Vue.directive("blur", Blur);
    Vue.directive("default-btn", DefaultBtn);
    Vue.directive("gradient-text", GradientText);
    Vue.directive("intersect", Intersect);
    Vue.directive("liquid-glass", LiquidGlass);
    Vue.directive("scroll-lock", ScrollLock);
    Vue.directive("tooltip", Tooltip);
    Vue.directive("resize", Resize);
    Vue.directive("ripple", Ripple);
    if (opts.components) {
      Object.keys(opts.components).forEach((key) => {
        const c = opts.components[key];
        if (c !== BcUi) {
          Vue.use(c);
        }
      });
    }
    this.installed = true;
  }
};
const methods = {
  methods: {
    gcd(a, b) {
      return b ? this.gcd(b, a % b) : a;
    },
    calculateAspectRatio(width, height) {
      const divisor = this.gcd(width, height);
      return width / divisor + "/" + height / divisor;
    },
    percentage(partial, total) {
      return 100 * partial / total;
    },
    awaitForElement(selector) {
      return new Promise((resolve) => {
        if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
        }
        const observer = new MutationObserver((mutations) => {
          if (document.querySelector(selector)) {
            observer.disconnect();
            resolve(document.querySelector(selector));
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
      });
    },
    componentBaseCss(name = "", additionalCssClasses = []) {
      return `bc-${name}${additionalCssClasses.length ? " " + additionalCssClasses.join(" ") : ""}`;
    },
    uuid() {
      return "10000000-1000-4000-8000-100000000000".replace(
        /[018]/g,
        (c) => (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
      );
    },
    makeUiColorVariant(color, variant) {
      return `bg-${color}-${variant}`;
    },
    makeUiLightnessColor(color, lightness) {
      return `text-${color}${lightness ? "-" + lightness : ""}`;
    },
    makeFontSize(size = "sm") {
      return `text-${size}`;
    },
    makeBorderRadius(roundness = "sm") {
      return `border-round-${roundness}`;
    },
    makeElevation(elevation = "sm") {
      return `shadow-${elevation}`;
    },
    makeFontWeight(weight) {
      return `font-${weight}`;
    },
    sleep(milliseconds = 1e3) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    },
    makeAnimation(animation = "pulse") {
      return `animate-${animation}`;
    },
    makeOpacity(opacity) {
      return `opacity-${opacity}`;
    },
    makeXAlign(align) {
      return `text-${align}`;
    }
  }
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$1i = {
  name: "BcApp",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("app")
    };
  },
  computed: {
    componentCssClasses() {
      const baseCss = this.baseCss;
      return [
        baseCss,
        this.dark ? `${baseCss}-theme-dark` : null
      ];
    }
  },
  props: {
    dark: {
      type: Boolean,
      default: true
    },
    colors: {
      type: Object,
      default() {
        return {
          "red": "#f44336",
          "pink": "#e91e63",
          "purple": "#9c27b0",
          "deep-purple": "#673ab7",
          "indigo": "#3f51b5",
          "blue": "#2196f3",
          "light-blue": "#03a9f4",
          "cyan": "#00bcd4",
          "teal": "#009688",
          "green": "#4caf50",
          "light-green": "#8bc34a",
          "lime": "#cddc39",
          "yellow": "#ffeb3b",
          "amber": "#ffc107",
          "orange": "#ff9800",
          "deep-orange": "#ff5722",
          "brown": "#795548",
          "blue-grey": "#607d8b",
          "grey": "#9e9e9e"
        };
      }
    }
  }
};
function _sfc_render$1g(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_reactive_style = resolveComponent("bc-reactive-style");
  const _component_bc_brand_color = resolveComponent("bc-brand-color");
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default"),
      createVNode(_component_bc_reactive_style, null, {
        default: withCtx(() => [
          createTextVNode(" :root { color-scheme: " + toDisplayString($props.dark ? "dark" : "light") + "; } body, .bc-app" + toDisplayString($props.dark ? ".bc-app-theme-dark" : "") + " { background: " + toDisplayString($props.dark ? "var(--bg-theme-dark)" : "var(--bg-theme-light)") + "; color: " + toDisplayString($props.dark ? "var(--text-theme-dark)" : "var(--text-theme-light)") + "; } .bc-app .text-white, .bc-app .text-white-500 { color: var(--white); } .bc-app .bg-white, .bc-app .bg-white-500 { background: var(--white); } .bc-app .border-white, .bc-app .border-white-500 { border-color: var(--white); } .bc-app .text-black, .bc-app .text-black-500 { color: var(--black); } .bc-app .bg-black, .bc-app .bg-black-500 { background: var(--black); } .bc-app .border-black, .bc-app .border-black-500 { border-color: var(--black); } ", 1)
        ]),
        _: 1
      }),
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.colors, (hex, name) => {
        return openBlock(), createBlock(_component_bc_brand_color, {
          name,
          hex
        }, null, 8, ["name", "hex"]);
      }), 256))
    ]),
    _: 3
  }, 8, ["class"]);
}
const BcApp = /* @__PURE__ */ _export_sfc(_sfc_main$1i, [["render", _sfc_render$1g]]);
BcApp.install = (Vue) => {
  Vue.component(BcApp.name, BcApp);
};
const _sfc_main$1h = {
  name: "BcAlert",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("alert")
    };
  },
  emits: [
    "update:visible"
  ],
  props: {
    color: {
      type: String,
      default: "primary"
    },
    dismissible: {
      type: Boolean,
      default: true
    },
    dismissIcon: {
      type: String,
      default: "close-circle-outline"
    },
    elevation: {
      type: String,
      default: "md"
    },
    icon: {
      type: String
    },
    iconProvider: {
      type: String,
      default: "mdi"
    },
    padding: {
      type: Array,
      default: ["p-1"]
    },
    roundness: {
      type: String,
      default: "sm"
    },
    size: {
      type: String,
      default: "sm"
    },
    unselectable: {
      type: Boolean,
      default: true
    },
    variant: {
      type: String,
      default: "outline"
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.unselectable ? "select-none" : null,
        `text-${this.size}`,
        `shadow-${this.elevation}`,
        `border-round-${this.roundness}`,
        `bg-${this.color}-${this.variant}`
      ];
    }
  },
  methods: {
    dismiss() {
      this.$emit("update:visible", false);
    }
  }
};
function _sfc_render$1f(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  const _component_bc_container = resolveComponent("bc-container");
  const _component_bc_table_layout_row = resolveComponent("bc-table-layout-row");
  const _component_bc_table_layout = resolveComponent("bc-table-layout");
  return $props.visible ? (openBlock(), createBlock(_component_bc_container, {
    key: 0,
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      createVNode(_component_bc_table_layout, { "y-align": "middle" }, {
        default: withCtx(() => [
          createVNode(_component_bc_table_layout_row, null, {
            default: withCtx(() => [
              $props.icon ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                key: 0,
                class: normalizeClass([`${$data.baseCss}-icon-cell`, $props.padding]),
                "x-align": "center"
              }, {
                default: withCtx(() => [
                  createVNode(_component_bc_icon, {
                    name: $props.icon,
                    provider: $props.iconProvider
                  }, null, 8, ["name", "provider"])
                ]),
                _: 1
              }, 8, ["class"])) : createCommentVNode("", true),
              createVNode(_component_bc_table_layout_cell, {
                class: normalizeClass([$props.padding]),
                "x-align": "left"
              }, {
                default: withCtx(() => [
                  createVNode(_component_bc_container, {
                    class: normalizeClass([!$props.icon || !$props.dismissible ? "px-1" : null])
                  }, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "default")
                    ]),
                    _: 3
                  }, 8, ["class"])
                ]),
                _: 3
              }, 8, ["class"]),
              $props.dismissible ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                key: 1,
                class: normalizeClass([`${$data.baseCss}-icon-cell`, $props.padding]),
                "x-align": "center"
              }, {
                default: withCtx(() => [
                  createVNode(_component_bc_icon, {
                    name: $props.dismissIcon,
                    provider: $props.iconProvider,
                    onClick: $options.dismiss,
                    class: normalizeClass(["cursor-pointer"])
                  }, null, 8, ["name", "provider", "onClick"])
                ]),
                _: 1
              }, 8, ["class"])) : createCommentVNode("", true)
            ]),
            _: 3
          })
        ]),
        _: 3
      })
    ]),
    _: 3
  }, 8, ["class"])) : createCommentVNode("", true);
}
const ComponentTemplate$4 = /* @__PURE__ */ _export_sfc(_sfc_main$1h, [["render", _sfc_render$1f]]);
ComponentTemplate$4.install = (Vue) => {
  Vue.component(ComponentTemplate$4.name, ComponentTemplate$4);
};
const _sfc_main$1g = {
  name: "BcAmbientImage",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("ambient-image")
    };
  },
  computed: {
    lazyImageCssClasses() {
      return [
        this.makeBorderRadius(this.roundness),
        "relative"
      ];
    },
    componentStyle() {
      return {
        width: this.width
      };
    },
    componentCssClasses() {
      return [
        this.baseCss,
        this.makeBorderRadius(this.roundness)
      ];
    },
    innerWrapperCssClasses() {
      return [
        "relative"
      ];
    },
    innerWrapperStyles() {
      return {
        padding: `${this.spread}px`
      };
    },
    ambienceClasses() {
      return [
        "top-0",
        "right-0",
        "bottom-0",
        "left-0",
        "absolute"
      ];
    },
    ambienceStyles() {
      return {
        filter: `blur(${this.blur}px) opacity(${this.opacity})`,
        background: `url("${this.src}") no-repeat center/${this.backgroundSize}`
      };
    }
  },
  props: {
    aspectRatio: {
      type: String,
      default: "4/3"
    },
    backgroundSize: {
      type: String,
      default: "cover"
    },
    block: {
      type: Boolean,
      default: true
    },
    blur: {
      type: Number,
      default: 14
    },
    errorIcon: {
      type: String,
      default: "image-broken-variant"
    },
    height: {
      type: String
    },
    href: {
      type: String
    },
    loadingIcon: {
      type: String,
      default: "loading"
    },
    iconsProvider: {
      type: String,
      default: "mdi"
    },
    iconsSize: {
      default: "3xl"
    },
    opacity: {
      type: Number,
      default: 0.9
    },
    options: {
      type: Object,
      default() {
        return {
          root: null,
          rootMargin: "0px",
          scrollMargin: "0px",
          threshold: 1
        };
      }
    },
    roundness: {
      type: String,
      default: "xl"
    },
    spread: {
      type: Number,
      default: 14
    },
    src: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      default: "figure"
    },
    to: {
      type: String
    },
    width: {
      type: String
    }
  }
};
function _sfc_render$1e(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_container = resolveComponent("bc-container");
  const _component_bc_lazy_image = resolveComponent("bc-lazy-image");
  const _directive_aspect_ratio = resolveDirective("aspect-ratio");
  return withDirectives((openBlock(), createBlock(_component_bc_container, {
    class: normalizeClass($options.componentCssClasses),
    href: $props.href,
    tag: $props.tag,
    to: $props.to,
    style: normalizeStyle($options.componentStyle)
  }, {
    default: withCtx(() => [
      withDirectives((openBlock(), createBlock(_component_bc_container, {
        class: normalizeClass($options.innerWrapperCssClasses),
        style: normalizeStyle($options.innerWrapperStyles)
      }, {
        default: withCtx(() => [
          withDirectives(createVNode(_component_bc_container, {
            style: normalizeStyle($options.ambienceStyles),
            class: normalizeClass($options.ambienceClasses)
          }, null, 8, ["style", "class"]), [
            [_directive_aspect_ratio, $props.aspectRatio]
          ]),
          createVNode(_component_bc_lazy_image, {
            onLoad: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("load", $event)),
            onError: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("error", $event)),
            class: normalizeClass($options.lazyImageCssClasses),
            "aspect-ratio": $props.aspectRatio,
            "background-size": $props.backgroundSize,
            "error-icon": $props.errorIcon,
            height: $props.height,
            "loading-icon": $props.loadingIcon,
            "icons-size": $props.iconsSize,
            options: $props.options,
            "icons-provider": $props.iconsProvider,
            src: $props.src
          }, null, 8, ["class", "aspect-ratio", "background-size", "error-icon", "height", "loading-icon", "icons-size", "options", "icons-provider", "src"])
        ]),
        _: 1
      }, 8, ["class", "style"])), [
        [_directive_aspect_ratio, $props.aspectRatio]
      ])
    ]),
    _: 1
  }, 8, ["class", "href", "tag", "to", "style"])), [
    [_directive_aspect_ratio, $props.aspectRatio]
  ]);
}
const BcAmbientImage = /* @__PURE__ */ _export_sfc(_sfc_main$1g, [["render", _sfc_render$1e]]);
BcAmbientImage.install = (Vue) => {
  Vue.component(BcAmbientImage.name, BcAmbientImage);
};
const _sfc_main$1f = {
  name: "BcAsyncForm",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("async-form")
    };
  },
  emits: [
    "submit",
    "reset"
  ],
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.disabled && !this.inert ? "disabled" : null
      ];
    }
  },
  props: {
    acceptCharset: {
      type: String
    },
    action: {
      type: String
    },
    autocomplete: {
      type: String,
      default: "on",
      validator: (value) => {
        return [
          "on",
          "off"
        ].includes(value);
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    enctype: {
      type: String,
      default: "application/x-www-form-urlencoded",
      validator: (value) => {
        return [
          "text/plain",
          "application/x-www-form-urlencoded",
          "multipart/form-data"
        ].includes(value);
      }
    },
    inert: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    formData: {
      type: Object,
      required: true,
      default: () => {
      }
    },
    method: {
      type: String,
      default: "GET"
    }
  },
  methods: {
    onSubmit() {
      this.$emit("submit", this.formData);
    },
    onReset() {
      this.$emit("reset", this.formData);
    }
  }
};
const _hoisted_1$o = ["method", "action", "name", "enctype", "accept-charset", "autocomplete"];
function _sfc_render$1d(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    class: normalizeClass($options.componentCssClasses),
    inert: $props.inert
  }, {
    default: withCtx(() => [
      createElementVNode("form", {
        onSubmit: _cache[0] || (_cache[0] = withModifiers((...args) => $options.onSubmit && $options.onSubmit(...args), ["prevent"])),
        onReset: _cache[1] || (_cache[1] = withModifiers((...args) => $options.onReset && $options.onReset(...args), ["prevent"])),
        class: normalizeClass([`${$data.baseCss}-form`]),
        method: $props.method.toLowerCase(),
        action: $props.action,
        name: $props.name,
        enctype: $props.enctype,
        "accept-charset": $props.acceptCharset,
        autocomplete: $props.autocomplete
      }, [
        _ctx.$slots["top"] ? (openBlock(), createBlock(_component_bc_container, {
          key: 0,
          class: normalizeClass([`${$data.baseCss}-form-slot-top`])
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "top")
          ]),
          _: 3
        }, 8, ["class"])) : createCommentVNode("", true),
        createVNode(_component_bc_container, {
          class: normalizeClass([`${$data.baseCss}-form-content`])
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 8, ["class"]),
        _ctx.$slots["bottom"] ? (openBlock(), createBlock(_component_bc_container, {
          key: 1,
          class: normalizeClass([`${$data.baseCss}-form-slot-bottom`])
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "bottom")
          ]),
          _: 3
        }, 8, ["class"])) : createCommentVNode("", true)
      ], 42, _hoisted_1$o)
    ]),
    _: 3
  }, 8, ["class", "inert"]);
}
const BcAsyncForm = /* @__PURE__ */ _export_sfc(_sfc_main$1f, [["render", _sfc_render$1d]]);
BcAsyncForm.install = (Vue) => {
  Vue.component(BcAsyncForm.name, BcAsyncForm);
};
const _sfc_main$1e = {
  name: "BcAvatar",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("avatar")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.makeUiColorVariant(this.color, this.variant),
        this.makeFontSize(this.fontSize),
        this.makeFontWeight(this.fontWeight),
        this.makeElevation(this.elevation),
        this.tile ? null : "border-round-full",
        this.block ? null : ["align-middle"],
        "select-none",
        "text-center",
        "overflow-hidden"
      ];
    },
    style() {
      const size = this.size;
      const borderWidth = this.borderWidth;
      this.src;
      return {
        width: size,
        lineHeight: size,
        outlineOffset: `-${borderWidth}px`,
        // background: src ? `url("${src}") no-repeat center/cover` : null,
        outlineWidth: `${borderWidth}px`
      };
    },
    iconStyle() {
      const lineHeight = this.size;
      return {
        lineHeight,
        fontSize: "inherit",
        verticalAlign: "unset",
        height: lineHeight
      };
    }
  },
  props: {
    block: {
      type: Boolean,
      default: false
    },
    borderWidth: {
      type: Number,
      default: 2
    },
    color: {
      type: String,
      default: "secondary"
    },
    elevation: {
      type: String,
      default: "md"
    },
    fontSize: {
      type: String,
      default: "md"
    },
    fontWeight: {
      type: String,
      default: "semibold"
    },
    icon: {
      type: String
    },
    iconProvider: {
      type: String
    },
    size: {
      type: String,
      default: "48px"
    },
    src: {
      type: String
    },
    tile: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: "outline"
    }
  }
};
function _sfc_render$1c(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_lazy_image = resolveComponent("bc-lazy-image");
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_container = resolveComponent("bc-container");
  const _directive_aspect_ratio = resolveDirective("aspect-ratio");
  return withDirectives((openBlock(), createBlock(_component_bc_container, {
    display: $props.block ? "block" : "inline-block",
    style: normalizeStyle($options.style),
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      $props.src ? (openBlock(), createBlock(_component_bc_lazy_image, {
        key: 0,
        src: $props.src,
        width: $props.size,
        height: $props.size
      }, null, 8, ["src", "width", "height"])) : createCommentVNode("", true),
      $props.icon ? (openBlock(), createBlock(_component_bc_icon, {
        key: 1,
        provider: $props.iconProvider,
        name: $props.icon,
        style: normalizeStyle($options.iconStyle)
      }, null, 8, ["provider", "name", "style"])) : renderSlot(_ctx.$slots, "default", {}, void 0, void 0, 2)
    ]),
    _: 3
  }, 8, ["display", "style", "class"])), [
    [_directive_aspect_ratio, 1 / 1]
  ]);
}
const BcAvatar = /* @__PURE__ */ _export_sfc(_sfc_main$1e, [["render", _sfc_render$1c]]);
BcAvatar.install = (Vue) => {
  Vue.component(BcAvatar.name, BcAvatar);
};
const _sfc_main$1d = {
  name: "BcAvatarGroup",
  mixins: [
    methods
  ],
  data() {
    return {
      id: this.uuid(),
      hiddenAvatars: 0,
      baseCss: this.componentBaseCss("avatar-group")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        "select-none"
      ];
    },
    avatarsLength() {
      return this.$el.querySelectorAll(".bc-avatar:not(.bc-avatar-group-limit)").length;
    }
  },
  watch: {
    limit() {
      this.setLimit();
    }
  },
  props: {
    gap: {
      type: Number,
      default: -12
    },
    limit: {
      type: Number,
      default: 0
    },
    limitColor: {
      type: String,
      default: "secondary"
    },
    limitElevation: {
      type: String,
      default: "md"
    },
    limitFontWeight: {
      type: String,
      default: "normal"
    },
    limitFontSize: {
      type: String,
      default: "sm"
    },
    limitLabel: {
      type: Function,
      default(value) {
        return `+${value}`;
      }
    },
    limitSize: {
      type: String,
      default: "48px"
    },
    limitTile: {
      type: Boolean,
      default: false
    },
    limitVariant: {
      type: String,
      default: "outline"
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.setLimit();
    },
    getAvatars() {
      return this.$el.querySelectorAll(".bc-avatar:not(.bc-avatar-group-limit)");
    },
    getLimitAvatar() {
      return this.$el.querySelector(".bc-avatar-group-limit");
    },
    setLimit() {
      const avatars = this.getAvatars();
      const limitAvatar = this.getLimitAvatar();
      const limit = this.limit;
      const hidden = "hidden";
      this.hiddenAvatars = limit === 1 ? avatars.length : avatars.length - limit;
      avatars.forEach((avatar) => {
        avatar.classList.add(hidden);
      });
      switch (limit) {
        case 1:
          avatars.forEach((avatar) => {
            avatar.classList.add(hidden);
          });
          break;
        case 0:
          avatars.forEach((avatar) => {
            avatar.classList.remove(hidden);
          });
          break;
        default:
          for (let step = 0; step < limit; step++) {
            const avatar = avatars[step];
            if (avatar) {
              avatars[step].classList.remove(hidden);
            }
          }
      }
      limitAvatar.classList[limit === avatars.length ? "add" : "remove"](hidden);
    }
  }
};
function _sfc_render$1b(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_avatar = resolveComponent("bc-avatar");
  const _component_bc_reactive_style = resolveComponent("bc-reactive-style");
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    class: normalizeClass($options.componentCssClasses),
    "data-avatar-group-id": $data.id
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default"),
      createVNode(_component_bc_avatar, {
        tile: $props.limitTile,
        size: $props.limitSize,
        elevation: $props.limitElevation,
        color: $props.limitColor,
        variant: $props.limitVariant,
        "font-size": $props.limitFontSize,
        "font-weight": $props.limitFontWeight,
        class: normalizeClass([`${$data.baseCss}-limit`, $props.limit > 0 ? null : "hidden"])
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString($props.limitLabel($data.hiddenAvatars)), 1)
        ]),
        _: 1
      }, 8, ["tile", "size", "elevation", "color", "variant", "font-size", "font-weight", "class"]),
      createVNode(_component_bc_reactive_style, null, {
        default: withCtx(() => [
          createTextVNode(" ." + toDisplayString($data.baseCss) + '[data-avatar-group-id="' + toDisplayString($data.id) + '"] .bc-avatar { margin-left: ' + toDisplayString($props.gap) + "px; } ", 1)
        ]),
        _: 1
      })
    ]),
    _: 3
  }, 8, ["class", "data-avatar-group-id"]);
}
const BcAvatarGroup = /* @__PURE__ */ _export_sfc(_sfc_main$1d, [["render", _sfc_render$1b]]);
BcAvatarGroup.install = (Vue) => {
  Vue.component(BcAvatarGroup.name, BcAvatarGroup);
};
const _sfc_main$1c = {
  name: "BcBadge",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("badge")
    };
  },
  emits: [
    "update:visible"
  ],
  computed: {
    getValue() {
      return this.value.toString();
    },
    componentCssClasses() {
      return [
        this.baseCss
      ];
    },
    placementCssClasses() {
      const placement = this.placement;
      const offset = this.offset;
      return placement.split("-").map((item) => {
        return item;
      }).map((item) => {
        return `${item}-0`;
      }).concat([placement.indexOf("top") > -1 ? `-mt-${offset}` : `-mb-${offset}`]).concat([placement.indexOf("right") > -1 ? `-mr-${offset}` : `-ml-${offset}`]);
    },
    valueCssClasses() {
      const baseCss = this.baseCss;
      return [
        `${baseCss}-value`,
        `${baseCss}-${this.placement}`,
        this.makeUiColorVariant(this.color, this.variant),
        this.makeBorderRadius(this.roundness),
        this.placementCssClasses,
        "absolute",
        "text-xs",
        "justify-content-center",
        "align-content-center",
        "select-none",
        "pointer-events-none"
      ];
    }
  },
  props: {
    color: {
      type: String,
      default: "danger"
    },
    fontWeight: {
      type: String,
      default: "bold"
    },
    icon: {
      type: String
    },
    iconProvider: {
      type: String,
      default: "mdi"
    },
    offset: {
      type: Number,
      default: 2
    },
    placement: {
      type: String,
      default: "top-right",
      validator: (value) => {
        return [
          "top-left",
          "top-right",
          "bottom-left",
          "bottom-right"
        ].includes(value);
      }
    },
    roundness: {
      type: String,
      default: "full"
    },
    value: {
      type: [
        String,
        Number
      ]
    },
    variant: {
      type: String,
      default: "solid"
    },
    visible: {
      type: Boolean,
      default: true
    }
  }
};
const _hoisted_1$n = ["textContent"];
function _sfc_render$1a(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    display: "inline-block",
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      createVNode(_component_bc_container, {
        display: "inline-block",
        class: normalizeClass([$props.visible ? "relative" : null])
      }, {
        default: withCtx(() => [
          $props.visible ? (openBlock(), createBlock(_component_bc_container, {
            key: 0,
            display: "flex",
            class: normalizeClass($options.valueCssClasses)
          }, {
            default: withCtx(() => [
              !$props.icon ? (openBlock(), createElementBlock("span", {
                key: 0,
                textContent: toDisplayString($options.getValue),
                class: normalizeClass(["h-full", _ctx.makeFontWeight(this.fontWeight)])
              }, null, 10, _hoisted_1$n)) : (openBlock(), createBlock(_component_bc_icon, {
                key: 1,
                name: $props.icon,
                provider: $props.iconProvider
              }, null, 8, ["name", "provider"]))
            ]),
            _: 1
          }, 8, ["class"])) : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class"])
    ]),
    _: 3
  }, 8, ["class"]);
}
const BcBadge = /* @__PURE__ */ _export_sfc(_sfc_main$1c, [["render", _sfc_render$1a]]);
BcBadge.install = (Vue) => {
  Vue.component(BcBadge.name, BcBadge);
};
const _sfc_main$1b = {
  name: "BcBanner",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("banner")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.padding,
        this.makeUiColorVariant(this.color, this.variant),
        this.makeElevation(this.elevation),
        this.makeBorderRadius(this.roundness),
        this.makeFontSize(this.size)
      ];
    }
  },
  emits: [
    "update:visible"
  ],
  props: {
    color: {
      type: String,
      default: "primary"
    },
    dismissible: {
      type: Boolean
    },
    dismissIcon: {
      type: String,
      default: "close"
    },
    elevation: {
      type: String,
      default: "none"
    },
    iconProvider: {
      type: String,
      default: "mdi"
    },
    padding: {
      type: Array,
      default() {
        return [
          "p-2"
        ];
      }
    },
    roundness: {
      type: String,
      default: "none"
    },
    size: {
      type: String,
      default: "lg"
    },
    variant: {
      type: String,
      default: "solid"
    },
    visible: {
      type: Boolean
    },
    xAlign: {
      type: String,
      default: "center"
    }
  },
  methods: {
    dismiss() {
      this.$emit("update:visible", false);
    }
  }
};
function _sfc_render$19(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_table_layout_row = resolveComponent("bc-table-layout-row");
  const _component_bc_table_layout = resolveComponent("bc-table-layout");
  const _component_bc_container = resolveComponent("bc-container");
  return $props.visible ? (openBlock(), createBlock(_component_bc_container, {
    key: 0,
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      createVNode(_component_bc_table_layout, { "y-align": "middle" }, {
        default: withCtx(() => [
          createVNode(_component_bc_table_layout_row, null, {
            default: withCtx(() => [
              createVNode(_component_bc_table_layout_cell, {
                "full-width": "",
                "x-align": $props.xAlign
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 8, ["x-align"]),
              $props.dismissible ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                key: 0,
                "x-align": "center",
                class: normalizeClass([`${$data.baseCss}-icon-cell`, $props.padding])
              }, {
                default: withCtx(() => [
                  createVNode(_component_bc_icon, {
                    onClick: $options.dismiss,
                    name: $props.dismissIcon,
                    provider: $props.iconProvider,
                    class: normalizeClass(["cursor-pointer"])
                  }, null, 8, ["onClick", "name", "provider"])
                ]),
                _: 1
              }, 8, ["class"])) : createCommentVNode("", true)
            ]),
            _: 3
          })
        ]),
        _: 3
      })
    ]),
    _: 3
  }, 8, ["class"])) : createCommentVNode("", true);
}
const BcBanner = /* @__PURE__ */ _export_sfc(_sfc_main$1b, [["render", _sfc_render$19]]);
BcBanner.install = (Vue) => {
  Vue.component(BcBanner.name, BcBanner);
};
const _sfc_main$1a = {
  name: "BcBrandColor",
  mixins: [
    methods
  ],
  data() {
    return {
      hsl: null,
      baseCss: this.componentBaseCss("brand-color")
    };
  },
  props: {
    hex: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    swatches: {
      type: Object,
      default: () => {
        return {
          50: 95,
          100: 90,
          200: 80,
          300: 70,
          400: 65,
          600: 40,
          700: 30,
          800: 20,
          900: 10,
          950: 7.5,
          1e3: 5
        };
      }
    }
  },
  computed: {
    getLightness() {
      return this.hsl.split(",").slice(0, 2).join(",");
    },
    sanitizeClass() {
      return this.name.toLowerCase().replace(/\s+/g, " ").replace(/\s+/g, "-");
    }
  },
  watch: {
    hex() {
      this.onMounted();
    }
  },
  mounted() {
    this.onMounted();
  },
  methods: {
    onMounted() {
      this.hsl = this.hexToHsl(this.hex);
    },
    hexToHsl(hex) {
      hex = hex.replace(/#/g, "");
      if (hex.length === 3) {
        hex = hex.split("").map(function(hex2) {
          return hex2 + hex2;
        }).join("");
      }
      const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(hex);
      if (!result) {
        return null;
      }
      let r = parseInt(result[1], 16);
      let g = parseInt(result[2], 16);
      let b = parseInt(result[3], 16);
      r /= 255, g /= 255, b /= 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h2;
      let s;
      let l = (max + min) / 2;
      if (max === min) {
        h2 = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h2 = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h2 = (b - r) / d + 2;
            break;
          case b:
            h2 = (r - g) / d + 4;
            break;
        }
        h2 /= 6;
      }
      s = s * 100;
      s = Math.round(s);
      l = l * 100;
      l = Math.round(l);
      h2 = Math.round(360 * h2);
      return `${h2}, ${s}%, ${l}%`;
    }
  }
};
function _sfc_render$18(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_reactive_style = resolveComponent("bc-reactive-style");
  return $data.hsl ? (openBlock(), createBlock(_component_bc_reactive_style, { key: 0 }, {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.swatches, (lightness, swatch) => {
        return openBlock(), createElementBlock(Fragment, null, [
          createTextVNode(" .bc-app .bg-" + toDisplayString($options.sanitizeClass) + "-" + toDisplayString(swatch) + " { background-color: hsl(" + toDisplayString($options.getLightness) + ", " + toDisplayString(lightness) + "%); } .bc-app .text-" + toDisplayString($options.sanitizeClass) + "-" + toDisplayString(swatch) + " { color: hsl(" + toDisplayString($options.getLightness) + ", " + toDisplayString(lightness) + "%); } .bc-app .border-" + toDisplayString($options.sanitizeClass) + "-" + toDisplayString(swatch) + " { border-color: hsl(" + toDisplayString($options.getLightness) + ", " + toDisplayString(lightness) + "%); } ", 1)
        ], 64);
      }), 256)),
      createTextVNode(" .bc-app .text-" + toDisplayString($options.sanitizeClass) + ", .bc-app .text-" + toDisplayString($options.sanitizeClass) + "-500 { color: " + toDisplayString($props.hex) + "; } .bc-app .bg-" + toDisplayString($options.sanitizeClass) + ", .bc-app .bg-" + toDisplayString($options.sanitizeClass) + "-500 { background-color: " + toDisplayString($props.hex) + "; } .bc-app .border-" + toDisplayString($options.sanitizeClass) + ", .bc-app .border-" + toDisplayString($options.sanitizeClass) + "-500 { border-color: " + toDisplayString($props.hex) + "; } ", 1)
    ]),
    _: 1
  })) : createCommentVNode("", true);
}
const BcBrandColor = /* @__PURE__ */ _export_sfc(_sfc_main$1a, [["render", _sfc_render$18]]);
BcBrandColor.install = (Vue) => {
  Vue.component(BcBrandColor.name, BcBrandColor);
};
const _sfc_main$19 = {
  name: "BcBreadcrumbs",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("breadcrumbs")
    };
  },
  computed: {
    componentCssClasses() {
      const baseCss = this.baseCss;
      return [
        baseCss,
        this.lastItemDisabled ? `${baseCss}-last-item-disabled` : null,
        `text-${this.fontSize}`,
        `text-${this.xAlign}`,
        "bc-container",
        "select-none"
      ];
    },
    listCssClasses() {
      return [
        `${this.baseCss}-list`,
        "inline-block",
        "truncate"
      ];
    }
  },
  props: {
    xAlign: {
      type: String,
      default: "left"
    },
    useRouter: {
      type: Boolean,
      default: true
    },
    underline: {
      type: Boolean,
      default: true
    },
    fontSize: {
      type: String,
      default: "sm"
    },
    lastItemDisabled: {
      type: Boolean,
      default: true
    },
    target: {
      type: String,
      default: "_self"
    },
    divider: {
      type: String,
      default: "&raquo;"
    }
  }
};
function _sfc_render$17(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.componentCssClasses)
  }, [
    createElementVNode("ul", {
      class: normalizeClass($options.listCssClasses)
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 2)
  ], 2);
}
const BcBreadcrumbs = /* @__PURE__ */ _export_sfc(_sfc_main$19, [["render", _sfc_render$17]]);
BcBreadcrumbs.install = (Vue) => {
  Vue.component(BcBreadcrumbs.name, BcBreadcrumbs);
};
const _sfc_main$18 = {
  name: "BcBreadcrumbsItem",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("breadcrumbs-item")
    };
  },
  computed: {
    parent() {
      return this.$parent.$props;
    },
    dividerCssClasses() {
      return [
        `${this.baseCss}-divider`,
        "inline-block",
        "ml-2",
        "opacity-50"
      ];
    },
    componentCssClasses() {
      return [
        this.baseCss,
        this.parent.underline ? "underline" : null,
        "inline-block",
        "m-1",
        "white-space-nowrap"
      ];
    }
  },
  props: {
    to: {
      type: String,
      required: true
    }
  }
};
const _hoisted_1$m = ["innerHTML"];
function _sfc_render$16(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("li", {
    class: normalizeClass($options.componentCssClasses)
  }, [
    (openBlock(), createBlock(resolveDynamicComponent($options.parent.useRouter ? "router-link" : "a"), {
      to: $props.to,
      href: $props.to,
      target: $options.parent.target,
      class: normalizeClass(["inline-block"])
    }, {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "default")
      ]),
      _: 3
    }, 8, ["to", "href", "target"])),
    $options.parent.divider ? (openBlock(), createElementBlock("span", {
      key: 0,
      innerHTML: $options.parent.divider,
      class: normalizeClass($options.dividerCssClasses)
    }, null, 10, _hoisted_1$m)) : createCommentVNode("", true)
  ], 2);
}
const BcBreadcrumbsItem = /* @__PURE__ */ _export_sfc(_sfc_main$18, [["render", _sfc_render$16]]);
BcBreadcrumbsItem.install = (Vue) => {
  Vue.component(BcBreadcrumbsItem.name, BcBreadcrumbsItem);
};
const _sfc_main$17 = {
  name: "BcBtn",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("btn")
    };
  },
  computed: {
    style() {
      return {
        width: this.width
      };
    },
    paddingLabels() {
      const iconLeft = this.iconLeft;
      const iconRight = this.iconRight;
      const paddings = {
        "3xs": [iconLeft ? null : "pl-1", iconRight ? null : "pr-1", "py-1"],
        "2xs": [iconLeft ? null : "pl-2", iconRight ? null : "pr-2", "py-1"],
        "xs": [iconLeft ? null : "pl-2", iconRight ? null : "pr-2", "py-1"],
        "sm": [iconLeft ? null : "pl-2", iconRight ? null : "pr-2", "py-1"],
        "md": [iconLeft ? null : "pl-2", iconRight ? null : "pr-2", "py-1"],
        "lg": [iconLeft ? null : "pl-3", iconRight ? null : "pr-3", "py-1"],
        "xl": [iconLeft ? null : "pl-3", iconRight ? null : "pr-3", "py-2"],
        "2xl": [iconLeft ? null : "pl-3", iconRight ? null : "pr-3", "py-2"],
        "3xl": [iconLeft ? null : "pl-3", iconRight ? null : "pr-3", "py-2"],
        "4xl": [iconLeft ? null : "pl-4", iconRight ? null : "pr-4", "py-3"],
        "5xl": [iconLeft ? null : "pl-4", iconRight ? null : "pr-4", "py-3"],
        "6xl": [iconLeft ? null : "pl-5", iconRight ? null : "pr-5", "py-4"],
        "7xl": [iconLeft ? null : "pl-5", iconRight ? null : "pr-5", "py-4"],
        "8xl": [iconLeft ? null : "pl-6", iconRight ? null : "pr-6", "py-5"]
      };
      return paddings[this.size] || [];
    },
    labelCssClasses() {
      return [
        `${this.baseCss}-label`,
        "truncate",
        `font-${this.fontWeight}`,
        this.paddingLabels
      ];
    },
    componentCssClasses() {
      const baseCss = this.baseCss;
      const inert = this.inert;
      return [
        baseCss,
        this.loading ? `${baseCss}-loading` : null,
        this.icon ? `${baseCss}-icon-only` : null,
        this.block ? ["block", "w-full"] : ["inline-block", "align-middle"],
        this.uppercase ? "uppercase" : null,
        this.disabled && !this.inert ? ["disabled"] : null,
        this.loading ? ["cursor-default", "pointer-events-none"] : null,
        inert ? ["cursor-default", "pointer-events-none"] : "cursor-pointer",
        `${baseCss}-${this.size}`,
        `shadow-${this.elevation}`,
        `bg-${this.color}-${this.variant}`,
        `border-round-${this.roundness}`,
        "select-none",
        "text-center",
        "align-middle",
        "outline-none",
        "relative",
        "overflow-hidden",
        "transition-ease-out",
        "transition-all"
      ];
    }
  },
  props: {
    block: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "primary"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    elevation: {
      type: String,
      default: "sm"
    },
    fontWeight: {
      type: String,
      default: "medium"
    },
    href: {
      type: String
    },
    icon: {
      type: String
    },
    iconLeft: {
      type: String
    },
    iconLoading: {
      type: String,
      default: "loading"
    },
    iconProvider: {
      type: String,
      default: "mdi"
    },
    iconRight: {
      type: String
    },
    inert: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    roundness: {
      type: String,
      default: "full"
    },
    tag: {
      type: String,
      default: "button"
    },
    to: {
      type: String
    },
    type: {
      type: String,
      default: "button",
      validator: (value) => {
        return ["button", "submit", "reset"].includes(value);
      }
    },
    size: {
      type: String,
      default: "sm"
    },
    uppercase: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: "solid"
    },
    width: {
      type: String
    }
  }
};
function _sfc_render$15(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  const _component_bc_table_layout_row = resolveComponent("bc-table-layout-row");
  const _component_bc_table_layout = resolveComponent("bc-table-layout");
  return openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    to: $props.to,
    href: $props.href,
    style: normalizeStyle($options.style),
    disabled: $props.tag === "button" ? $props.disabled : null,
    type: $props.tag === "button" ? $props.type : null,
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      createVNode(_component_bc_table_layout, {
        class: normalizeClass([`text-${$props.size}`, "inline-table", "w-auto"]),
        "y-align": "middle"
      }, {
        default: withCtx(() => [
          createVNode(_component_bc_table_layout_row, null, {
            default: withCtx(() => [
              $props.iconLeft ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                key: 0,
                "x-align": "right",
                class: normalizeClass([`${$data.baseCss}-icon`, `${$data.baseCss}-icon-left`])
              }, {
                default: withCtx(() => [
                  $props.iconLeft ? (openBlock(), createBlock(_component_bc_icon, {
                    key: 0,
                    name: $props.iconLeft,
                    provider: $props.iconProvider
                  }, null, 8, ["name", "provider"])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["class"])) : createCommentVNode("", true),
              createVNode(_component_bc_table_layout_cell, {
                "x-align": "center",
                class: normalizeClass(["px-1"])
              }, {
                default: withCtx(() => [
                  $props.icon && (!$props.iconLeft && !$props.iconRight) && !$props.loading ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    createElementVNode("div", {
                      class: normalizeClass($options.labelCssClasses)
                    }, toDisplayString($data.baseCss), 3),
                    createVNode(_component_bc_icon, {
                      provider: $props.iconProvider,
                      name: $props.icon,
                      class: normalizeClass([`${$data.baseCss}-icon-only`])
                    }, null, 8, ["provider", "name", "class"])
                  ], 64)) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass($options.labelCssClasses)
                  }, [
                    renderSlot(_ctx.$slots, "default")
                  ], 2)),
                  $props.loading ? (openBlock(), createBlock(_component_bc_icon, {
                    key: 2,
                    provider: $props.iconProvider,
                    name: $props.iconLoading,
                    class: normalizeClass(["animate-spin"])
                  }, null, 8, ["provider", "name"])) : createCommentVNode("", true)
                ]),
                _: 3
              }),
              $props.iconRight ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                key: 1,
                "x-align": "left",
                class: normalizeClass([`${$data.baseCss}-icon`, `${$data.baseCss}-icon-right`])
              }, {
                default: withCtx(() => [
                  $props.iconRight ? (openBlock(), createBlock(_component_bc_icon, {
                    key: 0,
                    name: $props.iconRight,
                    provider: $props.iconProvider
                  }, null, 8, ["name", "provider"])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["class"])) : createCommentVNode("", true)
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["class"])
    ]),
    _: 3
  }, 8, ["to", "href", "style", "disabled", "type", "class"]);
}
const BcBtn = /* @__PURE__ */ _export_sfc(_sfc_main$17, [["render", _sfc_render$15]]);
BcBtn.install = (Vue) => {
  Vue.component(BcBtn.name, BcBtn);
};
const _sfc_main$16 = {
  name: "BcBtnGroup",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("btn-group")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.makeElevation(this.elevation),
        this.makeBorderRadius(this.roundness),
        this.block ? null : "align-middle",
        this.disabled && !this.inert ? "disabled" : null,
        "overflow-hidden",
        "select-none"
      ];
    },
    componentStyle() {
      return {
        width: this.width
      };
    }
  },
  emits: [
    "update:selection"
  ],
  props: {
    block: {
      type: Boolean,
      default: true
    },
    buttons: {
      type: Array,
      default() {
        return [];
      }
    },
    color: {
      type: String,
      default: "primary"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    elevation: {
      type: String,
      default: "sm"
    },
    exclusive: {
      type: Boolean,
      default: false
    },
    fontWeight: {
      type: String,
      default: "medium"
    },
    iconProvider: {
      type: String,
      default: "mdi"
    },
    inert: {
      type: Boolean,
      default: false
    },
    roundness: {
      type: String,
      default: "full"
    },
    selection: {
      type: Array,
      default() {
        return [];
      }
    },
    size: {
      type: String,
      default: "sm"
    },
    uppercase: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: "solid"
    },
    width: {
      type: String
    }
  },
  methods: {
    onBtnClick(name) {
      const exclusive = this.exclusive;
      const selection = this.selection;
      const event = "update:selection";
      if (exclusive) {
        this.$emit(event, [name]);
      } else {
        if (selection.includes(name)) {
          const index = selection.findIndex((item) => item === name);
          selection.splice(index, 1);
          this.$emit(event, selection);
        } else {
          this.$emit(event, selection.concat([name]));
        }
      }
    }
  }
};
function _sfc_render$14(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_btn = resolveComponent("bc-btn");
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  const _component_bc_table_layout_row = resolveComponent("bc-table-layout-row");
  const _component_bc_table_layout = resolveComponent("bc-table-layout");
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    display: $props.block ? "block" : "inline-block",
    class: normalizeClass($options.componentCssClasses),
    style: normalizeStyle($options.componentStyle),
    inert: $props.inert
  }, {
    default: withCtx(() => [
      createVNode(_component_bc_container, null, {
        default: withCtx(() => [
          createVNode(_component_bc_table_layout, {
            "equal-cells": "",
            "x-align": "center",
            "y-align": "middle"
          }, {
            default: withCtx(() => [
              createVNode(_component_bc_table_layout_row, null, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList($props.buttons, (button) => {
                    return openBlock(), createBlock(_component_bc_table_layout_cell, {
                      class: normalizeClass([$props.selection.includes(button.name) ? [`${$data.baseCss}-btn-selected`, "relative"] : null])
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_bc_btn, {
                          onClick: ($event) => $options.onBtnClick(button.name),
                          block: "",
                          elevation: "none",
                          roundness: "null",
                          "icon-provider": $props.iconProvider,
                          title: button.hint,
                          disabled: button.disabled,
                          inert: button.inert,
                          "font-weight": $props.fontWeight,
                          uppercase: $props.uppercase,
                          size: $props.size,
                          "icon-left": button.icon,
                          icon: button.label ? null : button.icon,
                          color: $props.color,
                          variant: $props.variant
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(button.label), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick", "icon-provider", "title", "disabled", "inert", "font-weight", "uppercase", "size", "icon-left", "icon", "color", "variant"])
                      ]),
                      _: 2
                    }, 1032, ["class"]);
                  }), 256))
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["display", "class", "style", "inert"]);
}
const BcBtnGroup = /* @__PURE__ */ _export_sfc(_sfc_main$16, [["render", _sfc_render$14]]);
BcBtnGroup.install = (Vue) => {
  Vue.component(BcBtnGroup.name, BcBtnGroup);
};
const cardProps$1 = {
  props: {
    borderWidth: {
      type: [
        String,
        Number
      ],
      default: 2
    },
    elevation: {
      type: String,
      default: "md"
    },
    roundness: {
      type: String,
      default: "md"
    },
    tag: {
      type: String,
      default: "div"
    },
    to: {
      type: String
    },
    href: {
      type: String
    }
  }
};
const _sfc_main$15 = {
  name: "BcCard",
  mixins: [
    methods,
    cardProps$1
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("card")
    };
  },
  computed: {
    style() {
      return {
        borderWidth: `${this.borderWidth}px`
      };
    },
    componentCssClasses() {
      return [
        this.baseCss,
        `shadow-${this.elevation}`,
        `border-round-${this.roundness}`,
        ["a", "router-link"].includes(this.tag) ? "cursor-pointer" : null,
        "border-solid"
      ];
    }
  }
};
function _sfc_render$13(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    tag: _ctx.tag,
    class: normalizeClass($options.componentCssClasses),
    style: normalizeStyle($options.style),
    to: _ctx.to,
    href: _ctx.href
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["tag", "class", "style", "to", "href"]);
}
const BcCard = /* @__PURE__ */ _export_sfc(_sfc_main$15, [["render", _sfc_render$13]]);
BcCard.install = (Vue) => {
  Vue.component(BcCard.name, BcCard);
};
const cardProps = {
  props: {
    padding: {
      type: Array,
      default() {
        return ["p-1"];
      }
    },
    tag: {
      type: String,
      default: "div"
    },
    fontSize: {
      // 'xs', 'sm', 'md' ('base'), 'lg', '3xs', '2xs', 'xs', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl'
      type: String,
      default: "sm"
    },
    xAlign: {
      type: String
    }
  }
};
const cardComputed = {
  computed: {
    cssClasses() {
      return [
        this.baseCss,
        this.padding
      ];
    }
  }
};
const _sfc_main$14 = {
  name: "BcCardActions",
  mixins: [
    cardProps,
    methods,
    cardComputed
  ],
  props: {
    color: {
      type: String,
      default: "none"
    },
    variant: {
      type: String,
      default: "solid"
    }
  },
  computed: {
    componentCssClasses() {
      return [
        this.cssClasses,
        this.makeUiColorVariant(this.color, this.variant),
        this.makeXAlign(this.xAlign),
        `text-${this.fontSize}`,
        "select-none"
      ];
    }
  },
  data() {
    return {
      baseCss: this.componentBaseCss("card-actions")
    };
  }
};
function _sfc_render$12(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    tag: _ctx.tag,
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["tag", "class"]);
}
const BcCardActions = /* @__PURE__ */ _export_sfc(_sfc_main$14, [["render", _sfc_render$12]]);
BcCardActions.install = (Vue) => {
  Vue.component(BcCardActions.name, BcCardActions);
};
const _sfc_main$13 = {
  name: "BcCardText",
  mixins: [
    methods,
    cardProps,
    cardComputed
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("card-text")
    };
  },
  computed: {
    styles() {
      return {
        height: this.height
      };
    },
    componentCssClasses() {
      const overflow = this.overflow;
      return [
        this.cssClasses,
        this.makeUiColorVariant(this.color, this.variant),
        this.makeXAlign(this.xAlign),
        `text-${this.fontSize}`,
        overflow ? `overflow-${overflow}` : null
      ];
    }
  },
  props: {
    height: {
      type: String
    },
    overflow: {
      type: String
    },
    color: {
      type: String,
      default: "none"
    },
    variant: {
      type: String,
      default: "solid"
    }
  }
};
function _sfc_render$11(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    tag: _ctx.tag,
    style: normalizeStyle($options.styles),
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["tag", "style", "class"]);
}
const BcCardText = /* @__PURE__ */ _export_sfc(_sfc_main$13, [["render", _sfc_render$11]]);
BcCardText.install = (Vue) => {
  Vue.component(BcCardText.name, BcCardText);
};
const _sfc_main$12 = {
  name: "BcCardTitle",
  mixins: [
    cardProps,
    methods,
    cardComputed
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("card-title")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.cssClasses,
        this.truncate ? "truncate" : null,
        this.makeUiColorVariant(this.color, this.variant),
        this.makeXAlign(this.xAlign),
        `font-${this.fontWeight}`,
        `text-${this.fontSize}`
      ];
    }
  },
  props: {
    truncate: {
      type: Boolean,
      default: true
    },
    fontWeight: {
      type: String,
      default: "semibold"
    },
    color: {
      type: String,
      default: "none"
    },
    variant: {
      type: String,
      default: "solid"
    }
  }
};
function _sfc_render$10(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    tag: _ctx.tag,
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["tag", "class"]);
}
const BcCardTitle = /* @__PURE__ */ _export_sfc(_sfc_main$12, [["render", _sfc_render$10]]);
BcCardTitle.install = (Vue) => {
  Vue.component(BcCardTitle.name, BcCardTitle);
};
const _sfc_main$11 = {
  name: "BcCheckbox",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("checkbox")
    };
  },
  emits: [
    "update:checked",
    "update:indeterminate"
  ],
  props: {
    block: {
      type: Boolean,
      default: true
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean
    },
    iconChecked: {
      type: String,
      default: "checkbox-marked-outline"
    },
    iconIndeterminate: {
      type: String,
      default: "checkbox-intermediate"
    },
    iconProvider: {
      type: String,
      default: "mdi"
    },
    iconUnchecked: {
      type: String,
      default: "checkbox-blank-outline"
    },
    id: {
      type: String
    },
    indeterminate: {
      type: Boolean
    },
    inert: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    labelFontWeight: {
      type: String,
      default: "normal"
    },
    labelUppercase: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    size: {
      type: String,
      default: "sm"
    }
  },
  computed: {
    componentClasses() {
      return [
        this.baseCss,
        this.disabled && !this.inert ? "disabled" : null,
        this.block ? "block" : ["inline-block", "align-middle"],
        `text-${this.size}`,
        "select-none",
        "cursor-pointer"
      ];
    },
    icons() {
      return this.indeterminate ? this.iconIndeterminate : this.checked ? this.iconChecked : this.iconUnchecked;
    },
    labelCssClasses() {
      return [
        this.labelUppercase ? "uppercase" : null,
        "truncate",
        "text-left",
        `font-${this.labelFontWeight}`
      ];
    }
  },
  methods: {
    onChange() {
      this.$emit("update:indeterminate", false);
      this.$emit("update:checked", !this.checked);
    }
  }
};
const _hoisted_1$l = ["inert"];
const _hoisted_2$9 = ["aria-checked", "checked", "indeterminate", "name", "id"];
function _sfc_render$$(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  const _component_bc_container = resolveComponent("bc-container");
  const _component_bc_table_layout_row = resolveComponent("bc-table-layout-row");
  const _component_bc_table_layout = resolveComponent("bc-table-layout");
  return openBlock(), createElementBlock("label", {
    role: "checkbox",
    class: normalizeClass($options.componentClasses),
    inert: $props.inert
  }, [
    createVNode(_component_bc_table_layout, { "y-align": "middle" }, {
      default: withCtx(() => [
        createVNode(_component_bc_table_layout_row, null, {
          default: withCtx(() => [
            createVNode(_component_bc_table_layout_cell, {
              class: normalizeClass([`${$data.baseCss}-icon-cell`, "p-1"]),
              "x-align": "center"
            }, {
              default: withCtx(() => [
                createVNode(_component_bc_icon, {
                  provider: $props.iconProvider,
                  name: $options.icons
                }, null, 8, ["provider", "name"])
              ]),
              _: 1
            }, 8, ["class"]),
            createVNode(_component_bc_table_layout_cell, {
              class: normalizeClass(["p-1", "pl-0", $props.label ? null : ["pointer-events-none", "invisible"]])
            }, {
              default: withCtx(() => [
                createVNode(_component_bc_container, {
                  class: normalizeClass($options.labelCssClasses),
                  textContent: toDisplayString($props.label)
                }, null, 8, ["class", "textContent"])
              ]),
              _: 1
            }, 8, ["class"])
          ]),
          _: 1
        })
      ]),
      _: 1
    }),
    createElementVNode("input", {
      type: "checkbox",
      tabindex: "-1",
      "aria-checked": $props.checked,
      onChange: _cache[0] || (_cache[0] = (...args) => $options.onChange && $options.onChange(...args)),
      checked: $props.checked,
      class: normalizeClass(["hidden"]),
      indeterminate: $props.indeterminate,
      name: $props.name,
      id: $props.id
    }, null, 40, _hoisted_2$9)
  ], 10, _hoisted_1$l);
}
const BcCheckbox = /* @__PURE__ */ _export_sfc(_sfc_main$11, [["render", _sfc_render$$]]);
BcCheckbox.install = (Vue) => {
  Vue.component(BcCheckbox.name, BcCheckbox);
};
const _sfc_main$10 = {
  name: "BcChip",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("chip")
    };
  },
  emits: [
    "update:visible"
  ],
  computed: {
    componentStyle() {
      return {
        width: this.width
      };
    },
    componentCssClasses() {
      return [
        this.baseCss,
        this.block ? null : "align-middle",
        this.uppercase ? "uppercase" : null,
        this.disabled && !this.inert ? "disabled" : null,
        this.clickable ? ["cursor-pointer"] : ["cursor-default"],
        this.makeFontSize(this.fontSize),
        this.makeBorderRadius(this.roundness),
        this.makeUiColorVariant(this.color, this.variant),
        this.makeElevation(this.elevation),
        this.makeFontWeight(this.fontWeight),
        "overflow-hidden",
        "select-none"
      ];
    }
  },
  props: {
    block: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "primary"
    },
    clickable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dismissIcon: {
      type: String,
      default: "close-circle"
    },
    dismissible: {
      type: Boolean,
      default: true
    },
    elevation: {
      type: String,
      default: "sm"
    },
    fontSize: {
      type: String,
      default: "sm"
    },
    fontWeight: {
      type: String,
      default: "normal"
    },
    icon: {
      type: String
    },
    iconProvider: {
      type: String,
      default: "mdi"
    },
    inert: {
      type: Boolean,
      default: false
    },
    padding: {
      type: Array,
      default() {
        return ["p-1"];
      }
    },
    roundness: {
      type: String,
      default: "full"
    },
    tag: {
      type: String,
      default: "div"
    },
    uppercase: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: "solid"
    },
    visible: {
      type: Boolean,
      default: true
    },
    width: {
      type: String
    }
  }
};
function _sfc_render$_(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  const _component_bc_table_layout_row = resolveComponent("bc-table-layout-row");
  const _component_bc_table_layout = resolveComponent("bc-table-layout");
  const _component_bc_container = resolveComponent("bc-container");
  return $props.visible ? (openBlock(), createBlock(_component_bc_container, {
    key: 0,
    tag: $props.tag,
    inert: $props.inert,
    display: $props.block ? "block" : "inline-block",
    class: normalizeClass($options.componentCssClasses),
    style: normalizeStyle($options.componentStyle)
  }, {
    default: withCtx(() => [
      createVNode(_component_bc_table_layout, { "y-align": "middle" }, {
        default: withCtx(() => [
          createVNode(_component_bc_table_layout_row, null, {
            default: withCtx(() => [
              $props.icon ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                key: 0,
                class: normalizeClass([`${$data.baseCss}-icon-cell`, $props.padding]),
                "x-align": "center"
              }, {
                default: withCtx(() => [
                  createVNode(_component_bc_icon, {
                    name: $props.icon,
                    provider: $props.iconProvider
                  }, null, 8, ["name", "provider"])
                ]),
                _: 1
              }, 8, ["class"])) : createCommentVNode("", true),
              createVNode(_component_bc_table_layout_cell, {
                "x-align": "center",
                class: normalizeClass([$props.icon ? null : "pl-3", $props.dismissible ? null : "pr-3", "w-full", !$props.icon && !$props.dismissible ? "py-1" : null])
              }, {
                default: withCtx(() => [
                  createElementVNode("div", {
                    class: normalizeClass(["truncate", $props.width ? ["w-11", "m-auto"] : null])
                  }, [
                    renderSlot(_ctx.$slots, "default")
                  ], 2)
                ]),
                _: 3
              }, 8, ["class"]),
              $props.dismissible ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                key: 1,
                class: normalizeClass([`${$data.baseCss}-icon-cell`, $props.padding]),
                "x-align": "center"
              }, {
                default: withCtx(() => [
                  createVNode(_component_bc_icon, {
                    name: $props.dismissIcon,
                    provider: $props.iconProvider,
                    onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("update:visible", false)),
                    class: normalizeClass(["cursor-pointer"])
                  }, null, 8, ["name", "provider"])
                ]),
                _: 1
              }, 8, ["class"])) : createCommentVNode("", true)
            ]),
            _: 3
          })
        ]),
        _: 3
      })
    ]),
    _: 3
  }, 8, ["tag", "inert", "display", "class", "style"])) : createCommentVNode("", true);
}
const BcChip = /* @__PURE__ */ _export_sfc(_sfc_main$10, [["render", _sfc_render$_]]);
BcChip.install = (Vue) => {
  Vue.component(BcChip.name, BcChip);
};
const _sfc_main$$ = {
  name: "BcCollapsible",
  mixins: [
    methods
  ],
  data() {
    return {
      name: methods.methods.uuid(),
      baseCss: this.componentBaseCss("collapsible")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.disabled && !this.inert ? "disabled" : null,
        `shadow-${this.elevation}`,
        `border-round-${this.roundness}`,
        "block",
        "bc-container",
        "overflow-hidden"
      ];
    }
  },
  props: {
    animationSpeed: {
      type: Number,
      default: 200
      // 100 - 3000
    },
    contentMaxHeight: {
      type: String
    },
    contentSize: {
      type: String,
      default: "sm"
    },
    contentPadding: {
      type: Array,
      default() {
        return ["p-1"];
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    elevation: {
      type: String,
      default: "md"
    },
    headerFontWeight: {
      type: String,
      default: "semibold"
    },
    headerSize: {
      type: String,
      default: "sm"
    },
    iconCollapse: {
      type: String,
      default: "chevron-up"
    },
    iconExpand: {
      type: String,
      default: "chevron-down"
    },
    iconProvider: {
      type: String,
      default: "mdi"
    },
    inert: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: true
    },
    roundness: {
      type: String,
      default: "md"
    }
  }
};
const _hoisted_1$k = ["inert"];
function _sfc_render$Z(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.componentCssClasses),
    inert: $props.inert
  }, [
    createElementVNode("ul", null, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 10, _hoisted_1$k);
}
const BcCollapsible = /* @__PURE__ */ _export_sfc(_sfc_main$$, [["render", _sfc_render$Z]]);
BcCollapsible.install = (Vue) => {
  Vue.component(BcCollapsible.name, BcCollapsible);
};
const _sfc_main$_ = {
  name: "BcCollapsibleItem",
  mixins: [
    methods
  ],
  data() {
    return {
      multiple: false,
      id: this.uuid(),
      baseCss: this.componentBaseCss("collapsible-item"),
      events: {
        collapse: "bc-collapsible-item:collapse",
        update: "update:expanded",
        expandAll: "bc-collapsible:expand-all",
        collapseAll: "bc-collapsible:collapse-all"
      }
    };
  },
  emits: [
    "update:expanded"
  ],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    expanded: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    },
    inert: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    subLabel: {
      type: String
    }
  },
  computed: {
    contentStyle() {
      const maxHeight = this.parent.contentMaxHeight;
      return {
        maxHeight,
        overflow: maxHeight ? "auto" : "hidden"
      };
    },
    parent() {
      return this.$parent.$props;
    },
    componentCssClasses() {
      const baseCss = this.baseCss;
      return [
        baseCss,
        this.disabled && !this.inert ? "disabled" : null,
        `${baseCss}-${this.expanded ? "expanded" : "collapsed"}`
      ];
    },
    headerCssClasses() {
      return [
        "cursor-pointer",
        "select-none",
        `${this.baseCss}-header`,
        "transition-all",
        `transition-duration-${this.parent.animationSpeed}`,
        `text-${this.parent.headerSize}`
      ];
    },
    contentCssClasses() {
      const baseCss = this.baseCss;
      const expanded = this.expanded;
      return [
        `${baseCss}-container`,
        "transition-all",
        `transition-duration-${this.parent.animationSpeed}`,
        expanded ? ["animate-height"] : ["h-0", "overflow-hidden", "p-0"],
        `${baseCss}-container-${expanded ? "expanded" : "collapsed"}`
      ];
    }
  },
  mounted() {
    this.init();
  },
  created() {
    this.bind();
  },
  methods: {
    init() {
      this.multiple = this.parent.multiple;
    },
    toggle() {
      const events = this.events;
      this.$emit(events.update, !this.expanded);
      if (!this.multiple) {
        this.$emitter.emit(events.collapse, this.id);
      }
    },
    bind() {
      const emitter = this.$emitter;
      const events = this.events;
      emitter.on(events.collapse, (id) => {
        if (this.id !== id) {
          this.$emit(events.update, false);
        }
      });
      emitter.on(events.expandAll, (id) => {
        this.$emit(events.update, true);
      });
      emitter.on(events.collapseAll, (id) => {
        this.$emit(events.update, false);
      });
    }
  }
};
function _sfc_render$Y(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  const _component_bc_container = resolveComponent("bc-container");
  const _component_bc_table_layout_row = resolveComponent("bc-table-layout-row");
  const _component_bc_table_layout = resolveComponent("bc-table-layout");
  return openBlock(), createBlock(_component_bc_container, {
    tag: "li",
    class: normalizeClass($options.componentCssClasses),
    inert: $props.inert
  }, {
    default: withCtx(() => [
      createVNode(_component_bc_table_layout, {
        class: normalizeClass($options.headerCssClasses),
        "y-align": "middle",
        onClick: $options.toggle
      }, {
        default: withCtx(() => [
          createVNode(_component_bc_table_layout_row, null, {
            default: withCtx(() => [
              $props.icon ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                key: 0,
                class: normalizeClass([`${$data.baseCss}-header-icon`, "text-center", "p-2"])
              }, {
                default: withCtx(() => [
                  createVNode(_component_bc_icon, {
                    name: $props.icon,
                    provider: $options.parent.iconProvider,
                    class: normalizeClass(["align-bottom"])
                  }, null, 8, ["name", "provider"])
                ]),
                _: 1
              }, 8, ["class"])) : createCommentVNode("", true),
              _ctx.$slots["left"] ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                key: 1,
                onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                }, ["stop"])),
                class: normalizeClass(["p-2", "text-left"])
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "left")
                ]),
                _: 3
              })) : createCommentVNode("", true),
              createVNode(_component_bc_table_layout_cell, {
                class: normalizeClass(["py-2", $props.icon ? null : ["pl-2"], "pr-2", "w-full", `font-${$options.parent.headerFontWeight}`])
              }, {
                default: withCtx(() => [
                  $props.label ? (openBlock(), createBlock(_component_bc_container, {
                    key: 0,
                    textContent: toDisplayString($props.label),
                    class: normalizeClass(["truncate"])
                  }, null, 8, ["textContent"])) : createCommentVNode("", true),
                  $props.subLabel ? (openBlock(), createBlock(_component_bc_container, {
                    key: 1,
                    textContent: toDisplayString($props.subLabel),
                    class: normalizeClass(["truncate", "text-xs", "font-normal", "opacity-75"])
                  }, null, 8, ["textContent"])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["class"]),
              _ctx.$slots["right"] ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                key: 2,
                onClick: _cache[1] || (_cache[1] = withModifiers(() => {
                }, ["stop"])),
                class: normalizeClass(["p-2", "text-right"])
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "right")
                ]),
                _: 3
              })) : createCommentVNode("", true),
              createVNode(_component_bc_table_layout_cell, {
                class: normalizeClass([`${$data.baseCss}-header-icon`, "p-2"])
              }, {
                default: withCtx(() => [
                  createVNode(_component_bc_icon, {
                    name: $options.parent[$props.expanded ? "iconCollapse" : "iconExpand"],
                    provider: $options.parent.iconProvider,
                    class: normalizeClass(["align-bottom"])
                  }, null, 8, ["name", "provider"])
                ]),
                _: 1
              }, 8, ["class"])
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["class", "onClick"]),
      createVNode(_component_bc_container, {
        class: normalizeClass($options.contentCssClasses),
        style: normalizeStyle($options.contentStyle)
      }, {
        default: withCtx(() => [
          createVNode(_component_bc_container, {
            class: normalizeClass([$options.parent.contentPadding, `text-${$options.parent.contentSize}`])
          }, {
            default: withCtx(() => [
              _ctx.$slots["top"] ? (openBlock(), createBlock(_component_bc_container, { key: 0 }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "top")
                ]),
                _: 3
              })) : createCommentVNode("", true),
              renderSlot(_ctx.$slots, "default"),
              _ctx.$slots["bottom"] ? (openBlock(), createBlock(_component_bc_container, { key: 1 }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "bottom")
                ]),
                _: 3
              })) : createCommentVNode("", true)
            ]),
            _: 3
          }, 8, ["class"])
        ]),
        _: 3
      }, 8, ["class", "style"])
    ]),
    _: 3
  }, 8, ["class", "inert"]);
}
const BcCollapsibleItem = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["render", _sfc_render$Y]]);
BcCollapsibleItem.install = (Vue) => {
  Vue.component(BcCollapsibleItem.name, BcCollapsibleItem);
};
const _sfc_main$Z = {
  name: "BcColorPicker",
  mixins: [
    methods
  ],
  data() {
    return {
      model: null,
      baseCss: this.componentBaseCss("color-picker")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.block ? null : "align-middle",
        this.disabled && !this.inert ? "disabled" : null,
        "select-none",
        "cursor-pointer",
        "align-left"
      ];
    },
    colorInputCssClasses() {
      return [
        "clip-0",
        "absolute",
        "appearance-none"
      ];
    },
    iconCssClasses() {
      return [
        this.makeUiColorVariant(this.iconColor, "solid"),
        "background-unset"
      ];
    },
    colorPreviewStyle() {
      return {
        minHeight: this.size,
        background: this.value
      };
    },
    labelWrapperCssClasses() {
      return [
        "w-full",
        "whitespace-nowrap",
        "truncate",
        "cursor-pointer",
        "align-left"
      ];
    },
    labelCssClasses() {
      return [
        "align-middle",
        "align-left",
        this.labelPadding,
        this.makeFontSize(this.labelFontSize),
        this.makeFontWeight(this.labelFontWeight)
      ];
    },
    prepareClassName() {
      return this.value.replace("#", "").toLowerCase();
    },
    valueToLowerCase() {
      return this.value.toLowerCase();
    },
    colorPreviewCssClasses() {
      return [
        "align-middle",
        "align-center",
        "transition-all",
        "transition-duration-200",
        this.makeBorderRadius(this.roundness),
        this.makeElevation(this.elevation)
      ];
    },
    colorPreviewInnerWrapperCssClasses() {
      return [
        this.makeFontSize(this.iconSize),
        "h-full",
        "justify-content-center",
        "align-items-center"
      ];
    }
  },
  emits: [
    "update:value"
  ],
  props: {
    block: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    elevation: {
      type: String,
      default: "sm"
    },
    icon: {
      type: String
    },
    iconColor: {
      type: String,
      default: "secondary"
    },
    iconProvider: {
      type: String,
      default: "mdi"
    },
    iconSize: {
      type: String,
      default: "md"
    },
    inert: {
      type: Boolean,
      default: false
    },
    label: {
      type: Boolean,
      default: true
    },
    labelFontSize: {
      type: String,
      default: "sm"
    },
    labelFontWeight: {
      type: String,
      default: "normal"
    },
    labelPadding: {
      type: Array,
      default: [
        "p-2"
      ]
    },
    roundness: {
      type: String,
      default: "sm"
    },
    size: {
      type: String,
      default: "32px"
    },
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    update($event) {
      this.$emit("update:value", $event.target.value);
    }
  }
};
const _hoisted_1$j = ["disabled", "value"];
function _sfc_render$X(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_container = resolveComponent("bc-container");
  const _directive_aspect_ratio = resolveDirective("aspect-ratio");
  return openBlock(), createBlock(_component_bc_container, {
    display: $props.block ? "block" : "inline-block",
    class: normalizeClass($options.componentCssClasses),
    inert: $props.inert
  }, {
    default: withCtx(() => [
      createVNode(_component_bc_container, {
        tag: "label",
        class: normalizeClass($options.labelWrapperCssClasses)
      }, {
        default: withCtx(() => [
          createElementVNode("input", {
            onInput: _cache[0] || (_cache[0] = (...args) => $options.update && $options.update(...args)),
            disabled: $props.disabled,
            value: $props.value,
            type: "color",
            class: normalizeClass($options.colorInputCssClasses)
          }, null, 42, _hoisted_1$j),
          withDirectives((openBlock(), createBlock(_component_bc_container, {
            display: "inline-block",
            class: normalizeClass($options.colorPreviewCssClasses),
            style: normalizeStyle($options.colorPreviewStyle)
          }, {
            default: withCtx(() => [
              createVNode(_component_bc_container, {
                display: "flex",
                class: normalizeClass($options.colorPreviewInnerWrapperCssClasses)
              }, {
                default: withCtx(() => [
                  $props.icon ? (openBlock(), createBlock(_component_bc_icon, {
                    key: 0,
                    name: $props.icon,
                    provider: $props.iconProvider,
                    class: normalizeClass($options.iconCssClasses)
                  }, null, 8, ["name", "provider", "class"])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["class"])
            ]),
            _: 1
          }, 8, ["class", "style"])), [
            [_directive_aspect_ratio, 1 / 1]
          ]),
          $props.label ? (openBlock(), createBlock(_component_bc_container, {
            key: 0,
            display: "inline-block",
            textContent: toDisplayString($options.valueToLowerCase),
            class: normalizeClass($options.labelCssClasses)
          }, null, 8, ["textContent", "class"])) : createCommentVNode("", true)
        ]),
        _: 1
      }, 8, ["class"])
    ]),
    _: 1
  }, 8, ["display", "class", "inert"]);
}
const BcColorPicker = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["render", _sfc_render$X]]);
BcColorPicker.install = (Vue) => {
  Vue.component(BcColorPicker.name, BcColorPicker);
};
const _sfc_main$Y = {
  name: "BcContainer",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("container")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.display,
        this.truncate ? "truncate" : null
      ];
    }
  },
  props: {
    display: {
      type: String,
      default: "block"
    },
    tag: {
      type: String,
      default: "div"
    },
    truncate: {
      type: Boolean,
      default: false
    }
  }
};
function _sfc_render$W(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
const ComponentTemplate$3 = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["render", _sfc_render$W]]);
ComponentTemplate$3.install = (Vue) => {
  Vue.component(ComponentTemplate$3.name, ComponentTemplate$3);
};
const _sfc_main$X = {
  name: "BcContextMenu",
  mixins: [
    methods
  ],
  data() {
    return {
      height: "auto",
      // @todo: this is to be determined by the position of the menu
      baseCss: this.componentBaseCss("context-menu"),
      config: null,
      top: 0,
      left: 0
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.config ? "opacity-100" : ["opacity-0", "pointer-events-none"],
        "select-none",
        "fixed",
        "transition-opacity",
        "transition-duration-500"
      ];
    },
    componentStyles() {
      return {
        top: this.top,
        left: this.left,
        zIndex: this.zIndex
      };
    }
  },
  mounted() {
    this.bind();
  },
  unmounted() {
    this.unbind();
  },
  props: {
    elevation: {
      type: String,
      default: "xl"
    },
    fontSizeSubTitle: {
      type: String,
      default: "xs"
    },
    fontSizeTitle: {
      type: String,
      default: "sm"
    },
    fontWeightSubTitle: {
      type: String,
      default: "normal"
    },
    fontWeightTitle: {
      type: String,
      default: "normal"
    },
    iconsProvider: {
      type: String,
      default: "mdi"
    },
    roundness: {
      type: String,
      default: "xl"
    },
    zIndex: {
      type: Number,
      default: 2e3
    }
  },
  methods: {
    bind() {
      this.$emitter.on("bc-context-menu:show", (config) => {
        const $el = this.$el;
        $el.style.width = config.width || "220px";
        this.config = config;
        this.$nextTick(() => {
          const $event = config.$event;
          const menuRect = $el.getBoundingClientRect();
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
          const margin = 4;
          let left = $event.clientX;
          let top = $event.clientY;
          if (left + menuRect.width > viewportWidth) {
            left = left - menuRect.width;
          }
          if (top + menuRect.height > viewportHeight) {
            top = top - menuRect.height;
          }
          left = Math.max(margin, Math.min(left, viewportWidth - menuRect.width - margin));
          top = Math.max(margin, Math.min(top, viewportHeight - menuRect.height - margin));
          this.top = `${top}px`;
          this.left = `${left}px`;
        });
      });
      document.addEventListener("click", this.hideContextMenu);
    },
    unbind() {
      document.removeEventListener("click", this.hideContextMenu);
    },
    itemCssClasses(item) {
      return [
        item.disabled || item.inert ? "cursor-default" : "cursor-pointer"
      ];
    },
    onItemClick(item) {
      const data = { item, $event: this.config.$event };
      this.$emitter.emit(item.event.name, data);
      this.hideContextMenu();
    },
    hideContextMenu() {
      this.config = null;
      this.top = 0;
      this.left = 0;
    }
  }
};
function _sfc_render$V(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_list_item_icon = resolveComponent("bc-list-item-icon");
  const _component_bc_list_item_content_title = resolveComponent("bc-list-item-content-title");
  const _component_bc_list_item_content_sub_title = resolveComponent("bc-list-item-content-sub-title");
  const _component_bc_list_item_content = resolveComponent("bc-list-item-content");
  const _component_bc_list_item = resolveComponent("bc-list-item");
  const _component_bc_list = resolveComponent("bc-list");
  const _component_bc_card_text = resolveComponent("bc-card-text");
  const _component_bc_card = resolveComponent("bc-card");
  const _component_bc_reactive_style = resolveComponent("bc-reactive-style");
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    onClick: _cache[0] || (_cache[0] = withModifiers(() => {
    }, ["stop", "prevent"])),
    class: normalizeClass($options.componentCssClasses),
    style: normalizeStyle($options.componentStyles)
  }, {
    default: withCtx(() => [
      createVNode(_component_bc_card, {
        elevation: $props.elevation,
        roundness: $props.roundness,
        class: normalizeClass(["overflow-hidden"])
      }, {
        default: withCtx(() => [
          createVNode(_component_bc_card_text, {
            overflow: "auto",
            height: $data.height,
            padding: []
          }, {
            default: withCtx(() => [
              $data.config && $data.config.items && $data.config.items.length ? (openBlock(), createBlock(_component_bc_list, {
                key: 0,
                hoverable: "",
                divider: ""
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList($data.config.items, (item) => {
                    return openBlock(), createBlock(_component_bc_list_item, {
                      onClick: ($event) => $options.onItemClick(item),
                      class: normalizeClass($options.itemCssClasses(item)),
                      disabled: item.disabled,
                      inert: item.inert
                    }, {
                      default: withCtx(() => [
                        $data.config.leftIcons ? (openBlock(), createBlock(_component_bc_list_item_icon, { key: 0 }, {
                          default: withCtx(() => [
                            item.iconLeft ? (openBlock(), createBlock(_component_bc_icon, {
                              key: 0,
                              name: item.iconLeft
                            }, null, 8, ["name"])) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1024)) : createCommentVNode("", true),
                        createVNode(_component_bc_list_item_content, {
                          class: normalizeClass([!$data.config.leftIcons ? "pl-2" : null, !$data.config.rightIcons ? "pr-2" : null])
                        }, {
                          default: withCtx(() => [
                            item.title ? (openBlock(), createBlock(_component_bc_list_item_content_title, {
                              key: 0,
                              truncate: "",
                              "font-weight": $props.fontWeightTitle,
                              "font-size": $props.fontSizeTitle
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.title), 1)
                              ]),
                              _: 2
                            }, 1032, ["font-weight", "font-size"])) : createCommentVNode("", true),
                            item.subTitle ? (openBlock(), createBlock(_component_bc_list_item_content_sub_title, {
                              key: 1,
                              truncate: "",
                              "font-weight": $props.fontWeightSubTitle,
                              "font-size": $props.fontSizeSubTitle
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.subTitle), 1)
                              ]),
                              _: 2
                            }, 1032, ["font-weight", "font-size"])) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1032, ["class"]),
                        $data.config.rightIcons ? (openBlock(), createBlock(_component_bc_list_item_icon, { key: 1 }, {
                          default: withCtx(() => [
                            item.iconRight ? (openBlock(), createBlock(_component_bc_icon, {
                              key: 0,
                              name: item.iconRight
                            }, null, 8, ["name"])) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1024)) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1032, ["onClick", "class", "disabled", "inert"]);
                  }), 256))
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["height"])
        ]),
        _: 1
      }, 8, ["elevation", "roundness"]),
      $data.config ? (openBlock(), createBlock(_component_bc_reactive_style, { key: 0 }, {
        default: withCtx(() => [..._cache[1] || (_cache[1] = [
          createTextVNode(" html, body { overflow: hidden; } ", -1)
        ])]),
        _: 1
      })) : createCommentVNode("", true)
    ]),
    _: 1
  }, 8, ["class", "style"]);
}
const BcContextMenu = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["render", _sfc_render$V]]);
BcContextMenu.install = (Vue) => {
  Vue.component(BcContextMenu.name, BcContextMenu);
};
const _sfc_main$W = {
  name: "BcDataTable",
  mixins: [
    methods
  ],
  data() {
    return {
      id: `bc-data-table-${this.uuid()}`,
      baseCss: this.componentBaseCss("data-table"),
      sortIndex: null,
      sortDirection: "ascending",
      search: "",
      visibleColumnsContextMenuCoords: null
    };
  },
  emits: [
    "update:visibleColumns",
    "row-click",
    "row-dblclick"
  ],
  props: {
    clickableRows: {
      type: Boolean
    },
    disabled: {
      type: Boolean,
      default: false
    },
    headers: {
      type: Array,
      default() {
        return [];
      }
    },
    headersFontSize: {
      type: String,
      default: "sm"
    },
    headersFontWeight: {
      type: String,
      default: "semibold",
      validator: (value) => {
        return [
          "light",
          "normal",
          "medium",
          "semibold",
          "bold"
        ].includes(value);
      }
    },
    headersUppercase: {
      type: Boolean,
      default: true
    },
    height: {
      type: String
    },
    hoverable: {
      type: Boolean,
      default: false
    },
    iconProvider: {
      type: String,
      default: "mdi"
    },
    inert: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default() {
        return [];
      }
    },
    itemsFontSize: {
      type: String,
      default: "sm"
    },
    noMatchingRecordsFoundLabel: {
      type: String,
      default: "No matching records found..."
    },
    padding: {
      type: Array,
      default() {
        return [
          "p-1"
        ];
      }
    },
    searchable: {
      type: Boolean,
      default: false
    },
    searchableIcon: {
      type: String,
      default: "filter"
    },
    searchableLabel: {
      type: String,
      default: "Filter Rows..."
    },
    searchInputAlign: {
      type: String,
      default: "left",
      validator(value) {
        return [
          "left",
          "right"
        ].includes(value);
      }
    },
    searchInputClearable: {
      type: Boolean,
      default: true
    },
    searchInputGridSpan: {
      type: Number,
      default: 4,
      validator(value) {
        return value > 0 && value <= 12;
      }
    },
    sortable: {
      type: Boolean,
      default: false
    },
    toggleColumns: {
      type: Boolean,
      default: false
    },
    visibleColumns: {
      type: Array,
      default() {
        return [];
      }
    },
    visibleColumnsContextMenuHeight: {
      type: String,
      default: "236px"
    },
    visibleColumnsContextMenuWidth: {
      type: String,
      default: "300px"
    },
    visibleColumnsContextMenuZIndex: {
      type: Number,
      default: 1e3
    },
    unselectableRows: {
      type: Boolean
    },
    xAlign: {
      type: String,
      default: "left",
      validator: (value) => {
        return [
          "left",
          "center",
          "right"
        ].includes(value);
      }
    },
    yAlign: {
      type: String,
      default: "center",
      validator: (value) => {
        return [
          "start",
          "center",
          "end"
        ].includes(value);
      }
    },
    zebraRows: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    visibleColumnsContextMenuStyles() {
      return [
        this.visibleColumnsContextMenuCoords ? "opacity-100" : ["opacity-0", "pointer-events-none"],
        "fixed"
      ];
    },
    headerKeys() {
      return this.headers.map((header) => {
        return header.value;
      });
    },
    filteredItems() {
      let items = this.items;
      if (this.search?.trim()) {
        const search = this.search.trim().toLowerCase();
        items = items.filter(
          (row) => Object.values(row).some((cell) => {
            const value = cell;
            const text = Array.isArray(value) ? value.join(" ") : String(value ?? "");
            return text.toLowerCase().includes(search);
          })
        );
      }
      if (!this.sortable || this.sortIndex === null || !items.length) {
        return items;
      }
      const key = Object.keys(items[0])[this.sortIndex];
      if (key === void 0) {
        return items;
      }
      const dir = this.sortDirection === "ascending" ? 1 : -1;
      return [...items].sort((a, b) => {
        const av = a[key] ?? "";
        const bv = b[key] ?? "";
        const an = parseFloat(String(av).replace(/[^0-9.\-]/g, ""));
        const bn = parseFloat(String(bv).replace(/[^0-9.\-]/g, ""));
        if (!isNaN(an) && !isNaN(bn)) {
          return (an - bn) * dir;
        }
        return String(av).localeCompare(String(bv), void 0, { sensitivity: "base" }) * dir;
      });
    },
    componentCssClasses() {
      const baseCss = this.baseCss;
      return [
        baseCss,
        this.disabled && !this.inert ? "disabled" : null,
        this.zebraRows ? `${baseCss}-zebra-rows` : null,
        this.hoverable ? `${baseCss}-hoverable` : null,
        "overflow-hidden",
        "w-full"
      ];
    },
    tableWrapperCssClasses() {
      return [
        `${this.baseCss}-table-container`,
        "overflow-x-auto"
      ];
    },
    theadCssClasses() {
      return [
        `${this.baseCss}-table-header`,
        "table-layout-thead",
        "select-none",
        this.makeFontSize(this.headersFontSize)
      ];
    },
    theadTrCssClasses() {
      return [
        `${this.baseCss}-table-header-row`
      ];
    },
    tableCssClasses() {
      return [
        `${this.baseCss}-table`
      ];
    },
    thCssClasses() {
      return [
        this.padding,
        this.headersUppercase ? "uppercase" : null,
        this.makeFontWeight(this.headersFontWeight),
        `text-${this.xAlign}`,
        "white-space-nowrap"
      ];
    },
    tBodyCssClasses() {
      return [
        `${this.baseCss}-table-body`,
        this.makeFontSize(this.itemsFontSize),
        `text-${this.xAlign}`,
        "overflow-y-auto"
      ];
    },
    tdCssClasses() {
      return [
        "p-1"
      ];
    },
    tBodyTrCssClasses() {
      return [
        `${this.baseCss}-table-body-row`,
        this.clickableRows ? "cursor-pointer" : null,
        this.unselectableRows ? "select-none" : null,
        "table-layout-tr",
        "transition-background",
        "transition-duration-300"
      ];
    }
  },
  mounted() {
    this.init();
  },
  beforeUnmount() {
    document.removeEventListener("click", this.documentClick);
  },
  methods: {
    getHeaderByValue(headerValue) {
      return this.headers.find((header) => header.value === headerValue);
    },
    init() {
      const $el = this.$el;
      const parentStyle = getComputedStyle(this.$parent.$el);
      const parentWidth = parseInt(parentStyle.width, 10);
      const parentPaddingLeft = parseInt(parentStyle.paddingLeft, 10) || 0;
      const parentPaddingRight = parseInt(parentStyle.paddingRight, 10) || 0;
      document.addEventListener("click", this.documentClick);
      $el.style.maxWidth = `${parentWidth - parentPaddingRight - parentPaddingLeft}px`;
      $el.classList.remove("hidden");
    },
    sortingIcons(index) {
      return this.sortIndex === index ? this.sortDirection === "ascending" ? "chevron-up" : "chevron-down" : "unfold-more-horizontal";
    },
    documentClick(e) {
      this.hideVisibleColumnsContextMenu();
    },
    showVisibleColumnsContextMenu($event) {
      const margin = 8;
      if (!this.toggleColumns) {
        return;
      }
      this.visibleColumnsContextMenuCoords = {
        left: `${Math.min(Math.max($event.clientX, margin), window.innerWidth - parseInt(this.visibleColumnsContextMenuWidth, 10) - margin)}px`,
        top: `${Math.min(Math.max($event.clientY, margin), window.innerHeight - parseInt(this.visibleColumnsContextMenuHeight, 10) - margin)}px`,
        zIndex: this.visibleColumnsContextMenuZIndex
      };
    },
    hideVisibleColumnsContextMenu() {
      this.visibleColumnsContextMenuCoords = null;
    },
    toggleSort(index) {
      if (this.sortIndex === index) {
        this.sortDirection = this.sortDirection === "ascending" ? "descending" : "ascending";
      } else {
        this.sortIndex = index;
        this.sortDirection = "ascending";
      }
    },
    onDblClick(item) {
      this.$emit("row-dblclick", item);
    },
    onRowClick(item) {
      this.$emit("row-click", item);
    },
    toggleColumn(header) {
      const columns = this.visibleColumns;
      const event = "update:visibleColumns";
      if (columns.includes(header)) {
        const index = columns.findIndex((column) => column === header);
        columns.splice(index, 1);
        this.$emit(event, columns);
      } else {
        columns.push(header);
        this.$emit(event, columns);
      }
    }
  }
};
const _hoisted_1$i = ["data-col", "onClick"];
const _hoisted_2$8 = ["textContent"];
const _hoisted_3$3 = ["onDblclick", "onClick"];
const _hoisted_4$2 = ["data-col"];
function _sfc_render$U(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_grid_col = resolveComponent("bc-grid-col");
  const _component_bc_text_field = resolveComponent("bc-text-field");
  const _component_bc_grid = resolveComponent("bc-grid");
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  const _component_bc_table_layout_row = resolveComponent("bc-table-layout-row");
  const _component_bc_table_layout = resolveComponent("bc-table-layout");
  const _component_bc_container = resolveComponent("bc-container");
  const _component_bc_reactive_style = resolveComponent("bc-reactive-style");
  const _component_bc_checkbox = resolveComponent("bc-checkbox");
  const _component_bc_list_item_icon = resolveComponent("bc-list-item-icon");
  const _component_bc_list_item_content_sub_title = resolveComponent("bc-list-item-content-sub-title");
  const _component_bc_list_item_content = resolveComponent("bc-list-item-content");
  const _component_bc_list_item = resolveComponent("bc-list-item");
  const _component_bc_list = resolveComponent("bc-list");
  const _component_bc_card_text = resolveComponent("bc-card-text");
  const _component_bc_card = resolveComponent("bc-card");
  return openBlock(), createBlock(_component_bc_container, {
    inert: $props.inert,
    "data-table": $data.id,
    class: normalizeClass([$options.componentCssClasses])
  }, {
    default: withCtx(() => [
      _ctx.$slots["header"] || $props.searchable ? (openBlock(), createBlock(_component_bc_grid, {
        key: 0,
        class: normalizeClass(["mb-2"])
      }, {
        default: withCtx(() => [
          createVNode(_component_bc_grid_col, {
            span: $props.searchable ? 12 - $props.searchInputGridSpan : 12,
            class: normalizeClass(["align-content-center", $props.searchInputAlign === "left" ? "flex-order-1" : null])
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "header")
            ]),
            _: 3
          }, 8, ["span", "class"]),
          $props.searchable ? (openBlock(), createBlock(_component_bc_grid_col, {
            key: 0,
            span: $props.searchInputGridSpan,
            class: normalizeClass(["align-content-center"])
          }, {
            default: withCtx(() => [
              createVNode(_component_bc_text_field, {
                block: "",
                value: $data.search,
                "onUpdate:value": _cache[0] || (_cache[0] = ($event) => $data.search = $event),
                clearable: $props.searchInputClearable,
                placeholder: $props.searchableLabel,
                "icon-left": $props.searchableIcon,
                "icon-provider": $props.iconProvider
              }, null, 8, ["value", "clearable", "placeholder", "icon-left", "icon-provider"])
            ]),
            _: 1
          }, 8, ["span"])) : createCommentVNode("", true)
        ]),
        _: 3
      })) : createCommentVNode("", true),
      createElementVNode("div", {
        class: normalizeClass($options.tableWrapperCssClasses)
      }, [
        createElementVNode("table", {
          class: normalizeClass($options.tableCssClasses)
        }, [
          createElementVNode("thead", {
            class: normalizeClass($options.theadCssClasses),
            onContextmenu: _cache[1] || (_cache[1] = withModifiers((...args) => $options.showVisibleColumnsContextMenu && $options.showVisibleColumnsContextMenu(...args), ["prevent"]))
          }, [
            createElementVNode("tr", {
              class: normalizeClass($options.theadTrCssClasses)
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList($props.headers, (header, index) => {
                return openBlock(), createElementBlock("th", {
                  key: index,
                  class: normalizeClass([$props.sortable ? ["cursor-pointer", "select-none"] : null, header.cssClasses || []]),
                  "data-col": header.value,
                  onClick: ($event) => $props.sortable && $options.toggleSort(index)
                }, [
                  createVNode(_component_bc_table_layout, null, {
                    default: withCtx(() => [
                      createVNode(_component_bc_table_layout_row, null, {
                        default: withCtx(() => [
                          createVNode(_component_bc_table_layout_cell, {
                            class: normalizeClass($options.thCssClasses)
                          }, {
                            default: withCtx(() => [
                              createElementVNode("span", {
                                textContent: toDisplayString(header.label),
                                class: normalizeClass(["inline-block"])
                              }, null, 8, _hoisted_2$8),
                              $props.sortable ? (openBlock(), createBlock(_component_bc_icon, {
                                key: 0,
                                size: "1.25",
                                provider: $props.iconProvider,
                                class: normalizeClass(["align-middle", "opacity-50", "ml-1"]),
                                name: $options.sortingIcons(index)
                              }, null, 8, ["provider", "name"])) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1032, ["class"])
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024)
                ], 10, _hoisted_1$i);
              }), 128))
            ], 2)
          ], 34),
          createElementVNode("tbody", {
            class: normalizeClass($options.tBodyCssClasses)
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($options.filteredItems, (item) => {
              return openBlock(), createElementBlock("tr", {
                class: normalizeClass($options.tBodyTrCssClasses),
                onDblclick: ($event) => $options.onDblClick(item),
                onClick: ($event) => $options.onRowClick(item)
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(item, (config, header) => {
                  return openBlock(), createElementBlock("td", {
                    class: normalizeClass([$options.tdCssClasses, $options.getHeaderByValue(header).cssClasses || [], config.cssClasses || []]),
                    "data-col": header
                  }, [
                    $options.getHeaderByValue(header).slot || config.slot ? renderSlot(_ctx.$slots, $options.getHeaderByValue(header).slot || config.slot, { data: config }, void 0, void 0, 0) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      createTextVNode(toDisplayString(config), 1)
                    ], 64))
                  ], 10, _hoisted_4$2);
                }), 256))
              ], 42, _hoisted_3$3);
            }), 256))
          ], 2)
        ], 2),
        !$options.filteredItems.length ? (openBlock(), createBlock(_component_bc_container, {
          key: 0,
          textContent: toDisplayString($props.noMatchingRecordsFoundLabel),
          class: normalizeClass(["text-center", "p-3", "opacity-50", "text-xs", "uppercase", "font-semibold"])
        }, null, 8, ["textContent"])) : createCommentVNode("", true),
        createVNode(_component_bc_reactive_style, null, {
          default: withCtx(() => [
            createTextVNode(' [data-table="' + toDisplayString($data.id) + '"] .bc-data-table-table { grid-template-columns: repeat(' + toDisplayString($props.toggleColumns ? $props.visibleColumns.length : $props.headers.length) + ', auto); } [data-table="' + toDisplayString($data.id) + '"] .bc-data-table-table-header-row, [data-table="' + toDisplayString($data.id) + '"] .bc-data-table-table-body-row, [data-table="' + toDisplayString($data.id) + '"] .bc-data-table-table { align-items: ' + toDisplayString($props.yAlign) + '; } [data-table="' + toDisplayString($data.id) + '"] .bc-data-table-table-body { height: ' + toDisplayString($props.height) + "; } ", 1)
          ]),
          _: 1
        })
      ], 2),
      _ctx.$slots["footer"] ? (openBlock(), createBlock(_component_bc_container, { key: 1 }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "footer")
        ]),
        _: 3
      })) : createCommentVNode("", true),
      $props.toggleColumns ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
        createVNode(_component_bc_card, {
          onClick: _cache[2] || (_cache[2] = withModifiers(() => {
          }, ["prevent", "stop"])),
          class: normalizeClass($options.visibleColumnsContextMenuStyles),
          style: normalizeStyle($data.visibleColumnsContextMenuCoords),
          elevation: "2xl"
        }, {
          default: withCtx(() => [
            createVNode(_component_bc_card_text, { padding: [] }, {
              default: withCtx(() => [
                createVNode(_component_bc_list, {
                  divider: "",
                  clickable: "",
                  hoverable: "",
                  "max-height": $props.visibleColumnsContextMenuHeight,
                  style: normalizeStyle({ width: $props.visibleColumnsContextMenuWidth })
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList($props.headers, (header) => {
                      return openBlock(), createBlock(_component_bc_list_item, {
                        onClick: ($event) => $options.toggleColumn(header.value),
                        class: normalizeClass([$props.visibleColumns.includes(header.value) ? "opacity-100" : "opacity-50"])
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_bc_list_item_icon, null, {
                            default: withCtx(() => [
                              createVNode(_component_bc_checkbox, {
                                class: normalizeClass(["pointer-events-none"]),
                                checked: $props.visibleColumns.includes(header.value)
                              }, null, 8, ["checked"])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_bc_list_item_content, null, {
                            default: withCtx(() => [
                              createVNode(_component_bc_list_item_content_sub_title, {
                                class: normalizeClass(["text-sm"]),
                                textContent: toDisplayString(header.label)
                              }, null, 8, ["textContent"])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["onClick", "class"]);
                    }), 256))
                  ]),
                  _: 1
                }, 8, ["max-height", "style"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["class", "style"]),
        (openBlock(true), createElementBlock(Fragment, null, renderList($options.headerKeys, (key) => {
          return openBlock(), createBlock(_component_bc_reactive_style, null, {
            default: withCtx(() => [
              createTextVNode(' [data-table="' + toDisplayString($data.id) + '"] [data-col="' + toDisplayString(key) + '"] { display: ' + toDisplayString($props.visibleColumns.includes(key) ? "initial" : "none") + "; } ", 1)
            ]),
            _: 2
          }, 1024);
        }), 256))
      ], 64)) : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["inert", "data-table", "class"]);
}
const BcDataTable = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["render", _sfc_render$U]]);
BcDataTable.install = (Vue) => {
  Vue.component(BcDataTable.name, BcDataTable);
};
const _sfc_main$V = {
  name: "BcDialogBox",
  data() {
    return {
      id: `bc-dialog-box-${this.uuid()}`,
      titleBarHeight: null,
      baseCss: this.componentBaseCss("dialog-box")
    };
  },
  mixins: [
    methods
  ],
  computed: {
    componentCssClasses() {
      const baseCss = this.baseCss;
      return [
        this.baseCss,
        "fixed",
        "top-0",
        "right-0",
        "bottom-0",
        "left-0",
        this.titleBar ? `${baseCss}-title-bar` : null,
        this.modal && !this.fullScreen ? null : ["pointer-events-none", `${this.baseCss}-modal-inert`],
        this.modalInert ? `${baseCss}-modal-inert` : null,
        this.backdropBlur ? "bc-dialog-box-backdrop-blur" : null,
        this.fullScreen ? `${baseCss}-full-screen` : null
      ];
    },
    titleBarCssClasses() {
      return [
        "select-none",
        `bg-${this.titleColor}-solid`
      ];
    },
    cardCssClasses() {
      const fullScreen = this.fullScreen;
      return [
        "fixed",
        fullScreen ? "top-0" : "top-50",
        fullScreen ? "left-0" : "left-50",
        fullScreen ? null : "-translate-50",
        fullScreen ? "h-device" : null,
        "transition-all",
        "transition-duration-100",
        "pointer-events-all"
      ];
    },
    style() {
      return {
        zIndex: this.zIndex
      };
    },
    cardStyle() {
      return {
        minWidth: this.minWidth,
        maxWidth: this.maxWidth
      };
    }
  },
  emits: [
    "update:visible"
  ],
  props: {
    backdropBlur: {
      type: Boolean,
      default: true
    },
    contentHeight: {
      type: String
    },
    contentOverflow: {
      type: String
    },
    contentPadding: {
      type: Array,
      default() {
        return ["p-1"];
      }
    },
    dismissButton: {
      type: Boolean,
      default: true
    },
    dismissOnRouteChange: {
      type: Boolean,
      default: true
    },
    elevation: {
      type: String,
      default: "3xl"
    },
    fullScreen: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    },
    iconProvider: {
      type: String
    },
    maxWidth: {
      type: String,
      default: "60%"
    },
    minWidth: {
      type: String,
      default: "480px"
    },
    modal: {
      type: Boolean,
      default: true
    },
    modalInert: {
      type: Boolean,
      default: false
    },
    persistent: {
      type: Boolean,
      default: true
    },
    roundness: {
      type: String,
      default: "xl"
    },
    title: {
      type: [
        Number,
        String
      ]
    },
    titleBar: {
      type: Boolean,
      default: true
    },
    titleColor: {
      type: String,
      default: "primary"
    },
    titleDivider: {
      type: Boolean,
      default: true
    },
    titleFontSize: {
      type: String
    },
    titleFontWeight: {
      type: String
    },
    visible: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 1e3
    }
  },
  watch: {
    visible() {
      if (this.visible && this.fullScreen) {
        this.awaitForElement(`#${this.id}-title-bar`).then((element) => {
          this.titleBarHeight = element.offsetHeight;
        });
      }
    },
    "$route.path"() {
      this.dismiss();
    }
  },
  methods: {
    dismiss() {
      this.$emit("update:visible", false);
    },
    onDialogBodyClick($event) {
      this.$emitter.emit("bc-dropdown-hide", $event);
    }
  }
};
function _sfc_render$T(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  const _component_bc_container = resolveComponent("bc-container");
  const _component_bc_table_layout_row = resolveComponent("bc-table-layout-row");
  const _component_bc_table_layout = resolveComponent("bc-table-layout");
  const _component_bc_card_title = resolveComponent("bc-card-title");
  const _component_bc_divider = resolveComponent("bc-divider");
  const _component_bc_card_text = resolveComponent("bc-card-text");
  const _component_bc_card = resolveComponent("bc-card");
  const _component_bc_reactive_style = resolveComponent("bc-reactive-style");
  const _directive_scroll_lock = resolveDirective("scroll-lock");
  return openBlock(), createBlock(Transition, {
    name: "dialog-pop",
    "data-dialog-box-id": $data.id
  }, {
    default: withCtx(() => [
      $props.visible ? withDirectives((openBlock(), createBlock(_component_bc_container, {
        key: 0,
        onClick: _cache[0] || (_cache[0] = ($event) => $props.persistent ? null : $options.dismiss()),
        style: normalizeStyle($options.style),
        display: "initial",
        class: normalizeClass($options.componentCssClasses)
      }, {
        default: withCtx(() => [
          createVNode(_component_bc_card, {
            onClick: withModifiers($options.onDialogBodyClick, ["stop"]),
            style: normalizeStyle($options.cardStyle),
            class: normalizeClass($options.cardCssClasses),
            elevation: $props.fullScreen ? "none" : $props.elevation,
            roundness: $props.fullScreen ? "none" : $props.roundness,
            "border-width": 0
          }, {
            default: withCtx(() => [
              $props.titleBar ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createVNode(_component_bc_card_title, {
                  id: `${$data.id}-title-bar`,
                  "font-size": $props.titleFontSize,
                  "font-weight": $props.titleFontWeight,
                  class: normalizeClass($options.titleBarCssClasses)
                }, {
                  default: withCtx(() => [
                    createVNode(_component_bc_table_layout, { "y-align": "middle" }, {
                      default: withCtx(() => [
                        createVNode(_component_bc_table_layout_row, null, {
                          default: withCtx(() => [
                            $props.icon ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                              key: 0,
                              "x-align": "center",
                              class: normalizeClass([`${$data.baseCss}-title-bar-icon-cell`])
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_bc_icon, {
                                  name: $props.icon,
                                  provider: $props.iconProvider,
                                  onDblclick: $options.dismiss,
                                  class: normalizeClass(["cursor-pointer"])
                                }, null, 8, ["name", "provider", "onDblclick"])
                              ]),
                              _: 1
                            }, 8, ["class"])) : createCommentVNode("", true),
                            createVNode(_component_bc_table_layout_cell, {
                              class: normalizeClass(["px-1", "w-full"])
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_bc_container, {
                                  textContent: toDisplayString($props.title),
                                  class: normalizeClass(["truncate"])
                                }, null, 8, ["textContent"])
                              ]),
                              _: 1
                            }),
                            $props.dismissButton ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                              key: 1,
                              "x-align": "center",
                              class: normalizeClass([`${$data.baseCss}-title-bar-icon-cell`])
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_bc_icon, {
                                  name: "close",
                                  provider: $props.iconProvider,
                                  onClick: $options.dismiss,
                                  class: normalizeClass(["cursor-pointer"])
                                }, null, 8, ["provider", "onClick"])
                              ]),
                              _: 1
                            }, 8, ["class"])) : createCommentVNode("", true)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["id", "font-size", "font-weight", "class"]),
                $props.titleDivider ? (openBlock(), createBlock(_component_bc_divider, { key: 0 })) : createCommentVNode("", true)
              ], 64)) : createCommentVNode("", true),
              createVNode(_component_bc_card_text, {
                height: $props.contentHeight,
                padding: $props.contentPadding,
                overflow: $props.fullScreen ? "auto" : $props.contentOverflow
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 8, ["height", "padding", "overflow"])
            ]),
            _: 3
          }, 8, ["onClick", "style", "class", "elevation", "roundness"]),
          $props.fullScreen ? (openBlock(), createBlock(_component_bc_reactive_style, { key: 0 }, {
            default: withCtx(() => [
              createTextVNode(" ." + toDisplayString($data.baseCss) + '[data-dialog-box-id="' + toDisplayString($data.id) + '"] > .bc-card > .bc-card-text { height: calc(100dvh - ' + toDisplayString($data.titleBarHeight) + "px) } ", 1)
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["style", "class"])), [
        [_directive_scroll_lock]
      ]) : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["data-dialog-box-id"]);
}
const BcDialogBox = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["render", _sfc_render$T]]);
BcDialogBox.install = (Vue) => {
  Vue.component(BcDialogBox.name, BcDialogBox);
};
const _sfc_main$U = {
  name: "BcDivider",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("divider", ["select-none"])
    };
  }
};
function _sfc_render$S(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("hr", {
    class: normalizeClass($data.baseCss)
  }, null, 2);
}
const BcDivider = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["render", _sfc_render$S]]);
BcDivider.install = (Vue) => {
  Vue.component(BcDivider.name, BcDivider);
};
const _sfc_main$T = {
  name: "BcDropdown",
  mixins: [
    methods
  ],
  data() {
    return {
      hidden: true,
      search: "",
      itemHeight: 30.81,
      cellPadding: "p-1",
      baseCss: this.componentBaseCss("dropdown")
    };
  },
  emits: [
    "update:value"
  ],
  props: {
    block: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    errorCssClass: {
      type: String,
      default: "bc-dropdown-error"
    },
    expanded: {
      type: Boolean,
      default: false
    },
    fuzzySearch: {
      type: Boolean,
      default: false
    },
    headerItems: {
      type: Number,
      default: 10
    },
    hint: {
      type: String
    },
    icon: {
      type: String
    },
    iconCollapse: {
      type: String,
      default: "chevron-up"
    },
    iconExpand: {
      type: String,
      default: "chevron-down"
    },
    iconMultipleChecked: {
      type: String,
      default: "checkbox-marked-outline"
    },
    iconMultipleUnchecked: {
      type: String,
      default: "checkbox-blank-outline"
    },
    iconProvider: {
      type: String,
      default: "mdi"
    },
    iconSearchable: {
      type: String,
      default: "magnify"
    },
    inert: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default() {
        return [];
      }
    },
    itemsZIndex: {
      type: Number,
      default: 900
    },
    label: {
      type: String
    },
    labelKey: {
      type: [
        String,
        Number
      ],
      default: "label"
    },
    labelsUppercase: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    roundness: {
      type: String,
      default: "sm"
    },
    searchableNoResultsText: {
      type: String,
      default: "Nothing Found..."
    },
    searchable: {
      type: Boolean,
      default: false
    },
    searchableColor: {
      type: String,
      default: "caution"
    },
    searchableVariant: {
      type: String,
      default: "soft"
    },
    searchLabel: {
      type: String,
      default: "Filter Items..."
    },
    size: {
      type: String,
      default: "sm"
    },
    sort: {
      // disabled for now
      type: Object,
      default() {
        return {
          descending: false
        };
      }
    },
    title: {
      type: String
    },
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    valueKey: {
      type: [
        String,
        Number
      ],
      default: "value"
    },
    visibleItems: {
      type: Number,
      default: 5
    },
    width: {
      type: String
    }
  },
  watch: {
    expanded() {
      if (this.expanded) {
        this.hidden = false;
      }
    }
  },
  computed: {
    labelsCssClasses() {
      return ["px-1", "select-none", this.labelsUppercase ? "uppercase" : null, this.error ? this.errorCssClass : null];
    },
    header() {
      const header = this.items.filter((item) => this.value.includes(item[this.valueKey])).map((item) => {
        return item[this.labelKey];
      }).slice(0, this.headerItems).sort();
      return header.length ? header.join(", ") : this.label;
    },
    filtered() {
      const labelKey = this.labelKey;
      if (this.searchable) {
        const search = this.search.toLowerCase();
        const data = this.items.filter((item) => {
          if (item) {
            const text = item[labelKey].toString().toLowerCase();
            if (this.fuzzySearch ? text.indexOf(search) > -1 : text.substring(0, search.length) === search) {
              return item;
            }
          }
        });
        return data;
      } else {
        return this.items.map((item) => {
          return item;
        });
      }
    },
    componentCssClasses() {
      return [
        this.baseCss,
        this.block ? "block" : ["align-middle", "inline-block"],
        this.disabled && !this.inert ? "disabled" : null,
        this.error ? this.errorCssClass : null,
        `text-${this.size}`,
        "select-none",
        "cursor-pointer",
        "bc-container"
      ];
    },
    dropdownCssClasses() {
      return [
        `${this.baseCss}-dropdown`,
        this.expanded ? null : "absolute",
        "w-full",
        "transition-all",
        "transition-duration-300",
        this.hidden ? ["opacity-0", "clip-0", "pointer-events-none"] : ["opacity-100"]
      ];
    }
  },
  mounted() {
    document.addEventListener("click", this.documentClick);
    if (this.expanded) {
      this.hidden = false;
    }
    this.$emitter.on("bc-dropdown-hide", ($event) => {
      this.documentClick($event);
    });
  },
  beforeUnmount() {
    document.removeEventListener("click", this.documentClick);
  },
  methods: {
    toggleDropdown() {
      const emitter = this.$emitter;
      this.hidden = !this.hidden;
      if (emitter) {
        emitter.emit("bc-tooltip:hide");
      }
    },
    sortItems(key, descending = false) {
      return function(a, b) {
        if (a[key].toString().toLowerCase() > b[key].toString().toLowerCase()) {
          return descending ? -1 : 1;
        }
        if (a[key].toString().toLowerCase() < b[key].toString().toLowerCase()) {
          return descending ? 1 : -1;
        }
        return 0;
      };
    },
    toggleItem($event, item) {
      let value = this.value;
      const multiple = this.multiple;
      const id = item[this.valueKey];
      if (multiple) {
        $event.stopPropagation();
        if (value.includes(id)) {
          value.splice(value.findIndex((item2) => item2 === id), 1).sort();
        } else {
          value.push(id);
        }
        value.sort();
      } else if (!multiple && value[0] !== id) {
        if (!this.expanded) {
          this.hidden = true;
        }
        value = [id];
      }
      this.$emit("update:value", value);
    },
    documentClick(e) {
      let el = this.$refs["dropdown"];
      let target = e.target;
      if (el && el !== target && !el.contains(target) && !this.expanded) {
        this.hidden = true;
      }
    }
  }
};
const _hoisted_1$h = ["inert"];
const _hoisted_2$7 = {
  class: /* @__PURE__ */ normalizeClass(["text-center"])
};
function _sfc_render$R(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_container = resolveComponent("bc-container");
  const _component_bc_text_field_label = resolveComponent("bc-text-field-label");
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  const _component_bc_table_layout_row = resolveComponent("bc-table-layout-row");
  const _component_bc_table_layout = resolveComponent("bc-table-layout");
  const _component_bc_text_field = resolveComponent("bc-text-field");
  const _component_bc_card_text = resolveComponent("bc-card-text");
  const _component_bc_alert = resolveComponent("bc-alert");
  const _component_recycle_scroller = resolveComponent("recycle-scroller");
  const _component_bc_card = resolveComponent("bc-card");
  const _component_bc_reactive_style = resolveComponent("bc-reactive-style");
  return openBlock(), createElementBlock("div", {
    role: "listbox",
    ref: "dropdown",
    class: normalizeClass($options.componentCssClasses),
    inert: $props.inert,
    style: normalizeStyle({ width: $props.width })
  }, [
    _ctx.$slots["top"] ? (openBlock(), createBlock(_component_bc_container, { key: 0 }, {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "top")
      ]),
      _: 3
    })) : createCommentVNode("", true),
    createVNode(_component_bc_container, {
      class: normalizeClass([$props.expanded ? null : "relative"])
    }, {
      default: withCtx(() => [
        !$props.expanded ? (openBlock(), createBlock(_component_bc_container, {
          key: 0,
          onClick: $options.toggleDropdown,
          class: normalizeClass([`${$data.baseCss}-header`, "overflow-hidden"])
        }, {
          default: withCtx(() => [
            $props.label ? (openBlock(), createBlock(_component_bc_text_field_label, {
              key: 0,
              text: $props.label,
              class: normalizeClass([`${$data.baseCss}-hint`, "mb-1", "text-left", $options.labelsCssClasses])
            }, null, 8, ["text", "class"])) : createCommentVNode("", true),
            createVNode(_component_bc_container, {
              title: $props.title,
              class: normalizeClass([`${$data.baseCss}-header-controls`, `border-round-${this.roundness}`])
            }, {
              default: withCtx(() => [
                createVNode(_component_bc_table_layout, {
                  "y-align": "middle",
                  "equal-cells": ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_bc_table_layout_row, null, {
                      default: withCtx(() => [
                        $props.icon ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                          key: 0,
                          class: normalizeClass([$data.cellPadding, `${$data.baseCss}-icon-cell`]),
                          "x-align": "center"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_bc_icon, {
                              name: $props.icon,
                              provider: $props.iconProvider
                            }, null, 8, ["name", "provider"])
                          ]),
                          _: 1
                        }, 8, ["class"])) : createCommentVNode("", true),
                        createVNode(_component_bc_table_layout_cell, {
                          class: normalizeClass([$data.cellPadding]),
                          "x-align": "left"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_bc_container, {
                              textContent: toDisplayString($options.header),
                              class: normalizeClass(["truncate", $props.icon ? null : "pl-1", $props.value.length ? null : "opacity-50"])
                            }, null, 8, ["textContent", "class"])
                          ]),
                          _: 1
                        }, 8, ["class"]),
                        createVNode(_component_bc_table_layout_cell, {
                          class: normalizeClass([$data.cellPadding, `${$data.baseCss}-icon-cell`]),
                          "x-align": "center"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_bc_icon, {
                              name: $data.hidden ? $props.iconExpand : $props.iconCollapse,
                              provider: $props.iconProvider
                            }, null, 8, ["name", "provider"])
                          ]),
                          _: 1
                        }, 8, ["class"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["title", "class"]),
            $props.hint ? (openBlock(), createBlock(_component_bc_text_field_label, {
              key: 1,
              text: $props.hint,
              class: normalizeClass([`${$data.baseCss}-hint`, "mt-1", "text-right", $options.labelsCssClasses])
            }, null, 8, ["text", "class"])) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["onClick", "class"])) : createCommentVNode("", true),
        createVNode(_component_bc_container, {
          class: normalizeClass($options.dropdownCssClasses),
          style: normalizeStyle({ zIndex: $props.itemsZIndex })
        }, {
          default: withCtx(() => [
            createVNode(_component_bc_card, { "border-width": 1 }, {
              default: withCtx(() => [
                $props.searchable ? (openBlock(), createBlock(_component_bc_card_text, {
                  key: 0,
                  "font-size": $props.size
                }, {
                  default: withCtx(() => [
                    createVNode(_component_bc_text_field, {
                      value: $data.search,
                      "onUpdate:value": _cache[0] || (_cache[0] = ($event) => $data.search = $event),
                      size: $props.size,
                      placeholder: $props.searchLabel,
                      "icon-left": $props.iconSearchable,
                      "icon-provider": $props.iconProvider
                    }, null, 8, ["value", "size", "placeholder", "icon-left", "icon-provider"])
                  ]),
                  _: 1
                }, 8, ["font-size"])) : createCommentVNode("", true),
                createVNode(_component_bc_card_text, { "font-size": $props.size }, {
                  default: withCtx(() => [
                    $props.searchable ? (openBlock(), createBlock(_component_bc_alert, {
                      key: 0,
                      roundness: $props.roundness,
                      visible: !$options.filtered.length,
                      dismissible: false,
                      color: $props.searchableColor,
                      variant: $props.searchableVariant
                    }, {
                      default: withCtx(() => [
                        createElementVNode("div", _hoisted_2$7, toDisplayString($props.searchableNoResultsText), 1)
                      ]),
                      _: 1
                    }, 8, ["roundness", "visible", "color", "variant"])) : createCommentVNode("", true),
                    $options.filtered.length ? (openBlock(), createBlock(_component_recycle_scroller, {
                      key: 1,
                      "key-field": $props.valueKey,
                      style: normalizeStyle({ height: $data.itemHeight * $props.visibleItems + "px" }),
                      items: $options.filtered,
                      "item-size": $data.itemHeight,
                      class: normalizeClass(["bc-list"])
                    }, {
                      default: withCtx(({ item }) => [
                        createVNode(_component_bc_table_layout, {
                          "equal-cells": "",
                          onClick: ($event) => $options.toggleItem($event, item),
                          "y-align": "middle",
                          class: normalizeClass(["cursor-pointer", "transition-all", "transition-duration-200", `${$data.baseCss}-dropdown-item`, $props.value.includes(item[$props.valueKey]) ? `${$data.baseCss}-dropdown-item-selected` : null, item.disabled ? "disabled" : null])
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_bc_table_layout_row, null, {
                              default: withCtx(() => [
                                $props.multiple ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                                  key: 0,
                                  class: normalizeClass([$data.cellPadding, `${$data.baseCss}-icon-cell`]),
                                  "x-align": "center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_bc_icon, {
                                      name: $props.value.includes(item[$props.valueKey]) ? $props.iconMultipleChecked : $props.iconMultipleUnchecked,
                                      provider: $props.iconProvider
                                    }, null, 8, ["name", "provider"])
                                  ]),
                                  _: 2
                                }, 1032, ["class"])) : createCommentVNode("", true),
                                createVNode(_component_bc_table_layout_cell, {
                                  class: normalizeClass([$data.cellPadding]),
                                  "x-align": "left"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_bc_container, {
                                      class: normalizeClass(["truncate"]),
                                      textContent: toDisplayString(item[$props.labelKey])
                                    }, null, 8, ["textContent"])
                                  ]),
                                  _: 2
                                }, 1032, ["class"])
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1032, ["onClick", "class"])
                      ]),
                      _: 1
                    }, 8, ["key-field", "style", "items", "item-size"])) : createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["font-size"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["class", "style"]),
        createVNode(_component_bc_reactive_style, null, {
          default: withCtx(() => [
            createTextVNode(" .bc-dropdown .bc-dropdown-dropdown-item { min-height: " + toDisplayString($data.itemHeight) + "px; } ", 1)
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["class"]),
    _ctx.$slots["bottom"] ? (openBlock(), createBlock(_component_bc_container, { key: 1 }, {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "bottom")
      ]),
      _: 3
    })) : createCommentVNode("", true)
  ], 14, _hoisted_1$h);
}
const BcDropdown = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["render", _sfc_render$R]]);
BcDropdown.install = (Vue) => {
  Vue.component(BcDropdown.name, BcDropdown);
};
const _sfc_main$S = {
  name: "BcEmpty",
  mixins: [
    methods
  ],
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.grayscale ? "grayscale" : null,
        this.makeFontSize(this.iconSize),
        this.makeOpacity(this.opacity),
        "text-center",
        "select-none"
      ];
    }
  },
  data() {
    return {
      baseCss: this.componentBaseCss("empty")
    };
  },
  props: {
    divider: {
      type: Boolean,
      default: true
    },
    fontWeight: {
      type: String,
      default: "normal"
    },
    grayscale: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String
    },
    iconProvider: {
      type: String,
      default: "mdi"
    },
    iconSize: {
      type: String,
      default: "2xl"
    },
    opacity: {
      type: Number,
      default: 50
    },
    subTitle: {
      type: String
    },
    subTitleFontSize: {
      type: String,
      default: "md"
    },
    title: {
      type: String
    },
    titleFontSize: {
      type: String,
      default: "xl"
    }
  }
};
function _sfc_render$Q(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_heading = resolveComponent("bc-heading");
  const _component_bc_divider = resolveComponent("bc-divider");
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      $props.icon ? (openBlock(), createBlock(_component_bc_icon, {
        key: 0,
        name: $props.icon,
        provider: $props.iconProvider,
        class: normalizeClass(["mb-1"])
      }, null, 8, ["name", "provider"])) : createCommentVNode("", true),
      $props.title ? (openBlock(), createBlock(_component_bc_heading, {
        key: 1,
        "font-size": $props.titleFontSize,
        "font-weight": $props.fontWeight,
        divider: false
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString($props.title), 1)
        ]),
        _: 1
      }, 8, ["font-size", "font-weight"])) : createCommentVNode("", true),
      $props.divider ? (openBlock(), createBlock(_component_bc_divider, {
        key: 2,
        class: normalizeClass(["my-1"])
      })) : createCommentVNode("", true),
      $props.subTitle ? (openBlock(), createBlock(_component_bc_heading, {
        key: 3,
        "font-size": $props.subTitleFontSize,
        "font-weight": $props.fontWeight,
        divider: false
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString($props.subTitle), 1)
        ]),
        _: 1
      }, 8, ["font-size", "font-weight"])) : createCommentVNode("", true),
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
const ComponentTemplate$2 = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["render", _sfc_render$Q]]);
ComponentTemplate$2.install = (Vue) => {
  Vue.component(ComponentTemplate$2.name, ComponentTemplate$2);
};
const _sfc_main$R = {
  name: "BcFlag",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("flag")
    };
  },
  computed: {
    componentStyle() {
      return {
        width: this.width,
        aspectRatio: this.square ? "1/1" : "4/3"
      };
    },
    componentCssClasses() {
      return [
        this.baseCss,
        this.square ? "fis" : null,
        this.block ? null : "align-middle",
        this.makeElevation(this.elevation),
        `fi-${this.code.toLowerCase()}`,
        "select-none",
        "fi"
      ];
    }
  },
  props: {
    block: {
      type: Boolean,
      default: false
    },
    code: {
      type: String,
      required: true
    },
    elevation: {
      type: String,
      default: "sm"
    },
    href: {
      type: String
    },
    square: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: "span"
    },
    to: {
      type: String
    },
    width: {
      type: String,
      default: "100%"
    }
  }
};
function _sfc_render$P(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    tag: $props.tag,
    to: $props.to,
    href: $props.href,
    display: $props.block ? "block" : "inline-block",
    class: normalizeClass($options.componentCssClasses),
    style: normalizeStyle($options.componentStyle)
  }, null, 8, ["tag", "to", "href", "display", "class", "style"]);
}
const BcFlag = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["render", _sfc_render$P]]);
BcFlag.install = (Vue) => {
  Vue.component(BcFlag.name, BcFlag);
};
const _sfc_main$Q = {
  name: "BcGrid",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("grid")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.wrap ? "flex-wrap" : "flex-nowrap",
        "grid",
        this.noGutter ? "grid-nogutter" : null,
        "flex"
      ];
    }
  },
  props: {
    noGutter: {
      type: Boolean,
      default: true
    },
    wrap: {
      type: Boolean,
      default: true
    }
  }
};
function _sfc_render$O(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.componentCssClasses)
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
const BcGrid = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["render", _sfc_render$O]]);
BcGrid.install = (Vue) => {
  Vue.component(BcGrid.name, BcGrid);
};
const _sfc_main$P = {
  name: "BcGridCol",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("grid-col")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.fixed ? "col-fixed" : null,
        this.responsiveColumns,
        `${this.span ? "col-" + this.span : "col"}`,
        `col-offset-${this.offset}`,
        "bc-container"
      ];
    },
    style() {
      return {
        width: this.width
      };
    },
    responsiveColumns() {
      const swatches = ["xs", "sm", "md", "lg", "xl"];
      const columns = [];
      swatches.forEach((swatch) => {
        const value = this[swatch];
        if (value) {
          columns.push(`${swatch}:col${value ? "-" + value : ""}`);
        }
      });
      return columns;
    }
  },
  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    offset: {
      type: Number,
      default: 0,
      validator: (value) => {
        return value >= 0 && value <= 12;
      }
    },
    span: {
      type: [
        String,
        Number
      ],
      validator: (value) => {
        return value >= 0 && value <= 12;
      }
    },
    width: {
      type: String
    },
    xs: {
      type: Number
    },
    sm: {
      type: Number
    },
    md: {
      type: Number
    },
    lg: {
      type: Number
    },
    xl: {
      type: Number
    }
  }
};
function _sfc_render$N(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.componentCssClasses),
    style: normalizeStyle($options.style)
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 6);
}
const ComponentTemplate$1 = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["render", _sfc_render$N]]);
ComponentTemplate$1.install = (Vue) => {
  Vue.component(ComponentTemplate$1.name, ComponentTemplate$1);
};
const _sfc_main$O = {
  name: "BcHeading",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("bc-heading")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.margin
      ];
    }
  },
  props: {
    dividerMargin: {
      default() {
        return [];
      }
    },
    tag: {
      type: String,
      default: "div"
    },
    fontSize: {
      type: String,
      default: "sm"
    },
    fontWeight: {
      type: String,
      default: "semibold"
    },
    divider: {
      type: Boolean,
      default: true
    },
    padding: {
      type: Array,
      default() {
        return [];
      }
    },
    margin: {
      type: Array,
      default() {
        return [];
      }
    },
    truncate: {
      type: Boolean,
      default: true
    },
    to: {
      type: String
    },
    href: {
      type: String
    }
  }
};
function _sfc_render$M(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_divider = resolveComponent("bc-divider");
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
        to: $props.to,
        href: $props.href,
        class: normalizeClass([`text-${$props.fontSize}`, "block", `font-${$props.fontWeight}`, $props.padding, $props.truncate ? "truncate" : null])
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["to", "href", "class"])),
      $props.divider ? (openBlock(), createBlock(_component_bc_divider, {
        key: 0,
        class: normalizeClass($props.dividerMargin)
      }, null, 8, ["class"])) : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["class"]);
}
const BcHeading = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["render", _sfc_render$M]]);
BcHeading.install = (Vue) => {
  Vue.component(BcHeading.name, BcHeading);
};
const _sfc_main$N = {
  name: "BcIcon",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("icon")
    };
  },
  computed: {
    componentCssClasses() {
      const provider = this.provider;
      return [
        this.baseCss,
        provider,
        `${provider}-${this.name}`,
        "select-none",
        "line-height-1",
        "align-middle",
        "inline-block",
        "outline-none"
      ];
    },
    style() {
      const size = this.size;
      return {
        fontSize: `${size}em`
      };
    }
  },
  props: {
    name: {
      type: String,
      default: "home"
    },
    provider: {
      type: String,
      default: "mdi"
    },
    size: {
      type: [
        Number,
        String
      ],
      default: 1.5
    },
    tag: {
      type: String,
      default: "i"
    }
  }
};
function _sfc_render$L(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($options.componentCssClasses),
    style: normalizeStyle($options.style)
  }, null, 8, ["class", "style"]);
}
const BcIcon = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["render", _sfc_render$L]]);
BcIcon.install = (Vue) => {
  Vue.component(BcIcon.name, BcIcon);
};
const _sfc_main$M = {
  name: "BcKbd",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("kbd")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.padding,
        this.makeFontSize(this.size),
        this.makeUiColorVariant(this.color, this.variant),
        this.makeElevation(this.elevation),
        this.makeBorderRadius(this.roundness),
        this.makeFontWeight(this.fontWeight),
        "kbd",
        "select-none",
        "justify-content-center",
        "align-items-center"
      ];
    }
  },
  props: {
    color: {
      type: String,
      default: "primary"
    },
    display: {
      type: String,
      default: "flex"
    },
    elevation: {
      type: String,
      default: "none"
    },
    fontWeight: {
      type: String,
      default: "normal"
    },
    padding: {
      type: Array,
      default() {
        return [
          "p-1"
        ];
      }
    },
    roundness: {
      type: String,
      default: "sm"
    },
    size: {
      type: String,
      default: "sm"
    },
    value: {
      type: [
        String,
        Number
      ],
      required: true
    },
    variant: {
      type: String,
      default: "outline"
    }
  }
};
function _sfc_render$K(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_container = resolveComponent("bc-container");
  const _directive_aspect_ratio = resolveDirective("aspect-ratio");
  return withDirectives((openBlock(), createBlock(_component_bc_container, {
    display: $props.display,
    tag: "kbd",
    class: normalizeClass($options.componentCssClasses),
    textContent: toDisplayString($props.value)
  }, null, 8, ["display", "class", "textContent"])), [
    [_directive_aspect_ratio, 1 / 1]
  ]);
}
const BcKbd = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["render", _sfc_render$K]]);
BcKbd.install = (Vue) => {
  Vue.component(BcKbd.name, BcKbd);
};
const _sfc_main$L = {
  name: "BcKpi",
  mixins: [
    methods,
    cardProps$1
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("kpi")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        "overflow-hidden"
      ];
    },
    innerWrapperCssClasses() {
      return [
        this.padding,
        this.makeXAlign(this.xAlign),
        this.makeUiColorVariant(this.color, this.variant)
      ];
    },
    formattedValue() {
      if (typeof this.value !== "number") {
        return this.value;
      }
      return new Intl.NumberFormat(this.locale ?? void 0, {
        minimumFractionDigits: this.decimals ?? 0,
        maximumFractionDigits: this.decimals ?? 0
      }).format(this.value);
    },
    prefixedAndPostfixedValue() {
      return `${this.prefix || ""}${this.formattedValue}${this.postfix || ""}`;
    },
    valueCssClasses() {
      return [
        "truncate",
        this.valueMargin,
        this.makeFontSize(this.valueFontSize),
        this.makeFontWeight(this.valueFontWeight)
      ];
    },
    trendCssClasses() {
      return [
        "truncate",
        "px-1"
      ];
    },
    trendIcon() {
      const trend = this.trend;
      if (trend < 0) {
        return this.iconTrendDown;
      } else if (trend > 0) {
        return this.iconTrendUp;
      } else {
        return this.iconTrendFlat;
      }
    },
    trendIconColor() {
      const trend = this.trend;
      if (trend < 0) {
        return this.makeUiLightnessColor(this.iconTrendDownColor);
      } else if (trend > 0) {
        return this.makeUiLightnessColor(this.iconTrendUpColor);
      } else {
        return this.makeUiLightnessColor(this.iconTrendFlatColor);
      }
    }
  },
  props: {
    color: {
      type: String
    },
    comparisonLabel: {
      type: String
    },
    decimals: {
      type: Number,
      default: 2
    },
    iconsProvider: {
      type: String,
      default: "mdi"
    },
    iconTrendUp: {
      type: String,
      default: "arrow-up-thick"
    },
    iconTrendUpColor: {
      type: String
    },
    iconTrendDown: {
      type: String,
      default: "arrow-down-thick"
    },
    iconTrendDownColor: {
      type: String
    },
    iconTrendFlat: {
      type: String,
      default: "minus-box"
    },
    iconTrendFlatColor: {
      type: String
    },
    label: {
      type: String,
      required: true
    },
    labelDivider: {
      type: Boolean,
      default: false
    },
    labelDividerMargin: {
      type: Array,
      default() {
        return [];
      }
    },
    labelFontSize: {
      type: String,
      default: "md"
    },
    labelFontWeight: {
      type: String,
      default: "normal"
    },
    labelIcon: {
      type: String
    },
    labelTruncate: {
      type: Boolean,
      default: true
    },
    locale: {
      type: String,
      default: "en-US"
    },
    padding: {
      type: Array,
      default() {
        return ["p-1"];
      }
    },
    postfix: {
      type: String
    },
    prefix: {
      type: String
    },
    trend: {
      type: Number
    },
    trendFontSize: {
      type: String,
      default: "xs"
    },
    value: {
      type: [
        String,
        Number
      ],
      required: true
    },
    valueFontSize: {
      type: String,
      default: "xl"
    },
    valueFontWeight: {
      type: String,
      default: "semibold"
    },
    valueMargin: {
      type: Array,
      default() {
        return ["my-1"];
      }
    },
    variant: {
      type: String,
      default: "solid"
    },
    xAlign: {
      type: String,
      default: "left"
    }
  }
};
function _sfc_render$J(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  const _component_bc_heading = resolveComponent("bc-heading");
  const _component_bc_table_layout_row = resolveComponent("bc-table-layout-row");
  const _component_bc_table_layout = resolveComponent("bc-table-layout");
  const _component_bc_divider = resolveComponent("bc-divider");
  const _component_bc_container = resolveComponent("bc-container");
  const _component_bc_card_text = resolveComponent("bc-card-text");
  const _component_bc_card = resolveComponent("bc-card");
  return openBlock(), createBlock(_component_bc_card, {
    class: normalizeClass($options.componentCssClasses),
    "border-width": _ctx.borderWidth,
    roundness: _ctx.roundness,
    tag: _ctx.tag,
    to: _ctx.to,
    href: _ctx.href,
    elevation: _ctx.elevation
  }, {
    default: withCtx(() => [
      createVNode(_component_bc_card_text, { padding: [] }, {
        default: withCtx(() => [
          createVNode(_component_bc_container, {
            class: normalizeClass($options.innerWrapperCssClasses)
          }, {
            default: withCtx(() => [
              $props.label ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createVNode(_component_bc_table_layout, {
                  "y-align": "middle",
                  class: normalizeClass([_ctx.makeFontSize($props.labelFontSize)])
                }, {
                  default: withCtx(() => [
                    createVNode(_component_bc_table_layout_row, null, {
                      default: withCtx(() => [
                        $props.labelIcon ? (openBlock(), createBlock(_component_bc_table_layout_cell, { key: 0 }, {
                          default: withCtx(() => [
                            createVNode(_component_bc_icon, {
                              provider: $props.iconsProvider,
                              name: $props.labelIcon
                            }, null, 8, ["provider", "name"])
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        createVNode(_component_bc_table_layout_cell, {
                          class: normalizeClass(["w-full", $props.labelIcon ? "pl-1" : null])
                        }, {
                          default: withCtx(() => [
                            $props.label ? (openBlock(), createBlock(_component_bc_heading, {
                              key: 0,
                              tag: "div",
                              divider: false,
                              "font-size": $props.labelFontSize,
                              "font-weight": $props.labelFontWeight,
                              truncate: $props.labelTruncate,
                              class: normalizeClass(["w-10"])
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString($props.label), 1)
                              ]),
                              _: 1
                            }, 8, ["font-size", "font-weight", "truncate"])) : createCommentVNode("", true)
                          ]),
                          _: 1
                        }, 8, ["class"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["class"]),
                $props.labelDivider ? (openBlock(), createBlock(_component_bc_divider, {
                  key: 0,
                  class: normalizeClass([$props.labelDividerMargin])
                }, null, 8, ["class"])) : createCommentVNode("", true)
              ], 64)) : createCommentVNode("", true),
              $props.value ? (openBlock(), createBlock(_component_bc_container, {
                key: 1,
                textContent: toDisplayString($options.prefixedAndPostfixedValue),
                class: normalizeClass($options.valueCssClasses)
              }, null, 8, ["textContent", "class"])) : createCommentVNode("", true),
              $props.trend !== void 0 ? (openBlock(), createBlock(_component_bc_container, { key: 2 }, {
                default: withCtx(() => [
                  createVNode(_component_bc_table_layout, {
                    "y-align": "middle",
                    class: normalizeClass([_ctx.makeFontSize($props.trendFontSize)])
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_bc_table_layout_row, null, {
                        default: withCtx(() => [
                          createVNode(_component_bc_table_layout_cell, {
                            class: normalizeClass([`${$data.baseCss}-trend-icon`]),
                            "x-align": "center"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_bc_icon, {
                                provider: $props.iconsProvider,
                                name: $options.trendIcon,
                                class: normalizeClass($options.trendIconColor)
                              }, null, 8, ["provider", "name", "class"])
                            ]),
                            _: 1
                          }, 8, ["class"]),
                          createVNode(_component_bc_table_layout_cell, {
                            class: normalizeClass($options.trendCssClasses)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString($props.trend), 1)
                            ]),
                            _: 1
                          }, 8, ["class"]),
                          $props.comparisonLabel ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                            key: 0,
                            "full-width": ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_bc_container, {
                                class: normalizeClass(["truncate", "w-8"]),
                                textContent: toDisplayString($props.comparisonLabel)
                              }, null, 8, ["textContent"])
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["class"])
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["class"])
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["class", "border-width", "roundness", "tag", "to", "href", "elevation"]);
}
const BcKpi = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["render", _sfc_render$J]]);
BcKpi.install = (Vue) => {
  Vue.component(BcKpi.name, BcKpi);
};
const _sfc_main$K = {
  name: "BcLayout",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("layout"),
      sidebarLeftInternal: null,
      sidebarRightInternal: null,
      mainInternal: null,
      headerInternal: null,
      footerInternal: null,
      sidebarsCollapsedWidthInternal: null
    };
  },
  props: {
    iconsProvider: {
      type: String,
      default: "mdi"
    },
    sidebarsCollapsedWidth: {
      type: Number,
      default: 42
    },
    floatingSidebars: {
      type: Boolean,
      default: false
    },
    floatingSidebarsBlockerBlur: {
      type: Boolean,
      default: true
    },
    headerHeight: {
      type: Number,
      default: 42
    },
    footerHeight: {
      type: Number,
      default: 42
    },
    sidebarLeft: {
      type: Object,
      default() {
        return {
          width: 260,
          elevation: "none",
          iconOpen: "menu-close",
          iconClose: "menu-open",
          expanded: true,
          zIndex: 900,
          overflow: "auto"
        };
      }
    },
    sidebarRight: {
      type: Object,
      default() {
        return {
          width: 260,
          elevation: "none",
          iconOpen: "menu-open",
          iconClose: "menu-close",
          expanded: true,
          zIndex: 900,
          overflow: "auto"
        };
      }
    },
    main: {
      type: Object,
      default() {
        return {
          maxWidth: "960px",
          minWidth: "200px"
        };
      }
    },
    header: {
      type: Object,
      default() {
        return {
          elevation: "none",
          zIndex: 800
        };
      }
    },
    footer: {
      type: Object,
      default() {
        return {
          elevation: "none",
          zIndex: 800
        };
      }
    }
  },
  computed: {
    floatingSidebarsBlockerZIndex() {
      const sidebarLeftInternal = this.sidebarLeftInternal;
      const sidebarRightInternal = this.sidebarRightInternal;
      let zIndex = 0;
      if (sidebarLeftInternal) {
        zIndex += sidebarLeftInternal.zIndex;
      }
      if (sidebarRightInternal) {
        zIndex += sidebarRightInternal.zIndex;
      }
      return zIndex / 2 - 10;
    },
    floatingSidebarsBlockerCssClasses() {
      return [
        `${this.baseCss}-floating-sidebars-blocker`,
        this.floatingSidebars && (this.sidebarLeftInternal.expanded || this.sidebarRightInternal.expanded) ? "opacity-100" : ["opacity-0", "pointer-events-none"],
        this.floatingSidebarsBlockerBlur ? `${this.baseCss}-floating-sidebars-blocker-blur` : null,
        "fixed",
        "left-0",
        "top-0",
        "right-0",
        "bottom-0",
        "h-dvh-full"
      ];
    },
    sidebarLeftToggleIcon() {
      const sidebarLeftInternal = this.sidebarLeftInternal;
      return sidebarLeftInternal[sidebarLeftInternal.expanded ? "iconClose" : "iconOpen"];
    },
    sidebarRightToggleIcon() {
      const sidebarRightInternal = this.sidebarRightInternal;
      return sidebarRightInternal[sidebarRightInternal.expanded ? "iconClose" : "iconOpen"];
    },
    ifSlotsFooter() {
      return this.$slots["footer"] && this.footerInternal;
    },
    ifSlotsSidebarRightControls() {
      return this.$slots["sidebar-right-controls"] && this.sidebarRightInternal.expanded;
    },
    ifSlotsSidebarRight() {
      return this.$slots["sidebar-right"] && this.sidebarRightInternal;
    },
    ifSlotsHeader() {
      return this.$slots["header"] && this.headerInternal;
    },
    ifSlotsSidebarLeftControls() {
      return this.$slots["sidebar-left-controls"] && this.sidebarLeftInternal.expanded;
    },
    ifSlotsSidebarLeft() {
      return this.$slots["sidebar-left"] && this.sidebarLeftInternal;
    },
    ifSlotsMain() {
      return this.$slots["main"] && this.mainInternal && this.sidebarLeftInternal && this.sidebarRightInternal && this.headerInternal;
    },
    sidebarRightCssClasses() {
      const baseCss = this.baseCss;
      return [
        `${baseCss}-sidebar`,
        `${baseCss}-sidebar-right`,
        "cursor-default",
        "fixed",
        "top-0",
        "right-0",
        "bottom-0",
        "h-dvh-full",
        `shadow-${this.sidebarRightInternal.elevation}`
      ];
    },
    sidebarRightSlotCssClasses() {
      const sidebarRightInternal = this.sidebarRightInternal;
      return [
        `${this.baseCss}-sidebar-slot`,
        sidebarRightInternal.expanded ? null : "hidden",
        `overflow-${sidebarRightInternal.overflow}`,
        "p-2"
      ];
    },
    mainCssClasses() {
      return [
        `${this.baseCss}-main`,
        "cursor-default"
      ];
    },
    componentCssClasses() {
      const baseCss = this.baseCss;
      return [
        baseCss,
        this.floatingSidebars ? `${baseCss}-floating-sidebars` : null,
        "h-dvh-full"
      ];
    },
    sidebarLeftCssClasses() {
      const baseCss = this.baseCss;
      return [
        `${baseCss}-sidebar`,
        `${baseCss}-sidebar-left`,
        "cursor-default",
        "fixed",
        "top-0",
        "left-0",
        "bottom-0",
        "h-dvh-full",
        `shadow-${this.sidebarLeftInternal.elevation}`
      ];
    },
    sidebarLeftSlotCssClasses() {
      const sidebarLeftInternal = this.sidebarLeftInternal;
      return [
        `${this.baseCss}-sidebar-slot`,
        sidebarLeftInternal.expanded ? null : "hidden",
        `overflow-${sidebarLeftInternal.overflow}`,
        "p-2"
      ];
    },
    headerCssClasses() {
      return [
        `${this.baseCss}-header`,
        "cursor-default",
        `shadow-${this.headerInternal.elevation}`,
        "fixed",
        "top-0",
        "left-0",
        "right-0"
      ];
    },
    footerCssClasses() {
      return [
        `${this.baseCss}-footer`,
        `shadow-${this.footerInternal.elevation}`,
        "cursor-default",
        "fixed",
        "bottom-0",
        "left-0",
        "right-0"
      ];
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.sidebarLeftInternal = this.sidebarLeft;
      this.sidebarRightInternal = this.sidebarRight;
      this.mainInternal = this.main;
      this.headerInternal = this.header;
      this.footerInternal = this.footer;
      this.sidebarsCollapsedWidthInternal = this.sidebarsCollapsedWidth;
      if (!this.$slots["sidebar-left"]) {
        this.sidebarLeftInternal.width = 0;
      }
      if (!this.$slots["sidebar-right"]) {
        this.sidebarRightInternal.width = 0;
      }
    },
    toggleSidebar(sidebar) {
      this[`${sidebar}Internal`].expanded = !this[`${sidebar}Internal`].expanded;
    },
    hideSidebars() {
      const sidebarLeftInternal = this.sidebarLeftInternal;
      const sidebarRightInternal = this.sidebarRightInternal;
      if (sidebarLeftInternal) {
        sidebarLeftInternal.expanded = false;
      }
      if (sidebarRightInternal) {
        sidebarRightInternal.expanded = false;
      }
    }
  }
};
function _sfc_render$I(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_table_layout_row = resolveComponent("bc-table-layout-row");
  const _component_bc_table_layout = resolveComponent("bc-table-layout");
  const _component_bc_container = resolveComponent("bc-container");
  const _component_bc_reactive_style = resolveComponent("bc-reactive-style");
  return openBlock(), createBlock(_component_bc_container, {
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      $options.ifSlotsSidebarLeft ? (openBlock(), createElementBlock("aside", {
        key: 0,
        class: normalizeClass($options.sidebarLeftCssClasses)
      }, [
        createVNode(_component_bc_container, null, {
          default: withCtx(() => [
            createVNode(_component_bc_table_layout, {
              "y-align": "middle",
              "equal-cells": ""
            }, {
              default: withCtx(() => [
                createVNode(_component_bc_table_layout_row, null, {
                  default: withCtx(() => [
                    $options.ifSlotsSidebarLeftControls ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                      key: 0,
                      "x-align": "left",
                      class: normalizeClass(["p-2"])
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "sidebar-left-controls")
                      ]),
                      _: 3
                    })) : createCommentVNode("", true),
                    createVNode(_component_bc_table_layout_cell, {
                      "x-align": "right",
                      class: normalizeClass([`${$data.baseCss}-sidebar-toggle-icon-cell`, "p-2"])
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_bc_icon, {
                          onClick: _cache[0] || (_cache[0] = ($event) => $options.toggleSidebar("sidebarLeft")),
                          provider: $props.iconsProvider,
                          name: $options.sidebarLeftToggleIcon,
                          class: normalizeClass(["cursor-pointer"])
                        }, null, 8, ["provider", "name"])
                      ]),
                      _: 1
                    }, 8, ["class"])
                  ]),
                  _: 3
                })
              ]),
              _: 3
            }),
            createVNode(_component_bc_container, {
              display: "initial",
              class: normalizeClass($options.sidebarLeftSlotCssClasses)
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "sidebar-left")
              ]),
              _: 3
            }, 8, ["class"])
          ]),
          _: 3
        }),
        createVNode(_component_bc_reactive_style, null, {
          default: withCtx(() => [
            createTextVNode(" ." + toDisplayString($data.baseCss) + "-sidebar-left { z-index: " + toDisplayString($data.sidebarLeftInternal.zIndex) + "; width: " + toDisplayString($data.sidebarLeftInternal.expanded ? $data.sidebarLeftInternal.width : $props.sidebarsCollapsedWidth) + "px; } ", 1)
          ]),
          _: 1
        })
      ], 2)) : createCommentVNode("", true),
      $options.ifSlotsHeader ? (openBlock(), createElementBlock("header", {
        key: 1,
        class: normalizeClass($options.headerCssClasses)
      }, [
        createVNode(_component_bc_container, {
          class: normalizeClass(["p-2"])
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "header")
          ]),
          _: 3
        }),
        createVNode(_component_bc_reactive_style, null, {
          default: withCtx(() => [
            createTextVNode(" ." + toDisplayString($data.baseCss) + "-header { z-index: " + toDisplayString($data.headerInternal.zIndex) + "; } ", 1)
          ]),
          _: 1
        })
      ], 2)) : createCommentVNode("", true),
      $options.ifSlotsMain ? (openBlock(), createElementBlock("main", {
        key: 2,
        class: normalizeClass($options.mainCssClasses)
      }, [
        createVNode(_component_bc_container, {
          class: normalizeClass([`${$data.baseCss}-main-inner`, "py-4", "px-2", "m-auto"])
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "main")
          ]),
          _: 3
        }, 8, ["class"]),
        !$props.floatingSidebars ? (openBlock(), createBlock(_component_bc_reactive_style, { key: 0 }, {
          default: withCtx(() => [
            createTextVNode(" ." + toDisplayString($data.baseCss) + "-main, ." + toDisplayString($data.baseCss) + "-header, ." + toDisplayString($data.baseCss) + "-footer { margin-left: " + toDisplayString($data.sidebarLeftInternal.expanded ? $data.sidebarLeftInternal.width : _ctx.$slots["sidebar-left"] ? $data.sidebarsCollapsedWidthInternal : 0) + "px; margin-right: " + toDisplayString($data.sidebarRightInternal.expanded ? $data.sidebarRightInternal.width : _ctx.$slots["sidebar-right"] ? $data.sidebarsCollapsedWidthInternal : 0) + "px; } ", 1)
          ]),
          _: 1
        })) : (openBlock(), createBlock(_component_bc_reactive_style, { key: 1 }, {
          default: withCtx(() => [
            createTextVNode(" ." + toDisplayString($data.baseCss) + "-floating-sidebars-blocker { z-index: " + toDisplayString($options.floatingSidebarsBlockerZIndex) + "; } ." + toDisplayString($data.baseCss) + "-main, ." + toDisplayString($data.baseCss) + "-header, ." + toDisplayString($data.baseCss) + "-footer { margin-left: " + toDisplayString($data.sidebarLeftInternal.expanded ? null : $data.sidebarsCollapsedWidthInternal) + "px; margin-right: " + toDisplayString($data.sidebarRightInternal.expanded ? null : $data.sidebarsCollapsedWidthInternal) + "px; } ." + toDisplayString($data.baseCss) + "-header, ." + toDisplayString($data.baseCss) + "-footer { padding-left: " + toDisplayString($data.sidebarLeftInternal.expanded ? $data.sidebarsCollapsedWidthInternal : null) + "px; padding-right: " + toDisplayString($data.sidebarRightInternal.expanded ? $data.sidebarsCollapsedWidthInternal : null) + "px; } ", 1)
          ]),
          _: 1
        })),
        createVNode(_component_bc_reactive_style, null, {
          default: withCtx(() => [
            createTextVNode(" ." + toDisplayString($data.baseCss) + "-main { margin-top: " + toDisplayString($props.headerHeight) + "px; min-height: calc(100dvh - " + toDisplayString($props.headerHeight) + "px); } ." + toDisplayString($data.baseCss) + "-main ." + toDisplayString($data.baseCss) + "-main-inner { max-width: " + toDisplayString($props.main.maxWidth) + "; min-width: " + toDisplayString($props.main.minWidth) + "; } ", 1)
          ]),
          _: 1
        })
      ], 2)) : createCommentVNode("", true),
      $options.ifSlotsSidebarRight ? (openBlock(), createElementBlock("aside", {
        key: 3,
        class: normalizeClass($options.sidebarRightCssClasses)
      }, [
        createVNode(_component_bc_container, null, {
          default: withCtx(() => [
            createVNode(_component_bc_table_layout, {
              "y-align": "middle",
              "equal-cells": ""
            }, {
              default: withCtx(() => [
                createVNode(_component_bc_table_layout_row, null, {
                  default: withCtx(() => [
                    createVNode(_component_bc_table_layout_cell, {
                      "x-align": "left",
                      class: normalizeClass([`${$data.baseCss}-sidebar-toggle-icon-cell`, "p-2"])
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_bc_icon, {
                          onClick: _cache[1] || (_cache[1] = ($event) => $options.toggleSidebar("sidebarRight")),
                          provider: $props.iconsProvider,
                          name: $options.sidebarRightToggleIcon,
                          class: normalizeClass(["cursor-pointer"])
                        }, null, 8, ["provider", "name"])
                      ]),
                      _: 1
                    }, 8, ["class"]),
                    $options.ifSlotsSidebarRightControls ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                      key: 0,
                      "x-align": "left",
                      class: normalizeClass(["p-2"])
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "sidebar-right-controls")
                      ]),
                      _: 3
                    })) : createCommentVNode("", true)
                  ]),
                  _: 3
                })
              ]),
              _: 3
            }),
            createVNode(_component_bc_container, {
              display: "initial",
              class: normalizeClass($options.sidebarRightSlotCssClasses)
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "sidebar-right")
              ]),
              _: 3
            }, 8, ["class"])
          ]),
          _: 3
        }),
        createVNode(_component_bc_reactive_style, null, {
          default: withCtx(() => [
            createTextVNode(" ." + toDisplayString($data.baseCss) + "-sidebar-right { z-index: " + toDisplayString($data.sidebarRightInternal.zIndex) + "; width: " + toDisplayString($data.sidebarRightInternal.expanded ? $data.sidebarRightInternal.width : $data.sidebarsCollapsedWidthInternal) + "px; } ", 1)
          ]),
          _: 1
        })
      ], 2)) : createCommentVNode("", true),
      $options.ifSlotsFooter ? (openBlock(), createElementBlock("footer", {
        key: 4,
        class: normalizeClass($options.footerCssClasses)
      }, [
        createVNode(_component_bc_container, {
          class: normalizeClass(["p-2"])
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "footer")
          ]),
          _: 3
        }),
        createVNode(_component_bc_reactive_style, null, {
          default: withCtx(() => [
            createTextVNode(" ." + toDisplayString($data.baseCss) + "-footer { z-index: " + toDisplayString($data.footerInternal.zIndex) + "; } ", 1)
          ]),
          _: 1
        })
      ], 2)) : createCommentVNode("", true),
      createVNode(_component_bc_reactive_style, null, {
        default: withCtx(() => [
          createTextVNode(" ." + toDisplayString($data.baseCss) + " ." + toDisplayString($data.baseCss) + "-sidebar-toggle-icon-cell { width: " + toDisplayString($data.sidebarsCollapsedWidthInternal) + "px; } ." + toDisplayString($data.baseCss) + " ." + toDisplayString($data.baseCss) + "-header { min-height: " + toDisplayString($props.headerHeight) + "px; } ." + toDisplayString($data.baseCss) + " ." + toDisplayString($data.baseCss) + "-footer { min-height: " + toDisplayString($props.footerHeight) + "px; } ", 1)
        ]),
        _: 1
      }),
      $data.sidebarLeftInternal && $data.sidebarRightInternal ? (openBlock(), createBlock(_component_bc_container, {
        key: 5,
        class: normalizeClass($options.floatingSidebarsBlockerCssClasses),
        onClick: $options.hideSidebars
      }, null, 8, ["class", "onClick"])) : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["class"]);
}
const BcLayout = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["render", _sfc_render$I]]);
BcLayout.install = (Vue) => {
  Vue.component(BcLayout.name, BcLayout);
};
const _sfc_main$J = {
  name: "BcLazyImage",
  mixins: [
    methods
  ],
  data() {
    return {
      observer: null,
      loading: true,
      image: null,
      error: false,
      baseCss: this.componentBaseCss("lazy-image")
    };
  },
  computed: {
    componentCssClasses() {
      const baseCss = this.baseCss;
      return [
        baseCss,
        this.loading ? ["cursor-wait", `${baseCss}-loading`] : null,
        this.error ? [`${baseCss}-error`] : null,
        this.block ? null : ["align-middle"],
        this.width ? null : ["w-full"],
        "select-none"
      ];
    },
    loadingIconCssClasses() {
      return [
        this.error ? null : "animate-spin",
        this.makeFontSize(this.iconsSize)
      ];
    },
    componentStyle() {
      return {
        width: this.width,
        height: this.height,
        background: this.loading ? null : `url("${this.src}") no-repeat center/${this.backgroundSize}`,
        aspectRatio: !this.height && !this.width ? this.aspectRatio : null
      };
    }
  },
  props: {
    aspectRatio: {
      type: String,
      default: "4/3"
    },
    backgroundSize: {
      type: String,
      default: "cover"
    },
    block: {
      type: Boolean,
      default: true
    },
    errorIcon: {
      type: String,
      default: "image-broken-variant"
    },
    height: {
      type: String
    },
    href: {
      type: String
    },
    loadingIcon: {
      type: String,
      default: "loading"
    },
    iconsProvider: {
      type: String,
      default: "mdi"
    },
    iconsSize: {
      default: "3xl"
    },
    options: {
      type: Object,
      default() {
        return {
          root: null,
          rootMargin: "0px",
          scrollMargin: "0px",
          threshold: 1
        };
      }
    },
    src: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      default: "figure"
    },
    to: {
      type: String
    },
    width: {
      type: String
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.loading) {
        const target = this.$el;
        this.observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const src = this.src;
              const eventData = { src, el: target, component: this };
              this.image = new Image();
              this.image.src = this.src;
              this.image.onerror = () => {
                this.error = true;
                this.$emit("error", eventData);
              };
              this.image.onload = () => {
                this.image = null;
                this.$emit("load", eventData);
              };
              this.loading = false;
              this.observer.unobserve(target);
            }
          });
        }, this.options);
        this.observer.observe(target);
      }
    }
  }
};
const _hoisted_1$g = {
  key: 0,
  class: /* @__PURE__ */ normalizeClass(["flex", "align-items-center", "justify-content-center", "h-full"])
};
function _sfc_render$H(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    tag: $props.tag,
    to: $props.to,
    href: $props.href,
    display: $props.block ? "block" : "inline-block",
    style: normalizeStyle($options.componentStyle),
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      $data.loading || $data.error ? (openBlock(), createElementBlock("div", _hoisted_1$g, [
        createVNode(_component_bc_icon, {
          size: $props.iconsSize,
          provider: $props.iconsProvider,
          name: $data.loading ? $props.loadingIcon : $props.errorIcon,
          class: normalizeClass($options.loadingIconCssClasses)
        }, null, 8, ["size", "provider", "name", "class"])
      ])) : createCommentVNode("", true)
    ]),
    _: 1
  }, 8, ["tag", "to", "href", "display", "style", "class"]);
}
const BcLazyImage = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["render", _sfc_render$H]]);
BcLazyImage.install = (Vue) => {
  Vue.component(BcLazyImage.name, BcLazyImage);
};
const _sfc_main$I = {
  name: "BcList",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("list", [])
    };
  },
  computed: {
    componentCssClasses() {
      const baseCss = this.baseCss;
      return [
        baseCss,
        this.hoverable ? `${baseCss}-hoverable` : null,
        this.clickable ? ["cursor-pointer"] : null,
        this.disabled && !this.inert ? ["disabled"] : null,
        this.divider ? `${baseCss}-divider` : null,
        this.maxHeight ? ["overflow-auto"] : null,
        this.makeElevation(this.elevation),
        "select-none",
        "bc-container"
      ];
    }
  },
  props: {
    clickable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    divider: {
      type: Boolean,
      default: false
    },
    elevation: {
      type: String,
      default: "none"
    },
    hoverable: {
      type: Boolean,
      default: false
    },
    inert: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: String
    }
  }
};
const _hoisted_1$f = ["inert"];
function _sfc_render$G(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_table_layout = resolveComponent("bc-table-layout");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.componentCssClasses),
    inert: $props.inert,
    style: normalizeStyle({ maxHeight: $props.maxHeight })
  }, [
    createVNode(_component_bc_table_layout, { "y-align": "middle" }, {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "default")
      ]),
      _: 3
    })
  ], 14, _hoisted_1$f);
}
const BcList = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["render", _sfc_render$G]]);
BcList.install = (Vue) => {
  Vue.component(BcList.name, BcList);
};
const _sfc_main$H = {
  name: "BcListItem",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("list-item")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.disabled && !this.inert ? "disabled" : null,
        ["a", "router-link"].includes(this.tag) ? "cursor-pointer" : null,
        "table-layout-row",
        "bc-table-layout-row"
      ];
    }
  },
  props: {
    disabled: {
      type: Boolean
    },
    href: {
      type: String
    },
    inert: {
      type: Boolean
    },
    tag: {
      type: String,
      default: "div"
    },
    to: {
      type: String
    }
  }
};
function _sfc_render$F(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    role: "row",
    inert: $props.inert,
    to: $props.to,
    href: $props.href,
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["inert", "to", "href", "class"]);
}
const BcListItem = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["render", _sfc_render$F]]);
BcListItem.install = (Vue) => {
  Vue.component(BcListItem.name, BcListItem);
};
const _sfc_main$G = {
  name: "BcListItemContent",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("list-item-content")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.padding,
        "w-full"
      ];
    }
  },
  props: {
    padding: {
      type: Array,
      default() {
        return ["p-1"];
      }
    }
  }
};
function _sfc_render$E(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  return openBlock(), createBlock(_component_bc_table_layout_cell, {
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
const BcListItemContent = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["render", _sfc_render$E]]);
BcListItemContent.install = (Vue) => {
  Vue.component(BcListItemContent.name, BcListItemContent);
};
const _sfc_main$F = {
  name: "BcListItemContentSubTitle",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("list-item-content-sub-title")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.makeFontSize(this.fontSize),
        this.makeFontWeight(this.fontWeight),
        this.truncate ? "truncate" : null
      ];
    }
  },
  props: {
    fontSize: {
      type: String,
      default: "xs"
    },
    fontWeight: {
      type: String,
      default: "normal"
    },
    truncate: {
      type: Boolean,
      default: true
    }
  }
};
function _sfc_render$D(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
const BcListItemContentSubTitle = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["render", _sfc_render$D]]);
BcListItemContentSubTitle.install = (Vue) => {
  Vue.component(BcListItemContentSubTitle.name, BcListItemContentSubTitle);
};
const _sfc_main$E = {
  name: "BcListItemContentTitle",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("list-item-content-title")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.makeFontSize(this.fontSize),
        this.makeFontWeight(this.fontWeight),
        this.truncate ? "truncate" : null
      ];
    }
  },
  props: {
    fontSize: {
      type: String,
      default: "sm"
    },
    fontWeight: {
      type: String,
      default: "semibold"
    },
    truncate: {
      type: Boolean,
      default: true
    }
  }
};
function _sfc_render$C(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
const BcListItemContentTitle = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["render", _sfc_render$C]]);
BcListItemContentTitle.install = (Vue) => {
  Vue.component(BcListItemContentTitle.name, BcListItemContentTitle);
};
const _sfc_main$D = {
  name: "BcListItemIcon",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("list-item-icon")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.padding
      ];
    }
  },
  props: {
    padding: {
      type: Array,
      default() {
        return ["p-1"];
      }
    }
  }
};
function _sfc_render$B(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  return openBlock(), createBlock(_component_bc_table_layout_cell, {
    "x-align": "center",
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
const BcListItemIcon = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["render", _sfc_render$B]]);
BcListItemIcon.install = (Vue) => {
  Vue.component(BcListItemIcon.name, BcListItemIcon);
};
const _sfc_main$C = {
  name: "BcLoadingOverlay",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("loading-overlay")
    };
  },
  computed: {
    style() {
      return {
        zIndex: this.zIndex
      };
    },
    spinnerCssClasses() {
      return [
        "animate-spin",
        "line-height-screen"
      ];
    },
    componentCssClasses() {
      return [
        this.baseCss,
        "fixed",
        "top-0",
        "right-0",
        "bottom-0",
        "w-screen",
        "h-screen",
        "left-0",
        "select-none",
        "cursor-wait",
        "text-center",
        this.makeFontSize(this.size),
        this.visible ? null : ["invisible", "pointer-events-none"]
      ];
    }
  },
  emits: [
    "update:visible"
  ],
  props: {
    icon: {
      type: String,
      default: "loading"
    },
    iconProvider: {
      type: String,
      default: "mdi"
    },
    size: {
      type: String,
      default: "3xl"
    },
    visible: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 1100
    }
  }
};
function _sfc_render$A(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    class: normalizeClass($options.componentCssClasses),
    style: normalizeStyle($options.style)
  }, {
    default: withCtx(() => [
      createVNode(_component_bc_icon, {
        name: $props.icon,
        provider: $props.iconProvider,
        class: normalizeClass($options.spinnerCssClasses)
      }, null, 8, ["name", "provider", "class"])
    ]),
    _: 1
  }, 8, ["class", "style"]);
}
const BcLoadingOverlay = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render$A]]);
BcLoadingOverlay.install = (Vue) => {
  Vue.component(BcLoadingOverlay.name, BcLoadingOverlay);
};
const _sfc_main$B = {
  name: "BcLoremIpsum",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("lorem-ipsum"),
      paragraphs: [
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. <a href="#" class="underline">Ut enim ad minim</a> veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
        `Sed ut <a href="#" class="underline">perspiciatis</a> unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
        aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
        dolores eos qui ratione voluptatem sequi nesciunt.`,
        `Neque porro <a href="#" class="underline">quisquam est</a>, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
        numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.`,
        `Ut enim ad minima <a href="#" class="underline">veniam</a>, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid
        ex ea commodi consequatur? Quis autem vel eum iure <a href="#" class="underline">reprehenderit</a> qui in ea voluptate velit esse quam
        nihil molestiae consequatur, <a href="#" class="underline">vel illum</a> qui dolorem eum fugiat quo voluptas nulla pariatur?`,
        `At vero eos et <a href="#" class="underline">accusamus</a> et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque
        corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident`,
        `Et harum quidem rerum facilis est et expedita <a href="#" class="underline">distinctio</a>. Nam libero tempore,
        cum soluta nobis est eligendi optio
        cumque nihil <a href="#" class="underline">impedit quo minus</a> id quod maxime placeat facere possimus, omnis voluptas assumenda
        est, omnis dolor repellendus.`
      ]
    };
  },
  props: {
    repeats: {
      type: Number,
      default: 1
    },
    tag: {
      type: String,
      default: "p"
    },
    fontSize: {
      type: String,
      default: "sm"
    },
    itemsMargin: {
      type: Array,
      default() {
        return ["mb-2"];
      }
    }
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        `text-${this.fontSize}`
      ];
    }
  },
  methods: {
    item() {
      const paragraphs = this.paragraphs;
      return paragraphs[Math.floor(Math.random() * paragraphs.length)];
    }
  }
};
function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.repeats, (repeat) => {
        return openBlock(), createBlock(_component_bc_container, {
          tag: $props.tag,
          key: repeat,
          class: normalizeClass($props.itemsMargin),
          innerHTML: $options.item()
        }, null, 8, ["tag", "class", "innerHTML"]);
      }), 128))
    ]),
    _: 1
  }, 8, ["class"]);
}
const BcLoremIpsum = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$z]]);
BcLoremIpsum.install = (Vue) => {
  Vue.component(BcLoremIpsum.name, BcLoremIpsum);
};
const _sfc_main$A = {
  name: "BcMeterGroup",
  mixins: [
    methods
  ],
  data() {
    return {
      items: [],
      baseCss: this.componentBaseCss("meter-group")
    };
  },
  computed: {
    ifLabels() {
      return this.items.filter((item) => item.label).length;
    },
    componentCssClasses() {
      return [
        this.baseCss
      ];
    },
    componentStyle() {
      return {
        height: this.height
      };
    },
    trackCssClasses() {
      return [
        `${this.baseCss}-track`,
        this.makeBorderRadius(this.roundness),
        this.makeElevation(this.elevation),
        this.clickable ? "cursor-pointer" : null,
        "overflow-hidden",
        "white-space-nowrap"
      ];
    },
    labelsListCssClasses() {
      return [
        this.makeFontSize(this.meterLabelSize),
        "inline-list",
        "align-middle",
        "truncate"
      ];
    }
  },
  props: {
    clickable: {
      type: Boolean
    },
    height: {
      type: String,
      default: "6px"
    },
    hint: {
      type: String
    },
    elevation: {
      type: String,
      default: "none"
    },
    label: {
      type: String
    },
    labelsUppercase: {
      type: Boolean,
      default: false
    },
    meterLabelSize: {
      type: String,
      default: "sm"
    },
    roundness: {
      type: String,
      default: "full"
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.$slots.default) {
        this.$slots.default()[0].children.filter((tabsPanel) => tabsPanel.type.name === "BcMeterGroupItem").forEach((child) => {
          this.items.push(child.props);
        });
      }
    },
    labelsCssClasses(labelType) {
      return [
        labelType === "label" ? ["mb-1", "align-left"] : ["mt-1", "align-right"],
        this.labelsUppercase ? "uppercase" : null
      ];
    }
  }
};
const _hoisted_1$e = {
  class: /* @__PURE__ */ normalizeClass(["align-middle", "inline-block", "py-1"])
};
function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_text_field_label = resolveComponent("bc-text-field-label");
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      $props.label ? (openBlock(), createBlock(_component_bc_text_field_label, {
        key: 0,
        text: $props.label,
        class: normalizeClass($options.labelsCssClasses("label"))
      }, null, 8, ["text", "class"])) : createCommentVNode("", true),
      createVNode(_component_bc_container, {
        style: normalizeStyle($options.componentStyle),
        class: normalizeClass($options.trackCssClasses),
        wrap: false
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["style", "class"]),
      $options.ifLabels ? (openBlock(), createElementBlock("ul", {
        key: 1,
        class: normalizeClass($options.labelsListCssClasses)
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($data.items, (item) => {
          return openBlock(), createElementBlock("li", _hoisted_1$e, [
            renderSlot(_ctx.$slots, "label", { data: item })
          ]);
        }), 256))
      ], 2)) : createCommentVNode("", true),
      $props.hint ? (openBlock(), createBlock(_component_bc_text_field_label, {
        key: 2,
        text: $props.hint,
        class: normalizeClass($options.labelsCssClasses("hint"))
      }, null, 8, ["text", "class"])) : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["class"]);
}
const BcMeterGroup = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$y]]);
BcMeterGroup.install = (Vue) => {
  Vue.component(BcMeterGroup.name, BcMeterGroup);
};
const _sfc_main$z = {
  name: "BcMeterGroupItem",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("meter-group-item")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        "align-top"
      ];
    },
    componentStyle() {
      return {
        width: this.value,
        height: "inherit",
        background: `linear-gradient(to right, ${this.color.join(",")})`
      };
    }
  },
  emits: [
    "update:value",
    "item-click"
  ],
  props: {
    color: {
      type: Array,
      default() {
        return [
          "#ababab"
        ];
      }
    },
    icon: {
      type: String
    },
    label: {
      type: String
    },
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    onLabelClick() {
      this.$emit("item-click", {
        color: this.color,
        icon: this.icon,
        label: this.label,
        value: this.value
      });
    }
  }
};
function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    onClick: $options.onLabelClick,
    title: $props.value,
    display: "inline-block",
    class: normalizeClass($options.componentCssClasses),
    style: normalizeStyle($options.componentStyle)
  }, null, 8, ["onClick", "title", "class", "style"]);
}
const BcMeterGroupItem = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$x]]);
BcMeterGroupItem.install = (Vue) => {
  Vue.component(BcMeterGroupItem.name, BcMeterGroupItem);
};
const _sfc_main$y = {
  name: "BcMultilineEllipsis",
  mixins: [
    methods
  ],
  data() {
    return {
      clamp: null,
      baseCss: this.componentBaseCss("multiline-ellipsis")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        "overflow-hidden",
        "white-space-normal",
        "text-overflow-ellipsis"
      ];
    },
    componentStyle() {
      return {
        lineClamp: this.lineClamp
      };
    }
  },
  props: {
    lineClamp: {
      type: Number
    },
    tag: {
      type: String,
      default: "p"
    }
  }
};
function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    tag: $props.tag,
    class: normalizeClass($options.componentCssClasses),
    style: normalizeStyle($options.componentStyle)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["tag", "class", "style"]);
}
const BcMultilineEllipsis = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$w]]);
BcMultilineEllipsis.install = (Vue) => {
  Vue.component(BcMultilineEllipsis.name, BcMultilineEllipsis);
};
const _sfc_main$x = {
  name: "BcNavigatorOnline",
  data() {
    return {
      online: null
    };
  },
  watch: {
    online() {
      this.$emit("change", {
        online: this.online
      });
    }
  },
  render() {
    return null;
  },
  mounted() {
    addEventListener("online", () => {
      this.online = true;
    });
    addEventListener("offline", () => {
      this.online = false;
    });
    this.online = navigator.onLine;
  }
};
_sfc_main$x.install = (Vue) => {
  Vue.component(_sfc_main$x.name, _sfc_main$x);
};
const _sfc_main$w = {
  name: "BcNotification",
  mixins: [
    methods
  ],
  data() {
    return {
      notifications: [],
      baseCss: this.componentBaseCss("notification")
    };
  },
  computed: {
    componentCssClasses() {
      const right = this.right;
      const baseCss = this.baseCss;
      return [
        baseCss,
        this.bottom ? "flex-column-reverse" : "justify-content-start",
        this.padding,
        this.notifications.length ? null : "hidden",
        right ? "right-0" : "left-0",
        right ? `${baseCss}-right` : `${baseCss}-left`,
        "fixed",
        "h-device",
        "top-0",
        "flex",
        "flex-column",
        "pointer-events-none",
        "overflow-auto"
      ];
    },
    componentStyle() {
      return {
        width: this.width,
        zIndex: this.zIndex
      };
    },
    alertCssClasses() {
      return [
        this.margin,
        "pointer-events-all",
        "transition-all",
        "transition-duration-300",
        "transition-ease-in-out"
      ];
    }
  },
  props: {
    bottom: {
      type: Boolean,
      default: true
    },
    elevation: {
      type: String,
      default: "xl"
    },
    margin: {
      type: Array,
      default: ["my-2"]
    },
    padding: {
      type: Array,
      default: ["px-3", "py-2"]
    },
    right: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: "320px"
    },
    zIndex: {
      type: Number,
      default: 1e3
    }
  },
  created() {
    this.bind();
  },
  methods: {
    bind() {
      this.$emitter.on("bc-notification", (data) => {
        data.id = `bc-notification-${this.uuid()}`;
        if (data.autoCloseDelay) {
          data.timer = this.sleep(data.autoCloseDelay).then(() => {
            this.dismissNotification(data.id);
          });
        }
        this.notifications.push(data);
      });
    },
    dismissNotification(id) {
      const node = this.getNotificationNodeById(id);
      if (node) {
        node.classList.add(`${this.baseCss}-dismissed`);
      }
      this.sleep(150).then(() => {
        this.getNotificationDataById(id).visible = false;
      });
    },
    getNotificationDataById(id) {
      return this.notifications.find((notification) => notification.id === id);
    },
    getNotificationNodeById(id) {
      return this.$el.querySelector(`[data-notification-id="${id}"]`);
    },
    onNotificationClick(notification) {
      if (notification.click) {
        notification.click();
      }
    }
  }
};
function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_heading = resolveComponent("bc-heading");
  const _component_bc_container = resolveComponent("bc-container");
  const _component_bc_reactive_style = resolveComponent("bc-reactive-style");
  const _component_bc_alert = resolveComponent("bc-alert");
  return openBlock(), createBlock(_component_bc_container, {
    class: normalizeClass($options.componentCssClasses),
    style: normalizeStyle($options.componentStyle)
  }, {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList($data.notifications, (notification, index) => {
        return openBlock(), createBlock(_component_bc_alert, {
          visible: notification.visible,
          "onUpdate:visible": ($event) => notification.visible = $event,
          onClick: ($event) => $options.onNotificationClick(notification),
          "data-notification-id": notification.id,
          class: normalizeClass($options.alertCssClasses),
          color: notification.color || "primary",
          variant: notification.variant || "solid",
          dismissible: notification.dismissible,
          icon: notification.icon,
          elevation: $props.elevation
        }, {
          default: withCtx(() => [
            notification.title ? (openBlock(), createBlock(_component_bc_heading, {
              key: 0,
              "font-size": "sm",
              divider: false,
              margin: ["mb-1"]
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(notification.title), 1)
              ]),
              _: 2
            }, 1024)) : createCommentVNode("", true),
            notification.text ? (openBlock(), createBlock(_component_bc_container, {
              key: 1,
              textContent: toDisplayString(notification.text)
            }, null, 8, ["textContent"])) : createCommentVNode("", true),
            createVNode(_component_bc_reactive_style, null, {
              default: withCtx(() => [
                createTextVNode(" .bc-notification.bc-notification-" + toDisplayString($props.right ? "right" : "left") + ' .bc-alert[data-notification-id="' + toDisplayString(notification.id) + '"].bc-notification-dismissed { opacity: 0; transform: translateX(' + toDisplayString($props.right ? parseInt($props.width, 10) : parseInt($props.width, 10) * -1) + "px); } ", 1)
              ]),
              _: 2
            }, 1024)
          ]),
          _: 2
        }, 1032, ["visible", "onUpdate:visible", "onClick", "data-notification-id", "class", "color", "variant", "dismissible", "icon", "elevation"]);
      }), 256))
    ]),
    _: 1
  }, 8, ["class", "style"]);
}
const BcNotification = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$v]]);
BcNotification.install = (Vue) => {
  Vue.component(BcNotification.name, BcNotification);
};
const _sfc_main$v = {
  name: "BcRadio",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("radio")
    };
  },
  emits: [
    "update:value"
  ],
  props: {
    label: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    inert: {
      type: Boolean,
      default: false
    },
    value: {
      type: [
        String,
        Number
      ]
    }
  },
  methods: {
    onChange() {
      this.$parent.$emit("update:value", this.value);
    }
  },
  computed: {
    parent() {
      return this.$parent.$props;
    },
    checked() {
      return this.value === this.parent.value;
    },
    icon() {
      return this.parent[this.checked ? "iconChecked" : "iconUnchecked"];
    },
    componentCssClasses() {
      return [
        this.baseCss,
        this.disabled && !this.inert ? "disabled" : null,
        this.parent.vertical ? null : ["inline-block", "align-middle"]
      ];
    },
    labelCssClasses() {
      return [
        "truncate",
        this.parent.labelUppercase ? "uppercase" : null,
        `font-${this.parent.labelFontWeight}`
      ];
    }
  }
};
const _hoisted_1$d = ["inert"];
const _hoisted_2$6 = {
  class: /* @__PURE__ */ normalizeClass(["block", "cursor-pointer"])
};
const _hoisted_3$2 = ["checked", "name", "value"];
function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  const _component_bc_container = resolveComponent("bc-container");
  const _component_bc_table_layout_row = resolveComponent("bc-table-layout-row");
  const _component_bc_table_layout = resolveComponent("bc-table-layout");
  return openBlock(), createElementBlock("li", {
    class: normalizeClass($options.componentCssClasses),
    role: "radio",
    inert: $props.inert
  }, [
    createElementVNode("label", _hoisted_2$6, [
      createElementVNode("input", {
        hidden: "",
        onChange: _cache[0] || (_cache[0] = (...args) => $options.onChange && $options.onChange(...args)),
        class: normalizeClass(["hidden"]),
        type: "radio",
        tabindex: "-1",
        checked: $props.value === $options.parent.value,
        name: $options.parent.name,
        value: $props.value
      }, null, 40, _hoisted_3$2),
      createVNode(_component_bc_table_layout, { "y-align": "middle" }, {
        default: withCtx(() => [
          createVNode(_component_bc_table_layout_row, null, {
            default: withCtx(() => [
              createVNode(_component_bc_table_layout_cell, {
                class: normalizeClass([`${$data.baseCss}-icon-cell`]),
                "x-align": "center"
              }, {
                default: withCtx(() => [
                  createVNode(_component_bc_icon, {
                    provider: $options.parent.iconProvider,
                    name: $options.icon
                  }, null, 8, ["provider", "name"])
                ]),
                _: 1
              }, 8, ["class"]),
              createVNode(_component_bc_table_layout_cell, {
                class: normalizeClass(["p-1", "pl-0", "text-left", `${$data.baseCss}-label`])
              }, {
                default: withCtx(() => [
                  createVNode(_component_bc_container, {
                    class: normalizeClass($options.labelCssClasses),
                    textContent: toDisplayString($props.label)
                  }, null, 8, ["class", "textContent"])
                ]),
                _: 1
              }, 8, ["class"])
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ])
  ], 10, _hoisted_1$d);
}
const BcRadio = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$u]]);
BcRadio.install = (Vue) => {
  Vue.component(BcRadio.name, BcRadio);
};
const _sfc_main$u = {
  name: "BcRadioGroup",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("radio-group")
    };
  },
  emits: [
    "update:value"
  ],
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.block ? "block" : ["inline-block", "align-middle"],
        this.disabled && !this.inert ? "disabled" : null,
        `text-${this.size}`,
        "bc-container"
      ];
    }
  },
  props: {
    block: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    labelFontWeight: {
      type: String,
      default: "normal"
    },
    labelUppercase: {
      type: Boolean,
      default: false
    },
    iconChecked: {
      type: String,
      default: "radiobox-marked"
    },
    iconProvider: {
      type: String,
      default: "mdi"
    },
    iconUnchecked: {
      type: String,
      default: "radiobox-blank"
    },
    inert: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: "sm"
    },
    value: {
      type: [
        String,
        Number
      ]
    },
    vertical: {
      type: Boolean,
      default: true
    },
    xAlign: {
      type: String,
      default: "left"
    }
  }
};
const _hoisted_1$c = ["inert"];
function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    role: "radiogroup",
    class: normalizeClass($options.componentCssClasses),
    inert: $props.inert
  }, [
    createElementVNode("ul", {
      class: normalizeClass([`text-${$props.xAlign}`])
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 2)
  ], 10, _hoisted_1$c);
}
const BcRadioGroup = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$t]]);
BcRadioGroup.install = (Vue) => {
  Vue.component(BcRadioGroup.name, BcRadioGroup);
};
const sliderProps = {
  props: {
    block: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "primary"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fontSize: {
      type: String,
      default: "sm"
    },
    height: {
      type: Number,
      default: 8
    },
    hint: {
      type: String
    },
    inert: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    labelsUppercase: {
      type: Boolean,
      default: false
    },
    max: {
      type: [
        Number,
        String
      ],
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    minMaxLabels: {
      type: Boolean,
      default: true
    },
    name: {
      type: String
    },
    rounded: {
      type: Boolean,
      default: true
    },
    showSelectedRange: {
      type: Boolean,
      default: true
    },
    step: {
      type: [
        Number,
        String
      ],
      default: 1
    },
    tooltip: {
      type: Boolean,
      default: true
    },
    variant: {
      type: String,
      default: "solid"
    },
    width: {
      type: String
    }
  }
};
const _sfc_main$t = {
  name: "BcRangeSlider",
  mixins: [
    methods,
    sliderProps
  ],
  data() {
    return {
      id: `bc-range-slider-${this.uuid()}`,
      baseCss: this.componentBaseCss("range-slider")
    };
  },
  computed: {
    minMaxLabelsCssClasses() {
      return [
        `${this.baseCss}-label-cell`,
        "p-1"
      ];
    },
    componentCssClasses() {
      const baseCss = this.baseCss;
      return [
        baseCss,
        this.block ? null : "vertical-align-middle",
        this.disabled && !this.inert ? "disabled" : null,
        this.makeFontSize(this.fontSize),
        this.tooltip ? `${baseCss}-tooltip` : null,
        "select-none",
        "bc-css-slider"
      ];
    },
    inputSliderCssClasses() {
      return [
        "block",
        "w-full",
        "appearance-none",
        // 'cursor-pointer',
        "outline-none"
      ];
    },
    bottomSliderStyles() {
      return {
        marginTop: `${this.height * -1}px`
      };
    },
    componentStyle() {
      return {
        width: this.width
      };
    },
    getSliders() {
      return this.$el.querySelectorAll('input[type="range"]');
    },
    rangeCssClasses() {
      return [
        this.makeUiColorVariant(this.color, this.variant),
        "relative",
        "border-round-full"
      ];
    },
    rangeStyle() {
      const value = this.value;
      const max = this.max;
      const min = this.min;
      const toPercent = (value2) => {
        return (value2 - min) / (max - min) * 100;
      };
      const leftOffset = toPercent(value[0]);
      const rightOffset = toPercent(value[1]);
      const width = Math.abs(rightOffset - leftOffset);
      const height = this.height;
      return {
        height: `${height}px`,
        width: `${width}%`,
        marginLeft: leftOffset + "%",
        marginRight: rightOffset + "%",
        marginTop: `${height * -1}px`
      };
    },
    makeTooltip() {
      const value = this.value;
      return `${value[0]} / ${value[1]}`;
    }
  },
  emits: [
    "update:value"
  ],
  props: {
    value: {
      type: Array,
      default() {
        return [0, 100];
      }
    }
  },
  methods: {
    onInput() {
      const slides = this.getSliders;
      let sliderTopValue = parseFloat(slides[0].value);
      let sliderBottomValue = parseFloat(slides[1].value);
      if (sliderTopValue > sliderBottomValue) {
        const tempValue = sliderBottomValue;
        sliderBottomValue = sliderTopValue;
        sliderTopValue = tempValue;
      }
      this.$emit("update:value", [sliderTopValue, sliderBottomValue]);
    },
    makeName(slider = "top") {
      const name = this.name;
      return name ? `${name}-${slider}` : null;
    }
  }
};
const _hoisted_1$b = ["min", "max", "value", "step", "name"];
const _hoisted_2$5 = ["min", "max", "value", "step", "name"];
function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  const _component_bc_text_field_label = resolveComponent("bc-text-field-label");
  const _component_bc_table_layout_row = resolveComponent("bc-table-layout-row");
  const _component_bc_container = resolveComponent("bc-container");
  const _component_bc_table_layout = resolveComponent("bc-table-layout");
  const _component_bc_reactive_style = resolveComponent("bc-reactive-style");
  return openBlock(), createBlock(_component_bc_container, {
    "data-name": _ctx.name,
    "data-range-slider-id": $data.id,
    class: normalizeClass($options.componentCssClasses),
    inert: _ctx.inert,
    style: normalizeStyle($options.componentStyle)
  }, {
    default: withCtx(() => [
      createVNode(_component_bc_table_layout, { "y-align": "middle" }, {
        default: withCtx(() => [
          _ctx.label ? (openBlock(), createBlock(_component_bc_table_layout_row, { key: 0 }, {
            default: withCtx(() => [
              _ctx.minMaxLabels ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                key: 0,
                class: normalizeClass($options.minMaxLabelsCssClasses)
              }, null, 8, ["class"])) : createCommentVNode("", true),
              createVNode(_component_bc_table_layout_cell, {
                class: normalizeClass(["w-full", "p-1"])
              }, {
                default: withCtx(() => [
                  createVNode(_component_bc_text_field_label, {
                    text: _ctx.label,
                    class: normalizeClass([`${$data.baseCss}-label`, "text-left", _ctx.labelsUppercase ? "uppercase" : null])
                  }, null, 8, ["text", "class"])
                ]),
                _: 1
              }),
              _ctx.minMaxLabels ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                key: 1,
                class: normalizeClass($options.minMaxLabelsCssClasses)
              }, null, 8, ["class"])) : createCommentVNode("", true)
            ]),
            _: 1
          })) : createCommentVNode("", true),
          createVNode(_component_bc_table_layout_row, null, {
            default: withCtx(() => [
              _ctx.minMaxLabels ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                key: 0,
                "x-align": "right",
                class: normalizeClass($options.minMaxLabelsCssClasses),
                textContent: toDisplayString(_ctx.min)
              }, null, 8, ["class", "textContent"])) : createCommentVNode("", true),
              createVNode(_component_bc_table_layout_cell, {
                class: normalizeClass(["w-full", "p-1", "bcq-tooltip-top"]),
                "data-tooltip": $options.makeTooltip
              }, {
                default: withCtx(() => [
                  createElementVNode("input", {
                    onInput: _cache[0] || (_cache[0] = (...args) => $options.onInput && $options.onInput(...args)),
                    min: _ctx.min,
                    max: _ctx.max,
                    value: $props.value[0],
                    step: _ctx.step,
                    name: $options.makeName("top"),
                    class: normalizeClass([$options.inputSliderCssClasses, `${$data.baseCss}-top-slider`]),
                    type: "range"
                  }, null, 42, _hoisted_1$b),
                  createElementVNode("input", {
                    onInput: _cache[1] || (_cache[1] = (...args) => $options.onInput && $options.onInput(...args)),
                    min: _ctx.min,
                    max: _ctx.max,
                    value: $props.value[1],
                    step: _ctx.step,
                    name: $options.makeName("bottom"),
                    class: normalizeClass([$options.inputSliderCssClasses, `${$data.baseCss}-bottom-slider`]),
                    type: "range",
                    style: normalizeStyle($options.bottomSliderStyles)
                  }, null, 46, _hoisted_2$5),
                  _ctx.showSelectedRange ? (openBlock(), createBlock(_component_bc_container, {
                    key: 0,
                    style: normalizeStyle($options.rangeStyle),
                    class: normalizeClass($options.rangeCssClasses)
                  }, null, 8, ["style", "class"])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["data-tooltip"]),
              _ctx.minMaxLabels ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                key: 1,
                "x-align": "left",
                class: normalizeClass($options.minMaxLabelsCssClasses),
                textContent: toDisplayString(_ctx.max)
              }, null, 8, ["class", "textContent"])) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          _ctx.hint ? (openBlock(), createBlock(_component_bc_table_layout_row, { key: 1 }, {
            default: withCtx(() => [
              _ctx.minMaxLabels ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                key: 0,
                class: normalizeClass($options.minMaxLabelsCssClasses)
              }, null, 8, ["class"])) : createCommentVNode("", true),
              createVNode(_component_bc_table_layout_cell, {
                class: normalizeClass(["w-full", "p-1"])
              }, {
                default: withCtx(() => [
                  createVNode(_component_bc_text_field_label, {
                    text: _ctx.hint,
                    class: normalizeClass([`${$data.baseCss}-label`, "text-right", _ctx.labelsUppercase ? "uppercase" : null])
                  }, null, 8, ["text", "class"])
                ]),
                _: 1
              }),
              _ctx.minMaxLabels ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                key: 1,
                class: normalizeClass($options.minMaxLabelsCssClasses)
              }, null, 8, ["class"])) : createCommentVNode("", true)
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ]),
        _: 1
      }),
      createVNode(_component_bc_reactive_style, null, {
        default: withCtx(() => [
          createTextVNode(' .bc-range-slider[data-range-slider-id="' + toDisplayString($data.id) + '"] input[type="range"]::-webkit-slider-runnable-track { border-radius: ' + toDisplayString(_ctx.rounded ? "9999px" : 0) + "; height: " + toDisplayString(_ctx.height) + 'px; } .bc-range-slider[data-range-slider-id="' + toDisplayString($data.id) + '"] input[type="range"]::-moz-range-track { border-radius: ' + toDisplayString(_ctx.rounded ? "9999px" : 0) + "; height: " + toDisplayString(_ctx.height) + 'px; } .bc-range-slider[data-range-slider-id="' + toDisplayString($data.id) + '"] input[type="range"]::-webkit-slider-thumb { border-radius: ' + toDisplayString(_ctx.rounded ? "9999px" : 0) + "; height: " + toDisplayString(_ctx.height * 2) + "px; width: " + toDisplayString(_ctx.height * 2) + "px; margin-top: -" + toDisplayString(_ctx.height / 2) + 'px; } .bc-range-slider[data-range-slider-id="' + toDisplayString($data.id) + '"] input[type="range"]::-moz-range-thumb { border-radius: ' + toDisplayString(_ctx.rounded ? "9999px" : 0) + "; height: " + toDisplayString(_ctx.height * 2) + "px; width: " + toDisplayString(_ctx.height * 2) + "px; margin-top: -" + toDisplayString(_ctx.height / 2) + 'px; } .bc-range-slider[data-range-slider-id="' + toDisplayString($data.id) + '"] input[type="range"]::-webkit-slider-thumb { background: var(--' + toDisplayString(_ctx.makeUiColorVariant(_ctx.color, _ctx.variant)) + ' ); } .bc-range-slider[data-range-slider-id="' + toDisplayString($data.id) + '"] input[type="range"]::-moz-range-thumb { background: var(--' + toDisplayString(_ctx.makeUiColorVariant(_ctx.color, _ctx.variant)) + ' ); } .bc-app-theme-dark .bc-range-slider[data-range-slider-id="' + toDisplayString($data.id) + '"] input[type="range"]::-webkit-slider-thumb { background: var(--' + toDisplayString(_ctx.makeUiColorVariant(_ctx.color, _ctx.variant)) + '-dark ); } .bc-app-theme-dark .bc-range-slider[data-range-slider-id="' + toDisplayString($data.id) + '"] input[type="range"]::-moz-range-thumb { background: var(--' + toDisplayString(_ctx.makeUiColorVariant(_ctx.color, _ctx.variant)) + "-dark ); } ", 1)
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["data-name", "data-range-slider-id", "class", "inert", "style"]);
}
const BcRangeSlider = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$s]]);
BcRangeSlider.install = (Vue) => {
  Vue.component(BcRangeSlider.name, BcRangeSlider);
};
const _sfc_main$s = {
  name: "BcRating",
  mixins: [
    methods
  ],
  data() {
    return {
      id: this.uuid(),
      baseCss: this.componentBaseCss("rating")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.block ? null : "align-middle",
        this.disabled && !this.inert ? "disabled" : null,
        "white-space-nowrap",
        "select-none"
      ];
    },
    noRatingCssClasses() {
      return [
        `${this.baseCss}-no-rating`,
        "opacity-50",
        "hover:opacity-100",
        "cursor-pointer",
        "transition-opacity",
        "transition-duration-300"
      ];
    },
    componentInnerWrapperCssClasses() {
      return [
        `${this.baseCss}-inner-wrapper`,
        "inline-block",
        "align-middle",
        "border-none",
        "white-space-nowrap"
      ];
    }
  },
  emits: [
    "update:value"
  ],
  props: {
    block: {
      type: Boolean,
      default: false
    },
    colorSelected: {
      type: String,
      default: "#f59e0b"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hint: {
      type: String
    },
    icon: {
      type: String,
      default: "star"
    },
    iconNoRating: {
      type: String,
      default: "cancel"
    },
    iconsProvider: {
      type: String,
      default: "mdi"
    },
    iconsSize: {
      type: Number,
      default: 2
    },
    inert: {
      type: Boolean,
      default: false
    },
    items: {
      type: Number,
      default: 5
    },
    label: {
      type: String
    },
    labelsUppercase: {
      type: Boolean,
      default: false
    },
    noRating: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number
    }
  },
  methods: {
    makeValue(index) {
      return this.items - index;
    },
    itemCssClasses(index) {
      const baseCss = this.baseCss;
      return [
        `${baseCss}-item`,
        this.makeValue(index) === this.value ? `${baseCss}-item-selected` : null,
        "transition-all",
        "transition-duration-300",
        "cursor-pointer"
      ];
    },
    labelsCssClasses(label = true) {
      return [
        `${this.baseCss}-label`,
        this.labelsUppercase ? "uppercase" : null,
        label ? "mb-1" : "mt-1",
        label ? "text-left" : "text-right"
      ];
    },
    onClick(value) {
      this.$emit("update:value", parseInt(value, 10));
    }
  }
};
function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_text_field_label = resolveComponent("bc-text-field-label");
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_container = resolveComponent("bc-container");
  const _component_bc_reactive_style = resolveComponent("bc-reactive-style");
  return openBlock(), createBlock(_component_bc_container, {
    "data-bc-rating-id": $data.id,
    inert: $props.inert,
    display: $props.block ? "block" : "inline-block",
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      $props.label ? (openBlock(), createBlock(_component_bc_text_field_label, {
        key: 0,
        text: $props.label,
        class: normalizeClass($options.labelsCssClasses())
      }, null, 8, ["text", "class"])) : createCommentVNode("", true),
      createVNode(_component_bc_container, {
        class: normalizeClass(["flex", "flex-row", "flex-row-reverse"])
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList($props.items, (star, index) => {
            return openBlock(), createBlock(_component_bc_icon, {
              "data-bc-rating-value": $options.makeValue(index),
              onClick: ($event) => $options.onClick($options.makeValue(index)),
              name: $props.icon,
              provider: $props.iconsProvider,
              size: $props.iconsSize,
              class: normalizeClass($options.itemCssClasses(index))
            }, null, 8, ["data-bc-rating-value", "onClick", "name", "provider", "size", "class"]);
          }), 256)),
          $props.noRating ? (openBlock(), createBlock(_component_bc_icon, {
            key: 0,
            onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick(0)),
            name: $props.iconNoRating,
            provider: $props.iconsProvider,
            size: $props.iconsSize,
            class: normalizeClass($options.noRatingCssClasses)
          }, null, 8, ["name", "provider", "size", "class"])) : createCommentVNode("", true)
        ]),
        _: 1
      }),
      $props.hint ? (openBlock(), createBlock(_component_bc_text_field_label, {
        key: 1,
        text: $props.hint,
        class: normalizeClass($options.labelsCssClasses(false))
      }, null, 8, ["text", "class"])) : createCommentVNode("", true),
      createVNode(_component_bc_reactive_style, null, {
        default: withCtx(() => [
          createTextVNode(' .bc-rating[data-bc-rating-id="' + toDisplayString($data.id) + '"] .bc-rating-item:hover, .bc-rating[data-bc-rating-id="' + toDisplayString($data.id) + '"] .bc-rating-item.bc-rating-item-selected, .bc-rating[data-bc-rating-id="' + toDisplayString($data.id) + '"] .bc-rating-item:hover ~ .bc-rating-item, .bc-rating[data-bc-rating-id="' + toDisplayString($data.id) + '"] .bc-rating-item.bc-rating-item-selected ~ .bc-rating-item { color: ' + toDisplayString($props.colorSelected) + "; } ", 1)
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["data-bc-rating-id", "inert", "display", "class"]);
}
const BcRating = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$r]]);
BcRating.install = (Vue) => {
  Vue.component(BcRating.name, BcRating);
};
const _sfc_main$r = {
  name: "BcPager",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("pager")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.disabled && !this.inert ? "disabled" : null,
        `text-${this.align}`,
        "select-none"
      ];
    },
    buttonClasses() {
      return [
        "m-1",
        "transition-all",
        "transition-duration-100",
        "transition-ease-in"
      ];
    }
  },
  emits: [
    "update:page"
  ],
  props: {
    align: {
      type: String,
      default: "center",
      validator: (value) => {
        return [
          "left",
          "center",
          "right"
        ].includes(value);
      }
    },
    color: {
      type: String,
      default: "primary"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    elevation: {
      type: String,
      default: "md"
    },
    firstLastButtons: {
      type: Boolean,
      default: true
    },
    fontWeight: {
      type: String,
      default: "medium"
    },
    iconProvider: {
      type: String,
      default: "mdi"
    },
    icons: {
      type: Object,
      default() {
        return {
          prev: "chevron-left",
          next: "chevron-right",
          first: "chevron-double-left",
          last: "chevron-double-right"
        };
      }
    },
    inert: {
      type: Boolean,
      default: false
    },
    page: {
      type: Number,
      required: true
    },
    pages: {
      type: Number,
      required: true
    },
    prevNextButtons: {
      type: Boolean,
      default: true
    },
    roundness: {
      type: String,
      default: "sm"
    },
    size: {
      type: String,
      default: "sm"
    },
    variant: {
      type: String,
      default: "solid"
    }
  },
  methods: {
    goToPage(index) {
      this.$emit("update:page", index);
    }
  }
};
const _hoisted_1$a = {
  class: /* @__PURE__ */ normalizeClass(["inline-list"])
};
const _hoisted_2$4 = { key: 0 };
const _hoisted_3$1 = { key: 1 };
const _hoisted_4$1 = { key: 2 };
const _hoisted_5 = { key: 3 };
function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_btn = resolveComponent("bc-btn");
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    inert: $props.inert,
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      createElementVNode("ul", _hoisted_1$a, [
        $props.firstLastButtons ? (openBlock(), createElementBlock("li", _hoisted_2$4, [
          createVNode(_component_bc_btn, {
            onClick: _cache[0] || (_cache[0] = ($event) => $options.goToPage(0)),
            disabled: $props.page === 0,
            "font-weight": $props.fontWeight,
            color: $props.color,
            variant: $props.variant,
            size: $props.size,
            class: normalizeClass($options.buttonClasses),
            icon: $props.icons.first,
            "icon-provider": $props.iconProvider,
            elevation: $props.elevation,
            roundness: $props.roundness
          }, null, 8, ["disabled", "font-weight", "color", "variant", "size", "class", "icon", "icon-provider", "elevation", "roundness"])
        ])) : createCommentVNode("", true),
        $props.prevNextButtons ? (openBlock(), createElementBlock("li", _hoisted_3$1, [
          createVNode(_component_bc_btn, {
            onClick: _cache[1] || (_cache[1] = ($event) => $options.goToPage($props.page - 1)),
            disabled: $props.page === 0,
            "font-weight": $props.fontWeight,
            color: $props.color,
            variant: $props.variant,
            size: $props.size,
            class: normalizeClass($options.buttonClasses),
            icon: $props.icons.prev,
            "icon-provider": $props.iconProvider,
            elevation: $props.elevation,
            roundness: $props.roundness
          }, null, 8, ["disabled", "font-weight", "color", "variant", "size", "class", "icon", "icon-provider", "elevation", "roundness"])
        ])) : createCommentVNode("", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.pages, (currentPage, index) => {
          return openBlock(), createElementBlock("li", { key: index }, [
            createVNode(_component_bc_btn, {
              onClick: ($event) => $options.goToPage(index),
              "font-weight": $props.fontWeight,
              color: $props.color,
              variant: $props.variant,
              size: $props.size,
              class: normalizeClass([$options.buttonClasses, index === $props.page ? `${$data.baseCss}-btn-selected` : null]),
              elevation: $props.elevation,
              roundness: $props.roundness
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(currentPage), 1)
              ]),
              _: 2
            }, 1032, ["onClick", "font-weight", "color", "variant", "size", "class", "elevation", "roundness"])
          ]);
        }), 128)),
        $props.prevNextButtons ? (openBlock(), createElementBlock("li", _hoisted_4$1, [
          createVNode(_component_bc_btn, {
            onClick: _cache[2] || (_cache[2] = ($event) => $options.goToPage($props.page + 1)),
            disabled: $props.page === $props.pages - 1,
            "font-weight": $props.fontWeight,
            color: $props.color,
            variant: $props.variant,
            size: $props.size,
            class: normalizeClass($options.buttonClasses),
            icon: $props.icons.next,
            "icon-provider": $props.iconProvider,
            elevation: $props.elevation,
            roundness: $props.roundness
          }, null, 8, ["disabled", "font-weight", "color", "variant", "size", "class", "icon", "icon-provider", "elevation", "roundness"])
        ])) : createCommentVNode("", true),
        $props.firstLastButtons ? (openBlock(), createElementBlock("li", _hoisted_5, [
          createVNode(_component_bc_btn, {
            onClick: _cache[3] || (_cache[3] = ($event) => $options.goToPage($props.pages - 1)),
            disabled: $props.page === $props.pages - 1,
            "font-weight": $props.fontWeight,
            color: $props.color,
            variant: $props.variant,
            size: $props.size,
            class: normalizeClass($options.buttonClasses),
            icon: $props.icons.last,
            "icon-provider": $props.iconProvider,
            elevation: $props.elevation,
            roundness: $props.roundness
          }, null, 8, ["disabled", "font-weight", "color", "variant", "size", "class", "icon", "icon-provider", "elevation", "roundness"])
        ])) : createCommentVNode("", true)
      ])
    ]),
    _: 1
  }, 8, ["inert", "class"]);
}
const BcPager = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$q]]);
BcPager.install = (Vue) => {
  Vue.component(BcPager.name, BcPager);
};
const _sfc_main$q = {
  name: "BcProgressbar",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("progressbar")
    };
  },
  emits: [
    "update:value",
    "icon-left-click",
    "icon-right-click"
  ],
  props: {
    block: {
      type: Boolean,
      default: true
    },
    comparator: {
      type: Number,
      default: 100
    },
    disabled: {
      type: Boolean,
      default: false
    },
    elevation: {
      type: String,
      default: "none"
    },
    height: {
      type: String,
      default: "8px"
    },
    hint: {
      type: String
    },
    iconCursor: {
      type: String,
      default: "default"
    },
    iconLeft: {
      type: String
    },
    iconProvider: {
      type: String,
      default: "mdi"
    },
    iconRight: {
      type: String
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    inert: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    labelsUppercase: {
      type: Boolean,
      default: false
    },
    percentageToFixed: {
      type: Number,
      default: 0
    },
    progressColor: {
      type: String,
      default: "secondary"
    },
    reversed: {
      type: Boolean,
      default: false
    },
    roundness: {
      type: String,
      default: "full"
    },
    size: {
      type: String,
      default: "sm"
    },
    tag: {
      type: String,
      default: "div"
    },
    value: {
      type: Number,
      default: 0
    },
    width: {
      type: String
    }
  },
  computed: {
    getPercentage() {
      return `${(100 * this.value / this.comparator).toFixed(this.percentageToFixed)}%`;
    },
    componentCssClasses() {
      const baseCss = this.baseCss;
      return [
        baseCss,
        this.disabled && !this.inert ? "disabled" : null,
        this.indeterminate ? `${baseCss}-indeterminate` : null,
        this.block ? "block" : ["align-middle", "inline-block"],
        `text-${this.size}`,
        "cursor-default",
        "select-none"
      ];
    },
    componentStyle() {
      return {
        width: this.width
      };
    },
    iconCellCssClasses() {
      return [
        `${this.baseCss}-icon-cell`,
        "p-1"
      ];
    },
    labelsCssClasses() {
      return [
        this.labelsUppercase ? "uppercase" : null,
        "select-none"
      ];
    },
    trackCssClasses() {
      const baseCss = this.baseCss;
      return [
        `${baseCss}-track`,
        this.reversed ? `${baseCss}-track-reversed` : null,
        `border-round-${this.roundness}`,
        `shadow-${this.elevation}`,
        "overflow-hidden"
      ];
    },
    progressCssClasses() {
      return [
        `${this.baseCss}-progress`,
        `bg-${this.progressColor}-solid`,
        `border-round-${this.roundness}`,
        "transition-all",
        "transition-duration-300",
        "transition-ease-out"
      ];
    },
    trackStyle() {
      return {
        height: this.height
      };
    },
    progressStyle() {
      return {
        width: this.getPercentage,
        height: this.height
      };
    }
  }
};
const _hoisted_1$9 = ["inert"];
function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  const _component_bc_text_field_label = resolveComponent("bc-text-field-label");
  const _component_bc_table_layout_row = resolveComponent("bc-table-layout-row");
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_container = resolveComponent("bc-container");
  const _component_bc_table_layout = resolveComponent("bc-table-layout");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.componentCssClasses),
    inert: $props.inert,
    style: normalizeStyle($options.componentStyle)
  }, [
    createVNode(_component_bc_table_layout, { "y-align": "middle" }, {
      default: withCtx(() => [
        $props.label ? (openBlock(), createBlock(_component_bc_table_layout_row, { key: 0 }, {
          default: withCtx(() => [
            $props.iconLeft ? (openBlock(), createBlock(_component_bc_table_layout_cell, { key: 0 })) : createCommentVNode("", true),
            createVNode(_component_bc_table_layout_cell, {
              class: normalizeClass(["w-full"])
            }, {
              default: withCtx(() => [
                createVNode(_component_bc_text_field_label, {
                  text: $props.label,
                  class: normalizeClass([`${$data.baseCss}-label`, "mb-1", "text-left", $options.labelsCssClasses])
                }, null, 8, ["text", "class"])
              ]),
              _: 1
            }),
            $props.iconRight ? (openBlock(), createBlock(_component_bc_table_layout_cell, { key: 1 })) : createCommentVNode("", true)
          ]),
          _: 1
        })) : createCommentVNode("", true),
        createVNode(_component_bc_table_layout_row, null, {
          default: withCtx(() => [
            $props.iconLeft ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
              key: 0,
              "x-align": "center",
              class: normalizeClass($options.iconCellCssClasses)
            }, {
              default: withCtx(() => [
                createVNode(_component_bc_icon, {
                  provider: $props.iconProvider,
                  name: $props.iconLeft,
                  class: normalizeClass([`cursor-${$props.iconCursor}`, `${$data.baseCss}-icon-left`]),
                  onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("icon-left-click", $event.target))
                }, null, 8, ["provider", "name", "class"])
              ]),
              _: 1
            }, 8, ["class"])) : createCommentVNode("", true),
            createVNode(_component_bc_table_layout_cell, {
              class: normalizeClass(["w-full"])
            }, {
              default: withCtx(() => [
                createVNode(_component_bc_container, {
                  style: normalizeStyle($options.trackStyle),
                  class: normalizeClass($options.trackCssClasses)
                }, {
                  default: withCtx(() => [
                    createVNode(_component_bc_container, {
                      class: normalizeClass($options.progressCssClasses),
                      style: normalizeStyle($options.progressStyle)
                    }, null, 8, ["class", "style"])
                  ]),
                  _: 1
                }, 8, ["style", "class"])
              ]),
              _: 1
            }),
            $props.iconRight ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
              key: 1,
              "x-align": "center",
              class: normalizeClass($options.iconCellCssClasses)
            }, {
              default: withCtx(() => [
                createVNode(_component_bc_icon, {
                  provider: $props.iconProvider,
                  name: $props.iconRight,
                  class: normalizeClass([`cursor-${$props.iconCursor}`, `${$data.baseCss}-icon-right`]),
                  onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("icon-right-click", $event.target))
                }, null, 8, ["provider", "name", "class"])
              ]),
              _: 1
            }, 8, ["class"])) : createCommentVNode("", true)
          ]),
          _: 1
        }),
        $props.hint ? (openBlock(), createBlock(_component_bc_table_layout_row, { key: 1 }, {
          default: withCtx(() => [
            $props.iconLeft ? (openBlock(), createBlock(_component_bc_table_layout_cell, { key: 0 })) : createCommentVNode("", true),
            createVNode(_component_bc_table_layout_cell, {
              class: normalizeClass(["w-full"])
            }, {
              default: withCtx(() => [
                createVNode(_component_bc_text_field_label, {
                  text: $props.hint,
                  class: normalizeClass([`${$data.baseCss}-hint`, "mt-1", "text-right", $options.labelsCssClasses])
                }, null, 8, ["text", "class"])
              ]),
              _: 1
            }),
            $props.iconRight ? (openBlock(), createBlock(_component_bc_table_layout_cell, { key: 1 })) : createCommentVNode("", true)
          ]),
          _: 1
        })) : createCommentVNode("", true)
      ]),
      _: 1
    })
  ], 14, _hoisted_1$9);
}
const BcProgressbar = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$p]]);
BcProgressbar.install = (Vue) => {
  Vue.component(BcProgressbar.name, BcProgressbar);
};
const _sfc_main$p = {
  name: "BcReactiveStyle",
  render() {
    return h("style", this.$slots.default());
  }
};
_sfc_main$p.install = (Vue) => {
  Vue.component(_sfc_main$p.name, _sfc_main$p);
};
const _sfc_main$o = {
  name: "BcSkeletonLoader",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("skeleton-loader")
    };
  },
  props: {
    animation: {
      type: String,
      default: "pulse"
    },
    block: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "secondary"
    },
    elevation: {
      type: String,
      default: "md"
    },
    height: {
      type: String,
      default: "16px"
    },
    roundness: {
      type: String,
      default: "full"
    },
    variant: {
      type: String,
      default: "solid"
    }
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.block ? null : ["align-middle"],
        this.makeUiColorVariant(this.color, this.variant),
        this.makeBorderRadius(this.roundness),
        this.makeAnimation(this.animation),
        this.makeElevation(this.elevation),
        "select-none",
        "overflow-hidden"
      ];
    },
    componentStyles() {
      return {
        height: this.height
      };
    }
  },
  methods: {}
};
function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    display: $props.block ? "block" : "inline-block",
    style: normalizeStyle($options.componentStyles),
    class: normalizeClass($options.componentCssClasses)
  }, null, 8, ["display", "style", "class"]);
}
const ComponentTemplate = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$o]]);
ComponentTemplate.install = (Vue) => {
  Vue.component(ComponentTemplate.name, ComponentTemplate);
};
const _sfc_main$n = {
  name: "BcSlider",
  mixins: [
    methods,
    sliderProps
  ],
  data() {
    return {
      id: `bc-slider-${this.uuid()}`,
      baseCss: this.componentBaseCss("slider")
    };
  },
  emits: [
    "update:value"
  ],
  props: {
    value: {
      type: [
        Number,
        String
      ],
      default: 0
    }
  },
  computed: {
    rangeStyle() {
      const value = this.value;
      const max = this.max;
      const min = this.min;
      const sliderPercent = (value2, min2, max2) => {
        const percent2 = (value2 - min2) / (max2 - min2) * 100;
        return Math.min(100, Math.max(0, percent2));
      };
      const percent = sliderPercent(value, min, max);
      const height = this.height;
      return {
        height: `${height}px`,
        width: `${percent}%`,
        marginTop: `${height * -1}px`
      };
    },
    rangeCssClasses() {
      return [
        this.makeUiColorVariant(this.color, this.variant),
        "relative",
        "border-round-full",
        "pointer-events-none"
      ];
    },
    componentCssClasses() {
      const baseCss = this.baseCss;
      return [
        baseCss,
        this.block ? null : "vertical-align-middle",
        this.disabled && !this.inert ? "disabled" : null,
        this.makeFontSize(this.fontSize),
        this.tooltip ? `${baseCss}-tooltip` : null,
        "select-none",
        "bc-css-slider"
      ];
    },
    minMaxLabelsCssClasses() {
      return [
        `${this.baseCss}-label-cell`,
        "p-1"
      ];
    },
    componentStyle() {
      return {
        width: this.width
      };
    },
    inputSliderCssClasses() {
      return [
        "block",
        "w-full",
        "appearance-none",
        // 'cursor-pointer',
        "outline-none"
      ];
    }
  }
};
const _hoisted_1$8 = ["name", "min", "max", "step", "value"];
function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  const _component_bc_text_field_label = resolveComponent("bc-text-field-label");
  const _component_bc_table_layout_row = resolveComponent("bc-table-layout-row");
  const _component_bc_container = resolveComponent("bc-container");
  const _component_bc_table_layout = resolveComponent("bc-table-layout");
  const _component_bc_reactive_style = resolveComponent("bc-reactive-style");
  return openBlock(), createBlock(_component_bc_container, {
    "data-name": _ctx.name,
    "data-slider-id": $data.id,
    inert: _ctx.inert,
    display: _ctx.block ? "block" : "inline-block",
    class: normalizeClass($options.componentCssClasses),
    style: normalizeStyle($options.componentStyle)
  }, {
    default: withCtx(() => [
      createVNode(_component_bc_table_layout, { "y-align": "middle" }, {
        default: withCtx(() => [
          _ctx.label ? (openBlock(), createBlock(_component_bc_table_layout_row, { key: 0 }, {
            default: withCtx(() => [
              _ctx.minMaxLabels ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                key: 0,
                class: normalizeClass($options.minMaxLabelsCssClasses)
              }, null, 8, ["class"])) : createCommentVNode("", true),
              createVNode(_component_bc_table_layout_cell, {
                class: normalizeClass(["w-full", "p-1"])
              }, {
                default: withCtx(() => [
                  createVNode(_component_bc_text_field_label, {
                    text: _ctx.label,
                    class: normalizeClass([`${$data.baseCss}-label`, "text-left", _ctx.labelsUppercase ? "uppercase" : null])
                  }, null, 8, ["text", "class"])
                ]),
                _: 1
              }),
              _ctx.minMaxLabels ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                key: 1,
                class: normalizeClass($options.minMaxLabelsCssClasses)
              }, null, 8, ["class"])) : createCommentVNode("", true)
            ]),
            _: 1
          })) : createCommentVNode("", true),
          createVNode(_component_bc_table_layout_row, null, {
            default: withCtx(() => [
              _ctx.minMaxLabels ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                key: 0,
                "x-align": "right",
                class: normalizeClass($options.minMaxLabelsCssClasses),
                textContent: toDisplayString(_ctx.min)
              }, null, 8, ["class", "textContent"])) : createCommentVNode("", true),
              createVNode(_component_bc_table_layout_cell, {
                class: normalizeClass(["w-full", "p-1", "bcq-tooltip-top"]),
                "data-tooltip": $props.value
              }, {
                default: withCtx(() => [
                  createElementVNode("input", {
                    type: "range",
                    name: _ctx.name,
                    min: _ctx.min,
                    max: _ctx.max,
                    step: _ctx.step,
                    value: $props.value,
                    onInput: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("update:value", parseFloat($event.target.value))),
                    class: normalizeClass($options.inputSliderCssClasses)
                  }, null, 42, _hoisted_1$8),
                  _ctx.showSelectedRange ? (openBlock(), createBlock(_component_bc_container, {
                    key: 0,
                    style: normalizeStyle($options.rangeStyle),
                    class: normalizeClass($options.rangeCssClasses)
                  }, null, 8, ["style", "class"])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["data-tooltip"]),
              _ctx.minMaxLabels ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                key: 1,
                "x-align": "left",
                class: normalizeClass($options.minMaxLabelsCssClasses),
                textContent: toDisplayString(_ctx.max)
              }, null, 8, ["class", "textContent"])) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          _ctx.hint ? (openBlock(), createBlock(_component_bc_table_layout_row, { key: 1 }, {
            default: withCtx(() => [
              _ctx.minMaxLabels ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                key: 0,
                class: normalizeClass($options.minMaxLabelsCssClasses)
              }, null, 8, ["class"])) : createCommentVNode("", true),
              createVNode(_component_bc_table_layout_cell, {
                class: normalizeClass(["w-full", "p-1"])
              }, {
                default: withCtx(() => [
                  createVNode(_component_bc_text_field_label, {
                    text: _ctx.hint,
                    class: normalizeClass([`${$data.baseCss}-label`, "text-right", _ctx.labelsUppercase ? "uppercase" : null])
                  }, null, 8, ["text", "class"])
                ]),
                _: 1
              }),
              _ctx.minMaxLabels ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                key: 1,
                class: normalizeClass($options.minMaxLabelsCssClasses)
              }, null, 8, ["class"])) : createCommentVNode("", true)
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ]),
        _: 1
      }),
      createVNode(_component_bc_reactive_style, null, {
        default: withCtx(() => [
          createTextVNode(' .bc-slider[data-slider-id="' + toDisplayString($data.id) + '"] input[type="range"]::-webkit-slider-runnable-track { border-radius: ' + toDisplayString(_ctx.rounded ? "9999px" : 0) + "; height: " + toDisplayString(_ctx.height) + 'px; } .bc-slider[data-slider-id="' + toDisplayString($data.id) + '"] input[type="range"]::-moz-range-track { border-radius: ' + toDisplayString(_ctx.rounded ? "9999px" : 0) + "; height: " + toDisplayString(_ctx.height) + 'px; } .bc-slider[data-slider-id="' + toDisplayString($data.id) + '"] input[type="range"]::-webkit-slider-thumb { border-radius: ' + toDisplayString(_ctx.rounded ? "9999px" : 0) + "; height: " + toDisplayString(_ctx.height * 2) + "px; width: " + toDisplayString(_ctx.height * 2) + "px; margin-top: -" + toDisplayString(_ctx.height / 2) + 'px; } .bc-slider[data-slider-id="' + toDisplayString($data.id) + '"] input[type="range"]::-moz-range-thumb { border-radius: ' + toDisplayString(_ctx.rounded ? "9999px" : 0) + "; height: " + toDisplayString(_ctx.height * 2) + "px; width: " + toDisplayString(_ctx.height * 2) + "px; margin-top: -" + toDisplayString(_ctx.height / 2) + 'px; } .bc-slider[data-slider-id="' + toDisplayString($data.id) + '"] input[type="range"]::-webkit-slider-thumb { background: var(--' + toDisplayString(_ctx.makeUiColorVariant(_ctx.color, _ctx.variant)) + ' ); } .bc-slider[data-slider-id="' + toDisplayString($data.id) + '"] input[type="range"]::-moz-range-thumb { background: var(--' + toDisplayString(_ctx.makeUiColorVariant(_ctx.color, _ctx.variant)) + ' ); } .bc-app-theme-dark .bc-slider[data-slider-id="' + toDisplayString($data.id) + '"] input[type="range"]::-webkit-slider-thumb { background: var(--' + toDisplayString(_ctx.makeUiColorVariant(_ctx.color, _ctx.variant)) + '-dark ); } .bc-app-theme-dark .bc-slider[data-slider-id="' + toDisplayString($data.id) + '"] input[type="range"]::-moz-range-thumb { background: var(--' + toDisplayString(_ctx.makeUiColorVariant(_ctx.color, _ctx.variant)) + "-dark ); } ", 1)
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["data-name", "data-slider-id", "inert", "display", "class", "style"]);
}
const BcSlider = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$n]]);
BcSlider.install = (Vue) => {
  Vue.component(BcSlider.name, BcSlider);
};
const _sfc_main$m = {
  name: "BcSnackbar",
  mixins: [
    methods
  ],
  data() {
    return {
      message: null,
      timer: null,
      baseCss: this.componentBaseCss("snackbar")
    };
  },
  computed: {
    componentCssClasses() {
      const bottom = this.bottom;
      const message = this.message;
      const baseCss = this.baseCss;
      const offset = this.offset;
      return [
        baseCss,
        this.makeUiColorVariant(message ? message.color : "primary", message ? message.variant : "solid"),
        this.makeElevation(this.elevation),
        this.makeFontSize(this.size),
        this.makeBorderRadius(this.roundness),
        bottom ? message ? "bottom-0" : `${baseCss}-bottom-hidden` : message ? "top-0" : `${baseCss}-top-hidden`,
        bottom ? offset === 0 ? "border-noround-bottom" : null : offset === 0 ? "border-noround-top" : null,
        "transition-all",
        "transition-duration-200",
        "transition-ease-in-out",
        "fixed",
        "left-50",
        "-translate-x-50",
        "select-none",
        `my-${offset}`
      ];
    },
    componentStyles() {
      return {
        width: this.width,
        zIndex: this.zIndex
      };
    }
  },
  props: {
    bottom: {
      type: Boolean,
      default: true
    },
    dismissIcon: {
      type: String,
      default: "close-circle-outline"
    },
    elevation: {
      type: String,
      default: "xl"
    },
    iconProvider: {
      type: String,
      default: "mdi"
    },
    offset: {
      type: Number,
      default: 3
    },
    padding: {
      type: Array,
      default() {
        return ["p-2"];
      }
    },
    roundness: {
      type: String,
      default: "sm"
    },
    size: {
      type: String,
      default: "sm"
    },
    width: {
      type: String,
      default: "260px"
    },
    zIndex: {
      type: Number,
      default: 1e3
    }
  },
  watch: {
    message() {
      clearTimeout(this.timer);
      if (this.message && this.message.autoCloseDelay) {
        this.timer = this.sleep(this.message.autoCloseDelay).then(this.dismiss);
      }
    }
  },
  created() {
    this.bind();
  },
  methods: {
    bind() {
      this.$emitter.on("bc-snackbar:message", (data) => {
        this.message = data;
      });
    },
    dismiss() {
      this.message = null;
    }
  }
};
function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_table_layout_row = resolveComponent("bc-table-layout-row");
  const _component_bc_table_layout = resolveComponent("bc-table-layout");
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    class: normalizeClass($options.componentCssClasses),
    style: normalizeStyle($options.componentStyles)
  }, {
    default: withCtx(() => [
      createVNode(_component_bc_table_layout, { "y-align": "middle" }, {
        default: withCtx(() => [
          createVNode(_component_bc_table_layout_row, null, {
            default: withCtx(() => [
              createVNode(_component_bc_table_layout_cell, {
                textContent: toDisplayString($data.message ? $data.message.message : null),
                class: normalizeClass([$props.padding, "text-left"])
              }, null, 8, ["textContent", "class"]),
              createVNode(_component_bc_table_layout_cell, {
                class: normalizeClass([$props.padding, `${$data.baseCss}-icon-cell`, "text-center"])
              }, {
                default: withCtx(() => [
                  createVNode(_component_bc_icon, {
                    name: $props.dismissIcon,
                    provider: $props.iconProvider,
                    class: normalizeClass(["cursor-pointer"]),
                    onClick: $options.dismiss
                  }, null, 8, ["name", "provider", "onClick"])
                ]),
                _: 1
              }, 8, ["class"])
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["class", "style"]);
}
const BcSnackbar = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$m]]);
BcSnackbar.install = (Vue) => {
  Vue.component(BcSnackbar.name, BcSnackbar);
};
const _sfc_main$l = {
  name: "BcSplitBtn",
  mixins: [
    methods
  ],
  data() {
    return {
      expanded: false,
      bottom: null,
      hideEvent: "bc-split-btn:hide",
      baseCss: this.componentBaseCss("split-btn")
    };
  },
  watch: {
    expanded() {
      if (this.expanded) {
        this.dropdownPosition();
      }
    }
  },
  computed: {
    componentStyles() {
      return {
        width: this.width
      };
    },
    headerIcon() {
      if (this.updateLabelOnValueUpdate) {
        return this.iconHeader ? this.items.find((item) => item.value === this.value).iconLeft : null;
      } else {
        return this.iconHeader ? this.items[0].iconLeft : null;
      }
    },
    label() {
      const items = this.items;
      const index = items.findIndex((item) => item.value === this.value);
      return items[this.updateLabelOnValueUpdate ? index : 0].title;
    },
    dropdownCssClasses() {
      return [
        "absolute",
        "right-0",
        "transition-opacity",
        "transition-duration-300",
        `${this.baseCss}-dropdown`,
        this.expanded ? "opacity-100" : ["opacity-0", "pointer-events-none"]
      ];
    },
    dropdownStyles() {
      return {
        zIndex: this.itemsZIndex,
        width: this.itemsDropdownWidth,
        bottom: this.bottom
      };
    },
    componentCssClasses() {
      return [
        this.baseCss,
        this.block ? null : ["align-middle"],
        this.disabled && !this.inert ? "disabled" : null
      ];
    },
    btnHeaderCssClasses() {
      return [
        this.makeElevation(this.elevation)
      ];
    },
    btnCssClasses() {
      return [
        this.makeBorderRadius(this.roundness),
        "border-noround-right"
      ];
    },
    splitCssClasses() {
      return [
        this.makeBorderRadius(this.roundness),
        "border-noround-left"
      ];
    },
    innerWrapper() {
      return this.$el.querySelector(`.${this.baseCss}-inner-wrapper`);
    },
    dropdown() {
      return this.$el.querySelector(`.${this.baseCss}-dropdown`);
    }
  },
  emits: [
    "update:value"
  ],
  props: {
    block: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "primary"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    elevation: {
      type: String,
      default: "sm"
    },
    fontWeight: {
      type: String,
      default: "medium"
    },
    iconCollapse: {
      type: String,
      default: "chevron-up"
    },
    iconExpand: {
      type: String,
      default: "chevron-down"
    },
    iconHeader: {
      type: Boolean,
      default: false
    },
    iconsProvider: {
      type: String,
      default: "mdi"
    },
    inert: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default() {
        return [];
      }
    },
    itemsDropdownWidth: {
      type: String
    },
    itemsZIndex: {
      type: Number,
      default: 900
    },
    roundness: {
      type: String,
      default: "full"
    },
    size: {
      type: String,
      default: "sm"
    },
    updateLabelOnValueUpdate: {
      type: Boolean,
      default: true
    },
    uppercase: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: "solid"
    },
    value: {
      type: String,
      required: true
    },
    width: {
      type: String
    }
  },
  mounted() {
    this.bind();
  },
  unmounted() {
    this.unbind();
  },
  methods: {
    bind() {
      document.addEventListener("click", this.hideDropdown);
      this.$emitter.on(this.hideEvent, this.hideDropdown);
    },
    unbind() {
      document.removeEventListener("click", this.hideDropdown);
      this.$emitter.off(this.hideEvent);
    },
    onClick(value) {
      this.$emit("update:value", value || this.value);
      this.hideDropdown();
    },
    ifItemIcons(position) {
      return this.items.filter((item) => item[position]).length > 0;
    },
    toggle() {
      this.$emitter.emit("bc-split-btn:hide");
      this.expanded = !this.expanded;
    },
    hideDropdown() {
      this.expanded = false;
    },
    dropdownPosition() {
      const innerWrapper = this.innerWrapper;
      const dropdown = this.dropdown;
      const rect = innerWrapper.getBoundingClientRect();
      const menuHeight = dropdown.offsetHeight;
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;
      this.bottom = spaceBelow < menuHeight && spaceAbove > menuHeight ? `${rect.height}px` : null;
    }
  }
};
function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_btn = resolveComponent("bc-btn");
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  const _component_bc_table_layout_row = resolveComponent("bc-table-layout-row");
  const _component_bc_table_layout = resolveComponent("bc-table-layout");
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_list_item_icon = resolveComponent("bc-list-item-icon");
  const _component_bc_list_item_content_title = resolveComponent("bc-list-item-content-title");
  const _component_bc_list_item_content_sub_title = resolveComponent("bc-list-item-content-sub-title");
  const _component_bc_list_item_content = resolveComponent("bc-list-item-content");
  const _component_bc_list_item = resolveComponent("bc-list-item");
  const _component_bc_list = resolveComponent("bc-list");
  const _component_bc_card_text = resolveComponent("bc-card-text");
  const _component_bc_card = resolveComponent("bc-card");
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    display: $props.block ? "block" : "inline-block",
    inert: $props.inert,
    class: normalizeClass($options.componentCssClasses),
    style: normalizeStyle($options.componentStyles)
  }, {
    default: withCtx(() => [
      createVNode(_component_bc_container, {
        class: normalizeClass(["relative", `${$data.baseCss}-inner-wrapper`])
      }, {
        default: withCtx(() => [
          createVNode(_component_bc_table_layout, {
            class: normalizeClass($options.btnHeaderCssClasses)
          }, {
            default: withCtx(() => [
              createVNode(_component_bc_table_layout_row, null, {
                default: withCtx(() => [
                  createVNode(_component_bc_table_layout_cell, {
                    class: normalizeClass([`${$data.baseCss}-btn-cell`])
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_bc_btn, {
                        onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick()),
                        "icon-left": $options.headerIcon,
                        color: $props.color,
                        "font-weight": $props.fontWeight,
                        size: $props.size,
                        uppercase: $props.uppercase,
                        variant: $props.variant,
                        elevation: "none",
                        roundness: "none",
                        block: "",
                        class: normalizeClass($options.btnCssClasses)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString($options.label), 1)
                        ]),
                        _: 1
                      }, 8, ["icon-left", "color", "font-weight", "size", "uppercase", "variant", "class"])
                    ]),
                    _: 1
                  }, 8, ["class"]),
                  createVNode(_component_bc_table_layout_cell, {
                    class: normalizeClass([`${$data.baseCss}-split-cell`])
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_bc_btn, {
                        onClick: withModifiers($options.toggle, ["prevent", "stop"]),
                        color: $props.color,
                        size: $props.size,
                        variant: $props.variant,
                        elevation: "none",
                        roundness: "none",
                        block: "",
                        class: normalizeClass($options.splitCssClasses),
                        "icon-provider": $props.iconsProvider,
                        icon: $data.expanded ? $props.iconCollapse : $props.iconExpand
                      }, null, 8, ["onClick", "color", "size", "variant", "class", "icon-provider", "icon"])
                    ]),
                    _: 1
                  }, 8, ["class"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["class"]),
          $props.items.length ? (openBlock(), createBlock(_component_bc_container, {
            key: 0,
            onClick: _cache[1] || (_cache[1] = withModifiers(() => {
            }, ["prevent", "stop"])),
            class: normalizeClass($options.dropdownCssClasses),
            style: normalizeStyle($options.dropdownStyles)
          }, {
            default: withCtx(() => [
              createVNode(_component_bc_card, {
                "border-width": 1,
                elevation: $props.elevation
              }, {
                default: withCtx(() => [
                  createVNode(_component_bc_card_text, {
                    padding: [],
                    "x-align": "left"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_bc_list, {
                        divider: "",
                        hoverable: ""
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createElementBlock(Fragment, null, renderList($props.items, (item) => {
                            return openBlock(), createBlock(_component_bc_list_item, {
                              onClick: ($event) => $options.onClick(item.value),
                              class: normalizeClass([$props.disabled || $props.inert ? null : "cursor-pointer"]),
                              disabled: item.disabled,
                              inert: item.inert
                            }, {
                              default: withCtx(() => [
                                $options.ifItemIcons("iconLeft") ? (openBlock(), createBlock(_component_bc_list_item_icon, { key: 0 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_bc_icon, {
                                      provider: $props.iconsProvider,
                                      name: item.iconLeft || "home",
                                      class: normalizeClass([!item.iconLeft ? "invisible" : null])
                                    }, null, 8, ["provider", "name", "class"])
                                  ]),
                                  _: 2
                                }, 1024)) : createCommentVNode("", true),
                                createVNode(_component_bc_list_item_content, null, {
                                  default: withCtx(() => [
                                    item.title ? (openBlock(), createBlock(_component_bc_list_item_content_title, {
                                      key: 0,
                                      textContent: toDisplayString(item.title)
                                    }, null, 8, ["textContent"])) : createCommentVNode("", true),
                                    item.subTitle ? (openBlock(), createBlock(_component_bc_list_item_content_sub_title, {
                                      key: 1,
                                      textContent: toDisplayString(item.subTitle)
                                    }, null, 8, ["textContent"])) : createCommentVNode("", true)
                                  ]),
                                  _: 2
                                }, 1024),
                                $options.ifItemIcons("iconRight") ? (openBlock(), createBlock(_component_bc_list_item_icon, { key: 1 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_bc_icon, {
                                      provider: $props.iconsProvider,
                                      name: item.iconRight || "home",
                                      class: normalizeClass([!item.iconRight ? "invisible" : null])
                                    }, null, 8, ["provider", "name", "class"])
                                  ]),
                                  _: 2
                                }, 1024)) : createCommentVNode("", true)
                              ]),
                              _: 2
                            }, 1032, ["onClick", "class", "disabled", "inert"]);
                          }), 256))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["elevation"])
            ]),
            _: 1
          }, 8, ["class", "style"])) : createCommentVNode("", true)
        ]),
        _: 1
      }, 8, ["class"])
    ]),
    _: 1
  }, 8, ["display", "inert", "class", "style"]);
}
const BcSplitBtn = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$l]]);
BcSplitBtn.install = (Vue) => {
  Vue.component(BcSplitBtn.name, BcSplitBtn);
};
const _sfc_main$k = {
  name: "BcSparklines",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("sparklines")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss
      ];
    }
  },
  props: {
    color: {
      type: String,
      default: "#ababab"
    },
    height: {
      type: String,
      default: "128px"
    },
    series: {
      type: Array,
      default: () => {
        return [];
      }
    },
    strokeWidth: {
      type: Number,
      default: 1
    },
    width: {
      type: String,
      default: "100%"
    }
  },
  watch: {
    series() {
      this.draw();
    }
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      let max = -99999999;
      let min = 99999999;
      let x = 0;
      let height;
      let width;
      let offset;
      const svg = this.$el.querySelector("svg");
      const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      if (!this.series.length) {
        return;
      }
      this.$nextTick(() => {
        svg.innerHTML = "";
        this.series.forEach((n) => {
          if (n !== "") {
            let y = parseInt(n, 10);
            let pt = svg.createSVGPoint();
            pt.x = x;
            pt.y = y;
            polyline.points.appendItem(pt);
            max = Math.max(max, y);
            min = Math.min(min, y);
            x = x + 1;
          }
        });
        height = max - min + 1;
        width = x;
        offset = height + min * 2;
        polyline.setAttribute("stroke", this.color);
        polyline.setAttribute("stroke-width", this.strokeWidth);
        polyline.setAttribute("fill", "none");
        polyline.setAttribute("transform", "matrix(1 0 0 -1 0 " + offset + ")");
        svg.appendChild(polyline);
        svg.setAttribute("viewBox", "0 " + min + " " + width + " " + height);
        svg.setAttribute("preserveAspectRatio", "none");
      });
    }
  }
};
const _hoisted_1$7 = ["width", "height"];
function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      (openBlock(), createElementBlock("svg", {
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        "xmlns:ev": "http://www.w3.org/2001/xml-events",
        "stroke-width": 0.1,
        width: $props.width,
        height: $props.height
      }, null, 8, _hoisted_1$7))
    ]),
    _: 1
  }, 8, ["class"]);
}
const BcSparklines = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$k]]);
BcSparklines.install = (Vue) => {
  Vue.component(BcSparklines.name, BcSparklines);
};
const _sfc_main$j = {
  name: "BcSpeedDial",
  mixins: [
    methods
  ],
  data() {
    return {
      id: this.uuid(),
      expanded: false,
      dimensions: null,
      eventHide: "bc-speed-dial:hide",
      baseCss: this.componentBaseCss("speed-dial")
    };
  },
  watch: {
    "$route.path"() {
      this.hide();
    }
  },
  computed: {
    triggerItemCssClasses() {
      return [
        this.itemsPadding,
        this.expanded && this.rotateIconOnExpand ? this.xAlign === "right" ? "-rotate-45" : "rotate-45" : null,
        "transition-all",
        "transition-duration-300",
        "pointer-events-all"
      ];
    },
    componentCssClasses() {
      const baseCss = this.baseCss;
      return [
        baseCss,
        this.position,
        this.isPositionNonStaticCssClasses,
        `${baseCss}-${this.xAlign}`,
        `${baseCss}-${this.yAlign}`,
        "select-none",
        "pointer-events-none",
        "transition-all",
        "transition-duration-300"
      ];
    },
    isPositionNonStaticCssClasses() {
      const cssClasses = [];
      const xAlign = this.xAlign;
      const yAlign = this.yAlign;
      if (this.position !== "static") {
        cssClasses.push(["left", "right"].includes(xAlign) ? `${xAlign}-0` : ["left-50", "-translate-left-50"]);
        cssClasses.push(["top", "bottom"].includes(yAlign) ? `${yAlign}-0` : ["top-50", "-translate-y-50"]);
      }
      return cssClasses;
    },
    listCssClasses() {
      const xAlignToFlex = {
        left: "start",
        center: "center",
        right: "end"
      };
      const xAlign = this.xAlign;
      return [
        this.vertical ? "flex-column" : xAlign === "right" ? "flex-row-reverse" : "flex-row",
        `align-items-${xAlignToFlex[xAlign]}`,
        `justify-content-${xAlign}`,
        "flex"
      ];
    },
    itemCssClasses() {
      return [
        this.expanded ? ["scale-1", "opacity-100", "pointer-events-all", this.itemsPadding] : ["pointer-events-none", "scale-0", "opacity-0", "clip-0", "absolute"],
        "transition-all",
        "transition-duration-200",
        "overflow-hidden"
      ];
    },
    componentStyle() {
      return {
        zIndex: this.zIndex
      };
    }
  },
  props: {
    color: {
      type: String,
      default: "primary"
    },
    elevation: {
      type: String,
      default: "md"
    },
    icon: {
      type: String,
      default: "plus"
    },
    iconProvider: {
      type: String,
      default: "mdi"
    },
    items: {
      type: Array,
      default() {
        return [];
      }
    },
    itemsPadding: {
      type: Array,
      default() {
        return ["p-1"];
      }
    },
    label: {
      type: String
    },
    position: {
      type: String,
      default: "static"
    },
    rotateIconOnExpand: {
      type: Boolean,
      default: true
    },
    roundness: {
      type: String,
      default: "full"
    },
    size: {
      type: String,
      default: "sm"
    },
    variant: {
      type: String,
      default: "solid"
    },
    vertical: {
      type: Boolean,
      default: false
    },
    xAlign: {
      type: String,
      default: "left"
      // 'left', 'center', 'right'
    },
    yAlign: {
      // @todo
      type: String,
      default: "top"
      // 'top', 'middle', 'bottom'
    },
    zIndex: {
      type: Number,
      default: 1e3
    }
  },
  mounted() {
    this.init();
  },
  beforeUnmount() {
    document.removeEventListener("click", this.documentClick);
  },
  methods: {
    init() {
      document.addEventListener("click", this.documentClick);
      this.dimensions = `${this.$el.querySelector("li:first-of-type").getBoundingClientRect().height}px`;
      this.$emitter.on(this.eventHide, (id) => {
        id !== this.id ? this.hide() : null;
      });
    },
    toggle() {
      this.$emitter.emit(this.eventHide, this.id);
      this.$nextTick(() => {
        this.expanded = !this.expanded;
      });
    },
    hide() {
      this.expanded = false;
    },
    itemStyle(index) {
      const itemsLength = this.items.length;
      const percentage = this.percentage(index, itemsLength);
      const delay = percentage * itemsLength;
      return {
        transitionDelay: `.${delay}s`,
        width: this.expanded ? this.dimensions : 0,
        height: this.expanded ? this.dimensions : 0
      };
    },
    documentClick() {
      this.hide();
    },
    onItemClick($event) {
      this.$emit("item-click", $event);
      this.hide();
    }
  }
};
function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_btn = resolveComponent("bc-btn");
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    onClick: _cache[0] || (_cache[0] = withModifiers(() => {
    }, ["stop", "prevent"])),
    class: normalizeClass($options.componentCssClasses),
    style: normalizeStyle($options.componentStyle)
  }, {
    default: withCtx(() => [
      createElementVNode("ul", {
        class: normalizeClass($options.listCssClasses)
      }, [
        createElementVNode("li", {
          class: normalizeClass($options.triggerItemCssClasses)
        }, [
          createVNode(_component_bc_btn, {
            onClick: $options.toggle,
            title: $props.label,
            roundness: $props.roundness,
            color: $props.color,
            "icon-provider": $props.iconProvider,
            variant: $props.variant,
            icon: $props.icon,
            elevation: $props.elevation,
            size: $props.size
          }, null, 8, ["onClick", "title", "roundness", "color", "icon-provider", "variant", "icon", "elevation", "size"])
        ], 2),
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.items, (item, index) => {
          return openBlock(), createElementBlock("li", {
            class: normalizeClass($options.itemCssClasses),
            style: normalizeStyle($options.itemStyle(index))
          }, [
            createVNode(_component_bc_btn, {
              onClick: ($event) => $options.onItemClick(item),
              title: item.label,
              roundness: item.roundness || $props.roundness,
              color: item.color || $props.color,
              "icon-provider": item.iconProvider || $props.iconProvider,
              variant: item.variant || $props.variant,
              icon: item.icon,
              elevation: item.elevation || $props.elevation,
              size: item.size || $props.size
            }, null, 8, ["onClick", "title", "roundness", "color", "icon-provider", "variant", "icon", "elevation", "size"])
          ], 6);
        }), 256))
      ], 2)
    ]),
    _: 1
  }, 8, ["class", "style"]);
}
const BcSpeedDial = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$j]]);
BcSpeedDial.install = (Vue) => {
  Vue.component(BcSpeedDial.name, BcSpeedDial);
};
const _sfc_main$i = {
  name: "BcSvgIcon",
  data() {
    return {
      baseCss: this.componentBaseCss("svg-icon")
    };
  },
  mixins: [
    methods
  ],
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.block ? "block" : ["inline-block", "align-middle"],
        "select-none"
      ];
    }
  },
  props: {
    block: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "#000000"
    },
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: "24px"
    }
  }
};
const _hoisted_1$6 = ["width", "height"];
const _hoisted_2$3 = ["xlink:href", "stroke", "fill"];
function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", {
    class: normalizeClass($options.componentCssClasses),
    width: $props.size,
    height: $props.size
  }, [
    createElementVNode("use", {
      "xlink:href": `#${$props.name}`,
      stroke: $props.color,
      fill: $props.color
    }, null, 8, _hoisted_2$3)
  ], 10, _hoisted_1$6);
}
const BcSvgIcon = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$i]]);
BcSvgIcon.install = (Vue) => {
  Vue.component(BcSvgIcon.name, BcSvgIcon);
};
const _sfc_main$h = {
  name: "BcSwitcher",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("switcher")
    };
  },
  emits: [
    "update:checked"
  ],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    inert: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: true
    },
    checked: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    label: {
      type: String
    },
    labelFontWeight: {
      type: String,
      default: "normal"
    },
    labelFontSize: {
      type: String,
      default: "sm"
    },
    labelTruncate: {
      type: Boolean,
      default: false
    },
    labelUppercase: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.disabled && !this.inert ? "disabled" : null,
        this.block ? "block" : ["inline-block", "align-middle"],
        "select-none",
        "cursor-pointer",
        "bc-container"
      ];
    },
    labelCssClasses() {
      return [
        this.labelTruncate ? "truncate" : null,
        this.labelUppercase ? "uppercase" : null,
        this.label ? null : ["opacity-50", "pointer-events-none"],
        `font-${this.labelFontWeight}`,
        `text-${this.labelFontSize}`,
        "pl-2",
        "align-middle",
        "inline-block",
        "bc-container"
      ];
    },
    switcherWrapperCssClasses() {
      return [
        `${this.baseCss}-switcher`,
        "align-middle",
        "inline-block",
        "border-round-full",
        "transition-all",
        "transition-duration-300",
        "bc-container"
      ];
    },
    switcherThumbCssClasses() {
      return [
        `${this.baseCss}-switcher-pointer`,
        "border-round-full",
        "transition-all",
        "transition-duration-300",
        "bc-container"
      ];
    }
  },
  methods: {
    onChange() {
      this.$emit("update:checked", !this.checked);
    }
  }
};
const _hoisted_1$5 = ["inert"];
const _hoisted_2$2 = {
  class: /* @__PURE__ */ normalizeClass(["bc-container"])
};
const _hoisted_3 = ["aria-checked", "checked", "name"];
const _hoisted_4 = ["textContent"];
function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("label", {
    role: "checkbox",
    inert: $props.inert,
    class: normalizeClass($options.componentCssClasses)
  }, [
    createElementVNode("div", _hoisted_2$2, [
      createElementVNode("input", {
        type: "checkbox",
        tabindex: "-1",
        "aria-checked": $props.checked,
        onChange: _cache[0] || (_cache[0] = (...args) => $options.onChange && $options.onChange(...args)),
        checked: $props.checked,
        class: normalizeClass(["hidden"]),
        name: $props.name
      }, null, 40, _hoisted_3),
      createElementVNode("div", {
        class: normalizeClass($options.switcherWrapperCssClasses)
      }, [
        createElementVNode("div", {
          class: normalizeClass($options.switcherThumbCssClasses)
        }, null, 2)
      ], 2),
      createElementVNode("div", {
        class: normalizeClass($options.labelCssClasses),
        textContent: toDisplayString($props.label || " ")
      }, null, 10, _hoisted_4)
    ])
  ], 10, _hoisted_1$5);
}
const BcSwitcher = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h]]);
BcSwitcher.install = (Vue) => {
  Vue.component(BcSwitcher.name, BcSwitcher);
};
const _sfc_main$g = {
  name: "BcTableLayout",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("table-layout")
    };
  },
  computed: {
    style() {
      return {
        width: this.width,
        height: this.height
      };
    },
    componentCssClasses() {
      const xAlign = this.xAlign;
      const yAlign = this.yAlign;
      return [
        this.baseCss,
        "table-layout",
        xAlign ? `text-${xAlign}` : null,
        yAlign ? `align-${yAlign}` : null,
        this.width ? null : "w-full",
        this.equalCells ? "table-layout-fixed" : null,
        this.borderCollapse ? "table-layout-border-collapse" : "table-layout-border-separate"
      ];
    }
  },
  props: {
    borderCollapse: {
      type: Boolean,
      default: true
    },
    height: {
      type: String
    },
    equalCells: {
      type: Boolean,
      default: false
    },
    width: {
      type: String
    },
    yAlign: {
      // 'top', 'middle', 'bottom', 'baseline', 'auto'
      type: String
    },
    xAlign: {
      // 'left', 'center', 'right', 'auto', 'justify'
      type: String
    }
  }
};
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    display: "unset",
    role: "table",
    style: normalizeStyle($options.style),
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["style", "class"]);
}
const BcTableLayout = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g]]);
BcTableLayout.install = (Vue) => {
  Vue.component(BcTableLayout.name, BcTableLayout);
};
const _sfc_main$f = {
  name: "BcTableLayoutCell",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("table-layout-cell")
    };
  },
  computed: {
    componentCssClasses() {
      const xAlign = this.xAlign;
      const yAlign = this.yAlign;
      return [
        this.baseCss,
        "table-layout-cell",
        xAlign ? `text-${xAlign}` : null,
        yAlign ? `vertical-align-${yAlign}` : null,
        this.fullWidth ? "w-full" : null
      ];
    },
    style() {
      return {
        width: this.width
      };
    }
  },
  props: {
    xAlign: {
      // 'left', 'center', 'right', 'auto', 'justify'
      type: String
    },
    yAlign: {
      // 'top', 'middle', 'bottom', 'baseline', 'auto'
      type: String
    },
    fullWidth: {
      type: Boolean
    },
    width: {
      type: String
    }
  }
};
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    display: "unset",
    role: "cell",
    style: normalizeStyle($options.style),
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["style", "class"]);
}
const BcTableLayoutCell = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f]]);
BcTableLayoutCell.install = (Vue) => {
  Vue.component(BcTableLayoutCell.name, BcTableLayoutCell);
};
const _sfc_main$e = {
  name: "BcTableLayoutRow",
  mixins: [
    methods
  ],
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        "table-layout-row"
      ];
    }
  },
  data() {
    return {
      baseCss: this.componentBaseCss("table-layout-row")
    };
  }
};
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    display: "unset",
    role: "row",
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
const BcTableLayoutRow = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e]]);
BcTableLayoutRow.install = (Vue) => {
  Vue.component(BcTableLayoutRow.name, BcTableLayoutRow);
};
const _sfc_main$d = {
  name: "BcTabs",
  mixins: [
    methods
  ],
  data() {
    return {
      id: `bc-tabs-${this.uuid()}`,
      baseCss: this.componentBaseCss("tabs"),
      tabsPanels: []
    };
  },
  emits: [
    "update:default-tab"
  ],
  watch: {
    defaultTab() {
      this.getTabsPanels().forEach((tabPanel) => {
        const tabToSelect = parseInt(tabPanel.getAttribute("data-tabs-panel"), 10);
        tabPanel.classList[tabToSelect === this.defaultTab ? "remove" : "add"]("hidden");
      });
    }
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.disabled && !this.inert ? "disabled" : null,
        "cursor-default"
      ];
    },
    tabsButtonsCssClasses() {
      return [
        `${this.baseCss}-tabs-buttons`,
        this.makeFontSize(this.size),
        "select-none"
      ];
    },
    tabButtonWrapperCssClasses() {
      return [
        "pt-1",
        this.compact ? ["flex", "flex-row-reverse", "align-items-center", "justify-content-center"] : "block"
      ];
    },
    tabButtonLabelCssClasses() {
      return [
        `${this.baseCss}-tabs-buttons-button-label`,
        this.uppercase ? "uppercase" : null,
        this.makeFontWeight(this.fontWeight),
        "px-1",
        "truncate",
        "transition-all",
        "transition-duration-300"
      ];
    },
    selectedTabMarkerCssClasses() {
      return [
        `${this.baseCss}-tabs-buttons-button-selected-tab-marker`,
        this.makeUiColorVariant(this.color, "solid"),
        "m-auto",
        "mt-1",
        "transition-all",
        "transition-duration-300"
      ];
    },
    tabButtonIconCssClasses() {
      return [
        `${this.baseCss}-tabs-buttons-button-icon`,
        "transition-all",
        "transition-duration-300"
      ];
    }
  },
  props: {
    color: {
      type: String,
      default: "primary"
    },
    compact: {
      type: Boolean,
      default: false
    },
    defaultTab: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    inert: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "sm"
    },
    fontWeight: {
      type: String,
      default: "semibold"
    },
    uppercase: {
      type: Boolean,
      default: true
    },
    iconsProvider: {
      type: String,
      default: "mdi"
    },
    selectedTabMarkerHeight: {
      type: Number,
      default: 3
    },
    tabPanelHeight: {
      type: String
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const tabsPanelsChildren = this.$slots.default()[0].children.filter((tabsPanel) => tabsPanel.type.name === "BcTabsPanel");
      const tabsPanels = [];
      tabsPanelsChildren.forEach((tabsPanel, index) => {
        tabsPanels.push({
          label: tabsPanel.props.label,
          icon: tabsPanel.props.icon || null,
          disabled: tabsPanel.props.disabled || null
        });
      });
      this.tabsPanels = tabsPanels;
      this.getTabsPanels().forEach((panel, index) => {
        panel.setAttribute("data-tabs-panel", index.toString());
        if (index === this.defaultTab) {
          panel.classList.remove("hidden");
        }
        panel.style.height = this.tabPanelHeight;
      });
    },
    getTabsPanels() {
      return this.$el.querySelectorAll(".bc-tabs-panel");
    },
    selectTab(index) {
      if (index !== this.defaultTab) {
        this.$emit("update:default-tab", index);
      }
    },
    isTabSelected(index) {
      return this.defaultTab === index;
    },
    tabButtonCssClasses(tabPanel, index) {
      const baseCss = this.baseCss;
      return [
        `${baseCss}-tabs-buttons-button`,
        this.isTabSelected(index) ? [`${baseCss}-tabs-buttons-button-selected`, "cursor-default", this.makeUiColorVariant(this.color, "solid")] : ["cursor-pointer"],
        tabPanel.disabled ? "disabled" : null
      ];
    }
  }
};
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_container = resolveComponent("bc-container");
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  const _component_bc_table_layout_row = resolveComponent("bc-table-layout-row");
  const _component_bc_table_layout = resolveComponent("bc-table-layout");
  const _component_bc_reactive_style = resolveComponent("bc-reactive-style");
  return _ctx.$slots.default()[0] ? (openBlock(), createBlock(_component_bc_container, {
    key: 0,
    "data-tabs-id": $data.id,
    inert: $props.inert,
    class: normalizeClass($options.componentCssClasses),
    role: "tab"
  }, {
    default: withCtx(() => [
      $data.tabsPanels.length ? (openBlock(), createBlock(_component_bc_container, {
        key: 0,
        class: normalizeClass($options.tabsButtonsCssClasses)
      }, {
        default: withCtx(() => [
          createVNode(_component_bc_table_layout, {
            "equal-cells": "",
            "x-align": "center"
          }, {
            default: withCtx(() => [
              createVNode(_component_bc_table_layout_row, null, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList($data.tabsPanels, (tabPanel, index) => {
                    return openBlock(), createBlock(_component_bc_table_layout_cell, {
                      onClick: ($event) => $options.selectTab(index),
                      class: normalizeClass($options.tabButtonCssClasses(tabPanel, index)),
                      title: tabPanel.label,
                      key: index
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_bc_container, {
                          class: normalizeClass($options.tabButtonWrapperCssClasses)
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_bc_container, {
                              class: normalizeClass($options.tabButtonLabelCssClasses),
                              textContent: toDisplayString(tabPanel.label)
                            }, null, 8, ["class", "textContent"]),
                            tabPanel.icon ? (openBlock(), createBlock(_component_bc_container, {
                              key: 0,
                              class: normalizeClass($options.tabButtonIconCssClasses)
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_bc_icon, {
                                  name: tabPanel.icon,
                                  provider: $props.iconsProvider
                                }, null, 8, ["name", "provider"])
                              ]),
                              _: 2
                            }, 1032, ["class"])) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1032, ["class"]),
                        createVNode(_component_bc_container, {
                          style: normalizeStyle({ height: `${$props.selectedTabMarkerHeight}px` }),
                          class: normalizeClass($options.selectedTabMarkerCssClasses)
                        }, null, 8, ["style", "class"])
                      ]),
                      _: 2
                    }, 1032, ["onClick", "class", "title"]);
                  }), 128))
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["class"])) : createCommentVNode("", true),
      createVNode(_component_bc_container, {
        class: normalizeClass([`${$data.baseCss}-tabs-panels`, "overflow-auto"])
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class"]),
      createVNode(_component_bc_reactive_style, null, {
        default: withCtx(() => [
          createTextVNode(" ." + toDisplayString($data.baseCss) + '[data-tabs-id="' + toDisplayString($data.id) + '"] .bc-tabs-tabs-buttons-button-selected { color: var(--tabs-' + toDisplayString(_ctx.makeUiColorVariant($props.color, "solid")) + "-light); } .bc-app-theme-dark ." + toDisplayString($data.baseCss) + '[data-tabs-id="' + toDisplayString($data.id) + '"] .bc-tabs-tabs-buttons-button-selected { color: var(--tabs-' + toDisplayString(_ctx.makeUiColorVariant($props.color, "solid")) + "-dark); } ", 1)
        ]),
        _: 1
      })
    ]),
    _: 3
  }, 8, ["data-tabs-id", "inert", "class"])) : createCommentVNode("", true);
}
const BcTabs = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d]]);
BcTabs.install = (Vue) => {
  Vue.component(BcTabs.name, BcTabs);
};
const _sfc_main$c = {
  name: "BcTabsPanel",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("tabs-panel")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        "hidden",
        "bc-container"
      ];
    }
  },
  props: {
    disabled: {
      type: Boolean
    },
    icon: {
      type: String
    },
    label: {
      type: String
    }
  }
};
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.componentCssClasses),
    role: "tabpanel"
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
const BcTabsPanel = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c]]);
BcTabsPanel.install = (Vue) => {
  Vue.component(BcTabsPanel.name, BcTabsPanel);
};
const _sfc_main$b = {
  name: "BcTextField",
  mixins: [
    methods
  ],
  data() {
    return {
      focus: false,
      touched: false,
      baseCss: this.componentBaseCss("text-field")
    };
  },
  computed: {
    is() {
      return this.multiline ? "textarea" : "input";
    },
    textareaStyle() {
      if (this.multiline) {
        return {
          resize: this.resize,
          minHeight: this.minHeight,
          fieldSizing: this.autoResize ? "content" : null
        };
      }
    },
    labelsCssClasses() {
      return ["px-1", "select-none", this.labelsUppercase ? "uppercase" : null, this.error ? this.errorCssClass : null];
    },
    wrapperCssClasses() {
      return [
        `border-${this.borderWidth}`,
        this.error ? this.errorCssClass : null,
        `${this.baseCss}-wrapper`,
        `border-round-${this.roundness}`
      ];
    },
    componentCssClasses() {
      return [
        this.baseCss,
        this.disabled && !this.inert ? "disabled" : null,
        this.block ? "block" : ["align-middle", "inline-block"],
        this.focus ? `opacity-100` : "opacity-50",
        "transition-all",
        this.touched ? this.touchedCssClass : null,
        `text-${this.size}`,
        "transition-duration-300",
        "bc-container"
      ];
    }
  },
  watch: {
    value() {
      this.isValue();
    }
  },
  emits: [
    "update:value",
    "icon-left-click",
    "icon-right-click",
    "focusin",
    "focusout",
    "keyup",
    "keydown"
  ],
  props: {
    autocomplete: {
      // 'on', 'off', custom value
      type: String,
      default: "on"
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    autoResize: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: true
    },
    borderWidth: {
      type: Number,
      default: 1
    },
    clearable: {
      type: Boolean,
      default: false
    },
    cols: {
      type: Number
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    errorCssClass: {
      type: String,
      default: "bc-text-field-error"
    },
    hint: {
      type: [
        String,
        Number
      ]
    },
    iconAlign: {
      type: String,
      default: "middle"
    },
    iconClear: {
      type: String,
      default: "close"
    },
    iconCursor: {
      type: String,
      default: "default"
    },
    iconLeft: {
      type: String
    },
    iconProvider: {
      type: String,
      default: "mdi"
    },
    iconReveal: {
      type: String,
      default: "eye"
    },
    iconRight: {
      type: String
    },
    inert: {
      type: Boolean,
      default: false
    },
    label: {
      type: [
        String,
        Number
      ]
    },
    labelsUppercase: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: Number
    },
    minHeight: {
      type: String
    },
    minLength: {
      type: Number
    },
    multiline: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    pattern: {
      type: String
    },
    placeholder: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    },
    resize: {
      type: String,
      default: "none",
      validator: (value) => {
        return [
          "both",
          "horizontal",
          "vertical",
          "none"
        ].includes(value);
      }
    },
    reveal: {
      type: Boolean
    },
    roundness: {
      type: String,
      default: "sm"
    },
    rows: {
      type: Number
    },
    size: {
      type: String,
      default: "sm"
    },
    spellcheck: {
      type: Boolean,
      default: false
    },
    touchedCssClass: {
      type: String,
      default: "bc-text-field-touched"
    },
    type: {
      type: String,
      default: "text",
      validator: (value) => {
        return [
          "date",
          "datetime-local",
          "email",
          "month",
          "number",
          "password",
          "search",
          "tel",
          "text",
          "time",
          "url",
          "week"
        ].includes(value);
      }
    },
    value: {
      type: [
        String,
        Number
      ]
    },
    width: {
      type: String
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.isValue();
    },
    clearInput() {
      this.$emit("update:value", null);
    },
    onFocusIn() {
      this.focus = true;
      if (!this.touched) {
        this.touched = true;
      }
      this.$emit("focusin", this.$el);
    },
    onFocusOut() {
      if (!this.isValue()) {
        this.focus = false;
      }
      this.$emit("focusout", this.$el);
    },
    isValue() {
      if (this.value) {
        return this.focus = true;
      }
    },
    toggleType(type) {
      this.$refs.input.setAttribute("type", type);
    }
  }
};
const _hoisted_1$4 = ["inert"];
const _hoisted_2$1 = {
  class: /* @__PURE__ */ normalizeClass(["block"])
};
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_container = resolveComponent("bc-container");
  const _component_bc_text_field_label = resolveComponent("bc-text-field-label");
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  const _component_bc_table_layout_row = resolveComponent("bc-table-layout-row");
  const _component_bc_table_layout = resolveComponent("bc-table-layout");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.componentCssClasses),
    inert: $props.inert || $props.readonly,
    style: normalizeStyle({ width: $props.width })
  }, [
    createElementVNode("label", _hoisted_2$1, [
      _ctx.$slots["top"] ? (openBlock(), createBlock(_component_bc_container, { key: 0 }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "top")
        ]),
        _: 3
      })) : createCommentVNode("", true),
      $props.label ? (openBlock(), createBlock(_component_bc_text_field_label, {
        key: 1,
        text: $props.label,
        class: normalizeClass([`${$data.baseCss}-label`, "mb-1", "text-left", $options.labelsCssClasses])
      }, null, 8, ["text", "class"])) : createCommentVNode("", true),
      createVNode(_component_bc_container, {
        class: normalizeClass($options.wrapperCssClasses)
      }, {
        default: withCtx(() => [
          createVNode(_component_bc_table_layout, null, {
            default: withCtx(() => [
              createVNode(_component_bc_table_layout_row, null, {
                default: withCtx(() => [
                  $props.iconLeft ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                    key: 0,
                    "y-align": $props.iconAlign,
                    "x-align": "center",
                    class: normalizeClass(["p-1"])
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_bc_icon, {
                        name: $props.iconLeft,
                        provider: $props.iconProvider,
                        class: normalizeClass([`cursor-${$props.iconCursor}`, `${$data.baseCss}-icon-left`]),
                        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("icon-left-click", $event.target))
                      }, null, 8, ["name", "provider", "class"])
                    ]),
                    _: 1
                  }, 8, ["y-align"])) : createCommentVNode("", true),
                  _ctx.$slots.left ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                    key: 1,
                    "y-align": $props.iconAlign
                  }, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "left")
                    ]),
                    _: 3
                  }, 8, ["y-align"])) : createCommentVNode("", true),
                  createVNode(_component_bc_table_layout_cell, {
                    class: normalizeClass(["w-full", "p-1"]),
                    "y-align": "middle"
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(resolveDynamicComponent($options.is), {
                        onInput: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("update:value", $event.target.value)),
                        onFocusin: $options.onFocusIn,
                        onFocusout: $options.onFocusOut,
                        onKeyup: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("keydown", $event)),
                        onKeydown: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("keyup", $event)),
                        ref: "input",
                        min: $props.minLength,
                        max: $props.maxLength,
                        spellcheck: $props.spellcheck,
                        name: $props.name,
                        type: $props.type,
                        pattern: $props.pattern,
                        placeholder: $props.placeholder,
                        autocomplete: $props.autocomplete,
                        autofocus: $props.autofocus,
                        class: normalizeClass(["outline-none", `${$data.baseCss}-input`, "w-full", "background-none", $props.type === "number" ? "text-right" : null]),
                        rows: $props.rows,
                        cols: $props.cols,
                        value: $props.value,
                        readonly: $props.readonly,
                        style: normalizeStyle($options.textareaStyle)
                      }, null, 40, ["onFocusin", "onFocusout", "min", "max", "spellcheck", "name", "type", "pattern", "placeholder", "autocomplete", "autofocus", "class", "rows", "cols", "value", "readonly", "style"]))
                    ]),
                    _: 1
                  }),
                  _ctx.$slots.right ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                    key: 2,
                    "y-align": $props.iconAlign
                  }, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "right")
                    ]),
                    _: 3
                  }, 8, ["y-align"])) : createCommentVNode("", true),
                  $props.type === "password" && $props.reveal && $data.focus ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                    key: 3,
                    "y-align": $props.iconAlign,
                    "x-align": "center",
                    class: normalizeClass(["p-1"])
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_bc_icon, {
                        name: $props.iconReveal,
                        provider: $props.iconProvider,
                        class: normalizeClass(["cursor-pointer"]),
                        onMousedown: _cache[4] || (_cache[4] = ($event) => $options.toggleType("text")),
                        onMouseup: _cache[5] || (_cache[5] = ($event) => $options.toggleType("password"))
                      }, null, 8, ["name", "provider"])
                    ]),
                    _: 1
                  }, 8, ["y-align"])) : createCommentVNode("", true),
                  $props.clearable ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                    key: 4,
                    "y-align": $props.iconAlign,
                    "x-align": "center",
                    class: normalizeClass(["p-1", !$props.value ? "disabled" : null])
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_bc_icon, {
                        name: $props.iconClear,
                        provider: $props.iconProvider,
                        class: normalizeClass(["cursor-pointer"]),
                        onClick: $options.clearInput
                      }, null, 8, ["name", "provider", "onClick"])
                    ]),
                    _: 1
                  }, 8, ["y-align", "class"])) : createCommentVNode("", true),
                  $props.iconRight ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                    key: 5,
                    "y-align": $props.iconAlign,
                    "x-align": "center",
                    class: normalizeClass(["p-1"])
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_bc_icon, {
                        name: $props.iconRight,
                        provider: $props.iconProvider,
                        class: normalizeClass([`cursor-${$props.iconCursor}`, `${$data.baseCss}-icon-right`]),
                        onClick: _cache[6] || (_cache[6] = ($event) => _ctx.$emit("icon-right-click", $event.target))
                      }, null, 8, ["name", "provider", "class"])
                    ]),
                    _: 1
                  }, 8, ["y-align"])) : createCommentVNode("", true)
                ]),
                _: 3
              })
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["class"]),
      $props.hint ? (openBlock(), createBlock(_component_bc_text_field_label, {
        key: 2,
        text: $props.hint,
        class: normalizeClass([`${$data.baseCss}-hint`, "mt-1", "text-right", $options.labelsCssClasses])
      }, null, 8, ["text", "class"])) : createCommentVNode("", true),
      _ctx.$slots["bottom"] ? (openBlock(), createBlock(_component_bc_container, { key: 3 }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "bottom")
        ]),
        _: 3
      })) : createCommentVNode("", true)
    ])
  ], 14, _hoisted_1$4);
}
const BcTextField = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b]]);
BcTextField.install = (Vue) => {
  Vue.component(BcTextField.name, BcTextField);
};
const _sfc_main$a = {
  name: "BcTextFieldLabel",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("text-field-label")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.truncate ? "truncate" : null,
        "select-none"
      ];
    }
  },
  props: {
    text: {
      type: [
        String,
        Number
      ]
    },
    truncate: {
      type: Boolean,
      default: true
    }
  }
};
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    class: normalizeClass($options.componentCssClasses),
    textContent: toDisplayString($props.text)
  }, null, 8, ["class", "textContent"]);
}
const BcTextFieldLabel = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a]]);
BcTextFieldLabel.install = (Vue) => {
  Vue.component(BcTextFieldLabel.name, BcTextFieldLabel);
};
const defaultRoundness = "sm";
const _sfc_main$9 = {
  name: "BcTimeline",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("timeline")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.unselectable ? "select-none" : null
      ];
    },
    barStyle() {
      return {
        width: `${this.barWidth}px`
      };
    },
    barCssClasses() {
      return [
        `${this.baseCss}-bar`,
        "h-full",
        "m-auto",
        "absolute",
        "top-0",
        "left-50",
        "-translate-x-50",
        "pointer-events-none"
      ];
    }
  },
  props: {
    color: {
      type: String,
      default: "primary"
    },
    barWidth: {
      type: Number,
      default: 4
    },
    items: {
      type: Array,
      default() {
        return [];
      }
    },
    markerClickable: {
      type: Boolean,
      default: false
    },
    markerElevation: {
      type: String,
      default: "sm"
    },
    markerRoundness: {
      type: String,
      default: defaultRoundness
    },
    padding: {
      type: Array,
      default() {
        return ["p-1"];
      }
    },
    paddingVertical: {
      type: Array,
      default() {
        return [
          "pt-4",
          "pb-4"
        ];
      }
    },
    unselectable: {
      type: Boolean,
      default: true
    },
    variant: {
      type: String,
      default: "solid"
    }
  },
  methods: {
    dateCssClasses(item) {
      return [
        this.makeFontSize(item.label.dateSize || defaultRoundness),
        "truncate"
      ];
    },
    paddings(index) {
      const paddingVertical = this.paddingVertical;
      return [
        this.padding,
        index === 0 ? paddingVertical[0] : null,
        index === this.items.length - 1 ? paddingVertical[1] : null
      ];
    },
    markerCssClasses(item) {
      const cssClass2 = `${this.baseCss}-marker`;
      const icon = item.label.icon;
      return [
        cssClass2,
        this.padding,
        this.makeBorderRadius(this.markerRoundness),
        this.makeFontSize(item.label.iconSize || "sm"),
        this.markerClickable ? "cursor-pointer" : null,
        icon ? this.makeUiColorVariant(this.color, this.variant) : `${cssClass2}-no-icon`,
        icon ? this.makeElevation(this.markerElevation) : null,
        icon ? null : ["translate-y-25"],
        "relative"
      ];
    },
    markerStyle(item) {
      const icon = item.label.icon;
      return {
        width: !icon ? `${this.barWidth * 4}px` : null,
        aspectRatio: !icon ? "1/1" : null
      };
    },
    sidesCssClasses(item, index, side = "left") {
      const sideCssClass = `${this.baseCss}-side`;
      return [
        this.paddings(index),
        "align-content-center",
        `text-${side === "left" ? "right" : "left"}`,
        sideCssClass,
        `${sideCssClass}-${side}`
      ];
    },
    timeLineUiCssClasses(index) {
      return [
        this.paddings(index),
        "relative",
        "text-center",
        "select-none",
        "align-content-center"
      ];
    }
  }
};
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_container = resolveComponent("bc-container");
  const _component_bc_grid_col = resolveComponent("bc-grid-col");
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_grid = resolveComponent("bc-grid");
  return openBlock(), createBlock(_component_bc_container, {
    class: normalizeClass($options.componentCssClasses)
  }, {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.items, (item, index) => {
        return openBlock(), createBlock(_component_bc_grid, { wrap: false }, {
          default: withCtx(() => [
            item.label ? (openBlock(), createBlock(_component_bc_grid_col, {
              key: 0,
              xs: 5,
              class: normalizeClass([$options.sidesCssClasses(item, index)])
            }, {
              default: withCtx(() => [
                item.label.date ? (openBlock(), createBlock(_component_bc_container, {
                  key: 0,
                  textContent: toDisplayString(item.label.date),
                  class: normalizeClass([$options.dateCssClasses(item)])
                }, null, 8, ["textContent", "class"])) : createCommentVNode("", true),
                item.label.tagline ? (openBlock(), createBlock(_component_bc_container, {
                  key: 1,
                  textContent: toDisplayString(item.label.tagline),
                  class: normalizeClass(["opacity-50", "truncate", `text-${item.label.taglineSize || "sm"}`])
                }, null, 8, ["textContent", "class"])) : createCommentVNode("", true)
              ]),
              _: 2
            }, 1032, ["class"])) : createCommentVNode("", true),
            createVNode(_component_bc_grid_col, {
              xl: 1,
              lg: 1,
              md: 1,
              sm: 1,
              xs: 2,
              class: normalizeClass($options.timeLineUiCssClasses(index))
            }, {
              default: withCtx(() => [
                createVNode(_component_bc_container, {
                  class: normalizeClass($options.barCssClasses),
                  style: normalizeStyle($options.barStyle)
                }, null, 8, ["class", "style"]),
                createVNode(_component_bc_container, {
                  onClick: ($event) => _ctx.$emit("marker-click", item),
                  display: "inline-block",
                  class: normalizeClass($options.markerCssClasses(item)),
                  style: normalizeStyle($options.markerStyle(item))
                }, {
                  default: withCtx(() => [
                    item.label.icon ? (openBlock(), createBlock(_component_bc_icon, {
                      key: 0,
                      name: item.label.icon
                    }, null, 8, ["name"])) : createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1032, ["onClick", "class", "style"])
              ]),
              _: 2
            }, 1032, ["class"]),
            createVNode(_component_bc_grid_col, {
              xs: 5,
              class: normalizeClass($options.sidesCssClasses(item, index, "right")),
              textContent: toDisplayString(item.event.text)
            }, null, 8, ["class", "textContent"])
          ]),
          _: 2
        }, 1024);
      }), 256))
    ]),
    _: 1
  }, 8, ["class"]);
}
const BcTimeline = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9]]);
BcTimeline.install = (Vue) => {
  Vue.component(BcTimeline.name, BcTimeline);
};
const _sfc_main$8 = {
  name: "BcToolbar",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("toolbar")
    };
  },
  props: {
    color: {
      type: String,
      default: "secondary"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    elevation: {
      type: String,
      default: "md"
    },
    height: {
      type: String
    },
    inert: {
      type: Boolean,
      default: false
    },
    padding: {
      type: Array,
      default() {
        return ["py-1", "px-2"];
      }
    },
    roundness: {
      type: String,
      default: "sm"
    },
    size: {
      type: String,
      default: "md"
    },
    variant: {
      type: String,
      default: "solid"
    }
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.makeUiColorVariant(this.color, this.variant),
        this.makeElevation(this.elevation),
        this.makeBorderRadius(this.roundness),
        this.makeFontSize(this.size),
        this.disabled && !this.inert ? "disabled" : null,
        "select-none",
        "bc-container"
      ];
    },
    componentStyle() {
      return {
        height: this.height
      };
    }
  }
};
const _hoisted_1$3 = ["inert"];
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_table_layout_row = resolveComponent("bc-table-layout-row");
  const _component_bc_table_layout = resolveComponent("bc-table-layout");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.componentCssClasses),
    inert: $props.inert
  }, [
    createVNode(_component_bc_table_layout, {
      "y-align": "middle",
      "x-align": "left",
      style: normalizeStyle($options.componentStyle)
    }, {
      default: withCtx(() => [
        createVNode(_component_bc_table_layout_row, null, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["style"])
  ], 10, _hoisted_1$3);
}
const BcToolbar = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8]]);
BcToolbar.install = (Vue) => {
  Vue.component(BcToolbar.name, BcToolbar);
};
const toolbarComputed = {
  computed: {
    parent() {
      return this.$parent.$parent.$parent.$parent.$parent;
    },
    parentProps() {
      return this.parent.$props;
    }
  }
};
const _sfc_main$7 = {
  name: "BcToolbarActions",
  mixins: [
    methods,
    toolbarComputed
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("toolbar-actions")
    };
  },
  props: {
    xAlign: {
      type: String,
      default: "right"
    }
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.parentProps.padding
      ];
    }
  }
};
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  return openBlock(), createBlock(_component_bc_table_layout_cell, {
    class: normalizeClass($options.componentCssClasses),
    "x-align": $props.xAlign
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class", "x-align"]);
}
const BcToolbarActions = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);
BcToolbarActions.install = (Vue) => {
  Vue.component(BcToolbarActions.name, BcToolbarActions);
};
const _sfc_main$6 = {
  name: "BcToolbarIcon",
  mixins: [
    methods,
    toolbarComputed
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("toolbar-icon")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.parentProps.padding
      ];
    },
    componentStyle() {
      return {
        width: this.width
      };
    }
  },
  props: {
    width: {
      type: String,
      default: "40px"
    },
    xAlign: {
      type: String,
      default: "center"
    }
  }
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  return openBlock(), createBlock(_component_bc_table_layout_cell, {
    class: normalizeClass($options.componentCssClasses),
    "x-align": $props.xAlign,
    style: normalizeStyle($options.componentStyle)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class", "x-align", "style"]);
}
const BcToolbarIcon = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
BcToolbarIcon.install = (Vue) => {
  Vue.component(BcToolbarIcon.name, BcToolbarIcon);
};
const _sfc_main$5 = {
  name: "BcToolbarTitle",
  mixins: [
    methods,
    toolbarComputed
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("toolbar-title")
    };
  },
  props: {
    fontWeight: {
      type: String,
      default: "semibold"
    },
    width: {
      type: String,
      default: "w-full"
    },
    xAlign: {
      type: String,
      default: "left"
    }
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.width,
        this.parentProps.padding,
        this.makeFontWeight(this.fontWeight)
      ];
    }
  }
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  return openBlock(), createBlock(_component_bc_table_layout_cell, {
    class: normalizeClass($options.componentCssClasses),
    "x-align": $props.xAlign
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class", "x-align"]);
}
const BcToolbarTitle = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
BcToolbarTitle.install = (Vue) => {
  Vue.component(BcToolbarTitle.name, BcToolbarTitle);
};
const _sfc_main$4 = {
  name: "BcTooltip",
  mixins: [
    methods
  ],
  data() {
    return {
      position: {
        top: null,
        left: null,
        zIndex: null
      },
      hidden: true,
      baseCss: this.componentBaseCss("tooltip"),
      colorInternal: null,
      sizeInternal: null,
      placementInternal: null,
      roundnessInternal: null,
      dismissibleInternal: false,
      widthInternal: null,
      content: null
    };
  },
  computed: {
    componentCssClasses() {
      const baseCss = this.baseCss;
      return [
        baseCss,
        `${baseCss}-${this.placementInternal}`,
        this.hidden ? ["opacity-0", "pointer-events-none"] : ["opacity-100"],
        this.pointer ? `${baseCss}-pointer` : null,
        this.colorInternal,
        this.sizeInternal,
        this.roundnessInternal,
        this.makeElevation(this.elevation),
        "transition-opacity",
        "transition-duration-500",
        "fixed",
        "cursor-default"
      ];
    },
    componentStyle() {
      return {
        ...this.position,
        width: this.widthInternal
      };
    }
  },
  props: {
    dismissible: {
      type: Boolean,
      default: false
    },
    dismissIcon: {
      default: "close-circle"
    },
    color: {
      type: String,
      default: "secondary"
    },
    elevation: {
      type: String,
      default: "xl"
    },
    iconProvider: {
      type: String,
      default: "mdi"
    },
    placement: {
      type: String,
      default: "top",
      validator: (value) => {
        return [
          "top",
          "right",
          "bottom",
          "left"
        ].includes(value);
      }
    },
    pointer: {
      type: Boolean,
      default: true
    },
    roundness: {
      type: String,
      default: "sm"
    },
    size: {
      type: String,
      default: "sm"
    },
    variant: {
      type: String,
      default: "solid"
    },
    width: {
      type: String
    },
    zIndex: {
      type: Number,
      default: 1e3
    }
  },
  mounted() {
    this.bind();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.dismiss);
  },
  methods: {
    bind() {
      const emitter = this.$emitter;
      emitter.on("bc-tooltip:show", (data) => {
        const $el = this.$el;
        const boundingClientRect = data.target.getBoundingClientRect();
        delete this.position.transform;
        this.position.zIndex = data.zIndex || this.zIndex;
        this.position.top = `${boundingClientRect.top}px`;
        this.position.left = `${boundingClientRect.left}px`;
        this.colorInternal = this.makeUiColorVariant(data.color || this.color, data.variant || this.variant);
        this.sizeInternal = this.makeFontSize(data.size || this.size);
        this.placementInternal = data.placement || this.placement;
        this.roundnessInternal = this.makeBorderRadius(data.roundness || this.roundness);
        this.dismissibleInternal = data.dismissible || this.dismissible;
        this.widthInternal = data.width || this.width || "auto";
        this.content = data.content;
        const targetHeight = boundingClientRect.height;
        const targetWidth = boundingClientRect.width;
        const tooltipOffsetWidth = $el.offsetWidth;
        const tooltipOffsetHeight = $el.offsetHeight;
        const centerX = targetWidth / 2 - tooltipOffsetWidth / 2;
        const centerY = targetHeight / 2 - tooltipOffsetHeight / 2;
        switch (this.placementInternal) {
          case "top":
            this.position.transform = `translate(${centerX}px, ${tooltipOffsetHeight * -1}px)`;
            break;
          case "bottom":
            this.position.transform = `translate(${centerX}px, ${targetHeight}px)`;
            break;
          case "right":
            this.position.transform = `translate(${targetWidth}px, ${centerY}px)`;
            break;
          case "left":
            this.position.transform = `translate(${tooltipOffsetWidth * -1}px, ${centerY}px)`;
            break;
        }
        this.hidden = false;
      });
      emitter.on("bc-tooltip:hide", () => {
        this.dismiss();
      });
      window.addEventListener("scroll", this.dismiss);
    },
    dismiss() {
      this.hidden = true;
    }
  }
};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_container = resolveComponent("bc-container");
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_table_layout_row = resolveComponent("bc-table-layout-row");
  const _component_bc_table_layout = resolveComponent("bc-table-layout");
  return openBlock(), createBlock(_component_bc_container, {
    class: normalizeClass($options.componentCssClasses),
    style: normalizeStyle($options.componentStyle)
  }, {
    default: withCtx(() => [
      createVNode(_component_bc_table_layout, {
        class: normalizeClass(["relative"]),
        "y-align": "top"
      }, {
        default: withCtx(() => [
          createVNode(_component_bc_table_layout_row, null, {
            default: withCtx(() => [
              createVNode(_component_bc_table_layout_cell, {
                class: normalizeClass(["p-1", $props.dismissible ? "pr-0" : null])
              }, {
                default: withCtx(() => [
                  createVNode(_component_bc_container, { innerHTML: $data.content }, null, 8, ["innerHTML"])
                ]),
                _: 1
              }, 8, ["class"]),
              $data.dismissibleInternal ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                key: 0,
                class: normalizeClass(["p-1", "pl-0", `${$data.baseCss}-close-icon-cell`]),
                "x-align": "center"
              }, {
                default: withCtx(() => [
                  createVNode(_component_bc_icon, {
                    name: $props.dismissIcon,
                    provider: $props.iconProvider,
                    class: normalizeClass(["cursor-pointer"]),
                    onClick: $options.dismiss
                  }, null, 8, ["name", "provider", "onClick"])
                ]),
                _: 1
              }, 8, ["class"])) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["class", "style"]);
}
const BcTooltip = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
BcTooltip.install = (Vue) => {
  Vue.component(BcTooltip.name, BcTooltip);
};
const _sfc_main$3 = {
  name: "BcTreeviewItem",
  mixins: [
    methods
  ],
  data() {
    return {
      isExpanded: false,
      baseCss: this.componentBaseCss("treeview-item")
    };
  },
  props: [
    "checkboxes",
    "checkboxesIconChecked",
    "checkboxesIconUnchecked",
    "iconFile",
    "iconFolderClosed",
    "iconFolderOpen",
    "iconProvider",
    "items",
    "showIconFile",
    "size"
  ],
  computed: {
    isFolder() {
      return this.items.children && this.items.children.length;
    },
    componentCssClasses() {
      return [
        this.baseCss,
        this.items.disabled ? "disabled" : null
      ];
    },
    labelCssClasses() {
      return [
        "inline-block",
        "align-middle",
        !this.isFolder && !this.showIconFile ? "bc-treeview-item-label-no-file-icon" : "bc-treeview-item-label"
      ];
    }
  },
  mounted() {
    if (this.items.expanded) {
      this.isExpanded = true;
    }
  },
  methods: {
    toggle(items) {
      if (!items.disabled) {
        if (this.isFolder) {
          this.isExpanded = !this.isExpanded;
        }
        items.expanded = this.isExpanded;
        items.isFolder = !!items.children;
        this.$emit("item-click", items);
      }
    }
  }
};
const _hoisted_1$2 = ["textContent"];
const _hoisted_2 = { key: 0 };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_checkbox = resolveComponent("bc-checkbox");
  const _component_bc_container = resolveComponent("bc-container");
  const _component_bc_treeview_item = resolveComponent("bc-treeview-item");
  return openBlock(), createElementBlock("li", {
    role: "treeitem",
    class: normalizeClass($options.componentCssClasses)
  }, [
    createVNode(_component_bc_container, {
      onClick: _cache[1] || (_cache[1] = ($event) => $options.toggle($props.items)),
      title: $props.items.item.name,
      class: normalizeClass(["whitespace-nowrap", "cursor-pointer"])
    }, {
      default: withCtx(() => [
        $options.isFolder ? (openBlock(), createBlock(_component_bc_icon, {
          key: 0,
          provider: $props.iconProvider,
          name: $data.isExpanded ? $props.iconFolderOpen : $props.iconFolderClosed,
          class: normalizeClass(["m-1"])
        }, null, 8, ["provider", "name"])) : !$options.isFolder && $props.showIconFile ? (openBlock(), createBlock(_component_bc_icon, {
          key: 1,
          provider: $props.iconProvider,
          name: $props.items.item.icon || $props.iconFile,
          class: normalizeClass(["m-1"])
        }, null, 8, ["provider", "name"])) : createCommentVNode("", true),
        $props.checkboxes ? (openBlock(), createBlock(_component_bc_checkbox, {
          key: 2,
          checked: $props.items.checked,
          "onUpdate:checked": _cache[0] || (_cache[0] = ($event) => $props.items.checked = $event),
          size: $props.size,
          "icon-checked": $props.checkboxesIconChecked,
          "icon-unchecked": $props.checkboxesIconUnchecked,
          "icon-provider": $props.iconProvider,
          block: false
        }, null, 8, ["checked", "size", "icon-checked", "icon-unchecked", "icon-provider"])) : createCommentVNode("", true),
        createElementVNode("span", {
          class: normalizeClass($options.labelCssClasses),
          textContent: toDisplayString($props.items.item.name)
        }, null, 10, _hoisted_1$2)
      ]),
      _: 1
    }, 8, ["title"]),
    createVNode(Transition, { name: "slide" }, {
      default: withCtx(() => [
        $options.isFolder && $data.isExpanded ? (openBlock(), createElementBlock("ul", _hoisted_2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($props.items.children, (child, index) => {
            return openBlock(), createBlock(_component_bc_treeview_item, {
              onItemClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("item-click", $event)),
              "icon-file": $props.iconFile,
              "show-icon-file": $props.showIconFile,
              "icon-folder-open": $props.iconFolderOpen,
              "icon-folder-closed": $props.iconFolderClosed,
              checkboxes: $props.checkboxes,
              "checkboxes-icon-checked": $props.checkboxesIconChecked,
              "checkboxes-icon-unchecked": $props.checkboxesIconUnchecked,
              "icon-provider": $props.iconProvider,
              key: index,
              size: $props.size,
              items: child
            }, null, 8, ["icon-file", "show-icon-file", "icon-folder-open", "icon-folder-closed", "checkboxes", "checkboxes-icon-checked", "checkboxes-icon-unchecked", "icon-provider", "size", "items"]);
          }), 128))
        ])) : createCommentVNode("", true)
      ]),
      _: 1
    })
  ], 2);
}
const BcTreeviewItem = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
const _sfc_main$2 = {
  name: "BcTreeview",
  components: {
    BcTreeviewItem
  },
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("treeview")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.disabled && !this.inert ? "disabled" : null,
        this.makeFontSize(this.size),
        "select-none"
      ];
    }
  },
  props: {
    checkboxes: {
      type: Boolean,
      default: false
    },
    checkboxesIconChecked: {
      type: String,
      default: "checkbox-marked-outline"
    },
    checkboxesIconUnchecked: {
      type: String,
      default: "checkbox-blank-outline"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    iconFile: {
      type: String,
      default: "file"
    },
    iconFolderClosed: {
      type: String,
      default: "folder"
    },
    iconFolderOpen: {
      type: String,
      default: "folder-open"
    },
    iconProvider: {
      default: "mdi"
    },
    inert: {
      type: Boolean,
      default: false
    },
    items: {
      type: Object,
      required: true
    },
    showIconFile: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: "sm"
    }
  }
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_treeview_item = resolveComponent("bc-treeview-item");
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    class: normalizeClass($options.componentCssClasses),
    role: "tree",
    inert: $props.inert
  }, {
    default: withCtx(() => [
      createVNode(Transition, { name: "slide" }, {
        default: withCtx(() => [
          createElementVNode("ul", null, [
            createVNode(_component_bc_treeview_item, {
              onItemClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("item-click", $event)),
              "show-icon-file": $props.showIconFile,
              items: $props.items,
              "icon-file": $props.iconFile,
              "icon-provider": $props.iconProvider,
              "icon-folder-open": $props.iconFolderOpen,
              checkboxes: $props.checkboxes,
              "checkboxes-icon-checked": $props.checkboxesIconChecked,
              "checkboxes-icon-unchecked": $props.checkboxesIconUnchecked,
              size: $props.size,
              "icon-folder-closed": $props.iconFolderClosed
            }, null, 8, ["show-icon-file", "items", "icon-file", "icon-provider", "icon-folder-open", "checkboxes", "checkboxes-icon-checked", "checkboxes-icon-unchecked", "size", "icon-folder-closed"])
          ])
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["class", "inert"]);
}
const BcTreeview = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
BcTreeview.install = (Vue) => {
  Vue.component(BcTreeview.name, BcTreeview);
};
const _sfc_main$1 = {
  name: "BcUpload",
  mixins: [
    methods
  ],
  data() {
    return {
      key: 0,
      src: null,
      files: null,
      fileTooBig: false,
      fileNotAllowed: false,
      previewNotAvailable: true,
      id: `bc-upload-${this.uuid()}`,
      baseCss: this.componentBaseCss("upload")
    };
  },
  computed: {
    componentCssClasses() {
      return [
        this.baseCss,
        this.block ? null : ["inline-block", "align-middle"],
        this.disabled && !this.inert ? "disabled" : null,
        "select-none"
      ];
    },
    innerWrapperCssClasses() {
      return [
        this.makeElevation(this.elevation),
        this.makeBorderRadius(this.roundness)
      ];
    },
    componentStyle() {
      return {
        width: this.width
      };
    },
    isReady() {
      const files = this.files;
      return files && files.length && this.src;
    }
  },
  props: {
    block: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "primary"
    },
    colorFileTooBig: {
      type: String,
      default: "danger"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    elevation: {
      type: String,
      default: "md"
    },
    fileListImageThumbnailSize: {
      type: String,
      default: "48px"
    },
    fileListMaxHeight: {
      type: String
    },
    hint: {
      type: String
    },
    iconClearable: {
      type: String,
      default: "close-circle"
    },
    iconFile: {
      type: String,
      default: "file"
    },
    iconFileTooBig: {
      type: String,
      default: "alert"
    },
    iconLeft: {
      type: String
    },
    iconProvider: {
      type: String,
      default: "mdi"
    },
    iconRight: {
      type: String
    },
    inert: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: "Choose File..."
    },
    labelsUppercase: {
      type: Boolean,
      default: false
    },
    labelsFontWeight: {
      type: String,
      default: "normal"
    },
    loading: {
      type: Boolean,
      default: false
    },
    maxFileSize: {
      type: Number
    },
    messageFileTooBig: {
      type: String,
      default: "File too big. Choose a smaller file"
    },
    mimeTypes: {
      type: Array,
      default: () => {
        return [];
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    roundness: {
      type: String,
      default: "full"
    },
    size: {
      type: String,
      default: "sm"
    },
    sizes: {
      type: Array,
      default() {
        return [
          "Bytes",
          "KB",
          "MB",
          "GB",
          "TB",
          "PB",
          "EB",
          "ZB",
          "YB"
        ];
      }
    },
    variant: {
      type: String,
      default: "solid"
    },
    width: {
      type: String
    }
  },
  methods: {
    getInputFileNode() {
      return this.$el.querySelector(`input[type="file"]`);
    },
    clickUploadInput() {
      this.getInputFileNode().click();
    },
    getFileList() {
      return this.getInputFileNode().files;
    },
    getFileData() {
      this.files = this.getFileList();
      this.getBase64();
    },
    format(bytes, decimals = 2) {
      if (bytes === 0) {
        return "0 Bytes";
      }
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = this.sizes;
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },
    isImage(index) {
      return this.files.item(index).type.includes("image");
    },
    isText(index) {
      return this.files.item(index).type.includes("text");
    },
    reset() {
      this.src = null;
      this.files = null;
      this.fileTooBig = false;
      this.fileNotAllowed = false;
      this.resetForm();
      this.$emit("clear", new DataTransfer().files);
    },
    resetForm() {
      this.$el.querySelector(`form`).reset();
    },
    removeFile(index) {
      const list = new DataTransfer();
      const newFileList = Array.from(this.files);
      newFileList.splice(index, 1);
      newFileList.forEach((file) => {
        list.items.add(file);
      });
      if (!list.files.length) {
        this.reset();
      } else {
        this.files = list.files;
        this.$emit("files", this.files);
      }
    },
    getBase64() {
      Array.from(this.files).forEach((file, index) => {
        const reader = new FileReader();
        const type = this.files.item(index).type;
        this.src = null;
        if (this.mimeTypes.length && !this.mimeTypes.includes(type)) {
          this.fileNotAllowed = true;
          return;
        }
        if (this.isText(index)) {
          reader.readAsText(this.files.item(index));
        } else {
          reader.readAsDataURL(this.files.item(index));
        }
        reader.onload = () => {
          const size = this.files.item(index).size;
          const maxFileSize = this.maxFileSize;
          this.files.item(index).result = reader.result;
          this.files.item(index).sizeFormatted = this.format(size);
          this.src = reader.result;
          this.fileTooBig = false;
          this.fileNotAllowed = false;
          this.key++;
          if (size > maxFileSize) {
            this.fileTooBig = true;
            this.files.item(index).fileTooBig = true;
          }
        };
        reader.onerror = (error) => {
          console.error(error);
        };
      });
      this.$emit("files", this.files);
    }
  }
};
const _hoisted_1$1 = ["name", "id", "accept", "disabled", "multiple"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_btn = resolveComponent("bc-btn");
  const _component_bc_async_form = resolveComponent("bc-async-form");
  const _component_bc_container = resolveComponent("bc-container");
  const _component_bc_table_layout_cell = resolveComponent("bc-table-layout-cell");
  const _component_bc_table_layout_row = resolveComponent("bc-table-layout-row");
  const _component_bc_table_layout = resolveComponent("bc-table-layout");
  const _component_bc_text_field_label = resolveComponent("bc-text-field-label");
  const _component_bc_avatar = resolveComponent("bc-avatar");
  const _component_bc_icon = resolveComponent("bc-icon");
  const _component_bc_list_item_icon = resolveComponent("bc-list-item-icon");
  const _component_bc_list_item_content_title = resolveComponent("bc-list-item-content-title");
  const _component_bc_list_item_content_sub_title = resolveComponent("bc-list-item-content-sub-title");
  const _component_bc_list_item_content = resolveComponent("bc-list-item-content");
  const _component_bc_list_item = resolveComponent("bc-list-item");
  const _component_bc_list = resolveComponent("bc-list");
  const _component_bc_card_text = resolveComponent("bc-card-text");
  const _component_bc_card = resolveComponent("bc-card");
  return openBlock(), createBlock(_component_bc_container, {
    "data-upload": $props.name,
    inert: $props.inert || $props.loading,
    block: $props.block ? "block" : "inline-block",
    class: normalizeClass($options.componentCssClasses),
    style: normalizeStyle($options.componentStyle)
  }, {
    default: withCtx(() => [
      createVNode(_component_bc_container, {
        class: normalizeClass($options.innerWrapperCssClasses)
      }, {
        default: withCtx(() => [
          createVNode(_component_bc_table_layout, { "y-align": "middle" }, {
            default: withCtx(() => [
              createVNode(_component_bc_table_layout_row, null, {
                default: withCtx(() => [
                  createVNode(_component_bc_table_layout_cell, { "x-align": "left" }, {
                    default: withCtx(() => [
                      createVNode(_component_bc_container, {
                        tag: "label",
                        for: $data.id,
                        class: normalizeClass(["block", "w-full"])
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_bc_async_form, { "form-data": {} }, {
                            default: withCtx(() => [
                              createVNode(_component_bc_btn, {
                                block: "",
                                onClick: $options.clickUploadInput,
                                class: normalizeClass([$props.clearable ? "border-noround-right" : null]),
                                "icon-provider": $props.iconProvider,
                                elevation: "none",
                                roundness: $props.roundness,
                                "icon-left": $props.iconLeft,
                                "icon-right": $props.iconRight,
                                loading: $props.loading,
                                "font-weight": $props.labelsFontWeight,
                                uppercase: $props.labelsUppercase,
                                size: $props.size,
                                color: $props.color,
                                variant: $props.variant
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString($props.label), 1)
                                ]),
                                _: 1
                              }, 8, ["onClick", "class", "icon-provider", "roundness", "icon-left", "icon-right", "loading", "font-weight", "uppercase", "size", "color", "variant"]),
                              (openBlock(), createElementBlock("input", {
                                onChange: _cache[0] || (_cache[0] = (...args) => $options.getFileData && $options.getFileData(...args)),
                                key: $data.key,
                                type: "file",
                                name: $props.name,
                                id: $data.id,
                                accept: $props.mimeTypes.join(","),
                                disabled: $props.disabled,
                                class: normalizeClass(["appearance-none", "hidden"]),
                                multiple: $props.multiple ? "multiple" : null,
                                tabindex: "-1"
                              }, null, 40, _hoisted_1$1))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["for"])
                    ]),
                    _: 1
                  }),
                  $props.clearable ? (openBlock(), createBlock(_component_bc_table_layout_cell, {
                    key: 0,
                    "x-align": "left",
                    class: normalizeClass([`${$data.baseCss}-clearable-cell`])
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_bc_btn, {
                        block: "",
                        onClick: $options.reset,
                        inert: !$options.isReady || $props.loading,
                        "icon-provider": $props.iconProvider,
                        icon: $props.iconClearable,
                        elevation: "none",
                        roundness: $props.roundness,
                        size: $props.size,
                        color: $props.color,
                        variant: $props.variant,
                        class: normalizeClass(["border-noround-left"])
                      }, null, 8, ["onClick", "inert", "icon-provider", "icon", "roundness", "size", "color", "variant"])
                    ]),
                    _: 1
                  }, 8, ["class"])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["class"]),
      createVNode(_component_bc_text_field_label, {
        text: $props.hint,
        class: normalizeClass(["text-right", $props.labelsUppercase ? "uppercase" : null, "mt-1", $options.isReady ? "mb-1" : null, _ctx.makeFontWeight($props.labelsFontWeight)])
      }, null, 8, ["text", "class"]),
      $options.isReady ? (openBlock(), createBlock(_component_bc_card, {
        key: $data.key,
        elevation: $props.elevation
      }, {
        default: withCtx(() => [
          createVNode(_component_bc_card_text, null, {
            default: withCtx(() => [
              createVNode(_component_bc_list, {
                divider: "",
                "max-height": $props.fileListMaxHeight
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList($data.files, (file, index) => {
                    return openBlock(), createBlock(_component_bc_list_item, {
                      key: index,
                      class: normalizeClass([file.fileTooBig ? _ctx.makeUiColorVariant($props.colorFileTooBig, "solid") : null])
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_bc_list_item_icon, null, {
                          default: withCtx(() => [
                            $options.isImage(index) ? (openBlock(), createBlock(_component_bc_avatar, {
                              key: 0,
                              tile: "",
                              block: "",
                              size: $props.fileListImageThumbnailSize,
                              elevation: $props.elevation,
                              src: file.result,
                              "border-width": 0
                            }, null, 8, ["size", "elevation", "src"])) : (openBlock(), createBlock(_component_bc_icon, {
                              key: 1,
                              name: file.fileTooBig ? $props.iconFileTooBig : $props.iconFile
                            }, null, 8, ["name"]))
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_component_bc_list_item_content, null, {
                          default: withCtx(() => [
                            createVNode(_component_bc_list_item_content_title, {
                              textContent: toDisplayString(file.name)
                            }, null, 8, ["textContent"]),
                            createVNode(_component_bc_list_item_content_sub_title, {
                              textContent: toDisplayString(file.sizeFormatted),
                              class: normalizeClass(["opacity-75"])
                            }, null, 8, ["textContent"]),
                            file.fileTooBig ? (openBlock(), createBlock(_component_bc_list_item_content_sub_title, {
                              key: 0,
                              textContent: toDisplayString($props.messageFileTooBig)
                            }, null, 8, ["textContent"])) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1024),
                        $props.clearable ? (openBlock(), createBlock(_component_bc_list_item_icon, { key: 0 }, {
                          default: withCtx(() => [
                            createVNode(_component_bc_icon, {
                              class: normalizeClass(["cursor-pointer"]),
                              name: $props.iconClearable,
                              onClick: ($event) => $options.removeFile(index)
                            }, null, 8, ["name", "onClick"])
                          ]),
                          _: 2
                        }, 1024)) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1032, ["class"]);
                  }), 128))
                ]),
                _: 1
              }, 8, ["max-height"])
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["elevation"])) : createCommentVNode("", true)
    ]),
    _: 1
  }, 8, ["data-upload", "inert", "block", "class", "style"]);
}
const BcUpload = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
BcUpload.install = (Vue) => {
  Vue.component(BcUpload.name, BcUpload);
};
const _sfc_main = {
  name: "BcVid",
  mixins: [
    methods
  ],
  data() {
    return {
      baseCss: this.componentBaseCss("vid")
    };
  },
  computed: {
    componentStyle() {
      return {
        aspectRatio: this.calculateAspectRatio(this.width, this.height)
      };
    },
    componentCssClasses() {
      return [
        this.baseCss
      ];
    }
  },
  props: {
    src: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 560
    },
    height: {
      type: Number,
      default: 314
    }
  }
};
const _hoisted_1 = ["src"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bc_container = resolveComponent("bc-container");
  return openBlock(), createBlock(_component_bc_container, {
    class: normalizeClass($options.componentCssClasses),
    style: normalizeStyle($options.componentStyle)
  }, {
    default: withCtx(() => [
      createElementVNode("iframe", {
        onLoad: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("load", { $event, src: this.src })),
        class: normalizeClass(["h-full", "w-full"]),
        src: $props.src,
        seamless: "",
        frameborder: "0",
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowfullscreen: ""
      }, null, 40, _hoisted_1)
    ]),
    _: 1
  }, 8, ["class", "style"]);
}
const BcComponentTemplate = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
BcComponentTemplate.install = (Vue) => {
  Vue.component(BcComponentTemplate.name, BcComponentTemplate);
};
const components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BcAlert: ComponentTemplate$4,
  BcAmbientImage,
  BcApp,
  BcAsyncForm,
  BcAvatar,
  BcAvatarGroup,
  BcBadge,
  BcBanner,
  BcBrandColor,
  BcBreadcrumbs,
  BcBreadcrumbsItem,
  BcBtn,
  BcBtnGroup,
  BcCard,
  BcCardActions,
  BcCardText,
  BcCardTitle,
  BcCheckbox,
  BcChip,
  BcCollapsible,
  BcCollapsibleItem,
  BcColorPicker,
  BcContainer: ComponentTemplate$3,
  BcContextMenu,
  BcDataTable,
  BcDialogBox,
  BcDivider,
  BcDropdown,
  BcEmpty: ComponentTemplate$2,
  BcFlag,
  BcGrid,
  BcGridCol: ComponentTemplate$1,
  BcHeading,
  BcIcon,
  BcKbd,
  BcKpi,
  BcLayout,
  BcLazyImage,
  BcList,
  BcListItem,
  BcListItemContent,
  BcListItemContentSubTitle,
  BcListItemContentTitle,
  BcListItemIcon,
  BcLoadingOverlay,
  BcLoremIpsum,
  BcMeterGroup,
  BcMeterGroupItem,
  BcMultilineEllipsis,
  BcNavigatorOnline: _sfc_main$x,
  BcNotification,
  BcPager,
  BcProgressbar,
  BcRadio,
  BcRadioGroup,
  BcRangeSlider,
  BcRating,
  BcReactiveStyle: _sfc_main$p,
  BcSkeletonLoader: ComponentTemplate,
  BcSlider,
  BcSnackbar,
  BcSparklines,
  BcSpeedDial,
  BcSplitBtn,
  BcSvgIcon,
  BcSwitcher,
  BcTableLayout,
  BcTableLayoutCell,
  BcTableLayoutRow,
  BcTabs,
  BcTabsPanel,
  BcTextField,
  BcTextFieldLabel,
  BcTimeline,
  BcToolbar,
  BcToolbarActions,
  BcToolbarIcon,
  BcToolbarTitle,
  BcTooltip,
  BcTreeview,
  BcUpload,
  BcVid: BcComponentTemplate,
  BcqUi: BcUi
}, Symbol.toStringTag, { value: "Module" }));
function BcqUi(Vue) {
  Vue.use(BcUi, {
    components
  });
}
export {
  BcqUi as default
};
