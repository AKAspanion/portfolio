<template>
    <div
        class="social-links-wrapper text-center"
        :style="`bottom: ${bottom}px;left: ${left}px;`"
    >
        <div
            class="link-logo-container-gh"
            @mousemove="
                iconHover(
                    $event,
                    '.link-logo-container-gh',
                    '.link-logo-wrapper-gh'
                )
            "
            @mouseout="
                iconHover(
                    $event,
                    '.link-logo-container-gh',
                    '.link-logo-wrapper-gh'
                );
                hideCursor();
            "
            @click="openLink('https://github.com/AKAspanion')"
            @mouseover="showCursor()"
        >
            <div class="link-logo-wrapper-gh">
                <v-icon>
                    mdi-github-circle
                </v-icon>
            </div>
        </div>
        <div
            class="link-logo-container-li"
            @mousemove="
                iconHover(
                    $event,
                    '.link-logo-container-li',
                    '.link-logo-wrapper-li'
                )
            "
            @mouseout="
                iconHover(
                    $event,
                    '.link-logo-container-li',
                    '.link-logo-wrapper-li'
                );
                hideCursor();
            "
            @click="openLink('https://www.linkedin.com/in/spanion')"
            @mouseover="showCursor()"
        >
            <div class="link-logo-wrapper-li">
                <v-icon>
                    mdi-linkedin-box
                </v-icon>
            </div>
        </div>
        <div
            class="link-logo-container-in"
            @mousemove="
                iconHover(
                    $event,
                    '.link-logo-container-in',
                    '.link-logo-wrapper-in'
                )
            "
            @mouseout="
                iconHover(
                    $event,
                    '.link-logo-container-in',
                    '.link-logo-wrapper-in'
                );
                hideCursor();
            "
            @click="openLink('https://www.instagram.com/spanionkumar')"
            @mouseover="showCursor()"
        >
            <div class="link-logo-wrapper-in">
                <v-icon>
                    mdi-instagram
                </v-icon>
            </div>
        </div>
        <div
            class="link-logo-container-fb"
            @mousemove="
                iconHover(
                    $event,
                    '.link-logo-container-fb',
                    '.link-logo-wrapper-fb'
                )
            "
            @mouseout="
                iconHover(
                    $event,
                    '.link-logo-container-fb',
                    '.link-logo-wrapper-fb'
                );
                hideCursor();
            "
            @click="openLink('https://www.facebook.com/AKAspanion')"
            @mouseover="showCursor()"
        >
            <div class="link-logo-wrapper-fb">
                <v-icon size="24">
                    mdi-facebook
                </v-icon>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        bottom: {
            type: Number,
            default: 24,
        },
        left: {
            type: Number,
            default: 24,
        },
    },
    methods: {
        openLink(url) {
            window.open(url, '_blank');
        },
    },
};
</script>

<style scoped>
.social-links-wrapper {
    width: 80px;
    z-index: 50;
    margin: 0 auto;
    position: fixed;
    will-change: transform;
    transition: transform 150ms ease-out, left 450ms ease;
    transform: translate3d(0px, 0px, 0px);
}
.link-logo-container-fb,
.link-logo-container-gh,
.link-logo-container-in,
.link-logo-container-li {
    width: 80px;
    height: 80px;
    cursor: pointer;
    margin-bottom: 2px;
}
.link-logo-wrapper-fb,
.link-logo-wrapper-gh,
.link-logo-wrapper-in,
.link-logo-wrapper-li {
    padding: 28px;
    transition: 250ms;
}
</style>
