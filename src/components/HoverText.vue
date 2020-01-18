<template>
    <div
        @mousemove="textHover"
        class="hover--text"
        :class="[
            classes,
            hoverClass,
            'd-inline-block',
            $vuetify.theme.dark ? 'dark--hover' : 'white--hover',
        ]"
        @mouseover="
            onHover($event);
            showCursor(text, link);
        "
        @mouseout="
            hideCursor();
            onHover($event);
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
    data() {
        return {
            hoverClass: 'left--hover',
        };
    },
    methods: {
        onHover(e) {
            var pos = e.target.getBoundingClientRect();
            var edge = this.closestEdge(
                e.pageX - pos.x,
                e.pageY - pos.y,
                pos.width,
                pos.height
            );
            this.hoverClass = `${
                edge === 'left' || edge === 'top' ? 'left' : 'right'
            }--hover`;
        },
        closestEdge(x, y, w, h) {
            let topEdgeDist = this.distMetric(x, y, w / 2, 0);
            let bottomEdgeDist = this.distMetric(x, y, w / 2, h);
            let leftEdgeDist = this.distMetric(x, y, 0, h / 2);
            let rightEdgeDist = this.distMetric(x, y, w, h / 2);
            let min = Math.min(
                topEdgeDist,
                bottomEdgeDist,
                leftEdgeDist,
                rightEdgeDist
            );
            switch (min) {
                case leftEdgeDist:
                    return 'left';
                case rightEdgeDist:
                    return 'right';
                case topEdgeDist:
                    return 'top';
                case bottomEdgeDist:
                    return 'bottom';
            }
        },
        distMetric(x, y, x2, y2) {
            let xDiff = x - x2;
            let yDiff = y - y2;
            return xDiff * xDiff + yDiff * yDiff;
        },
    },
};
</script>

<style scoped>
.hover--text.dark--hover.left--hover:before,
.hover--text.white--hover.left--hover:before {
    top: 0;
    width: 0%;
    content: '';
    height: 50%;
    position: absolute;
    transition: width 400ms cubic-bezier(1, 0, 0, 1);
}
.hover--text.dark--hover.right--hover:before,
.hover--text.white--hover.right--hover:before {
    left: 100%;
    width: 60%;
    content: '';
    height: 50%;
    width: 0%;
    position: absolute;
    transform: translate3d(-100%, 0, 0);
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
