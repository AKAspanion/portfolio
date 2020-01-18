<template>
    <div
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
        delay: Number,
        appear: Boolean,
    },
    data() {
        return {
            showText: false,
            maskClass: 'mask--enter',
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
    },
    methods: {
        animateText() {
            let _delay = this.delay || 400;
            setTimeout(() => {
                this.maskClass = 'mask--show';
            }, _delay);
            setTimeout(() => {
                this.showText = true;
            }, _delay + 600);
            setTimeout(() => {
                this.maskClass = 'mask--leave';
            }, _delay + 700);
        },
    },
    mounted() {
        this.animateText();
    },
};
</script>

<style scoped>
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
