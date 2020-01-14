<template>
    <div
        @mousemove="textHover"
        :class="['d-inline-block', classes]"
        @mouseover="showCursor(text, link)"
        @mouseout="
            hideCursor();
            textHover($event, true);
        "
        @click="$emit('click', $event)"
    >
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        classes: String,
        text: String,
        link: String,
    },
};
</script>

<style></style>
