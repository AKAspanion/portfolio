<template>
    <div
        class="cursor-animated"
        :class="[progress == 0 ? 'cursor-animated--hidden' : '']"
    >
        <div v-if="tooltip && !tooltip == ''" class="cursor-animated--tooltip">
            <v-card tile class="pa-3 px-8">
                {{ tooltip }}
            </v-card>
        </div>
        <v-progress-circular
            size="56"
            width="2"
            :value="progress"
        ></v-progress-circular>
    </div>
</template>

<script>
export default {
    name: 'CursorAnimated',
    props: ['hovered', 'tooltip'],
    computed: {
        progress() {
            if (this.hovered) return 100;
            else return 0;
        },
    },
    mounted() {
        const cursor = document.querySelector('.cursor-animated');
        document.addEventListener('mousemove', (e) => {
            cursor.setAttribute(
                'style',
                `transform: translate(${e.pageX}px,${e.pageY}px);`
            );
        });
    },
    destroyed() {
        window.removeEventListener('mousemove', this.handleScroll);
    },
};
</script>

<style>
.cursor-animated {
    top: -28px;
    left: -28px;
    position: absolute;
    pointer-events: none;
    will-change: transform;
}
.cursor-animated--hidden {
    opacity: 0;
    transition: opacity 1.5s ease;
}
.cursor-animated--tooltip {
    position: absolute;
    top: -56px;
    left: 56px;
}
</style>
