<template>
    <div
        :id="maskTextId"
        class="mask--text d-inline-block"
        :class="[$vuetify.theme.dark ? 'dark--mask' : 'white--mask', maskClass]"
    >
        <span :style="`opacity: ${showText ? 1 : 0}`">
            <slot></slot>
        </span>
    </div>
</template>

<script>
export default {
    props: {
        delay: {
            type: Number,
            default: 100,
        },
    },
    data() {
        return {
            state: true,
            showText: false,
            maskClass: 'mask--enter',
            maskTextId: `mask_${this.uid()}`,
        };
    },
    computed: {
        navMenu: {
            get() {
                return this.$store.getters.navMenu;
            },
        },
    },
    watch: {
        navMenu(val) {
            if (val) {
                this.maskClass = 'mask--leave mask--show';
            } else {
                setTimeout(() => {
                    this.maskClass = 'mask--leave';
                }, 400);
            }
        },
        appear: {
            handler(val) {
                if (val) {
                    this.animateText();
                }
            },
            immediate: true,
            deep: true,
        },
    },
    methods: {
        animateText() {
            if (this.state) {
                if (this.showText) {
                    return;
                }
                setTimeout(() => {
                    this.maskClass = 'mask--show';
                }, this.delay);
                setTimeout(() => {
                    this.showText = true;
                }, this.delay + 600);
                setTimeout(() => {
                    this.maskClass = 'mask--leave';
                }, this.delay + 700);
            } else {
                this.showText = true;
                this.maskClass = 'mask--leave';
            }
        },
        handleIntersection(o) {
            let intersectionObj = o[0];
            let { target, isIntersecting } = intersectionObj;
            if (isIntersecting && target.id === this.maskTextId) {
                this.animateText();
            }
        },
        setComponentState(component) {
            let _component = component;
            while (_component) {
                if (
                    _component.classList &&
                    _component.classList.contains('main-view-3d')
                ) {
                    this.state = false;
                    this.animateText();
                    break;
                }
                _component = _component.parentElement;
            }
            this.state = true;
        },
        uid() {
            return Math.random()
                .toString(36)
                .substring(2);
        },
    },
    mounted() {
        let observer = new IntersectionObserver(this.handleIntersection);
        let target = document.getElementById(this.maskTextId);
        this.setComponentState(target);
        observer.observe(target);
    },
};
</script>

<style scoped>
.mask--text {
    will-change: transform;
    transform-origin: bottom;
}
.mask--text.mask--enter:before,
.mask--text.mask--leave:before,
.mask--text.mask--show:before {
    top: 0;
    content: '';
    height: 100%;
    position: absolute;
    transition: width 600ms cubic-bezier(1, 0, 0, 1);
}
.mask--text.mask--enter:before {
    width: 0%;
}
.mask--text.mask--leave:before {
    width: 0%;
    left: 100%;
    transform: translate3d(-100%, 0, 0);
}
.mask--text.mask--show:before {
    width: 100%;
}

.mask--text.dark--mask:before {
    background: #e0e0e0;
}
.mask--text.white--mask:before {
    background: #212121;
}
</style>
