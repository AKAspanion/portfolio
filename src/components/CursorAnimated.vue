<template>
    <div
        v-if="cursor"
        class="cursor-animated"
        :class="[progress == 0 ? 'cursor-animated--hidden' : '']"
    >
        <v-progress-circular
            size="56"
            width="2"
            :value="progress"
            :color="$vuetify.theme.dark ? '#FFFFFF' : '#000000'"
            :class="progress == 100 ? 'cursor-animated--rotated' : ''"
        ></v-progress-circular>
        <div
            class="cursor-tooltip"
            :class="[
                (cursor.tooltip && cursor.tooltip !== '') ||
                (cursor.link && cursor.link !== '')
                    ? ''
                    : 'cursor-tooltip--hidden',
                $vuetify.theme.dark
                    ? 'cursor-tooltip--dark'
                    : 'cursor-tooltip--white',
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
            const cursor = document.querySelector('.cursor-animated');
            cursor.style.transform = `translate3d(${e.pageX}px,${e.pageY}px, 0px)`;
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
.cursor-animated {
    top: -28px;
    left: -28px;
    z-index: 200;
    position: absolute;
    pointer-events: none;
    will-change: transform;
    transition: transform 200ms ease-out;
}
.cursor-animated--hidden {
    opacity: 0;
    transition: opacity 1s;
    transition-delay: 0.5s;
}
.cursor-animated--rotated {
    transform: scaleX(-1) rotate(180deg);
}
.cursor-tooltip {
    left: 56px;
    height: auto;
    width: auto;
    padding: 32px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.cursor-tooltip--dark {
    background: white;
    color: black;
}
.cursor-tooltip--white {
    background: black;
    color: white;
}
.cursor-tooltip--hidden {
    width: 0px;
    height: 0px;
    padding: 0px;
}
.cursor-photo,
.cursor-tooltip,
.cursor-tooltip--hidden {
    transition: all 400ms ease;
}
</style>
