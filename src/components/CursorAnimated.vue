<template>
    <div v-if="cursor && $vuetify.breakpoint.smAndUp">
        <div
            id="animatedcursor"
            class="cursor-animated"
            :class="[
                progress == 0
                    ? 'cursor-animated--small'
                    : 'cursor-animated--large',
            ]"
        ></div>
        <div
            id="tooltipforcursor"
            class="cursor-tooltip"
            :class="[
                (cursor.tooltip && cursor.tooltip !== '') ||
                (cursor.link && cursor.link !== '')
                    ? ''
                    : 'cursor-tooltip--hidden',
                $vuetify.theme.dark
                    ? 'cursor-tooltip--dark'
                    : 'cursor-tooltip--white',
                cursor.link ? 'cursor-tooltip--photo' : '',
            ]"
        >
            <template v-if="cursor.link && cursor.link !== ''">
                <v-img
                    :src="cursor.link"
                    width="250"
                    height="200"
                    class="cursor-photo"
                    lazy-src="lazy.jpeg"
                ></v-img>
            </template>
            <div
                class="text-center"
                :class="cursor.link && cursor.link !== '' ? 'pt-8' : ''"
            >
                {{ cursor.tooltip }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CursorAnimated',
    computed: {
        progress() {
            if (this.cursor.hovered) return 100;
            else return 0;
        },
        cursor() {
            return this.$store.getters.cursor;
        },
    },
    methods: {
        handleCursor(e) {
            try {
                const cursor = document.getElementById('animatedcursor');
                const tooltip = document.getElementById('tooltipforcursor');
                cursor.style.transform = `translate3d(${e.pageX}px,${e.pageY}px, 0px)`;
                tooltip.style.transform = `translate3d(${e.pageX}px,${e.pageY}px, 0px)`;
            } catch (e) {
                // catching dom errors
            }
        },
    },
    mounted() {
        document.addEventListener('mousemove', this.handleCursor);
    },
    destroyed() {
        window.removeEventListener('mousemove', this.handleCursor);
    },
};
</script>

<style>
.cursor-animated,
.cursor-tooltip {
    z-index: 200;
    position: absolute;
    pointer-events: none;
}
.cursor-animated {
    border-radius: 50%;
    border: 2px solid white;
    mix-blend-mode: difference;
    transform: translate3d(-100px, -100px, 0px);
}
.cursor-animated--small {
    top: -12px;
    left: -12px;
    width: 24px;
    height: 24px;
}
.cursor-animated--large {
    top: -28px;
    left: -28px;
    width: 56px;
    height: 56px;
    background: white;
}
.cursor-animated,
.cursor-animated--small,
.cursor-animated--large {
    will-change: transform, width, height;
    transition: all 300ms ease-out;
}
.cursor-animated--rotated {
    transform: scaleX(-1) rotate(180deg);
}
.cursor-tooltip {
    top: 28px;
    left: 28px;
    width: auto;
    height: auto;
    padding: 16px;
    overflow: hidden;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.cursor-tooltip--photo {
    padding: 32px;
}
.cursor-tooltip--dark {
    background: #e0e0e0;
    color: #212121;
}
.cursor-tooltip--white {
    background: #212121;
    color: #e0e0e0;
}
.cursor-tooltip--hidden {
    width: 0px;
    height: 0px;
    padding: 0px;
    opacity: 0;
}
.cursor-photo,
.cursor-tooltip {
    transition: all 300ms ease-out;
}
</style>
