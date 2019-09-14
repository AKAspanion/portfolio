<template>
    <div class="about-container">
        <div class="about-main">
            <div class="hi seperated">Hi.</div>
            <div class="name seperated">My name is {{about.name}}.</div>
            <div class="about seperated">
                I am a {{about.position}} currently working at
                <a
                    class="link"
                    target="_blank"
                    :href="about.company.url"
                >{{about.company.title}}</a>.
                <br>
                {{about.love}}
            </div>
            <div class="about seperated">
                You can follow me here -
                <template v-for="(link,index) in about.socialLinks">
                    <a class="link" :key="['a-'+index]" :href="link" target="_blank">{{link.title}}</a>
                    <span v-if="index===about.socialLinks.length-1" :key="['span-'+index]">.</span>
                    <span
                        v-else-if="index===about.socialLinks.length-2"
                        :key="['span-'+index]"
                    >&nbsp;and&nbsp;</span>
                    <span v-else :key="['span-'+index]">,&nbsp;</span>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import DataService from "../dataproviders/DataService";
export default {
    name: "SpanionAbout",
    data() {
        return {
            about: {}
        };
    },
    methods: {
        fetchData() {
            DataService.getAbout(data => {
                this.about = data;
            });
        }
    },
    created() {
        this.fetchData();
    }
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
    font-family: "Andis";
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
