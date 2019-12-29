<template>
    <div
        v-if="cursor"
        class="cursor-animated"
        :class="[progress == 0 ? 'cursor-animated--hidden' : '']"
    >
        <div :class="progress == 100 ? 'cursor-animated--rotated' : ''">
            <v-progress-circular
                size="56"
                width="2"
                :value="progress"
                :color="$vuetify.theme.dark ? '#FFFFFF' : '#000000'"
            ></v-progress-circular>
        </div>
        <div
            v-if="cursor.tooltip && cursor.tooltip !== ''"
            class="cursor-animated--tooltip"
        >
            <v-card
                tile
                class="pa-3 px-8"
                :color="$vuetify.theme.dark ? '#FFFFFF' : '#000000'"
            >
                <span
                    :class="$vuetify.theme.dark ? 'black--text' : 'white--text'"
                >
                    {{ cursor.tooltip }}
                </span>
            </v-card>
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
    transition: opacity 1.5s;
}
.cursor-animated--rotated {
    transform: scaleX(-1) rotate(180deg);
}
.cursor-animated--tooltip {
    position: relative;
    left: 56px;
}
</style>
