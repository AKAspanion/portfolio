export default {
    methods: {
        showCursor(tooltip, link, _mobile) {
            if (_mobile) {
                return;
            }
            this.$store.dispatch('SHOW_CURSOR',
                tooltip || link ? {
                    hovered: true,
                    tooltip,
                    link
                } : true
            );
        },
        hideCursor(_mobile) {
            if (_mobile) {
                return;
            }
            this.$store.dispatch('SHOW_CURSOR', false);
        },
    }
};