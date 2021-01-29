<template>
    <div class="about-container">
        <div class="about-main">
            <!-- <div class="hi seperated" :class="isEnglish ? '':'.'">{{$t('ui.about.hi')}}</div> -->
            <div class="name seperated">
                {{ $t('ui.about.name') + $t('about.name') }}.
            </div>
            <div class="about seperated">
                {{
                    $t('ui.about.about.start') +
                        $t('about.position') +
                        $t('ui.about.about.end')
                }}
                <a
                    class="link"
                    target="_blank"
                    :href="$t('about.company.url')"
                    >{{ $t('about.company.title') }}</a
                >
                {{ $t('ui.common.fullStop') }}
                <br />
                {{ $t('about.love') }}
            </div>
            <div class="about seperated">
                {{ $t('ui.about.follow') }}
                <template v-for="(link, index) in $t('about.socialLinks')">
                    <a
                        class="link"
                        :key="'title' + index"
                        :href="link"
                        target="_blank"
                        >{{ link.title }}</a
                    >
                    <span
                        v-if="index === $t('about.socialLinks').length - 1"
                        :key="'link' + index"
                        >{{ $t('ui.common.fullStop') }}</span
                    >
                    <span
                        v-else-if="index === $t('about.socialLinks').length - 2"
                        :key="'link' + index"
                        >&nbsp;{{ $t('ui.common.and') }}&nbsp;</span
                    >
                    <span v-else :key="'link' + index">,&nbsp;</span>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SpanionAbout',
    computed: {
        isEnglish() {
            return this.$i18n.locale === 'en';
        },
    },
};
</script>

<style scoped>
.about-container {
    height: 100vh;
    width: 100vw;
    background: #3aafa9;
    color: #feffff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.about-main {
    margin-top: 15vh;
    width: 80vw;
    height: 85vh;
    overflow-y: scroll;
}
.hi {
    font-size: 16.5vh;
}
.name {
    font-size: 8.5vh;
}
.about {
    font-size: 4vh;
}
.seperated {
    font-family: 'Andis';
    margin-bottom: 2vh;
}

@media only screen and (max-width: 600px) {
    .about-main {
        width: 80vw;
    }
    .hi {
        font-size: 20vw;
    }
    .name {
        font-size: 10vw;
    }
    .about {
        font-size: 5vw;
    }
}
</style>
