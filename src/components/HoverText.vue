<template>
    <div
        @mousemove="textHover"
        class="hover--text"
        :class="[
            classes,
            'd-inline-block',
            $vuetify.theme.dark ? 'dark--hover' : 'white--hover',
        ]"
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

<style scoped>
.hover--text.dark--hover:before,
.hover--text.white--hover:before {
    top: 0;
    width: 0%;
    content: '';
    height: 50%;
    position: absolute;
    transition: width 400ms cubic-bezier(1, 0, 0, 1);
}
.hover--text.dark--hover:before {
    background: #e0e0e0;
}
.hover--text.white--hover:before {
    background: #212121;
}
.hover--text.dark--hover:hover:before,
.hover--text.white--hover:hover:before {
    width: 100%;
    transition: width 400ms cubic-bezier(1, 0, 0, 1);
}
</style>
