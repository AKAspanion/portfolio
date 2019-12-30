export default {
    methods: {
        showCursor(tooltip) {
            this.$store.dispatch('SHOW_CURSOR',
                tooltip ? {
                    hovered: true,
                    tooltip
                } : true
            );
        },
        hideCursor() {
            this.$store.dispatch('SHOW_CURSOR', false);
        },
    }
};