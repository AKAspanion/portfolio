<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useDisplay, useGoTo, useTheme } from 'vuetify';

import HoverText from '@/components/HoverText.vue';
import MaskText from '@/components/MaskText.vue';
import SkewOnHover from '@/components/SkewOnHover.vue';
import { useCursor } from '@/composables/useCursor';
import { useContent } from '@/content';
import { icons, projectIcon, socialBrand } from '@/icons';
import { useUiStore } from '@/stores/ui';
import { loadAds } from '@/util/ads';
import { findSection, focusSection } from '@/util/sections';

const EMAIL = 'panditankit1995@gmail.com';
/** Length of the intro before the page controls slide in. */
const INTRO_MS = 1500;

const { t } = useI18n();
const ui = useUiStore();
const content = useContent();
const route = useRoute();
const goTo = useGoTo();
const theme = useTheme();
const { xs } = useDisplay();
const { showCursor, hideCursor } = useCursor();

const dark = computed(() => theme.current.value.dark);
const year = new Date().getFullYear();

let introTimer: number | undefined;

onMounted(() => {
  introTimer = window.setTimeout(async () => {
    ui.loaded = true;
    await nextTick();
    // Ads are requested only after the page content is on screen.
    loadAds();
    const section = route.hash ? findSection(route.hash) : null;
    if (section) {
      void goTo(section);
      focusSection(section);
    }
  }, INTRO_MS);
});

onBeforeUnmount(() => clearTimeout(introTimer));
</script>

<template>
  <main
    class="home-container"
    :style="
      dark
        ? { background: '#212121', color: '#e0e0e0' }
        : { background: '#e0e0e0', color: '#212121' }
    "
  >
    <section id="home" class="home-text-wrapper" tabindex="-1">
      <h1 class="home-text-container home-padding">
        <span class="fixed-wrapper d-block">
          <span class="d-inline-block my-1 pb-2">{{ t('hi') }}</span>
          <br />
          <span class="d-inline-block my-1 pb-2">
            <MaskText :delay="0">{{ t('home.salute') }},</MaskText>
          </span>
          <br />
          <span class="d-inline-block my-1 pb-2">
            <MaskText :delay="0">
              <HoverText
                :text="t('home.know-me')"
                classes="home-text--name"
                link="/images/profile.webp"
              >
                {{ t('home.name') }}
              </HoverText>
              -
            </MaskText>
          </span>
          <br />
          <span class="d-inline-block my-1 pb-2">
            <MaskText :delay="0">{{ t('home.designation-1') }}</MaskText>
          </span>
          <br />
          <span class="d-inline-block my-1 pb-2">
            <MaskText :delay="0">{{ t('home.designation-2') }}</MaskText>
          </span>
        </span>
      </h1>
    </section>

    <section
      id="projects"
      tabindex="-1"
      class="project-text-wrapper"
      aria-labelledby="projects-title"
    >
      <div class="home-padding">
        <div class="fixed-wrapper" :class="{ 'pt-12 mt-4': !xs }">
          <div class="text-center">
            <h2
              id="projects-title"
              class="d-inline-block type-display-2 font-weight-light"
            >
              <MaskText :delay="0">{{ t('projects.title') }}</MaskText>
            </h2>
          </div>
          <p class="text-center pt-4 mb-12 pb-12 type-title font-weight-light">
            {{ t('projects.subtitle') }}
          </p>
          <ul class="work-grid">
            <li
              v-for="project in content.projects"
              :key="project.img"
              class="work-grid__item"
            >
              <SkewOnHover classes="work-grid__img">
                <img
                  :alt="project.name"
                  :src="`/images/${project.img}.webp`"
                  width="320"
                  height="203"
                  loading="lazy"
                  decoding="async"
                />
                <div class="work-grid__view-link type-title font-weight-medium">
                  <HoverText
                    :href="project.link"
                    :link="`/images/ss/${project.img}.webp`"
                    class="text-center home-text--name"
                    :text="`${t('projects.go-to')}, ${project.name}`"
                  >
                    {{ t('view') }}
                    <br />&rarr;
                  </HoverText>
                </div>
                <div class="work-grid__hover-item" />
              </SkewOnHover>
              <h3 class="d-inline-block pt-4 type-title font-weight-medium">
                <MaskText :delay="0">{{ project.name }}</MaskText>
              </h3>
              <div>
                <span
                  v-for="tag in project.icons"
                  :key="tag.name"
                  class="d-inline-block"
                >
                  <v-icon
                    size="small"
                    :color="tag.color"
                    :icon="projectIcon(tag.icon)"
                  />
                  <span class="ml-2 mr-4 type-overline font-weight-medium">{{
                    tag.name
                  }}</span>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section
      id="skills"
      tabindex="-1"
      class="skills-text-wrapper"
      aria-labelledby="skills-title"
    >
      <div class="home-padding">
        <div class="fixed-wrapper" :class="{ 'pt-12 mt-4': !xs }">
          <div class="text-center">
            <h2
              id="skills-title"
              class="d-inline-block type-display-2 font-weight-light"
            >
              <MaskText :delay="0">{{ t('skills.title') }}</MaskText>
            </h2>
          </div>
          <p class="text-center pt-4 mb-12 pb-12 type-title font-weight-light">
            {{ t('skills.subtitle') }}
          </p>
          <ul class="skill-grid pt-12 pb-12 mb-12">
            <li
              v-for="skill in content.skills"
              :key="skill.icon"
              class="skill-grid__item"
              :style="{
                background: dark ? '#424242' : '#EEEEEE',
                borderBottom: `2px solid ${skill.top ? '#4FC08D' : '#FFCA28'}`,
              }"
              @mouseout="hideCursor()"
              @mouseover="showCursor()"
            >
              <img
                alt=""
                class="skill-grid__img"
                :src="`/images/icons/${skill.icon}.svg`"
                width="32"
                height="32"
                loading="lazy"
              />
              <div
                class="type-subtitle font-weight-light pt-3"
                :class="dark ? 'text-white' : 'text-black'"
              >
                {{ skill.name }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section
      id="experience"
      tabindex="-1"
      class="exp-text-wrapper"
      aria-labelledby="experience-title"
    >
      <div class="home-padding">
        <div class="fixed-wrapper" :class="{ 'pt-12 mt-4': !xs }">
          <div class="text-center">
            <h2
              id="experience-title"
              class="d-inline-block type-display-2 font-weight-light"
            >
              <MaskText :delay="0">{{ t('experience.title') }}</MaskText>
            </h2>
          </div>
          <p class="text-center pt-4 mb-12 pb-8 type-title font-weight-light">
            {{ t('experience.subtitle') }}
          </p>
          <ul class="exp-grid pb-12">
            <li
              v-for="job in content.experience"
              :key="job.img"
              class="exp-grid__item"
              :style="{ background: dark ? '#616161' : '#f5f5f5' }"
            >
              <div>
                <h3 class="d-inline-block font-weight-light type-display-1">
                  <MaskText :delay="0">
                    <HoverText
                      :href="job.link"
                      :text="job.name"
                      classes="home-text--name"
                      :link="`/images/${job.img}.webp`"
                    >
                      {{ job.name }}</HoverText
                    >,
                  </MaskText>
                </h3>
                &nbsp;
                <div class="d-inline-block type-headline font-weight-thin">
                  {{ job.role }}
                </div>
                <p
                  class="pt-3 type-title font-weight-light"
                  @mouseout="hideCursor()"
                  @mouseover="showCursor()"
                >
                  {{ job.desc }}
                </p>
              </div>
              <div>
                <div class="pt-8 font-weight-light">{{ job.location }}</div>
                <div class="type-overline font-weight-medium">
                  {{ job.time }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section
      id="contact"
      tabindex="-1"
      class="contact-text-wrapper"
      aria-labelledby="contact-title"
    >
      <div class="home-padding">
        <div class="fixed-wrapper" :class="{ 'pt-12 mt-4': !xs }">
          <div class="text-center mb-2 mt-6">
            <h2
              id="contact-title"
              class="d-inline-block type-display-2 font-weight-light"
            >
              <MaskText :delay="0">{{ t('contact.title') }}</MaskText>
            </h2>
          </div>
          <div class="text-center pt-12 mt-12">
            <a
              class="d-inline-block type-headline font-weight-light contact-email"
              :href="`mailto:${EMAIL}`"
              :aria-label="`${t('a11y.email')}: ${EMAIL}`"
            >
              <v-icon :icon="icons.email" class="mr-2" />{{ EMAIL }}
            </a>
          </div>
          <ul class="text-center pt-6 mb-12 pb-8 contact-links">
            <li
              v-for="link in content.social"
              :key="link.id"
              class="d-inline-block mx-4"
            >
              <a
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`${link.name} (${t('a11y.new-tab')})`"
                @mouseout="hideCursor()"
                @mouseover="showCursor()"
              >
                <v-icon
                  size="32"
                  :color="socialBrand(link.url)?.color"
                  :icon="socialBrand(link.url)?.icon"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <footer class="footer-text-wrapper py-12">
      <p
        class="pt-9 pb-10 type-title text-center font-weight-light text-uppercase"
      >
        {{ t('copyright', { year }) }}
      </p>
    </footer>
  </main>
</template>

<style scoped>
.home-container {
  width: 100%;
  text-align: left;
  min-height: 100vh;
}

ul {
  list-style: none;
}

section:focus {
  outline: none;
}

.home-text-wrapper {
  display: flex;
  min-height: 100vh;
  align-items: flex-end;
  justify-content: flex-start;
}

.home-text-container {
  width: 100%;
  overflow: hidden;
  text-transform: uppercase;
  font-weight: 100;
  font-size: max(7.8vw, 40px);
  line-height: max(6.4vw, 30px);
  font-family: Roboto, sans-serif;
}

@media only screen and (max-width: 600px) {
  .home-text-container {
    font-size: 5.5vh;
    line-height: 6vh;
  }
}

:deep(.home-text--name) {
  cursor: pointer;
  font-weight: 300;
  transition: transform 150ms ease-out;
}

.v-theme--dark .project-text-wrapper,
.v-theme--dark .contact-text-wrapper {
  background: #424242;
}

.v-theme--dark .exp-text-wrapper {
  background: #757575;
}

.v-theme--dark .skills-text-wrapper {
  background: #616161;
}

.v-theme--light .project-text-wrapper,
.v-theme--light .contact-text-wrapper {
  background: #eeeeee;
}

.v-theme--light .exp-text-wrapper {
  background: #fafafa;
}

.v-theme--light .skills-text-wrapper {
  background: #f5f5f5;
}

.work-grid,
.exp-grid {
  display: grid;
  gap: 0px 48px;
  grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr));
}

.work-grid__item,
.exp-grid__item {
  margin: 48px 0px;
  position: relative;
}

.exp-grid__item {
  padding: 32px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
}

:deep(.work-grid__img) {
  height: 203px;
  position: relative;
  background: #d9d9d9;
}

.work-grid__item img {
  display: block;
  width: 100%;
  height: 203px;
  object-fit: cover;
}

.work-grid__item:hover .work-grid__hover-item,
.work-grid__item:focus-within .work-grid__hover-item {
  opacity: 0.6;
}

.work-grid__item:hover .work-grid__view-link,
.work-grid__item:focus-within .work-grid__view-link {
  transform: translate3d(-50%, -50%, 0px);
  opacity: 1;
}

.work-grid__hover-item {
  top: 0;
  z-index: 1;
  opacity: 0;
  width: 100%;
  height: 203px;
  position: absolute;
  pointer-events: none;
  background: #000000;
  transition: all 0.3s ease-in-out;
}

.work-grid__view-link {
  top: 50%;
  left: 50%;
  opacity: 0;
  z-index: 2;
  color: white;
  position: absolute;
  transition: all 0.3s ease-in-out;
  transform: translate3d(-50%, 100%, 0px);
}

.skill-grid {
  display: grid;
  gap: 48px;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
}

.skill-grid__item {
  display: flex;
  padding: 24px 0px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.skill-grid__img {
  width: 32px;
  height: 32px;
  transition: 0.5s;
}

.skill-grid__img:hover {
  transform: scale(1.4);
}

.contact-links a {
  display: inline-block;
}
</style>
