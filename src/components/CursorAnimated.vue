<template>
    <div
        class="cursor-animated"
        :class="[progress == 0 ? 'cursor-animated--hidden' : '']"
    >
        <v-progress-circular
            size="48"
            width="2"
            :value="progress"
        ></v-progress-circular>
    </div>
</template>

<script>
export default {
    name: 'CursorAnimated',
    props: ['hovered'],
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
                `top: ${e.pageY - 24}px; left: ${e.pageX - 24}px;`
            );
        });
    },
};
</script>

<style>
.cursor-animated {
    position: absolute;
    pointer-events: none;
}
.cursor-animated--hidden {
    opacity: 0;
    transition: opacity 1.5s ease;
}
</style>
