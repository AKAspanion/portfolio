export default {
    methods: {
        showCursor(tooltip, link) {
            this.$store.dispatch('SHOW_CURSOR',
                tooltip || link ? {
                    hovered: true,
                    tooltip,
                    link
                } : true
            );
        },
        hideCursor() {
            this.$store.dispatch('SHOW_CURSOR', false);
        },
    }
};